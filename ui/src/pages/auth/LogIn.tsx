import React, {useState} from 'react';

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

          <button type="submit" className={"mt-12"}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn;

