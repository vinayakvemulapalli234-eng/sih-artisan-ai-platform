import React, { useState } from 'react';
import { Camera, Mic, Volume2, Sparkles, ChevronRight, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { enhanceProductImage } from '../../services/imageEnhancerService';
import { generateCatalogFromText, generateCatalogFromAudio } from '../../services/catalogerService';
import { PriceEstimatorView } from './PriceEstimatorView';
import { ProductListedSuccess } from './ProductListedSuccess';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAppData } from '../../context/AppDataContext';

export const AddProductStepper = ({ onComplete, onCancel }) => {
  const { speakPrompt, startListening, isListening } = useVoice();
  const { t, language } = useLanguage();
  const { addProduct } = useAppData();

  const [step, setStep] = useState(1); // 1: Photo+Voice, 2: Details, 3: Price, 4: Done

  // Photo State
  const [photoSrc, setPhotoSrc] = useState(null);
  const [enhancedPhoto, setEnhancedPhoto] = useState(null);
  const [showEnhancementComparison, setShowEnhancementComparison] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Voice Description State
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isGeneratingCatalog, setIsGeneratingCatalog] = useState(false);
  const [catalogResult, setCatalogResult] = useState(null); // { title, description, category, tags }
  const [catalogError, setCatalogError] = useState('');

  const [guidedStepIndex, setGuidedStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    craft: '',
    material: '',
    materialCost: '',
    workersCount: '',
    workingDays: '',
    labourCost: '',
    state: '',
    price: ''
  });

  const [createdProduct, setCreatedProduct] = useState(null);

  const guidedQuestions = [
    { key: 'material', question: t('q_material') },
    { key: 'materialCost', question: t('q_material_cost') },
    { key: 'workersCount', question: t('q_workers') },
    { key: 'workingDays', question: t('q_working_days') },
    { key: 'labourCost', question: t('q_labour_cost') }
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
    speakPrompt("Photo enhanced! Now describe your product using the mic below.");
  };

  // Voice Description -> AI Catalog Generation
const handleRecordDescription = async () => {
    setCatalogError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });

        setIsGeneratingCatalog(true);
        const result = await generateCatalogFromAudio(audioBlob, 'te');
        setIsGeneratingCatalog(false);

        if (result.success) {
          setVoiceTranscript(result.transcription);
          setCatalogResult(result.catalog);
          setFormData(prev => ({
            ...prev,
            name: result.catalog.title,
            craft: result.catalog.category,
          }));
          speakPrompt("Description ready! You can now proceed to product details.");
        } else {
          setCatalogError(result.error || 'Could not generate description');
        }
      };

      mediaRecorder.start();
      speakPrompt("Recording... speak now.");

      setTimeout(() => {
        if (mediaRecorder.state === 'recording') mediaRecorder.stop();
      }, 6000);
    } catch (err) {
      setCatalogError('Microphone access denied or unavailable.');
    }
  };

  const canProceedFromStep1 = photoSrc && catalogResult;

  // Voice Guided Q&A (Step 2)
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

  const handleConfirmPrice = async (finalPrice, estimateData) => {
    const finalProduct = {
      name: formData.name,
      artisanName: 'Artisan',
      artisanId: 'art-1',
      artisanLocation: formData.state || '',
      craft: formData.craft,
      tags: catalogResult?.tags || [],
      price: finalPrice,
      materialCost: estimateData.materialCost,
      labourCost: estimateData.labourCost,
      otherCost: estimateData.logisticsAndPlatformFee,
      originalPrice: Math.round(finalPrice * 1.2),
      discountPercent: 17,
      rating: 5.0,
      reviewsCount: 0,
      image: enhancedPhoto || photoSrc,
      description: catalogResult?.description || '',
      material: formData.material,
      inStock: true
    };

    const saved = await addProduct(finalProduct);
    if (saved) {
    setCreatedProduct(saved);
    setStep(4);
    } else {
      alert('Failed to save product. Please try again.');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF7F2] select-none">
      {/* Top Stepper Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => {
              if (step === 1) {
                onCancel();
              } else {
                setStep(step - 1);
              }
            }}
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
            { num: 1, label: `1 ${t('step1_label')}` },
{ num: 2, label: `2 ${t('step2_label')}` },
{ num: 3, label: `3 ${t('step3_label')}` },
{ num: 4, label: `4 ${t('step4_label')}` }
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

      {/* STEP 1: PHOTO + VOICE DESCRIPTION (both required) */}
      {step === 1 && (
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-stone-900">{t('step1_title')}</h3>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
  {t('step1_subtitle')}
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
                  <span className="text-xs font-bold text-stone-700">{t('take_photo_prompt')}</span>
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

            {/* Voice Description Section */}
            {photoSrc && !showEnhancementComparison && (
              <div className="mt-5">
              <button
                  onClick={handleRecordDescription}
                  disabled={isGeneratingCatalog}
                  className={`w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-60 ${
                  isListening ? 'mic-pulse' : ''
                }`}
              >
                  {isGeneratingCatalog ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Generating description...</span>
                    </>
                  ) : (
                    <>
                <Mic size={20} />
                      <span>Describe your product by voice</span>
                    </>
                  )}
              </button>

                {catalogError && (
                  <p className="text-xs font-bold text-red-600 mt-2 text-center">{catalogError}</p>
                )}

                {catalogResult && (
                  <div className="mt-4 p-4 bg-white border-2 border-emerald-600/30 rounded-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      AI Generated
                    </span>
                    <h4 className="text-base font-extrabold text-stone-900 mt-1">
                      {catalogResult.translations?.[language]?.title || catalogResult.title}
                    </h4>
                    <p className="text-xs text-stone-600 font-medium mt-1">
                      {catalogResult.translations?.[language]?.description || catalogResult.description}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                      {catalogResult.category}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 pb-2">
            <button
              onClick={() => setStep(2)}
              disabled={!canProceedFromStep1}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2"
            >
              <span>{t('step2_title')}</span>
              <ChevronRight size={20} />
            </button>
            {!canProceedFromStep1 && (
              <p className="text-[10px] text-stone-400 font-semibold text-center mt-2">
                {t('continue_hint')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: DETAILS (VOICE GUIDED QUESTIONS ONE AT A TIME) */}
      {step === 2 && (
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-stone-900">{t('step2_title')}</h3>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
  {t('step2_subtitle')}
</p>

            {/* Generated product summary */}
            <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Product</span>
              <h4 className="text-sm font-extrabold text-stone-900">{formData.name}</h4>
              <span className="text-[10px] font-bold text-stone-500">{formData.craft}</span>
            </div>

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
            <div className="mt-4">
  <label className="text-xs font-bold text-stone-500 block mb-1">Your State</label>
  <input
    type="text"
    value={formData.state}
    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-emerald-600"
    placeholder="e.g. Andhra Pradesh"
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
              <span>{guidedStepIndex < guidedQuestions.length - 1 ? t('next_question') : t('confirm_calculate_price')}</span>
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
            setPhotoSrc(null);
            setEnhancedPhoto(null);
            setCatalogResult(null);
            setVoiceTranscript('');
          }}
        />
      )}
    </div>
  );
};