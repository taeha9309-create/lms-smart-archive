import CourseItem from "./CourseItem";
import { courses, type Course } from "../data/courses";

type CourseListProps = { onSelect: (course: Course) => void; query: string; items?: Course[] };

function CourseList({ onSelect, query, items = courses }: CourseListProps) {
  const visibleCourses = items.filter((course) =>
    course.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="course-section" aria-labelledby="semester-title">
      <div className="section-heading">
        <div><p className="eyebrow">현재 학기</p><h2 id="semester-title">2026년 2학기</h2></div>
        <span className="course-count">{visibleCourses.length}개 과목</span>
      </div>
      <div className="course-list">
        {visibleCourses.length > 0 ? visibleCourses.map((course) => (
          <CourseItem key={course.name} {...course} onSelect={() => onSelect(course)} />
        )) : <p className="empty-state">검색 결과가 없습니다.</p>}
      </div>
    </section>
  );
}

export default CourseList;
