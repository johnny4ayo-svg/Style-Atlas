import { getConversations } from "@/app/actions/message-actions";
import Link from "next/link";
import Image from "next/image";

export default async function MessagesInbox() {
  let conversations;
  try {
    conversations = await getConversations();
  } catch (err: unknown) {
    return <div className="dashboard-card" style={{ padding: '24px' }}>Error loading messages: {(err as Error).message}</div>;
  }

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Inbox</span>
          <h1>Direct Messages</h1>
        </div>
      </div>

      <section className="dashboard-card">
        {conversations?.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
            No active conversations yet.
          </div>
        ) : (
          <div className="conversation-list" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {conversations?.map((conv: any) => (
              <Link 
                href={`/dashboard/messages/${conv.id}`} 
                key={conv.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  padding: '16px', 
                  borderBottom: '1px solid #eee5da',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Image 
                  src={conv.businesses?.logo_url || conv.profiles?.avatar_url || "/images/designer-blue.jpg"} 
                  alt="Avatar" 
                  width={48} 
                  height={48} 
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '16px' }}>
                    {conv.businesses?.business_name || `${conv.profiles?.first_name} ${conv.profiles?.last_name}`}
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Last active: {new Date(conv.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ color: 'var(--gold)' }}>
                  <svg className="icon" style={{ width: '20px', height: '20px' }}>
                    <use href="/icons/sprite.svg#icon-chevron-right"></use>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
