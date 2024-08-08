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
            <title>Registration Confirmation</title>
        </head>

        <body className={openSans.className}>
            <img className="wave" src="/wave.svg"/>
            <div className="container">
                <div className="img">
                    <img src="/computer_display.svg"/>
                </div>
                <div className="confirm-container">
                    <div className="content">
                        <h2>Registration completed successfully!</h2>
                        <i className="far fa-check-circle"></i>
                        <div className="btn-container">
                            <a href="/login" className="btn-action">Log-in</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>

        </html>
    );
}