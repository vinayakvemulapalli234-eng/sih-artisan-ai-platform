import { getStateLabourRate } from '../data/stateLabourRates';

export const calculateSuggestedPrice = ({
  materialCost = 250,
  workersCount = 1,
  workingDays = 1,
  state = 'Andhra Pradesh',
  craftCategory = 'Wooden Toys / Kondapalli',
  customLabourRate = null
}) => {
  const parsedMaterial = Number(materialCost) || 0;
  const parsedWorkers = Number(workersCount) || 1;
  const parsedDays = Number(workingDays) || 1;

  // Determine daily labour rate based on state database or custom input
  const dailyRate = customLabourRate 
    ? Number(customLabourRate) 
    : getStateLabourRate(state, craftCategory);

  const totalLabourCost = dailyRate * parsedWorkers * parsedDays;
  const logisticsAndPlatformFee = 100;

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
