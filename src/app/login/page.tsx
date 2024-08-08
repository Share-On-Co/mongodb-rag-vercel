"use client";

import Link from 'next/link';
import '../auth.css'
import { Open_Sans } from 'next/font/google'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { handleLogin } from '@/utils/user';
import { useRouter } from 'next/navigation';

    //👇 Configure our font object
    const openSans = Open_Sans({
        subsets: ['latin'],
        display: 'swap',
    })

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function login(username: string, password: string) {
        handleLogin(username, password)
            .then(user => {
                if (user) {
                    router.push('/home');
                }
            });
    }
    return (
        <html lang="pt-br">

        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Log-in with</title>
        </head>

        <body className={openSans.className}>
            <img className="wave" src="/wave.svg"/>
            <div className="container">
                <div className="img">
                    <img src="authentication.svg"/>
                </div>
                <div className="login-container">
                    <div className='form'>
                        <h2>Log-in</h2>
                        <p>Welcome back!</p>
                        <div className="input-div one">
                            <div className="i">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div>
                                <input className="input" type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder='Username'
                                />
                            </div>
                        </div>
                        <div className="input-div two">
                            <div className="i">
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                            <div>
                                <input className="input" type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Password'
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn" onClick={() => login(username, password)}>Log-in</button>
                        <Link className="forgot" href="/forgotPass">Forgot your password?</Link>
                        <div className="others">
                            <hr/>
                            <p>OR</p>
                            <hr/>
                        </div>
                        <div className="social">
                            <div className="social-icons facebook">
                                <Link href="#"><img src="facebook.png"/>Log-in with Facebook</Link>
                            </div>
                            <div className="social-icons google">
                                <Link href="#"><img src="google.png"/>Log-in with Google</Link>
                            </div>
                        </div>
                        <div className="account">
                            <p>Don&apos;t have an account yet?</p>
                            <Link href="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* <script type="text/javascript" src="js/main.js"></script> */}
        </body>

        </html>
    );
}