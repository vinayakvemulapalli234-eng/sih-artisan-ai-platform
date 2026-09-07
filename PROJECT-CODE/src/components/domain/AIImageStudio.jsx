// src/components/domain/AIImageStudio.jsx
//
// AI Image Enhancer & Studio — Group 1 deliverable
// Flow: Upload/Camera -> Enhance (loading) -> Before/After Compare -> Accept/Retake
//
// Uses only existing design-system primitives (Button, Card, Modal) and Tailwind tokens
// from COMPONENT_GUIDE.md — no ad-hoc colors/spacing.
//
// BACKEND INTEGRATION POINT (for Group 2 / Person 3):
// Replace `simulateEnhancement()` below with a real API call, e.g.:
//   const res = await fetch('/api/v1/images/enhance', { method: 'POST', body: formData });
//   const { enhancedImageUrl } = await res.json();
// The real backend (OpenCV + RemBG + Pillow, per team stack) does background removal +
// lighting correction + e-commerce crop. This component already has the exact hook point
// marked below with // TODO: integrate with backend.

import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Sparkles, RotateCcw, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/primitives';
import { Card } from '@/components/primitives';
import { Modal } from '@/components/primitives';
import { removeBackground } from '@imgly/background-removal';

// Real AI background removal + lighting correction.
// removeBackground() downloads a small ONNX model on first use (cached after),
// runs fully in-browser, and returns a transparent-background PNG blob.
async function enhanceImage(imageFile, onProgress) {
  const bgRemovedBlob = await removeBackground(imageFile, {
    progress: (key, current, total) => {
      const pct = total ? Math.round((current / total) * 100) : 0;
      onProgress?.(key.includes('fetch') ? `Downloading AI model... ${pct}%` : `Removing background... ${pct}%`);
    },
  });

  // Composite the cutout onto a clean white e-commerce background + lighting correction
  const cutoutUrl = URL.createObjectURL(bgRemovedBlob);
  const originalUrl = URL.createObjectURL(imageFile);

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'brightness(1.08) contrast(1.06) saturate(1.12)';
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const enhancedUrl = URL.createObjectURL(blob);
        resolve({ originalUrl, enhancedUrl });
      }, 'image/jpeg', 0.92);
    };
    img.onerror = reject;
    img.src = cutoutUrl;
  });
}

const STEPS = {
  CAPTURE: 'capture',
  PROCESSING: 'processing',
  COMPARE: 'compare',
  ERROR: 'error',
};

export default function AIImageStudio({ isOpen, onClose, onAccept }) {
  const [step, setStep] = useState(STEPS.CAPTURE);
  const [rawFile, setRawFile] = useState(null);
  const [result, setResult] = useState(null); // { originalUrl, enhancedUrl }
  const [sliderPos, setSliderPos] = useState(50);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const resetStudio = useCallback(() => {
    setStep(STEPS.CAPTURE);
    setRawFile(null);
    setResult(null);
    setSliderPos(50);
    setErrorMsg('');
  }, []);

  const [progressText, setProgressText] = useState('Enhancing your photo...');

  const handleFileSelected = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMsg('Please choose a valid photo (JPG or PNG).');
      setStep(STEPS.ERROR);
      return;
    }
    setRawFile(file);
    setStep(STEPS.PROCESSING);
    setProgressText('Enhancing your photo...');
    try {
      const enhancedResult = await enhanceImage(file, setProgressText);
      setResult(enhancedResult);
      setStep(STEPS.COMPARE);
    } catch (err) {
      console.error(err);
      setErrorMsg('AI enhancement failed. Check your internet connection and try again.');
      setStep(STEPS.ERROR);
    }
  }, []);

  const handleRetake = () => {
    resetStudio();
  };

  const handleAccept = () => {
    if (onAccept && result) {
      onAccept({ enhancedUrl: result.enhancedUrl, originalFile: rawFile });
    }
    resetStudio();
    onClose();
  };

  const handleClose = () => {
    resetStudio();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="AI Image Studio"
    >
      <div className="flex flex-col items-center gap-6 py-2">

        {/* STEP 1: Capture / Upload — big, simple, low-literacy friendly */}
        {step === STEPS.CAPTURE && (
          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-text-secondary text-base text-center">
              Take a clear photo of your product, or choose one from your gallery.
            </p>

            <button
              onClick={() => cameraInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-lg border-2 border-dashed border-primary bg-primary/5 hover:bg-primary/10 transition-colors focus-ring"
            >
              <Camera className="w-12 h-12 text-primary" />
              <span className="text-lg font-semibold text-text-primary">Take Photo</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-lg border border-border bg-surface hover:bg-neutral-100 transition-colors focus-ring"
            >
              <Upload className="w-5 h-5 text-secondary" />
              <span className="text-base font-medium text-text-primary">Upload from Gallery</span>
            </button>

            {/* Hidden inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFileSelected(e.target.files?.[0])}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelected(e.target.files?.[0])}
            />
          </div>
        )}

        {/* STEP 2: Processing / loading state */}
        {step === STEPS.PROCESSING && (
          <div className="w-full flex flex-col items-center gap-4 py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-lg font-semibold text-text-primary">Enhancing your photo...</p>
            <p className="text-sm text-text-secondary text-center">{progressText}</p>
          </div>
        )}

        {/* STEP 3: Before / After comparison */}
        {step === STEPS.COMPARE && result && (
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full flex items-center gap-2 text-accent text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Enhancement complete</span>
            </div>

            {/* Slider comparison */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border select-none">
              <img
                src={result.originalUrl}
                alt="Original product photo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={result.enhancedUrl}
                  alt="Enhanced product photo"
                  className="w-full h-full object-cover"
                  style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-x-0 bottom-3 w-[90%] mx-[5%] accent-primary"
                aria-label="Compare original and enhanced photo"
              />
              <span className="absolute top-2 left-2 text-xs font-semibold bg-surface/90 text-text-primary px-2 py-1 rounded-sm">
                Original
              </span>
              <span className="absolute top-2 right-2 text-xs font-semibold bg-primary/90 text-white px-2 py-1 rounded-sm">
                Enhanced
              </span>
            </div>

            <div className="w-full flex gap-3">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<RotateCcw className="w-4 h-4" />}
                onClick={handleRetake}
                className="flex-1"
              >
                Retake
              </Button>
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Check className="w-4 h-4" />}
                onClick={handleAccept}
                className="flex-1"
              >
                Use This Photo
              </Button>
            </div>
          </div>
        )}

        {/* Error state */}
        {step === STEPS.ERROR && (
          <div className="w-full flex flex-col items-center gap-4 py-8">
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
              <X className="w-6 h-6 text-error" />
            </div>
            <p className="text-base font-semibold text-text-primary text-center">{errorMsg}</p>
            <Button variant="primary" size="md" onClick={resetStudio}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
