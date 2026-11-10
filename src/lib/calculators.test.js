import { describe, expect, it } from "vitest";
import {
  calculateAbvMetrics,
  calculateDilution,
  calculatePrimingSugar,
  calculateRefractometerCorrection,
  calculateResidualCo2,
} from "./calculators";

describe("calculators", () => {
  it("calculates dilution result", () => {
    expect(calculateDilution(20, 16, 12)).toBe("6.67");
  });

  it("calculates ABV metrics", () => {
    expect(calculateAbvMetrics(12, 3)).toEqual({
      abv: "4.80",
      abw: "3.81",
      fermentationDegree: "75.0",
    });
  });

  it("calculates refractometer correction", () => {
    expect(calculateRefractometerCorrection(12, 6)).toEqual({
      correctedSg: "1.0114",
      correctedBlg: "2.92",
    });
  });

  it("calculates residual CO2 after fermentation", () => {
    expect(calculateResidualCo2(20).toFixed(2)).toBe("0.86");
    expect(calculateResidualCo2(10).toFixed(2)).toBe("1.20");
  });

  it("calculates priming glucose", () => {
    expect(calculatePrimingSugar(20, 2.5, 20, "glucose")).toEqual({
      residualCo2: "0.86",
      sugarPerLiter: "6.63",
      sugarTotal: "132.6",
    });
  });

  it("calculates priming sucrose", () => {
    expect(calculatePrimingSugar(20, 2.5, 20, "sucrose")).toEqual({
      residualCo2: "0.86",
      sugarPerLiter: "6.30",
      sugarTotal: "126.0",
    });
  });

  it("returns zero sugar when beer already holds the target CO2", () => {
    expect(calculatePrimingSugar(20, 1.0, 5, "glucose")).toEqual({
      residualCo2: "1.43",
      sugarPerLiter: "0.00",
      sugarTotal: "0.0",
    });
  });
});
