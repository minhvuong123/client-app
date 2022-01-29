import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PopupNotify from 'components/popup-notify/popup-notify';
import PopupMessage from 'components/popup-message/popup-message';
import PopupAccount from 'components/popup-account/popup-account';
import Search from 'components/search/search';
import { navBarBlursAccount, navBarBlursMessenger, navBarBlursNofitication } from 'const';

import './nav-bar.scss';
import { useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';

function NavBar() {
  const [popupName, setPopupName] = useState('');
  const [focus, setFocus] = useState(false);
  const user = useSelector(SelectorAccessUser);

  useEffect(() => {
    function eventBlur(event: any) {
      const classNames = [...navBarBlursMessenger, ...navBarBlursNofitication, ...navBarBlursAccount]
  
      if (event && event.target) {
        const target = event.target as any;
  
        if (!checkClassNames(classNames, target.classList.value)) {
          setFocus(false);
          setPopupName('');
        }
      }
    }

    document.addEventListener('click', eventBlur);

    return () => { document.removeEventListener('click', eventBlur) }

  }, [])

  function checkClassNames(classNames: string[], value: string): Boolean {
    for (const name of classNames) {
      if(value.indexOf(name) > -1){
        return true;
      }
    }

    return false;
  }

  function popupRender(name: string) {
    switch (name) {
      case 'message': 
        return <PopupMessage />
      case 'notify': 
        return <PopupNotify />
      case 'account': 
        return <PopupAccount />
      default: return ''
    }
  }

  function changePopupName(name: string): void {
    setFocus(true);

    if(name === popupName) {
      setPopupName('');
    } else {
      setPopupName(name);
    }
  }

  return (
    <div className="nav-bar-container">
      <div className="nav-bar">
        <div className="nav-left">
          <a href="/">icon</a>
          <Search />
        </div>
        <div className="nav-middle">
          <ul className="nav-landing">
            <li className="landing-item">
              <NavLink to="/" className="item-icon"><span>Home</span></NavLink>
            </li>
            <li className="landing-item">
              <NavLink to="/friends" className="item-icon"><span>Friends</span></NavLink>
            </li>
            <li className="landing-item">
              <NavLink to="/watch" className="item-icon"><span>Watch</span></NavLink>
            </li>
            <li className="landing-item">
              <NavLink to="/groups" className="item-icon"><span>Groups</span></NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="user">
            <NavLink to={`/${user.user_name}`} className="user-link">
              <span className="user-icon"> </span>
              <span className="user-text">Nguyễn</span>
            </NavLink>
          </div>
          <div className="extension">
            <div onClick={() => changePopupName('message')} className="extension-messenger extension-item">Mes</div>
            <div onClick={() => changePopupName('notify')} className="extension-nofitication extension-item">Not</div>
            <div onClick={() => changePopupName('account')} className="extension-account extension-item">Acc</div>
          </div>
        </div>
        { focus && popupRender(popupName) }
      </div>
    </div>
  )
}

export default NavBar;
