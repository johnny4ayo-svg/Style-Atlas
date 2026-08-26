"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-dark" disabled={pending} style={{ width: '100%', marginTop: '16px' }}>
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, null);

  if (state?.success) {
    return (
      <div className="form-success" style={{ padding: '24px', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <h3 style={{ color: 'var(--success)' }}>Message Sent</h3>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {state?.error && (
        <div className="form-error" style={{ padding: '12px', background: '#ffebee', color: '#c62828', borderRadius: '4px', fontSize: '14px' }}>
          {state.error}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Full name</label>
        <input type="text" id="name" name="name" required style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '4px' }} />
      </div>
      
      <div className="form-group">
        <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Email address</label>
        <input type="email" id="email" name="email" required style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '4px' }} />
      </div>
      
      <div className="form-group">
        <label htmlFor="category" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Enquiry category</label>
        <select id="category" name="category" required style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', background: 'white' }}>
          <option value="">Select a category</option>
          <option value="listing_support">Listing support</option>
          <option value="partnerships">Partnerships</option>
          <option value="inaccurate_information">Inaccurate information</option>
          <option value="general">General enquiries</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Message</label>
        <textarea id="message" name="message" rows={5} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'inherit' }}></textarea>
      </div>

      <div className="form-group" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <input type="checkbox" id="consent" name="consent" required style={{ marginTop: '4px' }} />
        <label htmlFor="consent" style={{ fontSize: '12px', opacity: 0.8, lineHeight: 1.5 }}>
          I consent to STYLEATLAS collecting my details to respond to this enquiry in accordance with the Privacy Policy.
        </label>
      </div>
      
      <SubmitButton />
    </form>
  );
}
