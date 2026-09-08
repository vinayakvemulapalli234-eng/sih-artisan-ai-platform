import React, { useState } from 'react';
import { Camera, Mic, Volume2, Sparkles, ChevronRight, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import { enhanceProductImage } from '../../services/imageEnhancerService';
import { PriceEstimatorView } from './PriceEstimatorView';
import { ProductListedSuccess } from './ProductListedSuccess';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAppData } from '../../context/AppDataContext';

export const AddProductStepper = ({ onComplete, onCancel }) => {
  const { speakPrompt, startListening, isListening } = useVoice();
  const { t } = useLanguage();
  const { addProduct } = useAppData();

  const [step, setStep] = useState(1); // 1: Photo, 2: Details, 3: Price, 4: Done

  // Form State
  const [photoSrc, setPhotoSrc] = useState('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80');
  const [enhancedPhoto, setEnhancedPhoto] = useState(null);
  const [showEnhancementComparison, setShowEnhancementComparison] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const [guidedStepIndex, setGuidedStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: 'Kondapalli Wooden Toy Set',
    craft: 'Wooden Toys / Kondapalli',
    material: 'Tella Poniki Softwood & Natural Dyes',
    materialCost: 250,
    workersCount: 1,
    workingDays: 2,
    labourCost: 400,
    state: 'Andhra Pradesh',
    price: 650
  });

  const [createdProduct, setCreatedProduct] = useState(null);

  const guidedQuestions = [
    { key: 'material', question: "What material did you use?", defaultVal: "Tella Poniki Softwood & Natural Dyes" },
    { key: 'materialCost', question: "How much did the material cost? (in ₹)", defaultVal: 250 },
    { key: 'workersCount', question: "How many workers helped you?", defaultVal: 1 },
    { key: 'workingDays', question: "How many days did you work?", defaultVal: 2 },
    { key: 'labourCost', question: "What is your estimated labour cost? (in ₹)", defaultVal: 400 }
  ];

  // Photo Upload & AI Enhancement
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const originalUrl = evt.target.result;
      setPhotoSrc(originalUrl);
      setIsEnhancing(true);
      speakPrompt("AI is enhancing your photo lighting and background shadow...");
      
      const enhancedUrl = await enhanceProductImage(originalUrl);
      setEnhancedPhoto(enhancedUrl);
      setIsEnhancing(false);
      setShowEnhancementComparison(true);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyEnhancement = () => {
    setShowEnhancementComparison(false);
    speakPrompt("Photo enhanced! Advancing to product details.");
    setStep(2);
  };

  // Voice Guided Q&A
  const handleStartGuidedVoice = () => {
    const qObj = guidedQuestions[guidedStepIndex];
    speakPrompt(qObj.question, () => {
      startListening((resultText) => {
        setFormData(prev => ({ ...prev, [qObj.key]: resultText }));
      });
    });
  };

  const handleNextGuidedQuestion = () => {
    if (guidedStepIndex < guidedQuestions.length - 1) {
      setGuidedStepIndex(prev => prev + 1);
      const nextQ = guidedQuestions[guidedStepIndex + 1];
      speakPrompt(nextQ.question);
    } else {
      speakPrompt("Details saved! Let's calculate the suggested price.");
      setStep(3);
    }
  };

  const handleConfirmPrice = (finalPrice, estimateData) => {
    const finalProduct = {
      name: formData.name,
      artisanName: 'Govindappa V.',
      artisanId: 'art-1',
      artisanLocation: formData.state || 'Andhra Pradesh',
      craft: formData.craft,
      tags: ['Handmade', 'Kondapalli', formData.state || 'Andhra Pradesh'],
      price: finalPrice,
      originalPrice: Math.round(finalPrice * 1.2),
      discountPercent: 17,
      rating: 5.0,
      reviewsCount: 1,
      image: enhancedPhoto || photoSrc,
      description: `Authentic handcrafted ${formData.craft} made with ${formData.material}.`,
      material: formData.material,
      inStock: true
    };

    const saved = addProduct(finalProduct);
    setCreatedProduct(saved);
    setStep(4);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF7F2] select-none">
      {/* Top Stepper Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-base font-extrabold text-stone-900">
            {t('add_product')}
          </h2>
          <div className="w-8"></div>
        </div>

        {/* 4-Step Visual Stepper Bar */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-extrabold">
          {[
            { num: 1, label: '1 Photo' },
            { num: 2, label: '2 Details' },
            { num: 3, label: '3 Price' },
            { num: 4, label: '4 Done' }
          ].map(s => (
            <div key={s.num} className="flex flex-col items-center gap-1">
              <div
                className={`w-full h-2 rounded-full transition-all ${
                  step >= s.num ? 'bg-emerald-600' : 'bg-stone-200'
                }`}
              ></div>
              <span className={step >= s.num ? 'text-emerald-800' : 'text-stone-400'}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: PHOTO UPLOAD & AI ENHANCEMENT */}
      {step === 1 && (
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-stone-900">Step 1: Take a Photo</h3>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              Capture or upload your product image
            </p>

            {/* Photo Box */}
            <div className="mt-5 relative w-full h-56 border-2 border-dashed border-emerald-600/40 rounded-3xl bg-white flex flex-col items-center justify-center overflow-hidden shadow-inner">
              {photoSrc && !showEnhancementComparison ? (
                <img src={photoSrc} alt="Product upload preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Camera size={28} />
                  </div>
                  <span className="text-xs font-bold text-stone-700">Take a photo of your product</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {/* AI Enhancement Before / After Modal */}
            {showEnhancementComparison && (
              <div className="mt-4 p-4 bg-emerald-900 text-white rounded-3xl shadow-xl animate-in fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-amber-300 animate-spin" />
                  <span className="text-xs font-bold text-emerald-200">AI Image Enhancement Ready</span>
                </div>

                <div className="grid grid-cols-2 gap-2 my-2 text-center text-[10px] font-bold">
                  <div>
                    <span className="text-stone-300 block mb-1">Original Photo</span>
                    <img src={photoSrc} className="w-full h-24 object-cover rounded-xl border border-emerald-700" alt="Original" />
                  </div>
                  <div>
                    <span className="text-amber-300 block mb-1">AI Enhanced ✨</span>
                    <img src={enhancedPhoto || photoSrc} className="w-full h-24 object-cover rounded-xl border-2 border-amber-400 shadow-md" alt="Enhanced" />
                  </div>
                </div>

                <button
                  onClick={handleApplyEnhancement}
                  className="w-full mt-2 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl font-extrabold text-xs shadow-md transition"
                >
                  Use This AI Enhanced Photo ✓
                </button>
              </div>
            )}

            {/* Or Speak to add product */}
            <div className="mt-4 flex flex-col items-center gap-3">
              <span className="text-xs text-stone-400 font-bold uppercase tracking-widest">or</span>

              <button
                onClick={() => {
                  speakPrompt("Speak your product name, for example: wooden toy elephant", () => {
                    startListening((txt) => {
                      setFormData(prev => ({ ...prev, name: txt }));
                      setStep(2);
                    });
                  });
                }}
                className={`w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 ${
                  isListening ? 'mic-pulse' : ''
                }`}
              >
                <Mic size={20} />
                <span>🎤 Speak to add product</span>
              </button>
            </div>

            {/* Tip Callout */}
            <div className="mt-5 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shrink-0">
                👩‍🌾
              </div>
              <p className="text-xs font-semibold text-amber-900">
                Tip: You can also say "Add wooden toy" directly to the voice mic!
              </p>
            </div>
          </div>

          <div className="pt-4 pb-2">
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2"
            >
              <span>Next: Product Details</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DETAILS (VOICE GUIDED QUESTIONS ONE AT A TIME) */}
      {step === 2 && (
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-stone-900">Step 2: Product Details</h3>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              Answer 1-at-a-time guided questions (Voice or Type)
            </p>

            {/* Guided Question Card */}
            <div className="mt-5 bg-white border-2 border-emerald-600/30 rounded-3xl p-5 shadow-lg relative">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Question {guidedStepIndex + 1} of {guidedQuestions.length}
                </span>

                <button
                  onClick={handleStartGuidedVoice}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  <Volume2 size={16} className="animate-pulse" /> Listen & Speak
                </button>
              </div>

              <h4 className="text-base font-extrabold text-stone-900 mb-3">
                "{guidedQuestions[guidedStepIndex].question}"
              </h4>

              <input
                type="text"
                value={formData[guidedQuestions[guidedStepIndex].key] || ''}
                onChange={(e) => setFormData({ ...formData, [guidedQuestions[guidedStepIndex].key]: e.target.value })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-2xl text-sm font-bold text-stone-900 focus:outline-none focus:border-emerald-600"
                placeholder="Speak or type answer..."
              />
            </div>

            {/* Recognized Summary Card */}
            <div className="mt-5 p-4 bg-stone-100 rounded-2xl space-y-2 text-xs font-semibold text-stone-700">
              <div className="text-[10px] uppercase font-bold text-stone-400">Captured Details:</div>
              <div>Material: <span className="font-bold text-stone-900">{formData.material}</span></div>
              <div>Material Cost: <span className="font-bold text-stone-900">₹{formData.materialCost}</span></div>
              <div>Workers: <span className="font-bold text-stone-900">{formData.workersCount}</span></div>
              <div>Days Worked: <span className="font-bold text-stone-900">{formData.workingDays} days</span></div>
            </div>
          </div>

          <div className="pt-4 pb-2 space-y-2">
            <button
              onClick={handleNextGuidedQuestion}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2"
            >
              <span>{guidedStepIndex < guidedQuestions.length - 1 ? 'Next Question' : 'Confirm & Calculate Price'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PRICE ESTIMATION */}
      {step === 3 && (
        <PriceEstimatorView
          formData={formData}
          onConfirmPrice={handleConfirmPrice}
          onBack={() => setStep(2)}
        />
      )}

      {/* STEP 4: PRODUCT LISTED SUCCESS */}
      {step === 4 && (
        <ProductListedSuccess
          product={createdProduct || formData}
          onViewProduct={onComplete}
          onAddAnother={() => {
            setStep(1);
            setGuidedStepIndex(0);
          }}
        />
      )}
    </div>
  );
};
