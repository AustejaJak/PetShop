import Routes from "../../routes/routes";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInFormComponent() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const accessTokenString = localStorage.getItem('token');
            const accessToken = JSON.parse(accessTokenString).token;
            const loginResponse = await fetch('http://localhost:5088/api/Authenticate/login', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            // if (loginResponse.status === 401) {
            //     const token = localStorage.getItem('token');
                //     console.log(token);
                //     const refreshResponse = await fetch('http://localhost:5088/api/Authenticate/refresh-token', {
                //         method: 'POST',
                //         headers: {
                //             'Access-Control-Allow-Origin': '*',
                //             'Content-Type': 'application/json',
                //             Authorization: 'Bearer ' + token,
                //         },
                //         body: JSON.stringify({
                //             username,
                //             password,
                //         }),
                //     });
                //     console.log(refreshResponse);
                //     if (refreshResponse.ok) {
                //         const token = await refreshResponse.text();
                //         localStorage.setItem('token', token);
                //         handleLogin(e);
                //     } else {
                //         setError('Token expired.');
                //     }
            
            // }else 
                if (loginResponse.ok) {
                const token = await loginResponse.text();
                const localStorageToken = JSON.parse(token).token;
                localStorage.setItem('token', localStorageToken);
                navigate(Routes.client.category);
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };
    

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Prisijunkite į savo paskyrą
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Prisijungimo vardas
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Slaptažodis
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Pamiršote slaptažodį?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                                />
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Prisijungti
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Dar esate neprisiregistravęs?{' '}
                        <a href={Routes.client.register} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Prisiregistruokite čia
                        </a>
                    </p>

                    {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
                </div>
            </div>
        </>
    )
}
