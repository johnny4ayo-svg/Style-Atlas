'use client'

import Link from "next/link";
import { useState } from "react";

export default function AddBusinessPage() {
  const [specialities, setSpecialities] = useState<string[]>(['Luxury modest wear', 'Bespoke occasionwear']);

  const toggleSpeciality = (spec: string) => {
    if (specialities.includes(spec)) {
      setSpecialities(specialities.filter(s => s !== spec));
    } else {
      setSpecialities([...specialities, spec]);
    }
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
            <div className="onboarding-step done">
              <span className="step-number">✓</span>
              <div>
                <strong>Account</strong>
                <span>Contact and login</span>
              </div>
            </div>
            <div className="onboarding-step active">
              <span className="step-number">2</span>
              <div>
                <strong>Business</strong>
                <span>Name and category</span>
              </div>
            </div>
            <div className="onboarding-step">
              <span className="step-number">3</span>
              <div>
                <strong>Portfolio</strong>
                <span>Show your work</span>
              </div>
            </div>
            <div className="onboarding-step">
              <span className="step-number">4</span>
              <div>
                <strong>Review</strong>
                <span>Publish or verify</span>
              </div>
            </div>
          </aside>
          
          <form className="onboarding-form">
            <span className="eyebrow">Step 2 of 4</span>
            <h2>Tell us what your business does best.</h2>
            <p>These fields become the foundation of your directory profile and search filters.</p>
            
            <div className="form-row">
              <div className="form-group">
                <label>Business name</label>
                <input className="form-control" defaultValue="Amina Danjuma Atelier" required />
              </div>
              <div className="form-group">
                <label>Primary category</label>
                <select className="form-control">
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
                <input className="form-control" name="city" list="cities" defaultValue="Abuja" required placeholder="e.g. Kano, Enugu..." />
                <datalist id="cities">
                  <option value="Lagos" />
                  <option value="Abuja" />
                  <option value="Kano" />
                  <option value="Ibadan" />
                  <option value="Port Harcourt" />
                  <option value="Benin City" />
                  <option value="Enugu" />
                  <option value="Jos" />
                  <option value="Ilorin" />
                  <option value="Owerri" />
                  <option value="Calabar" />
                  <option value="Uyo" />
                  <option value="Aba" />
                  <option value="Kaduna" />
                  <option value="Onitsha" />
                  <option value="Asaba" />
                  <option value="Warri" />
                </datalist>
              </div>
              <div className="form-group">
                <label>State</label>
                <input className="form-control" name="state" list="states" defaultValue="Federal Capital Territory" required placeholder="e.g. Kano State, Enugu State..." />
                <datalist id="states">
                  <option value="Federal Capital Territory" />
                  <option value="Lagos" />
                  <option value="Rivers" />
                  <option value="Kano" />
                  <option value="Oyo" />
                  <option value="Edo" />
                  <option value="Enugu" />
                  <option value="Plateau" />
                  <option value="Kwara" />
                  <option value="Imo" />
                  <option value="Cross River" />
                  <option value="Akwa Ibom" />
                  <option value="Abia" />
                  <option value="Kaduna" />
                  <option value="Anambra" />
                  <option value="Delta" />
                </datalist>
              </div>
            </div>
            
            <div className="form-group">
              <label>Short positioning statement</label>
              <input className="form-control" defaultValue="Luxury modest wear, bespoke occasionwear and refined contemporary tailoring." />
            </div>
            
            <div className="form-group">
              <label>About the business</label>
              <textarea className="form-control" defaultValue="An Abuja-based atelier creating clean, confident occasionwear through thoughtful coverage, precise tailoring and detailed finishing."></textarea>
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
                      borderWidth: '2px' // Make it really obvious
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
                <input className="form-control" defaultValue="₦180,000" />
              </div>
              <div className="form-group">
                <label>Average lead time</label>
                <select className="form-control">
                  <option>3 to 6 weeks</option>
                  <option>1 to 2 weeks</option>
                  <option>6 to 12 weeks</option>
                </select>
              </div>
            </div>
            
            <div className="upload-zone">
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '100%', padding: '32px' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} />
                <svg className="icon" aria-hidden="true" style={{ width: '32px', height: '32px', marginBottom: '12px' }}>
                  <use href="/icons/sprite.svg#icon-camera"></use>
                </svg>
                <strong>Add your business logo or portrait</strong>
                <span>Transparent PNG, JPG, SVG or WebP</span>
              </label>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button type="button" className="btn btn-outline-dark">Save draft</button>
              <Link href="/dashboard" className="btn btn-gold" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                Save and continue 
                <svg className="icon" aria-hidden="true" style={{ marginLeft: '8px' }}>
                  <use href="/icons/sprite.svg#icon-arrow"></use>
                </svg>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
