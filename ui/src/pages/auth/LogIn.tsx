import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ApiService from "../../api/authApi";
import {setUser} from "../../store/userSlice";
import {useDispatch} from 'react-redux';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const LogIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await ApiService.login({user: {...formData, name: ''}}).then((response) => {
      const token = response.headers['authorization'];

      if (token && response.data) {
        const {email, name, id} = response.data.data; // Extract user data from response
        dispatch(setUser({user: {email, name, id}, token})); // Dispatch to Redux
        navigate('/');
      } else {
        throw new Error('Token not found in response headers');
      }
    }).catch((error) => {
      setError(error.response.data.errors);
    })
  }

  return (
    <div className="min-h-screen min-w-screen p-8 bg-amber-50">
      <p className={"font-satisfy text-8xl pl-16 pt-16 text-slate-700 mb-24"}>
        Welcome to the boutique store
      </p>
      <div className="signup-form">
        <h2 className={"text-2xl font-satisfy"}>Log In</h2>
        { error && (
          <p className={"text-red-500 text-center"}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
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
            <Link to="/" className={"mt-12 block w-100 bg-cyan-300 p-4 text-center rounded cursor-pointer"}>Sign up</Link>
            <button type="submit" className={"mt-12 bg-emerald-300 rounded cursor-pointer"}>Log In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn;

