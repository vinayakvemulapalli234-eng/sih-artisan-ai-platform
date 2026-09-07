import React, { useState } from 'react';
import AIImageStudio from '@/components/domain/AIImageStudio';
import {
  Camera,
  Mic,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Plus,
  Minus,
  Check,
  RefreshCw,
  ShoppingBag,
  Share2,
  ShieldCheck,
  Star,
  Info,
  Clock,
  Layers,
  FileText,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Card } from '../../components/primitives/Card';
import { Button } from '../../components/primitives/Button';
import { Badge } from '../../components/primitives/Badge';
import { useToast } from '../../hooks/useToast';
import { CRAFT_CATEGORIES } from '../../lib/constants';

const SAMPLE_PHOTOS = [
  {
    id: 'p1',
    name: 'Kondapalli Wooden Toy',
    url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    name: 'Handmade Bag',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    name: 'Clay Owl',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  },
];

export function ArtisanAddProductPage({ onBack, onNavigate }) {
  const [studioOpen, setStudioOpen] = useState(false);
  const { addToast } = useToast();

  // Wizard Step: 1 to 7
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [photo, setPhoto] = useState(SAMPLE_PHOTOS[0].url);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(true);
  const [transcription, setTranscription] = useState(
    'यह हाथ से बना पारंपरिक कोंडापल्ली लकड़ी का खिलौना है। हमने इसमें हल्की पूनिकी लकड़ी और शुद्ध प्राकृतिक वनस्पति रंगों का उपयोग किया है। इसे तराशने और रंगने में 3 दिन लगे हैं।'
  );

  // Extracted/Edited Attributes (Tap to adjust)
  const [craftType, setCraftType] = useState('Kondapalli Toys');
  const [materials, setMaterials] = useState(['Soft Wood (Puniki)', 'Natural Vegetable Dyes', 'Tamarind Paste']);
  const [daysSpent, setDaysSpent] = useState(3);
  const [technique, setTechnique] = useState('Hand Carving & Enamel Dye');
  const [price, setPrice] = useState(650);

  // Audio simulation
  const handleReadAloud = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    addToast({
      type: 'info',
      title: '🔊 सुनाया जा रहा है',
      message: text.slice(0, 50) + '...',
    });
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
        addToast({
          type: 'success',
          title: 'आवाज़ रिकॉर्ड हो गई! / Voice Recorded',
          message: 'Craft details transcribed into Hindi & English.',
        });
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const toggleMaterial = (mat) => {
    if (materials.includes(mat)) {
      if (materials.length > 1) {
        setMaterials(materials.filter((m) => m !== mat));
      }
    } else {
      setMaterials([...materials, mat]);
    }
  };

  // Step names for visual progress
  const steps = [
    { num: 1, label: 'फोटो', en: 'Photo' },
    { num: 2, label: 'आवाज़', en: 'Voice' },
    { num: 3, label: 'पहचान', en: 'Understood' },
    { num: 4, label: 'सुधार', en: 'Adjust' },
    { num: 5, label: 'मूल्य', en: 'Fair Price' },
    { num: 6, label: 'पूर्वावलोकन', en: 'Preview' },
    { num: 7, label: 'प्रकाशन', en: 'Publish' },
  ];

  

    return (
  <>
    <button onClick={() => setStudioOpen(true)} style={{padding: '12px 20px', background: '#B5502E', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer'}}>
      Add Product Photo
    </button>
    <AIImageStudio
      isOpen={studioOpen}
      onClose={() => setStudioOpen(false)}
      onAccept={({ enhancedUrl }) => console.log('Enhanced photo ready:', enhancedUrl)}
    />
    <PageContainer></PageContainer>
    <PageContainer>
      {/* Top Bar with Back & Helper */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack || (() => onNavigate?.('products'))}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          वापस जाएं / Back
        </Button>
        <span className="text-xs font-semibold text-text-secondary">
          आसान 7-चरणीय शिल्प विज़ार्ड / Easy 7-Step Wizard
        </span>
      </div>

      {/* Visual Stepper Tracker */}
      <div className="mb-6 p-4 rounded-2xl bg-white border border-border shadow-xs">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
          {steps.map((s) => {
            const isDone = s.num < currentStep;
            const isCurrent = s.num === currentStep;

            return (
              <div
                key={s.num}
                className="flex items-center gap-1.5 shrink-0"
                onClick={() => {
                  if (s.num <= currentStep) setCurrentStep(s.num);
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-neutral-100 text-text-secondary'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <div className="hidden sm:block text-left">
                  <div className={`text-xs font-bold leading-none ${isCurrent ? 'text-primary' : 'text-text-primary'}`}>
                    {s.label}
                  </div>
                  <div className="text-[10px] text-text-secondary leading-none mt-0.5">
                    {s.en}
                  </div>
                </div>
                {s.num < steps.length && (
                  <div className="w-4 sm:w-8 h-0.5 bg-border mx-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="max-w-2xl mx-auto">
        {/* ================= STEP 1: PHOTO ================= */}
        {currentStep === 1 && (
          <Card variant="flat" padding="lg" className="border-2 border-border text-center">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3">
              <Camera className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">
              चरण 1: अपने शिल्प की फोटो लें
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Step 1: Take or choose a clear photo of your handcrafted work in sunlight
            </p>

            {/* Selected Photo Viewport */}
            <div className="relative aspect-4/3 max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-dashed border-primary/40 bg-neutral-100 mb-6 shadow-sm group">
              <img
                src={photo}
                alt="Craft Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-white text-primary font-bold text-sm">
                  फोटो चुनी गई ✓
                </span>
              </div>
            </div>

            {/* Camera / Upload buttons */}
            <div className="space-y-4 mb-6">
              <p className="text-xs text-text-secondary font-medium">
                या नीचे दिए गए नमूना शिल्पों में से एक चुनें:
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                {SAMPLE_PHOTOS.map((sp) => (
                  <div
                    key={sp.id}
                    onClick={() => setPhoto(sp.url)}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all p-1 ${
                      photo === sp.url
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={sp.url} alt={sp.name} className="w-full h-16 object-cover rounded-lg" />
                    <p className="text-[10px] font-semibold text-text-primary mt-1 truncate">
                      {sp.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full min-h-[52px] font-bold text-base"
              onClick={() => setCurrentStep(2)}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              आगे बढ़ें: बोलकर बताएं (Next: Speak)
            </Button>
          </Card>
        )}

        {/* ================= STEP 2: VOICE ================= */}
        {currentStep === 2 && (
          <Card variant="flat" padding="lg" className="border-2 border-border text-center">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3">
              <Mic className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">
              चरण 2: सामान के बारे में बोलकर बताएं
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Step 2: Press the large mic and speak freely in your language
            </p>

            {/* GIANT PULSATING MIC */}
            <div className="py-6 flex flex-col items-center">
              <button
                type="button"
                onClick={handleToggleRecording}
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-200'
                    : 'bg-primary text-white hover:bg-primary-dark ring-8 ring-primary/20'
                }`}
              >
                <Mic className="w-14 h-14" />
              </button>

              <span className="mt-4 text-base font-bold text-text-primary">
                {isRecording ? '🔴 सुन रहे हैं... कृपया बोलें' : 'माइक दबाकर बोलना शुरू करें'}
              </span>
              <span className="text-xs text-text-secondary mt-1 max-w-xs">
                बताएं: शिल्प का नाम, सामग्री, कितने दिन लगे, और इसकी पौराणिक कहानी
              </span>
            </div>

            {/* Transcription Box */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-left mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900 uppercase">
                  पहचाने गए शब्द / Transcribed Speech:
                </span>
                <button
                  type="button"
                  onClick={() => handleReadAloud(transcription)}
                  className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>सुनें</span>
                </button>
              </div>
              <p className="text-sm text-text-primary leading-relaxed font-medium">
                "{transcription}"
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(1)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                पीछे
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1 min-h-[52px] font-bold text-base"
                onClick={() => setCurrentStep(3)}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                जानकारी देखें (Step 3)
              </Button>
            </div>
          </Card>
        )}

        {/* ================= STEP 3: UNDERSTOOD ================= */}
        {currentStep === 3 && (
          <Card variant="flat" padding="lg" className="border-2 border-border">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-100 text-emerald-800 mb-3">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">
                चरण 3: समझी गई जानकारी
              </h2>
              <p className="text-sm text-text-secondary">
                Step 3: AI verified these attributes from your speech
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-border flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-text-secondary block">
                    शिल्प प्रकार / Category
                  </span>
                  <span className="text-base font-bold text-text-primary">
                    {craftType} (कलाकृति)
                  </span>
                </div>
                <Badge variant="success" size="sm">
                  पहचाना गया ✓
                </Badge>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-border flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-text-secondary block">
                    प्रयुक्त सामग्री / Raw Materials
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {materials.map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-xs"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  प्राकृतिक
                </Badge>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-border flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-text-secondary block">
                    बनाने में लगा समय / Time Spent
                  </span>
                  <span className="text-base font-bold text-text-primary">
                    {daysSpent} दिन ({daysSpent * 6} श्रम घंटे)
                  </span>
                </div>
                <Badge variant="accent" size="sm">
                  उच्च श्रम
                </Badge>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-border">
                <span className="text-xs font-semibold text-text-secondary block mb-1">
                  पौराणिक व सांस्कृतिक कथा / Cultural Lore
                </span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  श्रीकालहस्ती गांव की 400 साल पुरानी परंपरा, जहां स्वर्णमुखी नदी के पावन जल और बांस की कलम से जीवन का वृक्ष (Tree of Life) चित्रित किया जाता है।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(2)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                पीछे
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1 min-h-[52px] font-bold text-base"
                onClick={() => setCurrentStep(4)}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                टैप करके सुधारें (Step 4)
              </Button>
            </div>
          </Card>
        )}

        {/* ================= STEP 4: SIMPLE TAP EDITING ================= */}
        {currentStep === 4 && (
          <Card variant="flat" padding="lg" className="border-2 border-border">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">
                चरण 4: केवल छूकर सुधारें (No Typing)
              </h2>
              <p className="text-sm text-text-secondary">
                Step 4: Tap any option to modify details without typing on keyboard
              </p>
            </div>

            {/* Category selection chips */}
            <div className="mb-6">
              <label className="text-xs font-bold text-text-primary uppercase tracking-wider block mb-2">
                1. शिल्प चुनें (Tap Category):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Kalamkari', 'Blue Pottery', 'Bidriware', 'Pashmina', 'Dokra Brass', 'Channapatna'].map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCraftType(cat)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                        craftType === cat
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-neutral-50 text-text-primary border-border hover:border-primary/40'
                      }`}
                    >
                      <span>{cat}</span>
                      {craftType === cat && <Check className="w-4 h-4" />}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Materials multi-tap chips */}
            <div className="mb-6">
              <label className="text-xs font-bold text-text-primary uppercase tracking-wider block mb-2">
                2. सामग्री चुनें (Tap Materials to toggle):
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Khadi Cotton',
                  'Natural Indigo',
                  'Mineral Dyes',
                  'Quartz Stone',
                  'Lost-Wax Brass',
                  'Pure Silver Wire',
                  'Vegetable Dyes',
                ].map((mat) => {
                  const isSelected = materials.includes(mat);
                  return (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => toggleMaterial(mat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-neutral-50 text-text-secondary border-border hover:border-emerald-700/40'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{mat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Days spent tap chips */}
            <div className="mb-8">
              <label className="text-xs font-bold text-text-primary uppercase tracking-wider block mb-2">
                3. निर्माण में लगे दिन (Crafting Days):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 7, 14, 28].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDaysSpent(d)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      daysSpent === d
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-neutral-50 text-text-primary border-border hover:border-primary/40'
                    }`}
                  >
                    {d} दिन / Days
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(3)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                पीछे
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1 min-h-[52px] font-bold text-base"
                onClick={() => setCurrentStep(5)}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                उचित मूल्य देखें (Step 5)
              </Button>
            </div>
          </Card>
        )}

        {/* ================= STEP 5: SUGGESTED FAIR PRICE ================= */}
        {currentStep === 5 && (
          <Card variant="flat" padding="lg" className="border-2 border-border">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
                Suggested Price / उचित मूल्य
              </span>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">
                चरण 5: उचित मूल्य निर्धारण
              </h2>
              <p className="text-sm text-text-secondary">
                Step 5: Based on {daysSpent} days of skilled craftsmanship & traditional materials
              </p>
            </div>

            {/* Reference Suggested Price Box */}
            <div className="p-5 rounded-3xl bg-[#E8F8F0] border border-emerald-200/80 mb-6 text-center">
              <span className="text-xs font-semibold text-emerald-900 block mb-1">
                अनुशंसित बिक्री मूल्य (Recommended Price)
              </span>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="font-heading text-4xl font-extrabold text-emerald-800">
                  ₹{price}
                </span>
                <span className="text-xs text-emerald-900 font-bold">(Recommended) ⓘ</span>
              </div>
              <p className="text-xs text-emerald-800/80 mb-3">
                🏷️ Suggested range: ₹600 - ₹700
              </p>

              {/* Yellow Tip Card */}
              <div className="p-3 rounded-2xl bg-[#FEF8E7] border border-amber-200 text-xs text-amber-950 flex items-start gap-2 text-left">
                <span className="text-amber-700 font-bold shrink-0">💡</span>
                <p>
                  This price helps you cover your material and work. You can earn more with this price!
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-border mb-6 space-y-2 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>कच्चा माल (पूनिकी लकड़ी व प्राकृतिक रंग):</span>
                <span className="font-semibold text-text-primary">₹250</span>
              </div>
              <div className="flex justify-between">
                <span>कारीगरी श्रम ({daysSpent} दिन का हस्तशिल्प):</span>
                <span className="font-semibold text-text-primary">₹300</span>
              </div>
              <div className="flex justify-between">
                <span>जीआई धरोहर व फिनिशिंग:</span>
                <span className="font-semibold text-text-primary">₹100</span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between text-sm font-bold text-text-primary">
                <span>कुल निष्पक्ष मूल्य:</span>
                <span className="text-emerald-800">₹650</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPrice((p) => Math.max(100, p - 50))}
                className="px-4 py-2 rounded-xl bg-white border border-border text-text-primary font-bold hover:bg-neutral-100 active:scale-95"
              >
                - ₹50
              </button>
              <span className="text-xs text-text-secondary font-medium">मूल्य बदलें</span>
              <button
                type="button"
                onClick={() => setPrice((p) => p + 50)}
                className="px-4 py-2 rounded-xl bg-white border border-border text-text-primary font-bold hover:bg-neutral-100 active:scale-95"
              >
                + ₹50
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(4)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                पीछे
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1 min-h-[52px] font-bold text-base bg-emerald-700 hover:bg-emerald-800 border-emerald-700"
                onClick={() => setCurrentStep(6)}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                ग्राहक दृश्य देखें (Step 6)
              </Button>
            </div>
          </Card>
        )}

        {/* ================= STEP 6: CUSTOMER PREVIEW CARD ================= */}
        {currentStep === 6 && (
          <Card variant="flat" padding="lg" className="border-2 border-border">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">
                चरण 6: ग्राहक को कैसा दिखेगा?
              </h2>
              <p className="text-sm text-text-secondary">
                Step 6: Live customer card preview on KalaKriti marketplace
              </p>
            </div>

            {/* Reference Image Product Card Preview */}
            <div className="max-w-xs mx-auto rounded-2xl border border-border/80 overflow-hidden bg-white shadow-md mb-8 flex flex-col justify-between">
              <div>
                <div className="aspect-4/3 w-full overflow-hidden bg-neutral-100 relative">
                  <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div className="p-3.5">
                  <h4 className="font-heading text-sm font-bold text-text-primary truncate">
                    {craftType}
                  </h4>
                  <span className="font-heading text-base font-extrabold text-text-primary block mt-0.5">
                    ₹{price}
                  </span>

                  {/* Tags matching reference */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] text-text-secondary font-medium">
                      Handmade
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] text-text-secondary font-medium">
                      Kondapalli
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-3.5 pb-3.5 pt-1">
                <span className="w-full py-1.5 rounded-lg bg-[#E8F8F0] text-emerald-800 text-xs font-bold text-center block">
                  Live on Marketplace
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep(5)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                पीछे
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1 min-h-[52px] font-bold text-base bg-emerald-700 hover:bg-emerald-800 border-emerald-700"
                onClick={() => {
                  setCurrentStep(7);
                  addToast({
                    type: 'success',
                    title: '🎉 शिल्प प्रकाशित हुआ!',
                    message: 'Your craft is now live on the Living Craft Graph.',
                  });
                }}
                rightIcon={<Sparkles className="w-5 h-5" />}
              >
                दुकान में प्रकाशित करें (Step 7) 🚀
              </Button>
            </div>
          </Card>
        )}

        {/* ================= STEP 7: CELEBRATION PUBLISHED ================= */}
        {currentStep === 7 && (
          <Card variant="flat" padding="lg" className="border-2 border-emerald-500/40 bg-emerald-50/20 text-center py-10">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-4 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="font-heading text-3xl font-extrabold text-emerald-950 mb-2">
              बधाई हो! आपका शिल्प प्रकाशित हो गया!
            </h2>
            <p className="text-sm font-semibold text-emerald-800 mb-6 max-w-md mx-auto leading-relaxed">
              Congratulations! Your handcrafted work has been connected to the Living Craft Graph and is now live for buyers across India.
            </p>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm text-left mb-8 flex items-center gap-4">
              <img src={photo} alt="Done" className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h4 className="font-heading text-sm font-bold text-text-primary">
                  Hand-Painted {craftType} Work
                </h4>
                <p className="text-xs text-primary font-bold">₹{price} • लाइव</p>
                <p className="text-[10px] text-text-secondary mt-0.5">
                  GI-AP-KALAMKARI-0492 प्रमाण पत्र संलग्न
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate?.('products')}
                className="w-full sm:w-auto min-h-[48px]"
              >
                मेरी दुकान में देखें / View Products
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setCurrentStep(1);
                  setPrice(3200);
                }}
                className="w-full sm:w-auto min-h-[48px]"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                एक और नया सामान जोड़ें / Add Another
              </Button>
            </div>
          </Card>
        )}
      </div>
        </PageContainer>
  </>
  );
}

export default ArtisanAddProductPage;
