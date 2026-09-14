function Header() {
  return (
    <header className="archive-header">
      <div className="brand">
        <span className="brand-icon" aria-hidden="true">📚</span>
        <div>
          <h1>LMS Smart Archive</h1>
          <p>수업 자료를 한곳에서 찾아보세요</p>
        </div>
      </div>
      <button className="icon-button" type="button" aria-label="설정">
        <span aria-hidden="true">⚙</span>
      </button>
    </header>
  );
}

export default Header;
