// Small hex color helpers (no dependencies).
export const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
export const hex = (r, g, b) => "#" + [r, g, b].map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0")).join("");

// "#rrggbb" + opacity (0..1) -> "#rrggbbaa"
export const alpha = (h, o) => h.slice(0, 7) + Math.round(o * 255).toString(16).padStart(2, "0");

// Blend a toward b by t (0..1).
export const mix = (a, b, t) => {
  const [r1, g1, b1] = rgb(a), [r2, g2, b2] = rgb(b);
  return hex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
};

export const bare = (h) => h.slice(1);
