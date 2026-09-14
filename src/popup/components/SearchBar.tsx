type SearchBarProps = { value: string; onChange: (value: string) => void };

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="과목 또는 파일 검색" aria-label="과목 또는 파일 검색" />
    </label>
  );
}

export default SearchBar;
