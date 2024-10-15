import React, {useState} from 'react';
import './Auth.css';
import ApiService from '../../api/authApi';
import {setUser} from '../../store/userSlice';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {

      await ApiService.signUp({user: formData}).then((response) => {
        console.log(JSON.stringify(response.headers));

        const token = response.headers['authorization'];

        if (token && response.data) {
          const {email, name, id} = response.data.data; // Extract user data from response
          dispatch(setUser({user: {email, name, id}, token})); // Dispatch to Redux
        } else {
          throw new Error('Token not found in response headers');
        }
      }).catch((error) => {
        setError(error.response.data.errors || error.response.data.status.message);
      })
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen min-w-screen p-8 bg-amber-50">
      <p className={"font-satisfy text-8xl pl-16 pt-16 text-slate-700 mb-24"}>
        Welcome to the boutique store
      </p>
      <div className="signup-form">
        <h2 className={"text-2xl font-satisfy"}>Sign Up</h2>
        { error && (
          <p className={"text-red-500 text-center"}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className={"text-2xl font-satisfy"}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className={"text-2xl font-satisfy"}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className={"text-2xl font-satisfy"}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className={"grid grid-cols-2 gap-2"}>
            <Link to="/login" className={"mt-12 block w-100 bg-cyan-300 p-4 text-center rounded cursor-pointer"}>Log in</Link>
            <button type="submit" className={"mt-12 bg-emerald-300 rounded cursor-pointer"}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
