'use client';

import "../inner-premium.css"

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { submitBusinessProfile } from "@/app/actions/business-onboarding";

export default function AddBusinessPage() {
  const supabase = useMemo(() => createClient(), []);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [specialities, setSpecialities] = useState<string[]>([]);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Fashion designer / atelier',
    city: '',
    state: '',
    positioning: '',
    description: '',
    startingPrice: '',
    leadTime: '3 to 6 weeks'
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoadingAuth(false);
    };
    checkAuth();
  }, [supabase.auth]);

  // Draft saving
  useEffect(() => {
    const saved = localStorage.getItem('businessOnboardingDraft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.specialities) setSpecialities(parsed.specialities);
        if (parsed.currentStep) setCurrentStep(Math.min(4, Math.max(1, Number(parsed.currentStep) || 1)));
        if (parsed.contactEmail) setContactEmail(parsed.contactEmail);
        if (parsed.contactPhone) setContactPhone(parsed.contactPhone);
      } catch {
        // ignore parsing errors
      }
    }
  }, []);

  const saveDraft = (step: number) => {
    localStorage.setItem('businessOnboardingDraft', JSON.stringify({
      formData,
      specialities,
      currentStep: step,
      contactEmail,
      contactPhone
    }));
    setDraftSaved(true);
  };

  const handleNext = () => {
    if (currentStep === 1 && (!contactEmail.includes('@') || contactPhone.trim().length < 7)) {
      alert('Enter a valid contact email and telephone number before continuing.');
      return;
    }
    if (currentStep === 2 && (!formData.businessName.trim() || !formData.city.trim() || !formData.state.trim())) {
      alert('Complete your business name, city and state before continuing.');
      return;
    }
    saveDraft(currentStep + 1);
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    saveDraft(currentStep - 1);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleSpeciality = (spec: string) => {
    if (specialities.includes(spec)) {
      setSpecialities(specialities.filter(s => s !== spec));
    } else {
      setSpecialities([...specialities, spec]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || submitted) return;
    if (!formData.businessName.trim() || !formData.city.trim() || !formData.state.trim()) {
      setSubmissionMessage('Complete your business name, city and state before submitting.');
      setCurrentStep(2);
      return;
    }
    setIsSubmitting(true);
    setSubmissionMessage('');
    try {
      const result = await submitBusinessProfile(formData);
      setSubmissionMessage(result.message);
      if (result.ok) {
        setSubmitted(true);
        localStorage.removeItem('businessOnboardingDraft');
      }
    } catch {
      setSubmissionMessage('Unable to submit right now. Your local draft is still available.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <main className="atlas-inner">
        <section className="section compact">
          <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
            <p>Loading...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="atlas-inner">
        <section className="page-hero">
          <div className="container page-hero-inner">
            <div>
              <span className="eyebrow light">Business onboarding</span>
              <h1 className="page-title">
                Create an account to add your business.
              </h1>
              <p>
                You need to be logged in to create and manage a business profile on STYLEATLAS.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <Link className="btn btn-gold" href="/login?redirect=/add-business">Create an account</Link>
                <Link className="btn btn-outline-light" href="/login?redirect=/add-business">Log in</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="atlas-inner">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Add your business</span>
            </div>
            <span className="eyebrow light">Business onboarding</span>
            <h1 className="page-title">
              Show people why your work deserves a closer look.
            </h1>
            <p>
              Build a useful profile with your real services, portfolio, pricing
              signals, process and availability. You can save and continue at
              every stage.
            </p>
          </div>
          <div className="hero-aside-card">
            <strong>Save as you go</strong>
            <span>Save your progress locally, then submit your business for editorial review</span>
          </div>
        </div>
      </section>
      
      <section className="section compact">
        <div className="container onboarding-grid">
          <aside className="onboarding-steps">
            <div className={`onboarding-step ${currentStep > 1 ? 'done' : currentStep === 1 ? 'active' : ''}`}>
              <span className="step-number">{currentStep > 1 ? '✓' : '1'}</span>
              <div>
                <strong>Account</strong>
                <span>Contact and login</span>
              </div>
            </div>
            <div className={`onboarding-step ${currentStep > 2 ? 'done' : currentStep === 2 ? 'active' : ''}`}>
              <span className="step-number">{currentStep > 2 ? '✓' : '2'}</span>
              <div>
                <strong>Business</strong>
                <span>Name and category</span>
              </div>
            </div>
            <div className={`onboarding-step ${currentStep > 3 ? 'done' : currentStep === 3 ? 'active' : ''}`}>
              <span className="step-number">{currentStep > 3 ? '✓' : '3'}</span>
              <div>
                <strong>Portfolio</strong>
                <span>Show your work</span>
              </div>
            </div>
            <div className={`onboarding-step ${currentStep === 4 ? 'active' : ''}`}>
              <span className="step-number">4</span>
              <div>
                <strong>Review</strong>
                <span>Submit for review</span>
              </div>
            </div>
          </aside>
          
          <form className="onboarding-form" onSubmit={handleSubmit}>
            <span className="eyebrow">Step {currentStep} of 4</span>
            {submissionMessage && <p role="status" style={{ color: submitted ? "#365c3c" : "#8b402e", fontSize: "14px" }}>{submissionMessage}</p>}
            {draftSaved && !submitted && <p role="status" style={{ color: "#5b674b", fontSize: "13px" }}>Draft saved on this device. This is not a submission.</p>}
            
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Account Information</h2>
                <p>We will link this business profile to your current logged-in account.</p>
                <div className="form-group">
                  <label htmlFor="contact-email">Contact Email</label>
                  <input id="contact-email" name="contactEmail" className="form-control" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} type="email" placeholder="your@email.com" autoComplete="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone Number (for WhatsApp enquiries)</label>
                  <input id="contact-phone" name="contactPhone" className="form-control" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} type="tel" placeholder="+234..." autoComplete="tel" required />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h2>Tell us what your business does best.</h2>
                <p>These fields become the foundation of your directory profile and search filters.</p>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="businessName">Business name</label>
                    <input id="businessName" className="form-control" name="businessName" value={formData.businessName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Primary category</label>
                    <select id="category" className="form-control" name="category" value={formData.category} onChange={handleChange}>
                      <option>Fashion designer / atelier</option>
                      <option>Fashion brand</option>
                      <option>Fashion school</option>
                      <option>Stylist</option>
                      <option>Photographer</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input id="city" className="form-control" name="city" value={formData.city} onChange={handleChange} required placeholder="e.g. Kano, Enugu..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input id="state" className="form-control" name="state" value={formData.state} onChange={handleChange} required placeholder="e.g. Kano State..." />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="positioning">Short positioning statement</label>
                  <input id="positioning" className="form-control" name="positioning" value={formData.positioning} onChange={handleChange} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">About the business</label>
                  <textarea id="description" className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                
                <div className="form-group">
                  <label>Specialities</label>
                  <div className="choice-grid">
                    {['Luxury modest wear', 'Bespoke occasionwear', 'Bridal couture', 'Menswear', 'Ready-to-wear', 'Fashion education'].map((spec) => (
                      <button 
                        key={spec}
                        type="button" 
                        className={`choice ${specialities.includes(spec) ? 'selected' : ''}`}
                        style={{ 
                          backgroundColor: specialities.includes(spec) ? '#faf5ec' : 'white',
                          borderColor: specialities.includes(spec) ? '#e5c07b' : '#ddd2c4',
                          borderWidth: '2px'
                        }}
                        onClick={() => toggleSpeciality(spec)}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startingPrice">Starting price</label>
                    <input id="startingPrice" className="form-control" name="startingPrice" value={formData.startingPrice} onChange={handleChange} placeholder="₦..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="leadTime">Average lead time</label>
                    <select id="leadTime" className="form-control" name="leadTime" value={formData.leadTime} onChange={handleChange}>
                      <option>1 to 2 weeks</option>
                      <option>3 to 6 weeks</option>
                      <option>6 to 12 weeks</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h2>Prepare your portfolio.</h2>
                <p>Portfolio uploads are not yet connected to your account. Prepare your original work images for when upload becomes available.</p>
                
                <div className="upload-zone" style={{ marginBottom: '24px' }}>
                  <label htmlFor="logo-upload" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '100%', padding: '32px' }}>
                    
                    <svg className="icon" aria-hidden="true" style={{ width: '32px', height: '32px', marginBottom: '12px' }}>
                      <use href="/icons/sprite.svg#icon-camera"></use>
                    </svg>
                    <strong>Prepare your business logo or portrait</strong>
                    <span>Transparent PNG, JPG, SVG or WebP</span>
                  </label>
                </div>

                <div className="upload-zone">
                  <label htmlFor="portfolio-upload" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '100%', padding: '32px' }}>
                    
                    <svg className="icon" aria-hidden="true" style={{ width: '32px', height: '32px', marginBottom: '12px' }}>
                      <use href="/icons/sprite.svg#icon-grid"></use>
                    </svg>
                    <strong>Prepare portfolio images</strong>
                    <span>Select up to 10 high-quality photos when uploads launch</span>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-content">
                <h2>Review your business details.</h2>
                <p>Ensure your details are correct. Submitting creates a pending business profile. It will only become public after approval. Portfolio uploads are not yet available here.</p>
                <div style={{ background: 'var(--ivory-2)', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
                  <h3>{formData.businessName || 'Business Name'}</h3>
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>Location:</strong> {formData.city}, {formData.state}</p>
                  <p><strong>Specialities:</strong> {specialities.length > 0 ? specialities.join(', ') : 'None selected'}</p>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '32px' }}>
              {currentStep > 1 ? (
                <button type="button" className="btn btn-outline-dark" onClick={handlePrev}>Back</button>
              ) : <div></div>}
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-outline-dark" onClick={() => saveDraft(currentStep)}>Save draft</button>
                {currentStep < 4 ? (
                  <button type="button" className="btn btn-gold" onClick={handleNext}>
                    Next Step 
                  </button>
                ) : (
                  <button type="submit" className="btn btn-gold" disabled={isSubmitting || submitted}>
                    {isSubmitting ? "Submitting..." : submitted ? "Submitted for review" : "Submit business for review"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
