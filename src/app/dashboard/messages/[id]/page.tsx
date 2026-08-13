import { getMessages, getConversations } from "@/app/actions/message-actions";
import ChatWindow from "@/components/chat/ChatWindow";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ChatPage({ params }: { params: { id: string } }) {
  let messages;
  try {
    messages = await getMessages(params.id);
  } catch (err: unknown) {
    if ((err as Error).message === 'Unauthorized') notFound();
    return <div>Error loading chat: {(err as Error).message}</div>;
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get conversation context for the header
  const conversations = await getConversations();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentConvo = conversations?.find((c: any) => c.id === params.id);
  
  if (!currentConvo) notFound();
  
  const title = currentConvo.business?.business_name || `${currentConvo.customer?.first_name} ${currentConvo.customer?.last_name}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <div className="dashboard-top" style={{ paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Link href="/dashboard/messages" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
              &larr; Back to Inbox
            </Link>
          </div>
          <h1>{title}</h1>
        </div>
      </div>
      
      <div className="dashboard-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <ChatWindow 
          initialMessages={messages || []} 
          conversationId={params.id} 
          currentUserId={user?.id || ''}
        />
      </div>
    </div>
  );
}
