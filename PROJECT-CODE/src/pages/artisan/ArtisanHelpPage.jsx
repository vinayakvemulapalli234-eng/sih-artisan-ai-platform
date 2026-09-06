import React, { useState } from 'react';
import {
  HelpCircle,
  PhoneCall,
  MessageSquare,
  Mic,
  PlayCircle,
  Video,
  Clock,
  CheckCircle2,
  ExternalLink,
  Volume2,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Button } from '../../components/primitives/Button';
import { Card } from '../../components/primitives/Card';
import { Badge } from '../../components/primitives/Badge';
import { VoiceAssistantModal } from '../../components/artisan/VoiceAssistantModal';
import { useToast } from '../../hooks/useToast';

const VIDEO_TUTORIALS = [
  {
    id: 'v1',
    title: 'धूप में अच्छी फोटो कैसे खींचें',
    subtitle: 'How to take craft photos in natural sunlight',
    duration: '2:15 min',
    thumbnailColor: 'from-amber-600 to-amber-800',
    category: 'फोटो / Photography',
  },
  {
    id: 'v2',
    title: 'बोलकर सामान की कहानी कैसे बताएं',
    subtitle: 'Recording craft story using voice input',
    duration: '1:45 min',
    thumbnailColor: 'from-primary to-primary-dark',
    category: 'आवाज़ / Voice',
  },
  {
    id: 'v3',
    title: 'जीआई टैग के साथ सुरक्षित पैकिंग',
    subtitle: 'Safe packaging with GI authenticity seal',
    duration: '3:10 min',
    thumbnailColor: 'from-emerald-700 to-emerald-900',
    category: 'पैकिंग / Packaging',
  },
  {
    id: 'v4',
    title: 'बैंक खाते में पैसे कैसे आएंगे',
    subtitle: 'Direct UPI & Bank transfer payment guide',
    duration: '2:00 min',
    thumbnailColor: 'from-blue-700 to-blue-900',
    category: 'कमाई / Payments',
  },
];

export function ArtisanHelpPage({ onNavigate }) {
  const { addToast } = useToast();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCallSupport = () => {
    addToast({
      type: 'info',
      title: '📞 टोल-फ्री हेल्पलाइन / Calling 1800-208-CRAFT',
      message: 'Connecting to KalaKriti Rural Artisan Support Officer (Hindi / Telugu / Tamil / English)...',
    });
  };

  const handleWhatsAppSupport = () => {
    addToast({
      type: 'success',
      title: '💬 व्हाट्सएप सहायता / WhatsApp Support',
      message: 'Opening KalaKriti Artisan Sahayak chatbot (+91 98765 43210)...',
    });
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
            <HelpCircle className="w-7 h-7" />
          </span>
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
              शिल्पकार सहायता केंद्र / Artisan Sahayata Kendra
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              कोई भी परेशानी हो, बेझिझक बोलकर पूछें या फोन मिलाएं। हम हर कदम पर आपके साथ हैं।
            </p>
          </div>
        </div>
      </div>

      {/* Giant Speak Question Action Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <Badge variant="accent" size="sm" className="mb-3 bg-white/20 text-white border-white/30">
            आवाज़ से मदद / Voice Sahayak
          </Badge>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
            लिखना नहीं आता? कोई बात नहीं!
          </h2>
          <p className="text-white/90 text-sm sm:text-base mb-6 leading-relaxed">
            माइक दबाएं और अपनी भाषा में पूछें — जैसे "मेरा पिछला भुगतान कब आएगा?" या "नया सामान कैसे जोड़ें?"
          </p>
          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-primary font-bold text-base sm:text-lg shadow-xl hover:bg-neutral-50 active:scale-98 transition-transform"
          >
            <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Mic className="w-5 h-5 text-primary" />
            </span>
            <span>🎤 बोलकर सवाल पूछें / Ask by Voice</span>
          </button>
        </div>
      </div>

      {/* 2 Big 1-Tap Help Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {/* Toll Free Phone Call */}
        <div className="p-6 rounded-3xl bg-white border-2 border-emerald-500/30 hover:border-emerald-500 transition-all shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <PhoneCall className="w-7 h-7" />
              </div>
              <Badge variant="success" size="sm">
                मुफ़्त / Toll Free 24x7
              </Badge>
            </div>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
              सीधे फोन पर बात करें
            </h3>
            <p className="text-sm font-semibold text-emerald-800 mb-2">
              1800-208-CRAFT (1800-208-27238)
            </p>
            <p className="text-xs text-text-secondary leading-relaxed mb-6">
              कलाकृति शिल्प सहायक अधिकारी से अपनी मातृभाषा (हिन्दी, तेलुगु, तमिल, बांग्ला, अंग्रेजी) में सीधे बात करें।
            </p>
          </div>
          <button
            type="button"
            onClick={handleCallSupport}
            className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
          >
            <PhoneCall className="w-5 h-5" />
            <span>📞 अभी कॉल लगाएं / Call Helpline</span>
          </button>
        </div>

        {/* WhatsApp Help */}
        <div className="p-6 rounded-3xl bg-white border-2 border-green-500/30 hover:border-green-500 transition-all shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center">
                <MessageSquare className="w-7 h-7" />
              </div>
              <Badge variant="accent" size="sm">
                तुरंत जवाब / Instant
              </Badge>
            </div>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
              व्हाट्सएप पर पूछें (WhatsApp)
            </h3>
            <p className="text-sm font-semibold text-green-800 mb-2">
              +91 98765 43210
            </p>
            <p className="text-xs text-text-secondary leading-relaxed mb-6">
              फोटो, वॉइस मैसेज या वीडियो भेजकर ऑर्डर या ऐप से जुड़ी किसी भी समस्या का तुरंत समाधान पाएं।
            </p>
          </div>
          <button
            type="button"
            onClick={handleWhatsAppSupport}
            className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
          >
            <MessageSquare className="w-5 h-5" />
            <span>💬 व्हाट्सएप पर संदेश भेजें / Chat</span>
          </button>
        </div>
      </div>

      {/* Visual Video Tutorials Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl font-bold text-text-primary">
              वीडियो देखकर सीखें / Video Guides
            </h2>
          </div>
          <span className="text-xs text-text-secondary">सभी 2-3 मिनट के आसान वीडियो</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIDEO_TUTORIALS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => {
                setSelectedVideo(vid);
                addToast({
                  type: 'info',
                  title: 'वीडियो शुरू हो रहा है',
                  message: vid.title,
                });
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-border bg-white hover:border-primary hover:shadow-md transition-all flex flex-col"
            >
              {/* Simulated Video Thumbnail */}
              <div
                className={`relative aspect-video bg-gradient-to-br ${vid.thumbnailColor} p-4 flex items-center justify-center text-white`}
              >
                <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-7 h-7 text-white fill-white/20" />
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{vid.duration}</span>
                </div>
              </div>

              {/* Title & category */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block mb-1">
                    {vid.category}
                  </span>
                  <h4 className="font-heading text-sm font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                    {vid.subtitle}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-xs text-primary font-semibold">
                  <span>वीडियो देखें</span>
                  <span>▶</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigate={onNavigate}
      />
    </PageContainer>
  );
}

export default ArtisanHelpPage;
