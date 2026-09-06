import React, { useState } from 'react';
import {
  Store,
  QrCode,
  ShieldCheck,
  Volume2,
  Mic,
  Share2,
  Download,
  Copy,
  Award,
  CheckCircle,
  MapPin,
  Calendar,
  CreditCard,
  Edit3,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Button } from '../../components/primitives/Button';
import { Badge } from '../../components/primitives/Badge';
import { Card } from '../../components/primitives/Card';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { useToast } from '../../hooks/useToast';

export function ArtisanProfilePage() {
  const { addToast } = useToast();

  const [studioName, setStudioName] = useState('Govindappa Kalamkari Heritage Works');
  const [artisanName, setArtisanName] = useState('Govindappa V.');
  const [region, setRegion] = useState('Srikalahasti, Tirupati District, Andhra Pradesh');
  const [phone, setPhone] = useState('+91 94401 28910');
  const [upiId, setUpiId] = useState('govindappa.craft@okhdfcbank');

  // Audio bio player & recorder state
  const [isPlayingBio, setIsPlayingBio] = useState(false);
  const [isRecordingBio, setIsRecordingBio] = useState(false);

  const bioText =
    'नमस्ते, मैं गोविन्दप्पा। श्रीकालहस्ती में हमारी चौथी पीढ़ी कलमकारी हस्तकला कर रही है। हम केवल शुद्ध प्राकृतिक रंगों—जैसे हरड़, फिटकरी, नील और गाय के दूध—का उपयोग करते हैं। हर एक कपड़े को स्वर्णमुखी नदी के पावन जल में धोकर पक्का किया जाता है।';

  const handlePlayBio = () => {
    setIsPlayingBio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(bioText);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingBio(false);
      utterance.onerror = () => setIsPlayingBio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingBio(false), 3000);
    }

    addToast({
      type: 'info',
      title: '🔊 शिल्पकार परिचय सुनाया जा रहा है',
      message: 'Playing Master Govindappa heritage voice bio...',
    });
  };

  const handleRecordBio = () => {
    setIsRecordingBio(true);
    setTimeout(() => {
      setIsRecordingBio(false);
      addToast({
        type: 'success',
        title: 'नया परिचय सहेजा गया! 🎤',
        message: 'Your new voice bio is updated and will be heard by buyers.',
      });
    }, 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.('https://kalakriti.in/artisan/govindappa-v');
    addToast({
      type: 'success',
      title: 'दुकान लिंक कॉपी हुआ! 📋',
      message: 'https://kalakriti.in/artisan/govindappa-v',
    });
  };

  const handleDownloadQR = () => {
    addToast({
      type: 'success',
      title: 'क्यूआर कोड डाउनलोड शुरू',
      message: 'Saved high-resolution Studio QR print poster (PDF/PNG).',
    });
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          शिल्पकार दुकान व पहचान / Studio Profile
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          ग्राहकों और मेलों के लिए आपकी डिजिटल दुकान, जीआई टैग प्रमाणपत्र, और दुकान क्यूआर कोड।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= LEFT 2 COLUMNS: PROFILE & DETAILS ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visual Header Card */}
          <div className="rounded-3xl overflow-hidden border-2 border-border bg-white shadow-xs">
            {/* Studio Cover Banner */}
            <div className="h-36 sm:h-44 bg-gradient-to-r from-stone-900 via-primary-dark to-primary relative p-4 flex items-end">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>32 वर्ष अनुभव</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>जीआई प्रमाणित</span>
                </span>
              </div>
            </div>

            {/* Profile Avatar & Title Row */}
            <div className="px-6 pb-6 pt-0 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-14 mb-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250"
                    alt={artisanName}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-lg bg-white"
                  />
                  <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    leftIcon={<Share2 className="w-4 h-4" />}
                  >
                    दुकान साझा करें
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
                  {artisanName}
                </h2>
                <p className="text-sm font-semibold text-primary mt-0.5">
                  {studioName}
                </p>
                <p className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  <span>{region}</span>
                </p>
              </div>
            </div>
          </div>

          {/* AUDIO STUDIO BIO CARD */}
          <Card variant="flat" padding="lg" className="border-2 border-primary/30 bg-amber-50/30">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-primary text-white">
                  <Volume2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-text-primary">
                    शिल्पकार की आवाज़ में परिचय / Voice Heritage Bio
                  </h3>
                  <p className="text-xs text-text-secondary">
                    ग्राहक आपकी दुकान खोलते ही यह परिचय अपनी भाषा में सुन सकते हैं
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Waveform simulation & Player */}
            <div className="p-4 rounded-2xl bg-white border border-border shadow-xs mb-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePlayBio}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md active:scale-95 transition-all ${
                    isPlayingBio
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-primary hover:bg-primary-dark'
                  }`}
                >
                  <Volume2 className="w-6 h-6" />
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-bold text-text-primary mb-1">
                    <span>{isPlayingBio ? 'चल रहा है...' : 'मास्टर गोविन्दप्पा की कहानी (1:20 min)'}</span>
                    <span className="font-mono text-text-secondary">00:45 / 01:20</span>
                  </div>
                  {/* Visual Waveform */}
                  <div className="flex items-center gap-1 h-6">
                    {[40, 65, 30, 85, 95, 45, 70, 60, 90, 75, 40, 55, 80, 60, 45, 90, 100, 70, 50, 65, 35].map(
                      (h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-full transition-all ${
                            isPlayingBio && i < 12 ? 'bg-primary' : 'bg-neutral-200'
                          }`}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-border/50 italic">
                "{bioText}"
              </p>
            </div>

            {/* Re-record button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRecordBio}
                isLoading={isRecordingBio}
                leftIcon={<Mic className="w-4 h-4 text-primary" />}
              >
                🎤 नई आवाज़ में रिकॉर्ड करें / Re-record Bio
              </Button>
            </div>
          </Card>

          {/* GI TAG CERTIFICATE CARD */}
          <Card variant="flat" padding="lg" className="border-2 border-emerald-500/40 bg-emerald-50/20">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-emerald-950">
                    भौगोलिक उपदर्शन (जीआई टैग) प्रमाण पत्र
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium">
                    Geographical Indication (GI) Registered Master Craftsman
                  </p>
                </div>
              </div>
              <Badge variant="accent" size="sm" className="bg-emerald-700 text-white">
                मान्य व सक्रिय ✓
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-emerald-200 text-xs">
              <div>
                <span className="text-[10px] text-text-secondary uppercase font-bold block">
                  जीआई पंजीकरण संख्या
                </span>
                <span className="font-mono font-bold text-primary text-sm">
                  GI-AP-KALAMKARI-0492
                </span>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase font-bold block">
                  हस्तशिल्प बोर्ड आईडी
                </span>
                <span className="font-mono font-bold text-text-primary text-sm">
                  NHB-SRIK-8910
                </span>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase font-bold block">
                  मान्यता अवधि
                </span>
                <span className="font-bold text-emerald-800 text-sm">
                  31 दिसंबर 2028 तक
                </span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-900 mt-2">
              भारत सरकार के पेटेंट, डिज़ाइन एवं ट्रेडमार्क महानियंत्रक द्वारा प्रमाणित। आपके सभी उत्पादों पर यह डिजिटल मुहर स्वतः लगाई जाती है।
            </p>
          </Card>

          {/* CONTACT & BANK INFO */}
          <Card variant="flat" padding="lg" className="border-2 border-border">
            <h3 className="font-heading text-base font-bold text-text-primary mb-4">
              संपर्क व बैंक भुगतान विवरण / Contact & Payout
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-border">
                <span className="text-text-secondary block mb-1">मोबाइल नंबर (फोन व व्हाट्सएप):</span>
                <span className="text-sm font-bold text-text-primary">{phone}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-border">
                <span className="text-text-secondary block mb-1">बैंक यूपीआई आईडी (सीधा भुगतान):</span>
                <span className="text-sm font-mono font-bold text-emerald-700">{upiId}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ================= RIGHT COLUMN: STUDIO QR CODE ================= */}
        <div className="space-y-6">
          <Card
            variant="flat"
            padding="lg"
            className="border-2 border-border bg-white text-center shadow-sm sticky top-24"
          >
            <div className="inline-flex p-3 rounded-2xl bg-amber-100 text-amber-900 mb-2">
              <QrCode className="w-8 h-8" />
            </div>

            <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
              दुकान का क्यूआर कोड
            </h3>
            <p className="text-xs text-text-secondary mb-4">
              Studio QR Code for Melas & Exhibitions
            </p>

            {/* Simulated Clean SVG QR Code */}
            <div className="p-5 rounded-3xl bg-neutral-900 text-white inline-block mx-auto mb-4 shadow-md">
              <div className="w-48 h-48 sm:w-52 sm:h-52 bg-white rounded-2xl p-3 flex flex-col items-center justify-center relative">
                {/* SVG QR Code pattern */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-stone-900 fill-current"
                >
                  {/* Corner Position Detection Patterns */}
                  <rect x="5" y="5" width="26" height="26" rx="4" />
                  <rect x="9" y="9" width="18" height="18" fill="white" />
                  <rect x="13" y="13" width="10" height="10" />

                  <rect x="69" y="5" width="26" height="26" rx="4" />
                  <rect x="73" y="9" width="18" height="18" fill="white" />
                  <rect x="77" y="13" width="10" height="10" />

                  <rect x="5" y="69" width="26" height="26" rx="4" />
                  <rect x="9" y="73" width="18" height="18" fill="white" />
                  <rect x="13" y="77" width="10" height="10" />

                  {/* Simulated Data Grid dots */}
                  <rect x="36" y="8" width="6" height="6" />
                  <rect x="46" y="8" width="6" height="6" />
                  <rect x="56" y="16" width="6" height="6" />
                  <rect x="8" y="36" width="6" height="6" />
                  <rect x="20" y="44" width="6" height="6" />
                  <rect x="36" y="36" width="28" height="28" rx="6" fill="#B5502E" />
                  <rect x="72" y="38" width="8" height="8" />
                  <rect x="84" y="48" width="6" height="6" />
                  <rect x="38" y="72" width="8" height="8" />
                  <rect x="52" y="78" width="6" height="6" />
                  <rect x="72" y="72" width="12" height="6" />
                  <rect x="72" y="84" width="8" height="8" />
                  <circle cx="50" cy="50" r="8" fill="white" />
                  <circle cx="50" cy="50" r="5" fill="#B5502E" />
                </svg>
              </div>

              <div className="mt-2 text-center">
                <span className="text-[11px] font-bold text-amber-300 block tracking-wider">
                  SCAN TO VISIT STUDIO
                </span>
                <span className="text-[10px] text-white/70">
                  Govindappa Kalamkari Works
                </span>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed mb-6 px-2">
              मेले या प्रदर्शनी में ग्राहक इस क्यूआर को अपने फोन से स्कैन करके आपकी पूरी डिजिटल दुकान और सभी सामान देख सकते हैं।
            </p>

            <div className="space-y-2">
              <Button
                variant="primary"
                size="md"
                className="w-full min-h-[46px] font-bold"
                onClick={handleDownloadQR}
                leftIcon={<Download className="w-4 h-4" />}
              >
                क्यूआर पोस्टर डाउनलोड करें (Print PDF)
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full min-h-[46px]"
                onClick={handleCopyLink}
                leftIcon={<Copy className="w-4 h-4" />}
              >
                दुकान लिंक कॉपी करें (Copy Link)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

export default ArtisanProfilePage;
