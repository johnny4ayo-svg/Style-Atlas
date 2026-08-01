"use client";

import Link from "next/link";
import { useState } from "react";

export default function Profile() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationType, setConsultationType] = useState('in-person');

  const closeModals = () => {
    setIsQuoteOpen(false);
    setIsConsultationOpen(false);
  };

  return (
    <main>
      <section className="profile-hero">
        <div className="profile-cover">
          <img src="/images/designer-blue.jpg" alt="Amina Danjuma luxury Nigerian fashion portrait" />
        </div>
        <div className="container profile-summary">
          <img className="profile-avatar" src="/images/designer-blue.jpg" alt="Amina Danjuma profile portrait" />
          <div className="profile-title">
            <div className="eyebrow light">Verified designer profile</div>
            <h1>
              Amina Danjuma 
              <svg className="icon" style={{ display: 'inline', color: '#c69a52', width: '24px', height: '24px' }}>
                <use href="/icons/sprite.svg#icon-verified"></use>
              </svg>
            </h1>
            <p>Luxury modest wear, bespoke occasionwear and refined contemporary tailoring.</p>
            <div className="profile-facts">
              <span className="profile-fact"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Abuja, FCT</span>
              <span className="profile-fact"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.9 from 128 reviews</span>
              <span className="profile-fact">Responds within 6 hours</span>
              <span className="profile-fact">From ₦180,000</span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="icon-btn save-btn" style={{ position: 'static' }} aria-label="Save profile"><svg className="icon"><use href="/icons/sprite.svg#icon-heart"></use></svg></button>
            <button className="btn btn-outline-light" onClick={() => setIsQuoteOpen(true)}>Request a quote</button>
            <button className="btn btn-gold" onClick={() => setIsConsultationOpen(true)}>Book consultation</button>
          </div>
        </div>
      </section>
      
      <nav className="profile-nav">
        <div className="container profile-nav-inner">
          <a className="active" href="#about">Overview</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing guide</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQs</a>
        </div>
      </nav>

      <section className="section compact">
        <div className="container profile-layout">
          <div className="profile-main">
            <article className="content-card" id="about">
              <span className="eyebrow">The atelier</span>
              <h2>Clothes with presence, restraint and a clear sense of self.</h2>
              <p>Amina Danjuma leads an Abuja-based atelier known for clean silhouettes, thoughtful coverage and detailed finishing. The studio works with private clients on wedding guest looks, civil ceremonies, milestone celebrations and wardrobe commissions.</p>
              <p>The process begins with a paid consultation, followed by fabric direction, sketch approval, fittings and final collection. Remote clients can complete the early stages online, while final fittings are recommended in Abuja.</p>
              <div className="tag-row" style={{ marginTop: '20px' }}>
                <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>Luxury modest wear</span>
                <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>Bespoke tailoring</span>
                <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>Civil bridal</span>
                <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>Occasionwear</span>
              </div>
            </article>

            <article className="content-card" id="portfolio">
              <div className="section-head" style={{ marginBottom: '18px' }}>
                <div><span className="eyebrow">Selected work</span><h2>Portfolio</h2></div>
                <button className="btn btn-outline-dark btn-sm">View 42 projects</button>
              </div>
              <div className="portfolio-grid">
                <img src="/images/designer-blue.jpg" alt="Blue modest Nigerian couture" />
                <img src="/images/bridal-black.jpg" alt="Black Nigerian bridal attire" />
                <img src="/images/fashion-couple.jpg" alt="Nigerian ceremonial fashion" />
                <img src="/images/designer-green.jpg" alt="Green Ankara occasionwear" />
              </div>
            </article>

            <article className="content-card" id="services">
              <span className="eyebrow">What the studio offers</span>
              <h2>Services</h2>
              <div className="service-list">
                <div className="service-item">
                  <div><strong>Bespoke occasionwear</strong><p>Consultation, sketch, fabric direction, fittings and finishing for one custom look.</p></div>
                  <span>From ₦180k</span>
                </div>
                <div className="service-item">
                  <div><strong>Civil ceremony bridal</strong><p>Contemporary bridal looks for registry weddings and intimate celebrations.</p></div>
                  <span>From ₦320k</span>
                </div>
                <div className="service-item">
                  <div><strong>Wardrobe commission</strong><p>A coordinated set of four to eight pieces for work, public appearances or travel.</p></div>
                  <span>Custom quote</span>
                </div>
                <div className="service-item">
                  <div><strong>Remote design consultation</strong><p>Video consultation, measurement guidance and delivery planning for clients outside Abuja.</p></div>
                  <span>₦35k</span>
                </div>
              </div>
            </article>

            <article className="content-card" id="pricing">
              <span className="eyebrow">Before you enquire</span>
              <h2>Pricing and timelines</h2>
              <div className="journey-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <h3>Typical investment</h3>
                  <p>Most bespoke occasionwear commissions fall between ₦180,000 and ₦650,000 depending on fabric, handwork and construction.</p>
                </div>
                <div>
                  <h3>Typical lead time</h3>
                  <p>Allow three to six weeks. Bridal and wardrobe commissions may require eight to twelve weeks.</p>
                </div>
              </div>
            </article>

            <article className="content-card" id="reviews">
              <div className="section-head" style={{ marginBottom: '18px' }}>
                <div><span className="eyebrow">Verified feedback</span><h2>Client reviews</h2></div>
                <div className="rating" style={{ fontSize: '14px' }}><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>4.9 / 5</div>
              </div>
              <div className="review-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <article className="review-card">
                  <div className="review-person">
                    <img className="review-avatar" src="/images/designer-green.jpg" alt="Client" />
                    <div><strong>Chinwe M.</strong><span>Verified occasionwear client</span></div>
                  </div>
                  <div className="review-stars">★★★★★</div>
                  <blockquote>“Every fitting felt organised. I knew what was happening, what I was paying for and when the dress would be ready.”</blockquote>
                  <div className="review-context">Commission completed in June 2026</div>
                </article>
                <article className="review-card">
                  <div className="review-person">
                    <img className="review-avatar" src="/images/designer-bridal.jpg" alt="Client" />
                    <div><strong>Maryam T.</strong><span>Verified civil bridal client</span></div>
                  </div>
                  <div className="review-stars">★★★★★</div>
                  <blockquote>“The dress was modest without feeling heavy. It looked modern, clean and completely mine.”</blockquote>
                  <div className="review-context">Commission completed in May 2026</div>
                </article>
              </div>
            </article>

            <article className="content-card" id="faq">
              <span className="eyebrow">Useful answers</span>
              <h2>Frequently asked questions</h2>
              <div className="service-list">
                <div className="service-item">
                  <div><strong>Do you work with clients outside Abuja?</strong><p>Yes. The studio offers remote consultations and measurement guidance, though final fittings in Abuja are preferred for complex work.</p></div>
                </div>
                <div className="service-item">
                  <div><strong>Can I bring my own fabric?</strong><p>Yes, after the studio confirms that the fabric is suitable for the approved design and construction.</p></div>
                </div>
                <div className="service-item">
                  <div><strong>Is a deposit required?</strong><p>Yes. Production begins after design approval and the first payment milestone.</p></div>
                </div>
              </div>
            </article>
          </div>

          <aside className="profile-side">
            <div className="contact-card">
              <span className="eyebrow light">Start a conversation</span>
              <h3>Share the occasion, date and budget.</h3>
              <p>A useful first message helps the atelier respond with clearer timing and next steps.</p>
              <button className="btn btn-gold" onClick={() => setIsQuoteOpen(true)}>Request a quote</button>
              <button className="btn btn-outline-light" onClick={() => setIsConsultationOpen(true)}>Book paid consultation</button>
              <div className="contact-meta">
                <div className="contact-line"><svg className="icon"><use href="/icons/sprite.svg#icon-message"></use></svg>Usually replies within 6 hours</div>
                <div className="contact-line"><svg className="icon"><use href="/icons/sprite.svg#icon-calendar"></use></svg>Next consultation: August 4</div>
                <div className="contact-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>Wuse 2, Abuja</div>
              </div>
            </div>
            <div className="availability">
              <h4>Current availability</h4>
              <div className="available-badge"><span className="available-dot"></span>Accepting September commissions</div>
              <p className="muted" style={{ fontSize: '9px' }}>Availability is maintained by the business and may change after consultation.</p>
            </div>
          </aside>
        </div>
      </section>

      <div className="mobile-sticky-actions">
        <button className="btn btn-outline-dark" onClick={() => setIsQuoteOpen(true)}>Request quote</button>
        <button className="btn btn-gold" onClick={() => setIsConsultationOpen(true)}>Book consultation</button>
      </div>

      {isQuoteOpen && (
        <div className="modal-backdrop open">
          <form className="modal" onSubmit={(e) => { e.preventDefault(); alert('Your quote request has been saved as a demo enquiry'); closeModals(); }}>
            <button type="button" className="modal-close" onClick={closeModals}><svg className="icon"><use href="/icons/sprite.svg#icon-close"></use></svg></button>
            <span className="eyebrow">Request a quote</span>
            <h2>Tell Amina what you're planning.</h2>
            <p>This UI is ready to connect to a full enquiry workflow, messaging table and email notification.</p>
            <div className="form-row">
              <div className="form-group"><label>Your name</label><input className="form-control" required /></div>
              <div className="form-group"><label>Event date</label><input className="form-control" type="date" required /></div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Service</label>
                <select className="form-control"><option>Bespoke occasionwear</option><option>Civil bridal</option><option>Wardrobe commission</option></select>
              </div>
              <div className="form-group">
                <label>Budget</label>
                <select className="form-control"><option>₦180k to ₦300k</option><option>₦300k to ₦600k</option><option>₦600k+</option></select>
              </div>
            </div>
            <div className="form-group">
              <label>Project details</label>
              <textarea className="form-control" required placeholder="Occasion, colours, size, city and any timing details..."></textarea>
            </div>
            <button className="btn btn-gold" style={{ width: '100%' }}>Send quote request</button>
          </form>
        </div>
      )}

      {isConsultationOpen && (
        <div className="modal-backdrop open">
          <form className="modal" onSubmit={(e) => { e.preventDefault(); alert('Consultation slot selected in demo mode'); closeModals(); }}>
            <button type="button" className="modal-close" onClick={closeModals}><svg className="icon"><use href="/icons/sprite.svg#icon-close"></use></svg></button>
            <span className="eyebrow">Paid consultation</span>
            <h2>Choose how you'd like to meet.</h2>
            <p>The production version connects this step to availability, Paystack checkout and calendar confirmation.</p>
            <div className="choice-grid">
              <button type="button" className={`choice ${consultationType === 'in-person' ? 'selected' : ''}`} onClick={() => setConsultationType('in-person')}>In-person · Abuja · ₦35,000</button>
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
    </main>
  );
}
