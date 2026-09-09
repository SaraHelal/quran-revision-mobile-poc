import type { MasteryStatus, ReviewTiming } from "@/types";

const REVIEW_INTERVAL_DAYS: Record<MasteryStatus, number> = {
  Weak: 1,
  Good: 3,
  Excellent: 7,
};

export const calculateNextReviewDate = (
  status: MasteryStatus,
  reviewAt: Date,
): string => {
  const nextReviewDate = new Date(reviewAt);
  nextReviewDate.setDate(
    nextReviewDate.getDate() + REVIEW_INTERVAL_DAYS[status],
  );
  nextReviewDate.setHours(0, 0, 0, 0);
  return nextReviewDate.toISOString();
};

export const isReviewDue = (
  nextReviewDate: string | null,
  currentDate: Date = new Date(),
): boolean => {
  if (!nextReviewDate) return true;
  const reviewDate = new Date(nextReviewDate);
  if (Number.isNaN(reviewDate.getTime())) return true;
  return reviewDate.getTime() <= currentDate.getTime();
};

export const getReviewTiming = (
  nextReviewDate: string | null,
  currentDate: Date = new Date(),
): ReviewTiming => {
  if (nextReviewDate === null) return "dueToday";
  const reviewTime = new Date(nextReviewDate).setHours(0, 0, 0, 0);
  const todayTime = new Date(currentDate).setHours(0, 0, 0, 0);
  if (reviewTime < todayTime) return "overdue";
  return "dueToday";
};
