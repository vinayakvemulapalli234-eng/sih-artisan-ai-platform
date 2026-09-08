// Backend data model for Living Craft Graph
// Links Artisans -> Products -> Crafts -> Techniques -> Materials -> Regions -> Cultural Stories

export const CRAFT_GRAPH_NODES = [
  { id: 'craft-1', type: 'Craft', label: 'Kalamkari', description: 'Ancient hand-painted or block-printed cotton textile art.' },
  { id: 'craft-2', type: 'Craft', label: 'Blue Pottery', description: 'Traditional Jaipur pottery made with quartz powder, low-fire glaze.' },
  { id: 'craft-3', type: 'Craft', label: 'Cashmere Sozni', description: 'Fine needlework embroidery practiced on Pashmina in Kashmir.' },
  { id: 'craft-4', type: 'Craft', label: 'Kondapalli Toys', description: 'Soft wood carving painted with natural vegetable dyes.' },
  { id: 'craft-5', type: 'Craft', label: 'Pichwai Painting', description: 'Intricate devotional cloth paintings depicting Lord Krishna.' },
  
  { id: 'mat-1', type: 'Material', label: 'Organic Khadi Cotton' },
  { id: 'mat-2', type: 'Material', label: 'Natural Vegetable Dyes' },
  { id: 'mat-3', type: 'Material', label: 'Quartz Powder & Fuller Earth' },
  { id: 'mat-4', type: 'Material', label: 'Changthangi Goat Pashmina Wool' },
  { id: 'mat-5', type: 'Material', label: 'Tella Poniki Wood' },

  { id: 'tech-1', type: 'Technique', label: 'Freehand Bamboo Pen (Tamarind Twig)' },
  { id: 'tech-2', type: 'Technique', label: 'Low-Fire Quartz Moulding' },
  { id: 'tech-3', type: 'Technique', label: 'Fine Sozni Needlework' },
  { id: 'tech-4', type: 'Technique', label: 'Natural Lacquer Polishing' },

  { id: 'reg-1', type: 'Region', label: 'Srikalahasti & Machilipatnam', state: 'Andhra Pradesh' },
  { id: 'reg-2', type: 'Region', label: 'Jaipur', state: 'Rajasthan' },
  { id: 'reg-3', type: 'Region', label: 'Srinagar', state: 'Jammu & Kashmir' },
  { id: 'reg-4', type: 'Region', label: 'Kondapalli', state: 'Andhra Pradesh' },
];

export const CRAFT_GRAPH_EDGES = [
  { source: 'craft-1', target: 'mat-1', relation: 'uses_material' },
  { source: 'craft-1', target: 'mat-2', relation: 'uses_material' },
  { source: 'craft-1', target: 'tech-1', relation: 'employs_technique' },
  { source: 'craft-1', target: 'reg-1', relation: 'originated_in' },

  { source: 'craft-2', target: 'mat-3', relation: 'uses_material' },
  { source: 'craft-2', target: 'tech-2', relation: 'employs_technique' },
  { source: 'craft-2', target: 'reg-2', relation: 'originated_in' },

  { source: 'craft-3', target: 'mat-4', relation: 'uses_material' },
  { source: 'craft-3', target: 'tech-3', relation: 'employs_technique' },
  { source: 'craft-3', target: 'reg-3', relation: 'originated_in' },
];
