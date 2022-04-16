import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/adminAuth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';
import { FaSignInAlt } from 'react-icons/fa';
import style from '../styles/Login.module.css';

function Login() {
  const [formDate, setFormDate] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formDate;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastId: 'error',
        autoClose: 5000,
      });
    }

    if (isSuccess || admin) {
      navigate('/adminpanel');
    }
    dispatch(reset());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    toast.clearWaitingQueue();
    if (formDate.email.length > 0) {
      if (formDate.email.lastIndexOf('@') === -1)
        toast.warn('Wrong email', {
          position: 'bottom-right',
          hideProgressBar: true,
          toastId: 'email',
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const adminData = {
      email,
      password,
    };
    dispatch(login(adminData));
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className={style.heading}>
        <span className={style.icon}>
          <FaSignInAlt />
        </span>
        Login only for Admins
        <p className={style.paragraf}>Login and start manage news</p>
      </section>
      <section className={style.form}>
        <form onSubmit={onSubmit}>
          <div className={style.formGroup}>
            <input
              type="text"
              className={style.formControl}
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
            <input
              type="password"
              className={style.formControl}
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar
            limit={1}
          />
          <div className={style.formGroup}>
            <button type="submit" className={`${style.btn} ${style.btnBlock}`}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
