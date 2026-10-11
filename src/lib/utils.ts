/**
 * Convert a number into Bangla digits.
 * Example: 1250.5 -> ১,২৫০.৫
 */
export function toBanglaNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "০";
  }

  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as Bangladeshi Taka.
 * Example: 125 -> ৳১২৫
 */
export function formatPrice(value: number): string {
  return `৳${toBanglaNumber(value)}`;
}

/**
 * Convert product units into Bangla labels.
 */
export function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    piece: "টি",
    pieces: "টি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    gram: "গ্রাম",
    grams: "গ্রাম",
    pound: "পাউন্ড",
    packet: "প্যাকেট",
    bottle: "বোতল",
    dozen: "ডজন",
  };

  return units[unit.trim().toLowerCase()] ?? unit;
}

/**
 * Return a readable Bangla label for price movement.
 */
export function getPriceChangeLabel(direction: "up" | "down" | "flat"): string {
  switch (direction) {
    case "up":
      return "দাম বেড়েছে";
    case "down":
      return "দাম কমেছে";
    default:
      return "দাম অপরিবর্তিত";
  }
}
