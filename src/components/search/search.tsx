import { navBarBlursSearch } from 'const';
import { useEffect, useState } from 'react';
import './search.scss';

function Search() {
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    function eventBlur(event: any) {
      const classNames = [...navBarBlursSearch]
  
      if (event && event.target) {
        const target = event.target as any;
  
        if (!checkClassNames(classNames, target.classList.value)) {
          setFocus(false);
        }
      }
    }

    document.addEventListener('click', eventBlur);

    return () => { document.removeEventListener('click', eventBlur) }

  }, [])

  function focusSearch() {
    setFocus(true)
  }

  function checkClassNames(classNames: string[], value: string): Boolean {
    for (const name of classNames) {
      if(value.indexOf(name) > -1){
        return true;
      }
    }

    return false;
  }
  
  return (
    <div onClick={focusSearch} className={`nav-search-container ${focus ? 'focus' : ''}`}>
      <div className="nav-search">
        <input type="text" className="search-input" placeholder="Tìm kiếm trên Facebook" />
      </div>
      <div className="nav-search-list">
        <div className="search-header">
          <h3 className="header-text">Tìm kiếm gần đây</h3>
        </div>
        <div className="search-item">
          <span className="search-item-icon"></span>
          <span className="search-item-text">Anh Thu Kieu</span>
        </div>
        <div className="search-item">
          <span className="search-item-icon"></span>
          <span className="search-item-text">Anh Thu Kieu</span>
        </div>
        <div className="search-item">
          <span className="search-item-icon"></span>
          <span className="search-item-text">Anh Thu Kieu</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
