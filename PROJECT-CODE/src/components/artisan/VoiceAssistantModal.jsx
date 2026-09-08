import React, { useState, useRef } from 'react';
import { Mic, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';

const CATALOGER_API = 'http://localhost:8002';

export function VoiceAssistantModal({ isOpen, onClose, onCommandExecute }) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartListening = async () => {
    setError(null);
    setTranscript('');
    setCatalog(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudioToBackend(audioBlob);
      };

      mediaRecorder.start();
      setIsListening(true);

      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsListening(false);
        }
      }, 6000);
    } catch (err) {
      setError('Microphone access denied or unavailable.');
      setIsListening(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('source_lang', 'hi');

      const res = await fetch(`${CATALOGER_API}/generate-catalog-from-voice`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setTranscript(data.transcription);
      setCatalog(data.catalog);
    } catch (err) {
      setError('Could not process your voice. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmAction = () => {
    if (catalog && onCommandExecute) {
      onCommandExecute({ action: 'add-product', catalog });
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
          {catalog && (
            <Button variant="primary" size="md" onClick={handleConfirmAction} rightIcon={<ArrowRight className="w-4 h-4" />}>
              आगे बढ़ें / Use This
            </Button>
          )}
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center text-center gap-6 py-4">
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
            disabled={isListening || isProcessing}
            aria-label={isListening ? 'Listening...' : 'Tap to speak'}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg focus-ring ${
              isListening ? 'bg-error text-surface scale-105' : 'bg-primary text-surface hover:bg-primary-dark hover:scale-105 active:scale-95'
            }`}
          >
            <Mic className={`w-10 h-10 ${isListening ? 'animate-bounce' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-heading text-lg font-bold text-text-primary">
            {isListening
              ? 'सुन रहे हैं... (Listening...)'
              : isProcessing
              ? 'समझ रहे हैं... (Processing...)'
              : transcript
              ? 'सुनी गई बात (Understood):'
              : 'माइक दबाएं और बोलें (Tap Mic to Speak)'}
          </span>
        </div>

        {error && <p className="text-sm text-error font-medium">{error}</p>}

        {transcript && (
          <div className="w-full p-4 rounded-lg bg-primary/10 border border-primary/25 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2 text-primary text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Voice AI Recognition</span>
            </div>
            <p className="text-sm font-semibold text-text-primary">"{transcript}"</p>
            {catalog && (
              <div className="flex flex-col gap-1 mt-2 text-left text-sm">
                <p><strong>Title:</strong> {catalog.title}</p>
                <p><strong>Category:</strong> {catalog.category}</p>
                <div className="flex items-center gap-1.5 text-xs text-success font-bold mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Catalog generated</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}