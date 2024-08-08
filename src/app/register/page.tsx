"use client";

import Link from 'next/link'
import '../auth.css'
import { Open_Sans } from 'next/font/google'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import {handleRegister} from '@/utils/user';
import { useRouter } from 'next/navigation';
    //👇 Configure our font object
    const openSans = Open_Sans({
        subsets: ['latin'],
        display: 'swap',
    })

export default function Register() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    
    function register(username: string, password: string) {
        handleRegister(username, password)
            .then(user => {
                if (user) {
                    router.push('/status/success');
                }
            });
    }


    return (
        <html lang="pt-br">
        
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Register</title>
        </head>
        
        <body className={openSans.className}>
            <img className="wave" src="wave.svg"/>
            <div className="container">
                <div className="img">
                    <img src="login-mobile.svg"/>
                </div>
                <div className="login-container">
                    <div className='form'>
                        <h2>Register</h2>
                        <p>Log-in with:</p>
                        <div className="social">
                            <div className="social-icons facebook">
                                <Link href="#"><img src="facebook.png"/>Log-in with Facebook</Link>
                            </div>
                            <div className="social-icons google">
                                <Link href="#"><img src="google.png"/>Log-in with Google</Link>
                            </div>
                        </div>
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
                        <div className="input-div one">
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
                        <div className="input-div two">
                            <div className="i">
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                            <div>
                                <input className="input" type="password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm password'
                                />
                            </div>
                        </div>
                        <div className="terms">
                            <input type="checkbox"/>
                            <label>I have read and agree with </label><a id="action-modal">terms of use.</a>
                        </div>
                        <div className="btn-container">
                            <button className="btn-action" onClick={() => register(username, password)}>Register</button>
                        </div>
                        <div className="account">
                            <p>Already have an account?</p>
                            <Link href="/login">Log-in</Link>
                        </div>
                        {/* <!-- The Modal --> */}
                        <div id="modal-terms" className="modal">
                            {/* <!-- Modal content --> */}
                            <div className="modal-content">
                                <span className="close">&times;</span>
                                <h2>Terms and services</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Iaculis at erat pellentesque adipiscing commodo. Adipiscing
                                    at in tellus integer feugiat scelerisque. Duis at consectetur lorem donec massa. Lacus vel
                                    facilisis volutpat est velit. Faucibus turpis in eu mi bibendum. Natoque penatibus et magnis
                                    dis parturient. Potenti nullam ac tortor vitae purus. Odio euismod lacinia at quis risus sed
                                    vulputate odio. Pulvinar mattis nunc sed blandit libero volutpat sed. Dolor sit amet
                                    consectetur adipiscing elit ut aliquam purus. Nulla facilisi etiam dignissim diam quis.
                                    Massa ultricies mi quis hendrerit dolor magna eget. Tincidunt praesent semper feugiat nibh
                                    sed pulvinar proin gravida. At auctor urna nunc id cursus metus aliquam eleifend. Amet nisl
                                    purus in mollis nunc. Ultricies mi quis hendrerit dolor magna eget est lorem. Mi proin sed
                                    libero enim. Viverra accumsan in nisl nisi. Cras ornare arcu dui vivamus arcu felis bibendum
                                    ut tristique.</p>
                                <p>Mus mauris vitae ultricies leo integer. Gravida dictum fusce ut placerat orci nulla
                                    pellentesque dignissim enim. Tempus egestas sed sed risus pretium quam vulputate. Nec
                                    tincidunt praesent semper feugiat nibh sed. Dui accumsan sit amet nulla facilisi. Enim
                                    praesent elementum facilisis leo vel fringilla est ullamcorper eget. Dolor sit amet
                                    consectetur adipiscing elit pellentesque. Elit duis tristique sollicitudin nibh sit.
                                    Scelerisque purus semper eget duis at tellus at urna. Consequat interdum varius sit amet
                                    mattis. Nibh cras pulvinar mattis nunc sed blandit libero volutpat. Ac orci phasellus
                                    egestas tellus. Fames ac turpis egestas sed tempus urna et. Non enim praesent elementum
                                    facilisis leo vel fringilla est. Habitant morbi tristique senectus et. Hendrerit dolor magna
                                    eget est lorem ipsum dolor sit. Nulla porttitor massa id neque aliquam vestibulum morbi
                                    blandit cursus.</p>
                                <p>Sed odio morbi quis commodo. Purus semper eget duis at tellus at. Et netus et malesuada fames
                                    ac. Dictum sit amet justo donec enim diam vulputate ut pharetra. Pellentesque pulvinar
                                    pellentesque habitant morbi tristique. Platea dictumst quisque sagittis purus sit amet
                                    volutpat. Nulla facilisi morbi tempus iaculis urna. Nunc sed blandit libero volutpat sed
                                    cras. Magna sit amet purus gravida quis. Vel fringilla est ullamcorper eget nulla.</p>
                                <p>Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Praesent tristique
                                    magna sit amet purus gravida. In cursus turpis massa tincidunt dui ut ornare lectus.
                                    Tristique risus nec feugiat in fermentum posuere urna nec. Non blandit massa enim nec dui
                                    nunc mattis. Volutpat blandit aliquam etiam erat velit. In ante metus dictum at. Pretium
                                    vulputate sapien nec sagittis aliquam malesuada bibendum. Scelerisque mauris pellentesque
                                    pulvinar pellentesque habitant morbi tristique senectus et. Ipsum suspendisse ultrices
                                    gravida dictum fusce ut placerat orci nulla.</p>
                                <p>Non consectetur a erat nam. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Nec dui
                                    nunc mattis enim ut tellus elementum sagittis. Pellentesque nec nam aliquam sem et tortor
                                    consequat id porta. Mauris commodo quis imperdiet massa tincidunt. Nullam vehicula ipsum a
                                    arcu cursus vitae congue mauris. In fermentum et sollicitudin ac. Fermentum dui faucibus in
                                    ornare quam viverra orci sagittis eu. Ac turpis egestas sed tempus urna et pharetra pharetra
                                    massa. Sit amet justo donec enim. Aliquam purus sit amet luctus venenatis lectus magna
                                    fringilla. Non quam lacus suspendisse faucibus interdum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            {/* <script type="text/javascript" src="js/main.js"></script> */}
        </body>
        
        </html>
    )
}