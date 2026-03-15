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
