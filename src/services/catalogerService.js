const CATALOGER_BASE = 'http://127.0.0.1:8001';

export const generateCatalogFromText = async (description) => {
  try {
    const formData = new FormData();
    formData.append('text', description);
    const res = await fetch(`${CATALOGER_BASE}/generate-catalog`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to generate description' };
    }
    return { success: true, catalog: data };
  } catch (err) {
    return { success: false, error: 'Could not reach the AI cataloger service' };
  }
};

export const generateCatalogFromAudio = async (audioBlob, sourceLang = 'te') => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('source_lang', sourceLang);
    const res = await fetch(`${CATALOGER_BASE}/generate-catalog-from-voice`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to generate description' };
    }
    return { success: true, transcription: data.transcription, catalog: data.catalog };
  } catch (err) {
    return { success: false, error: 'Could not reach the AI cataloger service' };
  }
};
