import React, { useContext, useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import FormField from '../FormField';
import { useFormik } from 'formik';
import { UserContext } from '../../contexts/UserContext';
import api from '../../services/api';
import { useHistory } from 'react-router';
import tokenService from '../../services/tokenService';

export default function LoginModal() {
	const userContext = useContext(UserContext);
	const history = useHistory();
	const [errorMessage, setErrorMessage] = useState();

    const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: ({email, password}) => {
			api.post('/auth/login', {email, password})
			.then(response => {
				const {accessToken, refreshToken} = response.data;
				tokenService.setTokens(accessToken, refreshToken);
				userContext.setLoggedIn(true);
				userContext.setEmail(email);

				history.push('/');
			})
			.catch(error => {
				console.log(error);
				setErrorMessage(error.response.data.message);
			});
		}
    });

    return (
		<Modal>
			<form onSubmit={formik.handleSubmit}>
				<div className="px-4 pt-5 pb-4">
					<div className="mt-3 text-center">
						<h3 className="text-3xl font-bold">
							Login
						</h3>
						<div className="mt-5 flex flex-col gap-2">
							<FormField id="email" name="Email" type="email" onChange={formik.handleChange} value={formik.values.email}/>
							<FormField id="password" name="Password" type="password" onChange={formik.handleChange} value={formik.values.password}/>
						</div>
						<div>
							{errorMessage}
						</div>
					</div>
				</div>
				<div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
					<Button type="submit">Login</Button>
				</div>
			</form>
		</Modal>
    );
}