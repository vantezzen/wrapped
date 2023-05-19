// Format seconds into a human readable format
// e.g. 3600 => { amount: 1, unit: "hours" }
const units = [
  { unit: "months", seconds: 60 * 60 * 24 * 30 },
  { unit: "weeks", seconds: 60 * 60 * 24 * 7 },
  { unit: "days", seconds: 60 * 60 * 24 },
  { unit: "hours", seconds: 60 * 60 },
  { unit: "minutes", seconds: 60 },
  { unit: "seconds", seconds: 1 },
];

// Try to keep the amount above this number
// This is to prevent the amount from being too small
// because we are using a most fitting unit
const minimumAmount = 10;

export default function formatTimeLength(seconds: number): {
  amount: number;
  unit: string;
} {
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    const amount = seconds / unit.seconds;
    if (amount > minimumAmount) {
      return {
        amount: Math.round(amount),
        unit: unit.unit,
      };
    }
  }
  return {
    amount: Math.round(seconds),
    unit: "seconds",
  };
}
