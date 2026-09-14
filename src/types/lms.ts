export type LmsFile = { name: string; url: string };
export type LmsWeek = { title: string; files: LmsFile[] };
export type LmsSnapshot = {
  course: string;
  courseId: string | null;
  weeks: LmsWeek[];
  sourceUrl: string;
  capturedAt: string;
};

declare global {
  const chrome: {
    storage: {
      local: {
        set: (items: { lmsArchiveSnapshot: LmsSnapshot }) => Promise<void>;
        get: (keys: string[]) => Promise<{ lmsArchiveSnapshot?: LmsSnapshot }>;
      };
    };
  };
}
