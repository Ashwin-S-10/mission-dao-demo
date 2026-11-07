const DECIMALS = 24;

/** Converts a NEAR amount such as "0.2" to yoctoNEAR as a string. */
export function nearToYocto(near) {
  const [whole, frac = ""] = String(near).split(".");
  if (frac.length > DECIMALS) throw new Error("too many decimal places");
  return (BigInt(whole || "0") * 10n ** BigInt(DECIMALS) + BigInt(frac.padEnd(DECIMALS, "0") || "0")).toString();
}

/** Converts yoctoNEAR to a NEAR amount string, trimming trailing zeros. */
export function yoctoToNear(yocto) {
  const s = String(yocto).padStart(DECIMALS + 1, "0");
  const whole = s.slice(0, -DECIMALS);
  const frac = s.slice(-DECIMALS).replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : whole;
}
