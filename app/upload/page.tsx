'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UploadPage() {
  const [title, setTitle] = useState("My Best JCB Dig of 2026");
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-black mb-4">Upload Your JCB Content</h1>
      <p className="text-zinc-400 mb-10">Share your best work and start earning from views.</p>

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
        {!uploaded ? (
          <>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 mb-6" 
            />
            
            <div className="border-2 border-dashed border-zinc-600 rounded-3xl p-12 text-center mb-8">
              <div className="text-6xl mb-4">📤</div>
              <div className="font-bold text-xl">Drop your video here</div>
              <p className="text-sm text-zinc-400">MP4 • Max 2GB</p>
            </div>

            <button onClick={handleUpload} className="w-full py-4 bg-orange-500 hover:bg-orange-600 font-extrabold text-lg rounded-2xl">
              UPLOAD &amp; PUBLISH
            </button>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <div className="text-2xl font-bold">Upload Successful!</div>
            <p className="text-zinc-400 mt-2">Your video is now live on Peak Male Content.</p>
          </div>
        )}
      </div>
    </div>
  );
}
