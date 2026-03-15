import { describe, expect, it } from "vitest";
import { convertToPlato, convertToSg } from "./conversions";

describe("conversions", () => {
  it("converts 12 BLG to SG", () => {
    expect(convertToSg(12)).toBe("1.048");
  });

  it("converts 1.048 SG to BLG", () => {
    expect(convertToPlato(1.048)).toBe("11.91");
  });

  it("keeps 0 BLG as 1.000 SG", () => {
    expect(convertToSg(0)).toBe("1.000");
  });
});
