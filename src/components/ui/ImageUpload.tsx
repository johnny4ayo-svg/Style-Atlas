'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type ImageUploadProps = {
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  folder?: string;
};

export default function ImageUpload({ currentImageUrl, onUploadSuccess, folder = 'uploads' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    // Create a local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      onUploadSuccess(data.publicUrl);

    } catch (err: unknown) {
      console.error('Error uploading image:', err);
      setError((err as Error).message || 'Failed to upload image');
      setPreviewUrl(currentImageUrl || null); // revert on error
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div 
        style={{ 
          width: '100%', 
          height: '200px', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          position: 'relative'
        }}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ color: 'var(--gray-500)' }}>No image uploaded</span>
        )}
        
        {isUploading && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Uploading...
          </div>
        )}
      </div>

      <div>
        <label className="btn btn-outline-dark" style={{ cursor: 'pointer', display: 'inline-block' }}>
          {isUploading ? 'Uploading...' : 'Choose Image'}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            disabled={isUploading}
            style={{ display: 'none' }} 
          />
        </label>
        {error && <p style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>{error}</p>}
      </div>
    </div>
  );
}
