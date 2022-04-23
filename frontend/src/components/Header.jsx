import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout, reset } from '../features/adminAuth/authSlice';
import style from '../styles/Header.module.css';
import { RiMenuFill } from 'react-icons/ri';
import logo from '../logo.png';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);
  const [menuVisible, setMenuVisible] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className={style.navbar + ' ' + style.container}>
      <a href="/" className={style.logo}>
        <img src={logo} alt="NewsApp" />
      </a>
      {admin ? (
        <>
          <input
            type="checkbox"
            id={style.toggler}
            checked={menuVisible}
            onChange={(e) => setMenuVisible(e.target.menuVisible)}
          ></input>
          <label htmlFor={style.toggler}>
            <i>
              <RiMenuFill key={'123'} />
            </i>
          </label>
          <div className={style.menu}>
            <ul className={style.list}>
              <li>
                <a
                  href="/adminpanel"
                  onClick={() => setMenuVisible(!menuVisible)}
                >
                  Admin Panel
                </a>
              </li>
              <li>
                <a onClick={onLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <ul className={style.list} style={{ padding: '0px' }}>
          <li>
            <a href="/admin">Login</a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Header;
