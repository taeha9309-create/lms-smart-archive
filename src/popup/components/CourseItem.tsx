type CourseItemProps = {
  name: string;
  files: number;
  color: string;
  onSelect: () => void;
};

function CourseItem({ name, files, color, onSelect }: CourseItemProps) {
  return (
    <button className="course-item" type="button" onClick={onSelect}>
      <span className={`folder-icon folder-${color}`} aria-hidden="true">▰</span>
      <span className="course-info">
        <strong>{name}</strong>
        <small>자료 {files}개</small>
      </span>
      <span className="chevron" aria-hidden="true">›</span>
    </button>
  );
}

export default CourseItem;
