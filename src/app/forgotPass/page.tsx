import Link from 'next/link'
import '../auth.css'
import { Open_Sans } from 'next/font/google'

    //👇 Configure our font object
    const openSans = Open_Sans({
        subsets: ['latin'],
        display: 'swap',
    })

export default function ForgotPassword() {
    

    
    return (
        <html lang="pt-br">

        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Account Recovery</title>

            {/* <!-- Font Awesome kit script --> */}
            {/* <script src="https://kit.fontawesome.com/a81368914c.js"></script> */}

            {/* <!-- Favicon --> */}
            <link rel="icon" href="html-5.png"/>
        </head>

        <body className={openSans.className}>
            <img className="wave" src="wave.svg"/>
            <div className="container">
                <div className="img">
                    <img src="personalization.svg"/>
                </div>
                <div className="login-container">
                    <form action="index.html">
                        <h2>Retrieve account</h2>
                        <p>Enter your email in the field below</p>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h5>E-mail</h5>
                                <input className="input" type="email"/>
                            </div>
                        </div>
                        <input type="submit" className="btn" value="Enter"/>
                        <div className="account">
                            <p>Did you remember your password?</p>
                            <Link href="/login">Log-in</Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* <script type="text/javascript" src="js/main.js"></script> */}
        </body>

        </html>
    )
}