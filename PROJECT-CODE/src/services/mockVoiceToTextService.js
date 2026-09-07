/**
 * Mock Voice-to-Text & AI Extraction Service
 * Isolated service for regional speech transcription and product attribute extraction.
 * Person 5 (AI) or real Whisper/Speech API can drop in here without modifying UI code.
 */

const SAMPLE_TRANSCRIPTIONS = {
  te: 'ఇది కొండపల్లి బొమ్మ. చెక్కతో తయారుచేశాను. ఎన్నో ఏళ్ల క్రితం నుండి ఉంది. పిల్లల కోసం ముద్దుగా ఉంటుంది.',
  hi: 'यह पारंपरिक कोंडापल्ली लकड़ी का खिलौना है। हमने इसमें हल्की पूनिकी लकड़ी और सुरक्षित प्राकृतिक रंगों का उपयोग किया है।',
  en: 'This is a traditional Kondapalli wooden toy handmade with seasoned soft wood and natural vegetable colors.',
  ta: 'இது கொண்டபல்லி மர பொம்மை. பாரம்பரிய இயற்கை மரத்தில் கைவினைக் கலைஞர்களால் செய்யப்பட்டது.',
  kn: 'ಇದು ಕೊಂಡಪಲ್ಲಿ ಮರದ ಆಟಿಕೆ. ನೈಸರ್ಗಿಕ ಮರ ಮತ್ತು ಬಣ್ಣಗಳಿಂದ ಕೈಯಿಂದ ಮಾಡಲ್ಪಟ್ಟಿದೆ.',
  bn: 'এটি একটি ঐতিহ্যবাহী কোন্ডাপল্লী কাঠের খেলনা, প্রাকৃতিক কাঠ ও রঙে হাতে তৈরি।',
  mr: 'हे कोंडापल्ली लाकडी खेळणे आहे, नैसर्गिक लाकूड आणि रंगांपासून हाताने तयार केलेले.',
};

class MockVoiceToTextService {
  /**
   * Simulate audio recording and speech-to-text conversion
   * @param {string} langCode - Language code ('te', 'hi', 'en', etc.)
   * @returns {Promise<{ transcription: string, language: string, confidence: number }>}
   */
  async transcribe(langCode = 'te') {
    // Simulate speech-to-text conversion delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const transcription =
      SAMPLE_TRANSCRIPTIONS[langCode] || SAMPLE_TRANSCRIPTIONS['te'];

    return {
      transcription,
      language: langCode,
      confidence: 0.96,
    };
  }

  /**
   * Simulate AI extraction of structured craft attributes from voice
   * @param {string} text - Spoken text transcript
   * @returns {Promise<{ productName: string, material: string, craft: string, handmade: string, description: string }>}
   */
  async extractCraftDetails(text = '') {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      productName: 'Kondapalli Wooden Toy',
      material: 'Wood',
      craft: 'Kondapalli',
      handmade: 'Yes',
      description:
        'Traditional Kondapalli wooden toy handcrafted by skilled artisans. Made from natural wood and coloured with non-toxic paints.',
    };
  }
}

export const mockVoiceToTextService = new MockVoiceToTextService();
