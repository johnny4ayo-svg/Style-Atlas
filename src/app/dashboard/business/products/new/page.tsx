'use client'

import Link from "next/link";
import { createProduct } from "@/app/actions/business-actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-gold" type="submit" disabled={pending} style={{ width: '100%', padding: '16px' }}>
      {pending ? 'Saving...' : 'Publish Product'}
    </button>
  );
}

export default function NewProductPage() {
  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Marketplace</span>
          <h1>Add New Product</h1>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-outline-dark" href="/dashboard/business/products">Cancel</Link>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ gridColumn: '1 / -1', maxWidth: '600px' }}>
          <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
            
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" name="name" required placeholder="e.g., Emerald Ankara Statement Dress" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" required rows={4} placeholder="Describe the material, cut, and fit..." style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Base Price (₦)</label>
                <input type="number" name="base_price" required placeholder="e.g., 185000" min="0" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              
              <div className="form-group">
                <label>Inventory Count</label>
                <input type="number" name="inventory" required defaultValue="10" min="0" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Default Size</label>
                <input type="text" name="size" required placeholder="e.g., Sizes 8 to 18" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              
              <div className="form-group">
                <label>Primary Color</label>
                <input type="text" name="color" required placeholder="e.g., Emerald" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input type="file" name="image_file" accept="image/*" required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>Upload a high quality image of the product.</span>
            </div>

            <SubmitButton />
          </form>
        </article>
      </section>
    </>
  );
}
