import { describe, expect, it } from "vitest";
import { calculateAbvMetrics, calculateDilution, calculateRefractometerCorrection } from "./calculators";

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
});
