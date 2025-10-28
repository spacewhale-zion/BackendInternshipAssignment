import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '', // For password confirmation
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Client-side password match check
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Only send name, email, and password (not password2)
      const res = await api.post<{ token: string }>('/auth/register', {
        name,
        email,
        password,
      });

      // On success, save token and redirect to dashboard
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError<{ errors: { msg: string }[] }>;
      const errors = axiosError.response?.data?.errors;
      if (errors) {
        setError(errors.map((e) => e.msg).join(', '));
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
          minLength={6} // Match backend validation
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={onChange}
          required
          minLength={6}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;