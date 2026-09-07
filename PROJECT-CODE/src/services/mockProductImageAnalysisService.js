/**
 * SIH Artisan Platform — Mock Product Image Analysis Service
 * 
 * Simulates AI computer vision analysis on craft photos to assist low-literacy artisans.
 * Identifies craft category, materials, technique, and suggested tags.
 * 
 * All outputs are strictly suggestions that the artisan can review and override.
 */

class MockProductImageAnalysisService {
  /**
   * Analyze an image (data URL or photo sample) and return craft attribute suggestions
   * @param {string} imageDataUri
   * @returns {Promise<Object>}
   */
  async analyzeImage(imageDataUri) {
    // Simulate network and computer vision latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Realistic craft analysis matching Indian GI crafts
    return {
      suggestedName: 'Hand-carved Wooden Stacking Ring Toy',
      craftType: 'Channapatna Toy Craft (GI Certified)',
      material: 'Ivory Wood (Wrightia Tinctoria) & Natural Lac',
      isHandmade: true,
      technique: 'Traditional Lathe Turning & Vegetable Dye Buffing',
      region: 'Channapatna, Karnataka, India',
      detectedColors: ['Organic Yellow (Turmeric)', 'Natural Vermillion', 'Forest Green'],
      suggestedDescription:
        'Traditional Indian eco-friendly wooden stacking toy handcrafted on a hand lathe using seasoned ivory wood and colored with natural non-toxic vegetable dyes. Smooth edges, 100% child-safe.',
      confidenceScore: 0.94,
      isAiSuggestion: true,
    };
  }
}

export const mockProductImageAnalysisService = new MockProductImageAnalysisService();
export default mockProductImageAnalysisService;
