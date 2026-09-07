/**
 * Mock Camera Service
 * Isolated service for simulated or device photo capture.
 * When Capacitor / MediaDevices is connected, replace internals here without touching UI components.
 */

const SAMPLE_CRAFT_PHOTOS = [
  {
    id: 'photo-kondapalli-elephant',
    title: 'Kondapalli Wooden Toy',
    url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    craft: 'Kondapalli',
    material: 'Wood',
  },
  {
    id: 'photo-handmade-bag',
    title: 'Handmade Bag',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    craft: 'Handloom',
    material: 'Natural Fiber',
  },
  {
    id: 'photo-clay-owl',
    title: 'Clay Owl',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    craft: 'Terracotta',
    material: 'Clay',
  },
];

class MockCameraService {
  /**
   * Get pre-loaded realistic sample craft photos for testing & demo
   */
  getSamplePhotos() {
    return SAMPLE_CRAFT_PHOTOS;
  }

  /**
   * Simulate camera capture or trigger native file input
   * @returns {Promise<{ url: string, name: string }>}
   */
  async capturePhoto(sampleId) {
    // Simulating camera shutter latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (sampleId) {
      const found = SAMPLE_CRAFT_PHOTOS.find((p) => p.id === sampleId);
      if (found) return { url: found.url, name: found.title };
    }

    return {
      url: SAMPLE_CRAFT_PHOTOS[0].url,
      name: SAMPLE_CRAFT_PHOTOS[0].title,
    };
  }

  /**
   * Handle user-uploaded file from HTML input
   * @param {File} file
   * @returns {Promise<{ url: string, name: string }>}
   */
  async handleFileUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          url: e.target?.result || SAMPLE_CRAFT_PHOTOS[0].url,
          name: file.name.replace(/\.[^/.]+$/, ''),
        });
      };
      reader.readAsDataURL(file);
    });
  }
}

export const mockCameraService = new MockCameraService();
