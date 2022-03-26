import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/adminAuth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

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
      toast.error(message);
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
      <section className="heading">
        <h1>Login only for Admins</h1>
        <p>Login and start manage news</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
