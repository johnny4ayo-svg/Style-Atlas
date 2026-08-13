'use client'

import Link from "next/link";
import { createEvent } from "@/app/actions/business-actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-gold" type="submit" disabled={pending} style={{ width: '100%', padding: '16px' }}>
      {pending ? 'Publishing...' : 'Publish Event'}
    </button>
  );
}

export default function NewEventPage() {
  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Community</span>
          <h1>Host a New Event</h1>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-outline-dark" href="/dashboard/business/events">Cancel</Link>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1', maxWidth: '600px' }}>
          <form action={createEvent} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
            
            <div className="form-group">
              <label>Event Title</label>
              <input type="text" name="title" required placeholder="e.g., Small Studio Systems Workshop" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div className="form-group">
              <label>Event Description</label>
              <textarea name="description" required rows={4} placeholder="Describe the event details, schedule, and speakers..." style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Date & Time</label>
                <input type="datetime-local" name="event_date" required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" required placeholder="e.g., Yaba, Lagos" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Ticket Price (₦)</label>
              <input type="number" name="ticket_price" required defaultValue="0" min="0" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>Enter 0 for a free event.</span>
            </div>

            <div className="form-group">
              <label>Cover Image</label>
              <input type="file" name="image_file" accept="image/*" required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>Upload a promotional image for the event.</span>
            </div>

            <SubmitButton />
          </form>
        </article>
      </section>
    </>
  );
}
