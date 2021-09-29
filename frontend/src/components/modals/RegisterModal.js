import React, { useContext } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import FormField from '../FormField';
import { useFormik } from 'formik';
import axios from 'axios';
import { StorageContext } from '../../contexts/StorageContext';
import { useHistory } from 'react-router';

const RegisterModal = () => {
	const storageContext = useContext(StorageContext);
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		onSubmit: ({email, password, confirmPassword}) => {
			if (password != confirmPassword) return;

			axios.post('/api/auth/register', {
				email, 
				password
			})
			.then((response) => {
				console.log(storageContext);
				const {accessToken, refreshToken} = response.data;
				storageContext.setTokens(accessToken, refreshToken);
				history.push('/')
			})
			.catch(error => {
				console.log(error);
			});
		}
	});

  return (
		<Modal>
			<form onSubmit={formik.handleSubmit}>
				<div className="px-4 pt-5 pb-4">
					<div className="mt-3 text-center">
						<h3 className="text-xl font-bold">
							Register
						</h3>
						<div className="mt-5 flex flex-col gap-2">
							<FormField id="email" name="Email" type="email" onChange={formik.handleChange} value={formik.values.email}/>
							<FormField id="password" name="Password" type="password" onChange={formik.handleChange} value={formik.values.password}/>
							<FormField id="confirmPassword" name="Confirm password" type="password" onChange={formik.handleChange} value={formik.values.confirmPassword}/>
						</div>
					</div>
				</div>
				<div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
					<Button type="submit">Register</Button>
				</div>
			</form>
		</Modal>
  	);
}

export default RegisterModal;