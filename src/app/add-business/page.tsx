'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddBusinessPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [specialities, setSpecialities] = useState<string[]>([]);
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

  // Draft saving
  useEffect(() => {
    const saved = localStorage.getItem('businessOnboardingDraft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.specialities) setSpecialities(parsed.specialities);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      } catch (e) {
        // ignore parsing errors
      }
    }
  }, []);

  const saveDraft = (step: number) => {
    localStorage.setItem('businessOnboardingDraft', JSON.stringify({
      formData,
      specialities,
      currentStep: step
    }));
  };

  const handleNext = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('businessOnboardingDraft');
    alert('Business draft submitted for review!');
    router.push('/dashboard');
  };

  return (
    <main>
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
            <strong>15 min</strong>
            <span>typical time to create the first complete profile draft</span>
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
                <span>Publish or verify</span>
              </div>
            </div>
          </aside>
          
          <form className="onboarding-form" onSubmit={handleSubmit}>
            <span className="eyebrow">Step {currentStep} of 4</span>
            
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Account Information</h2>
                <p>We will link this business profile to your current logged-in account.</p>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input className="form-control" type="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label>Phone Number (for WhatsApp enquiries)</label>
                  <input className="form-control" type="tel" placeholder="+234..." required />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h2>Tell us what your business does best.</h2>
                <p>These fields become the foundation of your directory profile and search filters.</p>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Business name</label>
                    <input className="form-control" name="businessName" value={formData.businessName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Primary category</label>
                    <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
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
                    <label>City</label>
                    <input className="form-control" name="city" value={formData.city} onChange={handleChange} required placeholder="e.g. Kano, Enugu..." />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input className="form-control" name="state" value={formData.state} onChange={handleChange} required placeholder="e.g. Kano State..." />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Short positioning statement</label>
                  <input className="form-control" name="positioning" value={formData.positioning} onChange={handleChange} />
                </div>
                
                <div className="form-group">
                  <label>About the business</label>
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
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
                    <label>Starting price</label>
                    <input className="form-control" name="startingPrice" value={formData.startingPrice} onChange={handleChange} placeholder="₦..." />
                  </div>
                  <div className="form-group">
                    <label>Average lead time</label>
                    <select className="form-control" name="leadTime" value={formData.leadTime} onChange={handleChange}>
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
                <h2>Show your work.</h2>
                <p>Upload a profile logo and images for your portfolio.</p>
                
                <div className="upload-zone" style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '100%', padding: '32px' }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} />
                    <svg className="icon" aria-hidden="true" style={{ width: '32px', height: '32px', marginBottom: '12px' }}>
                      <use href="/icons/sprite.svg#icon-camera"></use>
                    </svg>
                    <strong>Add your business logo or portrait</strong>
                    <span>Transparent PNG, JPG, SVG or WebP</span>
                  </label>
                </div>

                <div className="upload-zone">
                  <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '100%', padding: '32px' }}>
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }} />
                    <svg className="icon" aria-hidden="true" style={{ width: '32px', height: '32px', marginBottom: '12px' }}>
                      <use href="/icons/sprite.svg#icon-grid"></use>
                    </svg>
                    <strong>Add portfolio images</strong>
                    <span>Upload up to 10 high-quality photos</span>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-content">
                <h2>Review and publish.</h2>
                <p>Ensure your details are correct. You can edit these later from your dashboard.</p>
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
                  <button type="submit" className="btn btn-gold">
                    Submit Profile
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
