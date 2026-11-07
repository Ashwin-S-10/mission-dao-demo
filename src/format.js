import { yoctoToNear } from "./units.js";

/**
 * Formats yoctoNEAR for display, e.g. formatNear("1234500000000000000000000") -> "1.23 NEAR".
 * Rounds half up to `digits` decimal places and keeps thousands separators on the whole part.
 */
export function formatNear(yocto, digits = 2) {
  if (!Number.isInteger(digits) || digits < 0 || digits > 24) throw new Error("digits must be an integer from 0 to 24");
  const [whole, frac = ""] = yoctoToNear(yocto).split(".");
  const padded = frac.padEnd(digits + 1, "0");
  let kept = BigInt(whole + padded.slice(0, digits));
  if (Number(padded[digits]) >= 5) kept += 1n;
  const s = kept.toString().padStart(digits + 1, "0");
  const w = s.slice(0, s.length - digits) || "0";
  const f = digits ? s.slice(-digits) : "";
  const grouped = w.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${grouped}${f ? `.${f}` : ""} NEAR`;
}

/** Parses a display string such as "1,234.5 NEAR" back to yoctoNEAR. */
export function parseNear(text) {
  const m = String(text).trim().match(/^([\d,]+)(?:\.(\d{1,24}))?(?:\s*NEAR)?$/i);
  if (!m) throw new Error(`not a NEAR amount: ${text}`);
  const whole = m[1].replace(/,/g, "");
  return (BigInt(whole) * 10n ** 24n + BigInt((m[2] ?? "").padEnd(24, "0"))).toString();
}
