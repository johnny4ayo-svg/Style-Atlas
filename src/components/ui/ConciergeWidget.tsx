'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConciergeWidget() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const styles = [
    'Traditional bridal',
    'Civil ceremony',
    'Red carpet',
    'Corporate wardrobe',
    'Menswear occasion',
    'Campaign styling'
  ];

  const budgets = [
    'Under ₦150k',
    '₦150k - ₦500k',
    '₦500k - ₦1M',
    '₦1M+',
    'Undecided'
  ];

  const handleNext = () => {
    if (step === 1 && selectedStyle) {
      setStep(2);
    } else if (step === 2 && selectedBudget) {
      setIsSubmitting(true);
      // Simulate loading for better UX
      setTimeout(() => {
        router.push(`/directory?style=${encodeURIComponent(selectedStyle.toLowerCase())}&budget=${encodeURIComponent(selectedBudget)}`);
      }, 800);
    }
  };

  if (isSubmitting) {
    return (
      <div className="concierge-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--gold)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        <h3 style={{ marginTop: '20px' }}>Finding your perfect match...</h3>
        <p style={{ color: 'var(--text-light)' }}>Matching your style and budget with verified designers.</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="concierge-panel">
      <div className="concierge-progress">
        <span style={{ width: step === 1 ? '50%' : '100%', transition: 'width 0.3s ease' }}></span>
      </div>
      <span className="kicker" style={{ marginBottom: '8px', display: 'block' }}>Step {step} of 2</span>
      
      {step === 1 ? (
        <>
          <h3>What kind of look are you planning?</h3>
          <div className="choice-grid">
            {styles.map((choice) => (
              <button 
                key={choice}
                type="button"
                onClick={() => setSelectedStyle(choice)}
                className={`choice ${selectedStyle === choice ? 'selected' : ''}`}
              >
                {choice}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3>What is your estimated budget?</h3>
          <div className="choice-grid">
            {budgets.map((choice) => (
              <button 
                key={choice}
                type="button"
                onClick={() => setSelectedBudget(choice)}
                className={`choice ${selectedBudget === choice ? 'selected' : ''}`}
              >
                {choice}
              </button>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {step === 2 ? (
          <button type="button" className="text-link" style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }} onClick={() => setStep(1)}>
            &larr; Back
          </button>
        ) : (
          <button type="button" className="text-link" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
            Skip
          </button>
        )}
        
        <button 
          type="button"
          className="btn btn-gold" 
          onClick={handleNext}
          disabled={step === 1 ? !selectedStyle : !selectedBudget}
          style={{ opacity: (step === 1 ? !selectedStyle : !selectedBudget) ? 0.5 : 1 }}
        >
          {step === 1 ? 'Continue' : 'Find Designers'}
        </button>
      </div>
    </div>
  );
}
