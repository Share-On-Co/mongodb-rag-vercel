import Link from 'next/link';
import '../auth.css'
import { Open_Sans } from 'next/font/google'

    //👇 Configure our font object
    const openSans = Open_Sans({
        subsets: ['latin'],
        display: 'swap',
    })

export default function Login() {
    return (
        <html lang="pt-br">

        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Log-in with</title>
            
            {/* <!-- Font Awesome kit script --> */}
            {/* <script src="https://kit.fontawesome.com/a81368914c.js"></script> */}

            {/* <!-- Favicon --> */}
            <link rel="icon" href="html-5.png"/>
        </head>

        <body className={openSans.className}>
            <img className="wave" src="/wave.svg"/>
            <div className="container">
                <div className="img">
                    <img src="authentication.svg"/>
                </div>
                <div className="login-container">
                    <form action="login.html">
                        <h2>Log-in</h2>
                        <p>Welcome back!</p>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div>
                                <h5>Username</h5>
                                <input className="input" type="text"/>
                            </div>
                        </div>
                        <div className="input-div two">
                            <div className="i">
                                <i className="fas fa-key"></i>
                            </div>
                            <div>
                                <h5>Password</h5>
                                <input className="input" type="password"/>
                            </div>
                        </div>
                        <input type="submit" className="btn" value="Log-in"/>
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
                    </form>
                </div>
            </div>

            {/* <script type="text/javascript" src="js/main.js"></script> */}
        </body>

        </html>
    );
}