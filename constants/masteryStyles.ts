import type { MasteryStatus } from "@/types";

export const masteryStyles: Record<
  MasteryStatus,
  { backgroundColor: string; color: string }
> = {
  Weak: {
    backgroundColor: "#ffe2e2",
    color: "#B91C1C",
  },
  Good: {
    backgroundColor: "#fef3c6",
    color: "#b45309",
  },
  Excellent: {
    backgroundColor: "#d0fae5",
    color: "#047857",
  },
};
