export const STATE_LABOUR_RATES = {
  'Andhra Pradesh': {
    defaultRate: 200,
    categories: {
      'Wooden Toys / Kondapalli': 200,
      'Kalamkari Painting': 250,
      'Leather Puppetry': 220,
      'Etikoppaka Lacquerware': 190,
      'Handloom Weaving': 210
    }
  },
  'Telangana': {
    defaultRate: 210,
    categories: {
      'Pochampally Ikat': 260,
      'Cheriyal Scroll Painting': 240,
      'Nirmal Toys & Paintings': 200,
      'Bidriware': 280
    }
  },
  'Rajasthan': {
    defaultRate: 220,
    categories: {
      'Blue Pottery': 230,
      'Pichwai Painting': 300,
      'Block Printing (Bagru/Sanganer)': 210,
      'Puppet Making': 180,
      'Marble Inlay': 290
    }
  },
  'Karnataka': {
    defaultRate: 210,
    categories: {
      'Channapatna Wooden Toys': 190,
      'Mysore Silk Weaving': 270,
      'Bidriware Craft': 250,
      'Sandalwood Carving': 320
    }
  },
  'Tamil Nadu': {
    defaultRate: 205,
    categories: {
      'Tanjore Painting': 310,
      'Kanchipuram Silk': 280,
      'Bronze Casting': 300,
      'Toda Embroidery': 220
    }
  },
  'Kerala': {
    defaultRate: 240,
    categories: {
      'Aranmula Metal Mirror': 350,
      'Coir Handicrafts': 180,
      'Kasavu Weaving': 230,
      'Wooden Kathakali Masks': 260
    }
  },
  'Maharashtra': {
    defaultRate: 220,
    categories: {
      'Warli Painting': 200,
      'Paithani Saree Weaving': 300,
      'Kolhapuri Chappal': 210
    }
  },
  'Gujarat': {
    defaultRate: 215,
    categories: {
      'Patola Weaving': 320,
      'Kutch Embroidery / Rogan': 260,
      'Bandhani Tie & Dye': 210,
      'Mata ni Pachedi': 250
    }
  },
  'Jammu & Kashmir': {
    defaultRate: 250,
    categories: {
      'Cashmere Sozni Embroidery': 320,
      'Pashmina Weaving': 350,
      'Paper Mache': 220,
      'Walnut Wood Carving': 290
    }
  },
  'West Bengal': {
    defaultRate: 195,
    categories: {
      'Terracotta Pottery (Bankura)': 190,
      'Kantha Embroidery': 220,
      'Dokra Metal Craft': 240,
      'Patachitra Painting': 250
    }
  },
  'Uttar Pradesh': {
    defaultRate: 190,
    categories: {
      'Chikan Embroidery': 210,
      'Varanasi Silk Weaving': 270,
      'Brassware (Moradabad)': 230,
      'Wood Carving (Saharanpur)': 200
    }
  }
};

export const getStateLabourRate = (state = 'Andhra Pradesh', craftCategory = '') => {
  const stateData = STATE_LABOUR_RATES[state] || STATE_LABOUR_RATES['Andhra Pradesh'];
  if (craftCategory && stateData.categories[craftCategory]) {
    return stateData.categories[craftCategory];
  }
  return stateData.defaultRate;
};
