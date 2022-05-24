import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase/config';
import './Register.css';

function Register() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard', { replace: true });
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={userInfo.name}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={userInfo.email}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Password"
        />
        <button
          className="register__btn"
          onClick={() =>
            registerWithEmailAndPassword(
              userInfo.name,
              userInfo.email,
              userInfo.password
            )
          }
        >
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
