import React, { useState } from 'react';
import {
  Camera,
  RefreshCw,
  Check,
  Sparkles,
  ArrowRight,
  Mic,
  Volume2,
  Edit2,
  Share2,
  PartyPopper,
  Info,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { TopBar, Button, Card, MicButton, StatusBadge } from '../../components/design-system';
import { useToast } from '../../hooks/useToast';
import { getAppLanguage, t } from '../../i18n/translations';

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

/**
 * ArtisanAddProductPage (Screens 3–7: Locked Specs)
 *
 * Screen 3: Take Photo / Is this photo okay? / Retake & Use Photo (with "Enhancing photo…")
 * Screen 4: Voice Input / "Tell us about your product" / Large MicButton / "Converting to text…"
 * Screen 5: AI Description / "Your product details" / "Looks good" & "Change something"
 * Screen 6: Suggested Price (#E8F7F1 box) / Breakdown / Tip Card (#FFF6DD) / "Use ₹650" & "Edit Price"
 * Screen 7: Product Listed / Confetti / "Your product is ready!" / "View Product" & "Add Another Product"
 */
export function ArtisanAddProductPage({ onBack, onNavigate }) {
  const { addToast } = useToast();
  const lang = getAppLanguage();

  // Step: 3 (Photo), 4 (Voice), 5 (Details), 6 (Price), 7 (Success)
  const [step, setStep] = useState(3);

  // Step 3 State
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PHOTOS[0].url);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Step 4 State (Voice)
  const [isListening, setIsListening] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [transcript, setTranscript] = useState(
    'This is a handcrafted Kondapalli wooden toy painted with natural vegetable dyes. It took 3 days of carving.'
  );

  // Step 5 State (Details)
  const [productDetails, setProductDetails] = useState({
    name: 'Kondapalli Wooden Toy',
    material: 'Soft wood (Puniki), Natural vegetable dyes',
    craft: 'Kondapalli Toys',
    isHandmade: true,
    description:
      'Authentic GI-certified handcrafted wooden toy made from Puniki soft wood, hand-painted with eco-friendly vegetable pigments by master artisans.',
  });
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  // Step 6 State (Price)
  const [customPrice, setCustomPrice] = useState(650);
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  // Step 3: Handle Use Photo with inline "Enhancing photo…"
  const handleUsePhoto = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setStep(4);
    }, 1200);
  };

  // Step 4: Handle Mic toggle
  const handleToggleMic = () => {
    if (isListening) {
      setIsListening(false);
      setIsConverting(true);
      setTimeout(() => {
        setIsConverting(false);
        setStep(5);
      }, 1500);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setIsConverting(true);
        setTimeout(() => {
          setIsConverting(false);
          setStep(5);
        }, 1200);
      }, 3000);
    }
  };

  // Step 6: Apply Price
  const handleAcceptPrice = (priceVal) => {
    setCustomPrice(priceVal);
    setStep(7);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-16">
      {/* ============================================================ */}
      {/* SCREEN 3: ADD PRODUCT — TAKE PHOTO                            */}
      {/* ============================================================ */}
      {step === 3 && (
        <>
          <TopBar
            title="Add Product"
            onBack={onBack || (() => onNavigate?.('overview'))}
          />

          <main className="max-w-md mx-auto px-4 pt-6 space-y-5">
            {/* Main Photo Preview */}
            <div className="relative aspect-4/3 w-full bg-neutral-900 rounded-2xl overflow-hidden border border-[#ECECEC] shadow-sm">
              <img
                src={selectedPhoto}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Camera className="w-3.5 h-3.5" />
                <span>Sample photo</span>
              </div>
            </div>

            {/* Photo Selector Samples */}
            <div className="space-y-2">
              <p className="text-xs text-[#6B6B6B] font-medium">
                Choose sample photo or upload:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PHOTOS.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setSelectedPhoto(sp.url)}
                    className={`rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                      selectedPhoto === sp.url
                        ? 'border-[#1FA97D] ring-2 ring-[#1FA97D]/20 shadow-xs'
                        : 'border-[#ECECEC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={sp.url}
                      alt={sp.name}
                      className="w-full h-14 object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div className="text-center pt-2">
              <p className="text-base font-bold text-[#1B1B1B]">
                Is this photo okay?
              </p>
              <p className="text-xs text-[#6B6B6B] mt-0.5">
                Ensure lighting is clear so buyers can see details
              </p>
            </div>

            {/* Retake & Use Photo Buttons Side by Side */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => {
                  const nextIdx =
                    (SAMPLE_PHOTOS.findIndex((p) => p.url === selectedPhoto) + 1) %
                    SAMPLE_PHOTOS.length;
                  setSelectedPhoto(SAMPLE_PHOTOS[nextIdx].url);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-1.5" />
                <span>Retake</span>
              </Button>

              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={isEnhancing}
                onClick={handleUsePhoto}
              >
                {isEnhancing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enhancing photo…</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Use Photo</span>
                  </span>
                )}
              </Button>
            </div>
          </main>
        </>
      )}

      {/* ============================================================ */}
      {/* SCREEN 4: VOICE INPUT → AI EXTRACTS DETAILS                   */}
      {/* ============================================================ */}
      {step === 4 && (
        <>
          <TopBar
            title="Add Product"
            onBack={() => setStep(3)}
          />

          <main className="max-w-md mx-auto px-4 pt-6 text-center space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">
                Tell us about your product
              </h1>
              <p className="text-sm text-[#6B6B6B] mt-2 leading-relaxed">
                Tap the microphone and speak in your language. You can say anything about your product.
              </p>
            </div>

            {/* Large Centered MicButton with animated rings */}
            <div className="py-6">
              <MicButton
                isListening={isListening}
                onClick={handleToggleMic}
                statusText={
                  isListening
                    ? 'Listening... speak freely about your craft'
                    : 'Tap microphone to speak'
                }
              />
            </div>

            {/* Converting / Processing indicator */}
            {isConverting ? (
              <div className="p-4 rounded-2xl bg-[#E8F7F1] border border-[#1FA97D]/20 flex items-center justify-center gap-2 text-sm font-bold text-[#1FA97D] animate-pulse">
                <span className="inline-flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1FA97D] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#1FA97D] animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-[#1FA97D] animate-bounce delay-200" />
                </span>
                <span>Converting to text…</span>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white border border-[#ECECEC] text-left shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-[#6B6B6B] block mb-1">
                  Transcript:
                </span>
                <p className="text-sm text-[#1B1B1B] italic">
                  "{transcript}"
                </p>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setStep(5)}
            >
              Continue to Details
            </Button>
          </main>
        </>
      )}

      {/* ============================================================ */}
      {/* SCREEN 5: AI GENERATED DESCRIPTION ("Your product details")    */}
      {/* ============================================================ */}
      {step === 5 && (
        <>
          <TopBar
            title="Add Product"
            onBack={() => setStep(4)}
          />

          <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">
                Your product details
              </h1>
              <p className="text-sm text-[#6B6B6B] mt-1.5 leading-relaxed">
                We understood this from your voice. You can edit if needed.
              </p>
            </div>

            {/* Details Card */}
            <Card className="p-5 space-y-4">
              {/* Product Thumbnail + Title */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#ECECEC]">
                <img
                  src={selectedPhoto}
                  alt={productDetails.name}
                  className="w-14 h-14 rounded-xl object-cover border border-[#ECECEC]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1FA97D]">
                    Extracted from voice
                  </span>
                  <input
                    type="text"
                    value={productDetails.name}
                    onChange={(e) =>
                      setProductDetails({ ...productDetails, name: e.target.value })
                    }
                    className="w-full text-base font-bold text-[#1B1B1B] bg-transparent border-b border-transparent hover:border-[#ECECEC] focus:border-[#1FA97D] outline-none truncate"
                  />
                </div>
              </div>

              {/* Labeled Fields */}
              <div className="space-y-3 text-sm">
                <div>
                  <label className="text-xs font-semibold text-[#6B6B6B] block mb-1">
                    Material
                  </label>
                  <input
                    type="text"
                    value={productDetails.material}
                    onChange={(e) =>
                      setProductDetails({ ...productDetails, material: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#F4F4F4] rounded-xl text-sm font-medium text-[#1B1B1B] border border-[#ECECEC] focus:border-[#1FA97D] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6B6B6B] block mb-1">
                    Craft
                  </label>
                  <input
                    type="text"
                    value={productDetails.craft}
                    onChange={(e) =>
                      setProductDetails({ ...productDetails, craft: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#F4F4F4] rounded-xl text-sm font-medium text-[#1B1B1B] border border-[#ECECEC] focus:border-[#1FA97D] outline-none"
                  />
                </div>

                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="text-xs font-semibold text-[#6B6B6B] block">
                      Handmade
                    </span>
                    <span className="text-sm font-bold text-[#1B1B1B]">
                      {productDetails.isHandmade ? 'Yes, 100% Handcrafted' : 'No'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setProductDetails({
                        ...productDetails,
                        isHandmade: !productDetails.isHandmade,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      productDetails.isHandmade
                        ? 'bg-[#E8F7F1] text-[#1FA97D] border border-[#1FA97D]/30'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {productDetails.isHandmade ? 'Handmade: Yes ✓' : 'Handmade: No'}
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6B6B6B] block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={productDetails.description}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2.5 bg-[#F4F4F4] rounded-xl text-xs sm:text-sm font-medium text-[#1B1B1B] border border-[#ECECEC] focus:border-[#1FA97D] outline-none resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Buttons: Looks good & Change something */}
            <div className="space-y-2 pt-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setStep(6)}
              >
                Looks good
              </Button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full py-2.5 flex items-center justify-center gap-1.5 text-sm font-bold text-[#1FA97D] hover:underline"
              >
                <Mic className="w-4 h-4" />
                <span>Change something</span>
              </button>
            </div>
          </main>
        </>
      )}

      {/* ============================================================ */}
      {/* SCREEN 6: PRICE ESTIMATION ("Suggested Price")               */}
      {/* ============================================================ */}
      {step === 6 && (
        <>
          <TopBar
            title="Suggested Price"
            onBack={() => setStep(5)}
          />

          <main className="max-w-md mx-auto px-4 pt-6 space-y-5">
            {/* Highlighted Box (#E8F7F1) */}
            <div className="p-5 rounded-2xl bg-[#E8F7F1] border border-[#1FA97D]/30 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1FA97D] block mb-1">
                Fair Price Recommendation
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B1B1B]">
                ₹650
              </h2>
              <span className="inline-block mt-1 text-xs font-bold text-[#1FA97D] bg-white/80 px-2.5 py-0.5 rounded-full">
                (Recommended)
              </span>
              <p className="text-xs text-[#6B6B6B] mt-2 font-medium">
                Suggested range: ₹600 – ₹700
              </p>
            </div>

            {/* Cost Breakdown List */}
            <Card className="p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                Cost Breakdown
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-[#6B6B6B]">
                  <span>Material cost</span>
                  <span className="font-semibold text-[#1B1B1B]">₹280</span>
                </div>

                <div className="flex items-center justify-between text-[#6B6B6B]">
                  <span>Your work / labour</span>
                  <span className="font-semibold text-[#1B1B1B]">₹250</span>
                </div>

                <div className="flex items-center justify-between text-[#6B6B6B]">
                  <span>Other costs / logistics</span>
                  <span className="font-semibold text-[#1B1B1B]">₹120</span>
                </div>

                <div className="pt-2 border-t border-[#ECECEC] flex items-center justify-between font-bold text-base text-[#1B1B1B]">
                  <span>Estimated cost</span>
                  <span className="text-[#1FA97D]">₹650</span>
                </div>
              </div>
            </Card>

            {/* Tip Card (#FFF6DD) */}
            <div className="p-4 rounded-2xl bg-[#FFF6DD] border border-[#E8A93A]/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#E8A93A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#1B1B1B] font-medium leading-relaxed">
                This price helps you cover your material and work. You can earn more with this price!
              </p>
            </div>

            {/* Inline Price Editor if active */}
            {isEditingPrice && (
              <div className="p-4 rounded-2xl bg-white border border-[#1FA97D] space-y-3">
                <label className="text-xs font-bold text-[#1B1B1B] block">
                  Enter your desired price (₹):
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-[#ECECEC] text-lg font-bold text-[#1B1B1B] focus:border-[#1FA97D] outline-none"
                />
                <p className="text-xs text-[#1FA97D] font-semibold">
                  Your final price is ₹{customPrice}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-2 pt-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => handleAcceptPrice(customPrice)}
              >
                Use ₹{customPrice}
              </Button>

              <button
                type="button"
                onClick={() => setIsEditingPrice(!isEditingPrice)}
                className="w-full py-2.5 flex items-center justify-center gap-1 text-sm font-bold text-[#1FA97D] hover:underline"
              >
                <Edit2 className="w-4 h-4" />
                <span>{isEditingPrice ? 'Keep price' : 'Edit Price'}</span>
              </button>
            </div>
          </main>
        </>
      )}

      {/* ============================================================ */}
      {/* SCREEN 7: PRODUCT LISTED (SUCCESS CELEBRATION)                 */}
      {/* ============================================================ */}
      {step === 7 && (
        <>
          <main className="max-w-md mx-auto px-4 pt-10 text-center space-y-6">
            {/* Header: Confetti icon + "Your product is ready!" */}
            <div className="inline-flex p-4 rounded-full bg-[#E8F7F1] text-[#1FA97D] shadow-sm animate-bounce duration-1000">
              <PartyPopper className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight">
                Your product is ready!
              </h1>
              <p className="text-sm font-medium text-[#1FA97D] mt-1.5">
                Your product is now live on the marketplace.
              </p>
            </div>

            {/* Product Card */}
            <Card className="p-4 text-left overflow-hidden">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-100 mb-3">
                <img
                  src={selectedPhoto}
                  alt={productDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#1B1B1B]">
                    {productDetails.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-100 text-[#6B6B6B] font-medium">
                      Handmade
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-100 text-[#6B6B6B] font-medium">
                      {productDetails.craft}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-[#1FA97D] block">
                    ₹{customPrice}
                  </span>
                  <StatusBadge variant="green">
                    Live
                  </StatusBadge>
                </div>
              </div>
            </Card>

            {/* Buttons: View Product & Add Another Product */}
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => onNavigate?.('products')}
              >
                View Product
              </Button>

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => {
                  setStep(3);
                  setIsEditingPrice(false);
                  setCustomPrice(650);
                }}
              >
                Add Another Product
              </Button>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default ArtisanAddProductPage;
