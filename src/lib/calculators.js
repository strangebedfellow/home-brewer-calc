import { convertToPlato, convertToSg } from "./conversions";

export const calculateDilution = (worthVolume, currentGravity, targetGravity) => {
  return ((worthVolume * currentGravity) / targetGravity - worthVolume).toFixed(2);
};

export const calculateAbvMetrics = (og, fg) => {
  const ogSg = Number(convertToSg(og));
  const fgSg = Number(convertToSg(fg));

  const abv = ((76.08 * (ogSg - fgSg)) / (1.775 - ogSg)) * (fgSg / 0.794);
  const fermentationDegree = ((ogSg - fgSg) / (ogSg - 1)) * 100;

  return {
    abv: abv.toFixed(2),
    abw: (abv / 1.26).toFixed(2),
    fermentationDegree: fermentationDegree.toFixed(1),
  };
};

export const calculateRefractometerCorrection = (ob, fb) => {
  const correctedSg =
    1.0 -
    (0.0044993 * ob) / 1.04 +
    (0.011774 * fb) / 1.04 +
    0.00027581 * Math.pow(ob / 1.04, 2) -
    0.0012717 * Math.pow(fb / 1.04, 2) -
    0.00000728 * Math.pow(ob / 1.04, 3) +
    0.000063293 * Math.pow(fb / 1.04, 3);

  return {
    correctedSg: correctedSg.toFixed(4),
    correctedBlg: convertToPlato(Number(correctedSg.toFixed(4))),
  };
};

// Masa 1 vol CO2 rozpuszczonego w 1 L piwa (gęstość CO2 w warunkach normalnych), g/L.
const CO2_GRAMS_PER_LITER_PER_VOLUME = 1.977;

// Gramy CO2 z 1 g cukru wg stechiometrii fermentacji:
// glukoza C6H12O6 -> 2 CO2, sacharoza C12H22O11 (po hydrolizie) -> 4 CO2.
const CO2_YIELD_PER_GRAM = {
  glucose: (2 * 44.01) / 180.16,
  sucrose: (4 * 44.01) / 342.3,
};

// CO2 pozostały w piwie po fermentacji (vol), wzór Tinsetha.
export const calculateResidualCo2 = (temperatureC) => {
  const temperatureF = temperatureC * 1.8 + 32;
  return 3.0378 - 0.050062 * temperatureF + 0.00026555 * Math.pow(temperatureF, 2);
};

export const calculatePrimingSugar = (volume, targetCo2, temperatureC, sugarType) => {
  const residualCo2 = calculateResidualCo2(temperatureC);
  const co2ToAdd = Math.max(0, targetCo2 - residualCo2);
  const sugarPerLiter = (co2ToAdd * CO2_GRAMS_PER_LITER_PER_VOLUME) / CO2_YIELD_PER_GRAM[sugarType];

  return {
    residualCo2: residualCo2.toFixed(2),
    sugarPerLiter: sugarPerLiter.toFixed(2),
    sugarTotal: (sugarPerLiter * volume).toFixed(1),
  };
};
