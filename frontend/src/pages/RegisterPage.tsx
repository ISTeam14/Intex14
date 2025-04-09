import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Header from '../components/Header';

function Register() {
  // state variables for email and passwords
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // state variable for error messages
  const [error, setError] = useState('');

  const handleLoginClick = () => {
    navigate('/');
  };

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // handle submit event for the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate email and passwords
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      // clear error message
      setError('');
      // post data to the /register api
      fetch('https://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        //.then((response) => response.json())
        .then((data) => {
          // handle success or error from the server
          console.log(data);
          if (data.ok) setError('Successful registration. Please log in.');
          else setError('Error registering.');
        })
        .catch((error) => {
          // handle network error
          console.error(error);
          setError('Error registering.');
        });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card border-0 shadow rounded-3 ">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Register
              </h5>
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
                  <div className="password-toggle">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="show-password"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="form-control"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="password-toggle">
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="show-password"
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <br />
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    onClick={handleLoginClick}
                  >
                    Go to Login
                  </button>
                </div>
              </form>
              <strong>{error && <p className="error">{error}</p>}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
