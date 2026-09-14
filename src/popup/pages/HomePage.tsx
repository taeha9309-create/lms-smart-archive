import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CourseList from "../components/CourseList";
import type { Course } from "../data/courses";
import type { LmsSnapshot, LmsWeek } from "../../types/lms";

const fallbackWeeks: LmsWeek[] = Array.from({ length: 8 }, (_, index) => ({
  title: `${index + 1}주차`,
  files: [{ name: `강의자료_${index + 1}주차.pdf`, url: "#" }],
}));

function HomePage() {
  const [query, setQuery] = useState("");
  const [snapshot, setSnapshot] = useState<LmsSnapshot | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<LmsWeek | null>(null);

  useEffect(() => {
    void chrome.storage.local.get(["lmsArchiveSnapshot"]).then((result) => {
      if (result.lmsArchiveSnapshot) setSnapshot(result.lmsArchiveSnapshot);
    });
  }, []);

  const liveCourse: Course | undefined = snapshot ? {
    name: snapshot.course,
    files: snapshot.weeks.reduce((total, week) => total + week.files.length, 0),
    color: "blue",
    weeks: snapshot.weeks,
  } : undefined;
  const goHome = () => { setSelectedCourse(null); setSelectedWeek(null); };
  const goCourse = () => setSelectedWeek(null);
  const weeks = selectedCourse?.weeks?.length ? selectedCourse.weeks : fallbackWeeks;
  const courses = liveCourse ? [liveCourse] : undefined;

  return (
    <main className="popup-shell">
      <Header />
      <section className="archive-content" aria-label="파일 탐색기 홈">
        {selectedCourse ? (
          <>
            <button className="back-button" type="button" onClick={selectedWeek ? goCourse : goHome}>‹ 뒤로</button>
            <div className="detail-heading"><span className="folder-icon folder-blue" aria-hidden="true">▰</span><div><p className="eyebrow">과목</p><h2>{selectedCourse.name}</h2></div></div>
            {selectedWeek ? (
              <section className="file-section"><p className="eyebrow">{selectedWeek.title} 파일</p><h2>수업 자료</h2><div className="file-list">{selectedWeek.files.map((file) => <a className="file-item" href={file.url} target="_blank" rel="noreferrer" key={file.url}><span className="file-icon">📄</span><span><strong>{file.name}</strong><small>LMS 자료 열기</small></span></a>)}</div></section>
            ) : (
              <section className="week-section"><p className="eyebrow">주차별 자료</p><h2>주차 선택</h2><div className="week-list">{weeks.map((week) => <button className="week-item" type="button" key={week.title} onClick={() => setSelectedWeek(week)}><span><strong>{week.title}</strong><small>자료 {week.files.length}개</small></span><span className="chevron">›</span></button>)}</div></section>
            )}
          </>
        ) : (
          <><SearchBar value={query} onChange={setQuery} /><CourseList query={query} items={courses} onSelect={setSelectedCourse} /></>
        )}
      </section>
    </main>
  );
}

export default HomePage;
