import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';

/**
 * VoiceAssistantModal Component
 * Large symbol/voice-driven interface for low-literacy artisans to speak commands
 */
export function VoiceAssistantModal({
  isOpen,
  onClose,
  onCommandExecute,
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedAction, setDetectedAction] = useState(null);

  const sampleCommands = [
    { label: 'नया उत्पाद जोड़ें', action: 'add-product', text: 'नया उत्पाद जोड़ें (Add Product)' },
    { label: 'आज के ऑर्डर दिखाओ', action: 'orders', text: 'मेरे ऑर्डर दिखाओ (My Orders)' },
    { label: 'मेरी कमाई कितनी है?', action: 'overview', text: 'मेरी कुल कमाई (Total Sales)' },
    { label: 'मदद चाहिए', action: 'help', text: 'सहायता केंद्र (Help & Support)' },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    setDetectedAction(null);

    // Simulated speech-to-text recognition
    setTimeout(() => {
      setIsListening(false);
      setTranscript('नया कलमकारी उत्पाद जोड़ना है (Add new Kalamkari craft)');
      setDetectedAction({
        action: 'add-product',
        title: 'उत्पाद जोड़ने के लिए खोला जा रहा है...',
      });
    }, 1800);
  };

  const handleSelectPreset = (cmd) => {
    setTranscript(cmd.text);
    setDetectedAction({
      action: cmd.action,
      title: `${cmd.text} खोला जा रहा है...`,
    });
  };

  const handleConfirmAction = () => {
    if (detectedAction && onCommandExecute) {
      onCommandExecute(detectedAction.action);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="बोलकर काम करें / Speak to App"
      description="Tap the big microphone and speak in Hindi, Telugu, or your language"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" size="sm" onClick={onClose}>
            बंद करें / Close
          </Button>
          {detectedAction && (
            <Button
              variant="primary"
              size="md"
              onClick={handleConfirmAction}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              आगे बढ़ें / Open Page
            </Button>
          )}
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center text-center gap-6 py-4">
        {/* Giant Pulse Microphone Button */}
        <div className="relative flex items-center justify-center">
          {isListening && (
            <>
              <div className="absolute w-36 h-36 rounded-full bg-primary/20 animate-ping" />
              <div className="absolute w-28 h-28 rounded-full bg-primary/30 animate-pulse" />
            </>
          )}

          <button
            type="button"
            onClick={handleStartListening}
            aria-label={isListening ? 'Listening to your voice...' : 'Tap to speak'}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg focus-ring ${
              isListening
                ? 'bg-error text-surface scale-105'
                : 'bg-primary text-surface hover:bg-primary-dark hover:scale-105 active:scale-95'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Status Prompt */}
        <div className="flex flex-col gap-1">
          <span className="font-heading text-lg font-bold text-text-primary">
            {isListening
              ? 'कृपया बोलिए, हम सुन रहे हैं... (Listening...)'
              : transcript
              ? 'सुनी गई बात (Understood):'
              : 'माइक दबाएं और बोलें (Tap Mic to Speak)'}
          </span>
          <p className="text-xs text-text-secondary max-w-xs">
            {isListening
              ? 'आप जो कहना चाहते हैं, स्पष्ट आवाज़ में बोलें'
              : 'You can speak in any Indian language. Our AI will understand.'}
          </p>
        </div>

        {/* Transcribed text banner */}
        {transcript && (
          <div className="w-full p-4 rounded-lg bg-primary/10 border border-primary/25 flex flex-col gap-2 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-primary text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Voice AI Recognition</span>
            </div>
            <p className="text-sm font-semibold text-text-primary font-serif">
              "{transcript}"
            </p>
            {detectedAction && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-success font-bold mt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{detectedAction.title}</span>
              </div>
            )}
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="flex flex-col gap-2 w-full pt-2 border-t border-border/70 text-left">
          <span className="text-[11px] font-semibold text-text-secondary uppercase">
            या इन पर सीधे टैप करें (Or tap directly):
          </span>
          <div className="grid grid-cols-2 gap-2">
            {sampleCommands.map((cmd, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectPreset(cmd)}
                className="p-2.5 rounded-md bg-neutral-100 hover:bg-neutral-200 border border-border text-xs font-medium text-text-primary text-left transition-colors focus-ring"
              >
                {cmd.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
