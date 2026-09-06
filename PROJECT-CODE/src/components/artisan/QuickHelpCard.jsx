import React from 'react';
import { Mic, Phone } from 'lucide-react';

/**
 * QuickHelpCard
 * Quick access to voice assistant and person-to-person phone support.
 * Exactly matches the bottom left card in the reference image.
 */
export function QuickHelpCard({
  onSpeakQuestion,
  onTalkToPerson,
  className = '',
}) {
  return (
    <div className={`p-5 rounded-3xl border border-border/80 bg-white flex flex-col justify-between shadow-xs ${className}`}>
      <div>
        <h3 className="font-heading text-base font-bold text-text-primary mb-3">
          Quick Help 💡
        </h3>

        <div className="space-y-3">
          {/* Button 1: Speak your question */}
          <button
            type="button"
            onClick={onSpeakQuestion}
            className="w-full p-3.5 rounded-2xl bg-[#E8F8F0] hover:bg-[#dcf4e7] border border-emerald-200/60 transition-all text-left flex items-center gap-3.5 group active:scale-98"
          >
            <div className="w-11 h-11 rounded-full bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-heading text-sm font-bold text-text-primary group-hover:text-emerald-800 transition-colors">
                Speak your question
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Talk in your language
              </p>
            </div>
          </button>

          {/* Button 2: Talk to a person */}
          <button
            type="button"
            onClick={onTalkToPerson}
            className="w-full p-3.5 rounded-2xl bg-[#EBF3FE] hover:bg-[#dfedfd] border border-blue-200/60 transition-all text-left flex items-center gap-3.5 group active:scale-98"
          >
            <div className="w-11 h-11 rounded-full bg-white text-blue-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-heading text-sm font-bold text-text-primary group-hover:text-blue-800 transition-colors">
                Talk to a person
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Get help from our team
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickHelpCard;
