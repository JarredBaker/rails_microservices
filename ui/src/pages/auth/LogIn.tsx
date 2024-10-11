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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const response = await ApiService.login({user: {...formData, name: ''}});

    const token = response.headers['authorization'];

    if (token && response.data) {
      const {email, name, id} = response.data.data; // Extract user data from response
      console.log("The email: " + email);
      dispatch(setUser({user: {email, name, id}, token})); // Dispatch to Redux
      // setSuccess(true);
      navigate('/'); // Navigate to a protected route
    } else {
      throw new Error('Token not found in response headers');
    }
  }

  return (
    <div className="min-h-screen min-w-screen p-8 bg-amber-50">
      <p className={"font-satisfy text-8xl pl-16 pt-16 text-slate-700 mb-24"}>
        Welcome to the boutique store
      </p>
      <div className="signup-form font-satisfy">
        <h2 className={"text-2xl"}>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className={"text-2xl"}>Email:</label>
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
            <label htmlFor="password" className={"text-2xl"}>Password:</label>
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
            <button type="submit" className={"mt-12"}>Log In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn;

