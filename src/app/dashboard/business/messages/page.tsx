import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ChatThread from "@/components/ui/ChatThread";

export default async function BusinessMessagesPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!business) {
    return <div>You don&apos;t have a business profile yet.</div>;
  }

  const { data: conversations } = await supabase
    .from('conversations')
    .select(`
      id,
      profiles!customer_id(id, first_name, last_name, avatar_url)
    `)
    .eq('business_id', business.id)
    .order('updated_at', { ascending: false });

  const activeId = searchParams.id || (conversations?.[0]?.id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let messages: any[] = [];
  let activeCustomerName = '';

  if (activeId) {
    const { data: msgs } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', activeId)
      .order('created_at', { ascending: true });
    
    if (msgs) messages = msgs;
    
    const activeConv = conversations?.find(c => c.id === activeId);
    if (activeConv) {
      activeCustomerName = `${activeConv.profiles?.first_name} ${activeConv.profiles?.last_name}`;
    }
  }

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Client Communication</span>
          <h1>Inbox</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', minHeight: '600px' }}>
        <div className="conversations-list" style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: '#fafafa', fontWeight: 600 }}>
            Recent Enquiries
          </div>
          {conversations && conversations.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {conversations.map(conv => (
                <Link 
                  key={conv.id} 
                  href={`/dashboard/business/messages?id=${conv.id}`}
                  style={{ 
                    padding: '16px', 
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: conv.id === activeId ? '#f3f4f6' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <img 
                    src={conv.profiles?.avatar_url || '/images/designer-blue.jpg'} 
                    alt="Avatar" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ display: 'block' }}>{conv.profiles?.first_name} {conv.profiles?.last_name}</strong>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-500)' }}>
              No messages yet.
            </div>
          )}
        </div>

        <div className="active-conversation">
          {activeId ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderBottom: 'none', borderRadius: '8px 8px 0 0', backgroundColor: '#fafafa', fontWeight: 600 }}>
                {activeCustomerName}
              </div>
              <ChatThread conversationId={activeId} currentUserId={user.id} initialMessages={messages} />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--gray-500)' }}>
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
