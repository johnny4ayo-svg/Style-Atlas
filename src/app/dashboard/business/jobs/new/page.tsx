'use client'

import Link from "next/link";
import { createJob } from "@/app/actions/business-actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-gold" type="submit" disabled={pending} style={{ width: '100%', padding: '16px' }}>
      {pending ? 'Posting...' : 'Publish Job'}
    </button>
  );
}

export default function NewJobPage() {
  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Careers</span>
          <h1>Post a New Job</h1>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-outline-dark" href="/dashboard/business/jobs">Cancel</Link>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1', maxWidth: '600px' }}>
          <form action={createJob} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
            
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" name="title" required placeholder="e.g., Senior Pattern Cutter" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea name="description" required rows={5} placeholder="Describe the responsibilities and requirements..." style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Job Type</label>
                <select name="type" required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Location Setting</label>
                <input type="text" name="location" required placeholder="e.g., On-site (Lagos) or Remote" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Salary Range (Optional)</label>
              <input type="text" name="salary_range" placeholder="e.g., ₦350k - ₦500k monthly" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <SubmitButton />
          </form>
        </article>
      </section>
    </>
  );
}
