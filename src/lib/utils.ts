export function toBanglaNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPrice(value: number): string {
  return `৳${toBanglaNumber(value)}`;
}

export function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    piece: "টি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    gram: "গ্রাম",
  };

  return units[unit.toLowerCase()] ?? unit;
}
