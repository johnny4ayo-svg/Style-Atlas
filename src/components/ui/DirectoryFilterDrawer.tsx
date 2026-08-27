"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DirectoryFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      setIsOpen(false);
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  return (
    <>
      <div className="results-controls">
        <button 
          type="button" 
          className="btn btn-outline-dark btn-sm mobile-filter-btn" 
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="directory-filter-drawer"
        >
          <svg className="icon" aria-hidden="true"><use href="/icons/sprite.svg#icon-filter"></use></svg>
          Filters
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="sort-results" className="sr-only" style={{ display: 'none' }}>Sort results</label>
          <select id="sort-results" className="result-select">
            <option>Sort: Recommended</option>
            <option>Highest rated</option>
            <option>Recently added</option>
            <option>Price: low to high</option>
          </select>
        </div>
      </div>

      <dialog 
        ref={dialogRef}
        id="directory-filter-drawer"
        className="filter-drawer-modal" 
        style={{
          border: 'none',
          padding: 0,
          margin: 0,
          maxWidth: '100%',
          maxHeight: '100%',
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent'
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setIsOpen(false);
        }}
      >
        <aside 
          className="filter-panel" 
          style={{ 
            background: '#fff', 
            height: '100%', 
            width: '100%', 
            maxWidth: '350px', 
            marginLeft: 'auto',
            padding: '24px',
            overflowY: 'auto'
          }}
        >
          <div className="filter-head">
            <h3>Refine</h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/directory" className="filter-reset">Clear all</Link>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                aria-label="Close filters"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px' }}
              >
                &times;
              </button>
            </div>
          </div>

          <fieldset className="filter-group" style={{ border: 'none', padding: 0, margin: '0 0 24px 0' }}>
            <legend><h4 style={{ margin: 0, paddingBottom: '16px' }}>Category</h4></legend>
            <label className="filter-option" htmlFor="cat-designers"><span><input type="checkbox" id="cat-designers" name="category" value="designers" defaultChecked /> Fashion designers</span></label>
            <label className="filter-option" htmlFor="cat-bridal"><span><input type="checkbox" id="cat-bridal" name="category" value="bridal" /> Bridal ateliers</span></label>
            <label className="filter-option" htmlFor="cat-brands"><span><input type="checkbox" id="cat-brands" name="category" value="brands" /> Fashion brands</span></label>
            <label className="filter-option" htmlFor="cat-tailors"><span><input type="checkbox" id="cat-tailors" name="category" value="tailors" /> Bespoke tailors</span></label>
          </fieldset>

          <div className="filter-group" style={{ marginBottom: '24px' }}>
            <label htmlFor="filter-location"><h4 style={{ margin: 0, paddingBottom: '16px' }}>Location</h4></label>
            <select id="filter-location" className="filter-select" style={{ width: '100%', padding: '10px' }}>
              <option>All Nigerian cities</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Benin City</option>
              <option>Kano</option>
            </select>
          </div>

          <fieldset className="filter-group" style={{ border: 'none', padding: 0, margin: '0 0 24px 0' }}>
            <legend><h4 style={{ margin: 0, paddingBottom: '16px' }}>Speciality</h4></legend>
            <label className="filter-option" htmlFor="spec-bridal"><span><input type="checkbox" id="spec-bridal" name="speciality" value="bridal" /> Bridal couture</span></label>
            <label className="filter-option" htmlFor="spec-menswear"><span><input type="checkbox" id="spec-menswear" name="speciality" value="menswear" /> Menswear</span></label>
            <label className="filter-option" htmlFor="spec-rtw"><span><input type="checkbox" id="spec-rtw" name="speciality" value="rtw" /> Luxury ready-to-wear</span></label>
            <label className="filter-option" htmlFor="spec-modest"><span><input type="checkbox" id="spec-modest" name="speciality" value="modest" /> Modest fashion</span></label>
            <label className="filter-option" htmlFor="spec-kids"><span><input type="checkbox" id="spec-kids" name="speciality" value="kids" /> Children&apos;s occasionwear</span></label>
          </fieldset>

          <button type="button" className="btn btn-dark" style={{ width: '100%' }} onClick={() => setIsOpen(false)}>Apply filters</button>
        </aside>
      </dialog>
      <style dangerouslySetInnerHTML={{ __html: `
        .filter-drawer-modal::backdrop { background: rgba(0,0,0,0.5); }
        @media (min-width: 768px) {
          .filter-drawer-modal { display: block !important; position: static !important; width: auto !important; height: auto !important; }
          .filter-drawer-modal::backdrop { display: none !important; }
          .filter-drawer-modal aside.filter-panel { max-width: 100% !important; padding: 0 !important; }
          .filter-drawer-modal .filter-head button { display: none !important; }
        }
      ` }} />
    </>
  );
}
