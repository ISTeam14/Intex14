import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // ✅ Add/remove login-background class to <body>
  useEffect(() => {
    document.body.classList.add('login-background');
    return () => document.body.classList.remove('login-background');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl =
      'https://intex14-backend-fpc2beauh7cmhfb6.eastus-01.azurewebsites.net/login?useCookies=true';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/home');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="row">
        <div className="card border-0 shadow rounded-3">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <div className="d-grid mb-2">
                  <br></br>
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <br/><br/>
                </div>
                <div className="password-toggle">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
