'use client'

import { useEffect, useState, useRef, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { sendMessage } from "@/app/actions/message-actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChatWindow({ initialMessages, conversationId, currentUserId }: { initialMessages: any[], conversationId: string, currentUserId: string }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel(`chat_${conversationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        // If the new message is from the other person, append it
        if (payload.new.sender_id !== currentUserId) {
          setMessages(prev => [...prev, payload.new]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase, currentUserId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const content = inputText;
    setInputText("");

    // Optimistic UI update
    const optimisticMessage = {
      id: crypto.randomUUID(),
      content,
      sender_id: currentUserId,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, optimisticMessage]);

    startTransition(async () => {
      try {
        await sendMessage(conversationId, content);
      } catch (err: unknown) {
        alert("Failed to send message: " + (err as Error).message);
        // Rollback optimistic update
        setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => {
          const isMine = msg.sender_id === currentUserId;
          return (
            <div key={msg.id} style={{
              alignSelf: isMine ? 'flex-end' : 'flex-start',
              background: isMine ? 'var(--gold)' : '#f9f6f3',
              color: isMine ? '#fff' : 'inherit',
              padding: '12px 16px',
              borderRadius: isMine ? '12px 12px 0 12px' : '12px 12px 12px 0',
              maxWidth: '70%',
              lineHeight: 1.5,
              fontSize: '15px'
            }}>
              {msg.content}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '16px', borderTop: '1px solid #eee5da', background: '#fff' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Type your message..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ flex: 1, marginBottom: 0 }}
          />
          <button type="submit" className="btn btn-gold" disabled={isPending || !inputText.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
