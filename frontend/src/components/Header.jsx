import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/adminAuth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (

    <header className='header'>
      <div className="logo">
        <Link to='/'>News APP</Link>
      </div>
      <ul>
        {admin ? (
          <>
            <li>
              <button className='btn' onClick={()=>navigate("/adminpanel")}>Admin Panel</button>
              
            </li>
            <li>
              <button className="btn" onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/admin">
              Admin Panel
            </Link>
          </li>
        )}
      </ul>
    </header>
  )
}

export default Header