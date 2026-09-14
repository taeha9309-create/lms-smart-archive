import type { LmsWeek } from "../../types/lms";

export type Course = { name: string; files: number; color: string; weeks?: LmsWeek[] };

export const courses: Course[] = [
  { name: "네트워크", files: 12, color: "blue" },
  { name: "운영체제", files: 8, color: "violet" },
  { name: "데이터통신", files: 15, color: "orange" },
  { name: "웹프로그래밍", files: 10, color: "green" },
];
