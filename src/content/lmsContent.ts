import type { LmsSnapshot } from "../types/lms";

const courseSelector = ".coursename h1 a";
const weekSelector = "h3 a[href*='#section-']";

function cleanText(value: string | null | undefined): string {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function readSnapshot(): LmsSnapshot | null {
  const courseLink = document.querySelector<HTMLAnchorElement>(courseSelector);
  const course = cleanText(courseLink?.textContent);
  if (!courseLink || !course) return null;

  const courseId = new URL(courseLink.href, location.href).searchParams.get("id");
  const weeks = Array.from(document.querySelectorAll<HTMLAnchorElement>(weekSelector)).map((heading) => {
    const section = heading.closest("li.section, .section") ?? heading.parentElement?.parentElement;
    const files = Array.from(section?.querySelectorAll<HTMLAnchorElement>(".activityinstance a") ?? [])
      .map((link) => ({ name: cleanText(link.querySelector(".instancename")?.textContent ?? link.textContent), url: link.href }))
      .filter((file, index, all) => file.name.length > 0 && all.findIndex((candidate) => candidate.url === file.url) === index);
    return { title: cleanText(heading.textContent), files };
  }).filter((week, index, all) => week.title.length > 0 && all.findIndex((candidate) => candidate.title === week.title) === index);

  return { course, courseId, weeks, sourceUrl: location.href, capturedAt: new Date().toISOString() };
}

async function saveSnapshot() {
  const snapshot = readSnapshot();
  if (snapshot) await chrome.storage.local.set({ lmsArchiveSnapshot: snapshot });
}

void saveSnapshot();
const observer = new MutationObserver(() => void saveSnapshot());
observer.observe(document.body, { childList: true, subtree: true });
