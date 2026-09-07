import React, { useState } from 'react';
import {
  Mic,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { TopBar, Card, Button } from '../../components/design-system';
import { VoiceAssistantModal } from '../../components/artisan/VoiceAssistantModal';
import { useToast } from '../../hooks/useToast';

const FAQS = [
  {
    q: 'How do I receive payments?',
    a: 'Direct bank deposit via UPI/NEFT within 24 hours of successful delivery confirmation.',
  },
  {
    q: 'How do I take better craft photos?',
    a: 'Place your craft in natural daylight near a window or outdoors. Avoid harsh camera flashes.',
  },
  {
    q: 'What is the GI certificate?',
    a: 'Geographical Indication certifies your authentic regional craft heritage and protects against factory copies.',
  },
  {
    q: 'What if a buyer cancels a custom order?',
    a: 'Crafts in production are protected with guaranteed material cost reimbursement from our fair-price reserve.',
  },
];

/**
 * Screen 12: Help / Support ("Need Help?") (Locked Spec)
 *
 * Top Bar: Back chevron + "Need Help?".
 * Cards:
 *  1. Green mic card (#1FA97D): "Speak your question" / "Talk in your language" → AI voice assistant.
 *  2. Blue phone card (#3E8EDE): "Talk to a person" / "Get help from our team" → phone helpline (1800-208-CRAFT) + email.
 * FAQ: "Common questions" row with chevron expanding to FAQ list.
 */
export function ArtisanHelpPage({ onNavigate }) {
  const { addToast } = useToast();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isFaqExpanded, setIsFaqExpanded] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handlePhoneCall = () => {
    addToast({
      type: 'info',
      title: 'Artisan Helpline',
      message: 'Calling KalaKriti Helpline: 1800-208-CRAFT (Toll-Free)...',
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-16">
      {/* Top Bar: Back chevron + "Need Help?" */}
      <TopBar
        title="Need Help?"
        onBack={() => onNavigate?.('overview')}
      />

      <main className="max-w-md mx-auto px-4 pt-5 space-y-4">
        {/* Card 1: Green mic card (#1FA97D) */}
        <div
          onClick={() => setIsVoiceOpen(true)}
          className="p-5 rounded-2xl bg-[#E8F7F1] border border-[#1FA97D]/30 hover:border-[#1FA97D] transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#1FA97D] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mic className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#1B1B1B]">
                Speak your question
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-0.5">
                Talk in your language
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#1FA97D] bg-white px-3 py-1.5 rounded-full border border-[#1FA97D]/20 shrink-0">
            Voice AI
          </span>
        </div>

        {/* Card 2: Blue phone card (#3E8EDE) */}
        <div className="p-5 rounded-2xl bg-[#E7F1FE] border border-[#3E8EDE]/30 space-y-3.5 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3E8EDE] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#1B1B1B]">
                Talk to a person
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-0.5">
                Get help from our team
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#3E8EDE]/20 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#1B1B1B]">
              <span className="font-medium text-[#6B6B6B]">Toll-free Helpline:</span>
              <button
                type="button"
                onClick={handlePhoneCall}
                className="font-bold text-[#3E8EDE] hover:underline"
              >
                1800-208-CRAFT
              </button>
            </div>

            <div className="flex items-center justify-between text-[#1B1B1B]">
              <span className="font-medium text-[#6B6B6B]">Artisan Support Email:</span>
              <a
                href="mailto:artisan@kalakriti.in"
                className="font-bold text-[#3E8EDE] hover:underline"
              >
                artisan@kalakriti.in
              </a>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handlePhoneCall}
            className="bg-[#3E8EDE] hover:bg-[#3377b8]"
          >
            Call 1800-208-CRAFT
          </Button>
        </div>

        {/* FAQ: "Common questions" row with chevron expanding to FAQ list */}
        <Card className="overflow-hidden">
          <button
            type="button"
            onClick={() => setIsFaqExpanded(!isFaqExpanded)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-50/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-[#1FA97D]" />
              <span className="text-sm font-bold text-[#1B1B1B]">
                Common questions
              </span>
            </div>
            {isFaqExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#6B6B6B]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
            )}
          </button>

          {isFaqExpanded && (
            <div className="px-4 pb-4 divide-y divide-[#ECECEC] text-xs">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.q} className="py-2.5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-bold text-[#1B1B1B] py-1"
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#6B6B6B] ml-2 font-mono">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="text-[#6B6B6B] mt-1 leading-relaxed pl-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </main>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default ArtisanHelpPage;
