'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { sendMessage } from '@/app/actions/message-actions';

type Message = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export default function ChatThread({ 
  conversationId, 
  currentUserId,
  initialMessages 
}: { 
  conversationId: string;
  currentUserId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Subscribe to new messages
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        const newMessage = payload.new as Message;
        // Check if message already exists to avoid duplicates from optimistic updates
        setMessages(prev => {
          if (prev.find(m => m.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const content = newMessage.trim();
    setNewMessage('');
    setIsSending(true);

    try {
      await sendMessage(conversationId, content);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-thread" style={{ display: 'flex', flexDirection: 'column', height: '600px', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
      <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fafafa' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--gray-500)' }}>No messages yet. Say hello!</div>
        ) : (
          messages.map(msg => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <div key={msg.id} style={{ 
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: isMe ? 'var(--gold)' : '#fff',
                color: isMe ? '#fff' : '#000',
                border: isMe ? 'none' : '1px solid var(--border-color)'
              }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.4 }}>{msg.content}</p>
                <span style={{ fontSize: '10px', opacity: 0.7, display: 'block', marginTop: '4px', textAlign: isMe ? 'right' : 'left' }}>
                  {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', backgroundColor: '#fff' }}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
        />
        <button type="submit" disabled={isSending || !newMessage.trim()} className="btn btn-gold" style={{ padding: '10px 20px' }}>
          Send
        </button>
      </form>
    </div>
  );
}
