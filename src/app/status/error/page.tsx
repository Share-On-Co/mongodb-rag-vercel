import Link from 'next/link'
import '../../auth.css'
import { Open_Sans } from 'next/font/google'

    //👇 Configure our font object
    const openSans = Open_Sans({
        subsets: ['latin'],
        display: 'swap',
    })

export default function Register() {
    return (
        <html lang="pt-br">

        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Registration error</title>
            <link rel="icon" href="/html-5.png"/>
        </head>

        <body className={openSans.className}>
            <img className="wave" src="/wave.svg"/>
            <div className="container">
                <div className="img">
                    <img src="/sad_face.svg"/>
                </div>
                <div className="confirm-container">
                    <div className="content">
                        <h2>Unable to register</h2>
                        <i className="fas fa-exclamation-circle"></i>
                        <div className="btn-container">
                            <a href="register.html" className="btn-action">Try again</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>

        </html>
    );
}