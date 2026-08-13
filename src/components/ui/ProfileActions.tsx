'use client'

import { useState, useTransition } from "react"
import { submitQuoteRequest } from "@/app/actions/quote-actions"
import { createOrGetConversation } from "@/app/actions/message-actions"
import { useRouter } from "next/navigation"

export default function ProfileActions({ businessId, businessName, style = 'aside' }: { businessId: string, businessName: string, style?: 'aside' | 'hero' | 'mobile' }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationType, setConsultationType] = useState('in-person');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const closeModals = () => {
    setIsQuoteOpen(false);
    setIsConsultationOpen(false);
  };

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('businessId', businessId);
    
    startTransition(async () => {
      try {
        await submitQuoteRequest(formData);
        alert('Your quote request has been sent successfully!');
        closeModals();
      } catch {
        alert('You must be logged in to request a quote. Redirecting to login...');
        router.push(`/login?returnUrl=/profile`);
      }
    });
  };

  const handleSendMessage = () => {
    startTransition(async () => {
      try {
        const conversationId = await createOrGetConversation(businessId);
        if (conversationId) {
          router.push(`/dashboard/messages/${conversationId}`);
        }
      } catch {
        alert('You must be logged in to send a message.');
        router.push(`/login?returnUrl=/profile/${businessId}`); // using businessId as fallback since slug isn't passed
      }
    });
  };

  return (
    <>
      {style === 'hero' && (
        <>
          <button className="btn btn-outline-light" onClick={handleSendMessage} disabled={isPending}>Send message</button>
          <button className="btn btn-gold" onClick={() => setIsConsultationOpen(true)}>Book consultation</button>
        </>
      )}
      
      {style === 'aside' && (
        <>
          <button className="btn btn-gold" onClick={() => setIsQuoteOpen(true)}>Request a quote</button>
          <button className="btn btn-outline-light" onClick={handleSendMessage} disabled={isPending}>Send direct message</button>
        </>
      )}

      {style === 'mobile' && (
        <>
          <button className="btn btn-outline-dark" onClick={handleSendMessage} disabled={isPending}>Message</button>
          <button className="btn btn-gold" onClick={() => setIsConsultationOpen(true)}>Book consultation</button>
        </>
      )}

      {isQuoteOpen && (
        <div className="modal-backdrop open">
          <form className="modal" onSubmit={handleQuoteSubmit}>
            <button type="button" className="modal-close" onClick={closeModals}><svg className="icon"><use href="/icons/sprite.svg#icon-close"></use></svg></button>
            <span className="eyebrow">Request a quote</span>
            <h2>Tell {businessName} what you&apos;re planning.</h2>
            <p>Your request will be sent directly to their studio dashboard.</p>
            <div className="form-row">
              <div className="form-group"><label>Occasion</label><input name="occasion" className="form-control" required placeholder="e.g. Traditional Wedding" /></div>
              <div className="form-group"><label>Event date</label><input name="targetDate" className="form-control" type="date" required /></div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Budget</label>
                <select name="budgetRange" className="form-control">
                  <option>₦180k to ₦300k</option>
                  <option>₦300k to ₦600k</option>
                  <option>₦600k+</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Project details</label>
              <textarea name="details" className="form-control" required placeholder="Colours, size, city and any timing details..."></textarea>
            </div>
            <button className="btn btn-gold" style={{ width: '100%' }} disabled={isPending}>
              {isPending ? 'Sending...' : 'Send quote request'}
            </button>
          </form>
        </div>
      )}

      {isConsultationOpen && (
        <div className="modal-backdrop open">
          <form className="modal" onSubmit={(e) => { e.preventDefault(); alert('Consultation slot selected in demo mode'); closeModals(); }}>
            <button type="button" className="modal-close" onClick={closeModals}><svg className="icon"><use href="/icons/sprite.svg#icon-close"></use></svg></button>
            <span className="eyebrow">Paid consultation</span>
            <h2>Choose how you&apos;d like to meet {businessName}.</h2>
            <div className="choice-grid">
              <button type="button" className={`choice ${consultationType === 'in-person' ? 'selected' : ''}`} onClick={() => setConsultationType('in-person')}>In-person · ₦35,000</button>
              <button type="button" className={`choice ${consultationType === 'video' ? 'selected' : ''}`} onClick={() => setConsultationType('video')}>Video consultation · ₦25,000</button>
            </div>
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Preferred date</label>
              <input className="form-control" type="date" required />
            </div>
            <button className="btn btn-gold" style={{ width: '100%' }}>Continue to payment</button>
          </form>
        </div>
      )}
    </>
  );
}
