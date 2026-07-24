import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site navigation", () => {
  it("uses root-qualified links for main-page sections", () => {
    const sectionLinks = site.navLinks.filter((link) => link.href.includes("#"));

    expect(sectionLinks.length).toBeGreaterThan(0);
    expect(sectionLinks.every((link) => link.href.startsWith("/#"))).toBe(true);
  });
});
