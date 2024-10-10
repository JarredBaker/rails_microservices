// src/components/SignUpForm.tsx
import React, { useState } from 'react';
import './SignUp.css'

// Define a type for form data
interface FormData {
	username: string;
	email: string;
	password: string;
}

// Define a type for form errors
interface FormErrors {
	username?: string;
	email?: string;
	password?: string;
}

const SignUp: React.FC = () => {
	// Form data state using FormData type
	const [formData, setFormData] = useState<FormData>({
		username: '',
		email: '',
		password: ''
	});

	// Form error state using FormErrors type
	const [errors, setErrors] = useState<FormErrors>({});

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Basic form validation
	const validateForm = (): FormErrors => {
		const newErrors: FormErrors = {};
		if (!formData.username) newErrors.username = 'Username is required';
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

	// Handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent page reload on form submission
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length === 0) {
			// No validation errors, submit the form (e.g., send data to an API)
			console.log('Form submitted:', formData);
		} else {
			setErrors(validationErrors); // Set validation errors
		}
	};

	return (
		<div className="signup-form font-satisfy">
			<h2 className={"text-2xl"}>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username" className={"text-2xl"}>Name:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
					{errors.username && <p className="error">{errors.username}</p>}
				</div>

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

				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
