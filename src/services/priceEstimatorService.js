import { getStateLabourRate } from '../data/stateLabourRates';

export const calculateSuggestedPrice = ({
  materialCost = 250,
  workersCount = 1,
  workingDays = 1,
  labourCost = null,
  state = 'Andhra Pradesh',
  craftCategory = 'Wooden Toys / Kondapalli',
}) => {
  const parsedMaterial = Number(materialCost) || 0;
  const parsedWorkers = Number(workersCount) || 1;
  const parsedDays = Number(workingDays) || 1;
  const parsedLabour = Number(labourCost) || 0;

  // Use the artisan's own labour cost estimate as the source of truth.
  // Only fall back to the state rate table if they didn't provide one.
  let totalLabourCost;
  let dailyRate;

  if (parsedLabour > 0) {
    totalLabourCost = parsedLabour;
    dailyRate = Math.round(parsedLabour / (parsedWorkers * parsedDays));
  } else {
    dailyRate = getStateLabourRate(state, craftCategory);
    totalLabourCost = dailyRate * parsedWorkers * parsedDays;
  }

  // Logistics/platform fee scales with order size instead of a flat ₹100
  // (small items shouldn't be penalized the same as large ones)
  const subtotal = parsedMaterial + totalLabourCost;
  const logisticsAndPlatformFee = Math.max(20, Math.round(subtotal * 0.08));

  const estimatedCost = parsedMaterial + totalLabourCost + logisticsAndPlatformFee;

  // Recommended price adds ~18% artisan fair profit margin
  const recommendedPrice = Math.round((estimatedCost * 1.18) / 10) * 10;
  const minPrice = Math.round((recommendedPrice * 0.92) / 10) * 10;
  const maxPrice = Math.round((recommendedPrice * 1.08) / 10) * 10;

  return {
    materialCost: parsedMaterial,
    labourCost: totalLabourCost,
    dailyLabourRate: dailyRate,
    logisticsAndPlatformFee,
    estimatedCost,
    recommendedPrice,
    minPrice,
    maxPrice,
    state,
    craftCategory,
    tipText: "This price helps you cover your material and work. You can earn more with this price!"
  };
};