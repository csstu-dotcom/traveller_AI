import React, { useState,useEffect } from 'react';
import  { loginUser} from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice';
// import react-cookies
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  // react-cookies
  const [cookies, setCookie] = useCookies(['user']);
  

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the authentication logic
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, name });
    if (isLogin) {
      dispatch(loginUser({ email, password })).then((data) => {
        if (data.payload.success === true) {
          console.log(data.payload);
          // react-cookies
          setCookie('user', data.payload.token, { path: '/' });
          toast.success("User logged in successfully");
          setTimeout(() => {
            window.location.href = '/create-trip';
          }, 2000);
        }
        else {
          console.log(data.payload);
          toast.error(data.payload.message);
        }
      });
    } else {
      dispatch(registerUser({ email, password, name,code })).then((data) => {
        if (data.payload.success === true) {
          
          console.log(data.payload);
          // react-cookies
          setCookie('user', data.payload.token, { path: '/' });
          toast.success("User registered successfully");
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          
        }
        else {
          console.log(data.payload);
          toast.error(data.payload.message);
        }
      });
    }

  };

  useEffect(() => {
    toast.success("Welcome to Login Page");
  }
  , []);

  return (
    <>
    {/* <Toaster /> */}
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
    <h2 className="h4 fw-bold mb-4 text-center">
      {isLogin ? 'Login' : 'Sign Up'}
    </h2>
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      {!isLogin && (
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="form-control"
            required
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary w-100">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
    </form>
    <div className="mt-3 text-center">
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="btn btn-link p-0 text-decoration-none"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  </div>
</div>

    </>
  );
};

export default AuthForm;

