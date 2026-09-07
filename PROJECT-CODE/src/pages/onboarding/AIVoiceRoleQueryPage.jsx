import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Palette, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { textToSpeechService } from '../../services/TextToSpeechService';
import { speechToTextService } from '../../services/SpeechToTextService';
import { getAppLanguage, t } from '../../i18n/translations';
import { ROLES } from '../../lib/constants';

/**
 * AI Voice Role Query Screen (Phase 3 & 4)
 * 
 * Plays a spoken greeting in the chosen language:
 * "Welcome to KalaKriti. What would you like to use the app as?"
 * Actively listens via microphone while displaying 3 large, accessible tap cards.
 * Voice detection or tap immediately routes to the role-specific login screen.
 */
export function AIVoiceRoleQueryPage({ onSelectRole, onBack }) {
  const lang = getAppLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const greetingText = t('voiceRoleGreeting', lang);

  // Play spoken greeting and start listening on mount
  useEffect(() => {
    let isMounted = true;

    const playAndListen = async () => {
      setIsSpeaking(true);
      await textToSpeechService.speak(greetingText, lang, {
        onStart: () => isMounted && setIsSpeaking(true),
        onEnd: () => {
          if (!isMounted) return;
          setIsSpeaking(false);
          startListening();
        },
        onError: () => {
          if (!isMounted) return;
          setIsSpeaking(false);
          startListening();
        },
      });
    };

    const timer = setTimeout(playAndListen, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      textToSpeechService.stop();
      speechToTextService.stopListening();
    };
  }, [lang]);

  const startListening = () => {
    setIsListening(true);
    speechToTextService.startListening(lang, {
      onStart: () => setIsListening(true),
      onResult: (text, isFinal) => {
        setTranscript(text);
        const detected = speechToTextService.detectRoleIntent(text);
        if (detected) {
          speechToTextService.stopListening();
          handleChooseRole(detected);
        }
      },
      onError: () => setIsListening(false),
      onEnd: () => setIsListening(false),
    });
  };

  const handleReplayVoice = () => {
    textToSpeechService.speak(greetingText, lang, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  const handleChooseRole = (role) => {
    textToSpeechService.stop();
    speechToTextService.stopListening();
    if (onSelectRole) onSelectRole(role);
  };

  const roles = [
    {
      id: ROLES.ARTISAN,
      title: t('artisanRole', lang),
      desc: t('artisanDesc', lang),
      icon: Palette,
      color: 'bg-[#E8F8F0] border-emerald-300 hover:border-emerald-600 text-emerald-900',
      iconBg: 'bg-[#15803d] text-white',
      badge: 'Creator / Karigar',
    },
    {
      id: ROLES.CUSTOMER,
      title: t('customerRole', lang),
      desc: t('customerDesc', lang),
      icon: ShoppingBag,
      color: 'bg-[#FEF8E7] border-amber-300 hover:border-amber-600 text-amber-900',
      iconBg: 'bg-amber-600 text-white',
      badge: 'Buyer / Grahak',
    },
    {
      id: ROLES.ADMIN,
      title: t('adminRole', lang),
      desc: t('adminDesc', lang),
      icon: ShieldCheck,
      color: 'bg-[#EBF3FE] border-blue-300 hover:border-blue-600 text-blue-900',
      iconBg: 'bg-blue-700 text-white',
      badge: 'Moderator / Admin',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between py-8 px-4 sm:px-6 max-w-md mx-auto w-full">
      <div>
        {/* Top Header & Replay Audio Button */}
        <div className="flex items-center justify-between mb-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-gray-500 hover:text-gray-900 py-1.5 px-3 rounded-full bg-gray-100 font-medium"
            >
              ← Change Language
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleReplayVoice}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isSpeaking
                ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Hear prompt again"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeaking ? 'Speaking...' : 'Listen again'}</span>
          </button>
        </div>

        {/* AI Voice Prompt Callout Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs text-center mb-6">
          <h1 className="font-heading text-xl font-bold text-gray-900 leading-snug">
            {greetingText}
          </h1>

          {/* Voice Waveform & Mic Status */}
          <div className="flex flex-col items-center justify-center my-4">
            <button
              type="button"
              onClick={isListening ? () => speechToTextService.stopListening() : startListening}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 ${
                isListening
                  ? 'bg-red-500 text-white ring-4 ring-red-200 animate-pulse'
                  : 'bg-[#15803d] text-white hover:bg-[#15803d]/90'
              }`}
              aria-label="Toggle voice input"
            >
              <Mic className="w-8 h-8" />
            </button>

            <div className="flex items-center gap-1.5 mt-3">
              <span className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-[#15803d]'}`} />
              <p className="text-xs font-semibold text-gray-600">
                {isListening ? t('listeningVoice', lang) : 'Tap mic to speak your role'}
              </p>
            </div>

            {transcript && (
              <div className="mt-2.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 italic">
                "{transcript}"
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 font-medium pt-2 border-t border-gray-100">
            {t('tapOrSpeak', lang)}
          </p>
        </div>

        {/* 3 Role Tappable Options */}
        <div className="flex flex-col gap-3.5">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleChooseRole(r.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-150 active:scale-98 flex items-center justify-between group shadow-xs hover:shadow-md cursor-pointer ${r.color}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${r.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-base">
                        {r.title}
                      </span>
                    </div>
                    <p className="text-xs opacity-80 mt-0.5 line-clamp-2">
                      {r.desc}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-gray-700 shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center pt-6 pb-2">
        <p className="text-[11px] text-gray-400">
          KalaKriti • Indian Heritage Craft Platform
        </p>
      </div>
    </div>
  );
}

export default AIVoiceRoleQueryPage;
