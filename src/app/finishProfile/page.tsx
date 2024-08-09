"use client";

import { useEffect, useState } from 'react';
import '../finishProfile.css';
import { useScript } from "@uidotdev/usehooks";

export default function FinishProfile() {
    useScript("https://unpkg.com/boxicons@2.1.4/dist/boxicons.js");

    const [currentStage, setCurrentStage] = useState(1);

    useEffect(() => {
        const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
        const profilePicturePreview = document.getElementById('profile-picture-preview') as HTMLImageElement;
    
        const handleFileChange = () => {
            console.log('file changed');
            if (profilePictureInput.files && profilePictureInput.files.length > 0) {
                const file = profilePictureInput.files[0];
                const reader = new FileReader();
    
                reader.onload = (event) => {
                    if (event.target) {
                        profilePicturePreview.src = event.target.result as string;
                    }
                };
    
                reader.readAsDataURL(file);
            }
        };
    
        if (profilePictureInput) {
            profilePictureInput.addEventListener('change', handleFileChange);
        }
    
        return () => {
            if (profilePictureInput) {
                profilePictureInput.removeEventListener('change', handleFileChange);
            }
        };
    }, []);
    

    const stage1to2 = () => {
        setCurrentStage(2);
    };

    const stage2to1 = () => {
        setCurrentStage(1);
    };

    const stage2to3 = () => {
        setCurrentStage(3);
    };

    const stage3to2 = () => {
        setCurrentStage(2);
    };

    return (
        <div className="container">
            <div className="login-link">
                <div className="logo">
                    <i className='bx bx-pencil'></i>
                    <span className="text">Logo name</span>
                </div>
                <p className="side-big-heading">Thanks for joining ShareOn!</p>
                <p className="primary-bg-text">Please provide some additional info to personalize your profile</p>
            </div>
            <form action="" className="signup-form-container">
                <p className="big-heading">Create Profile</p>

                <div className="progress-bar">
                    <div className="stage">
                        <p className="tool-tip">Personal info</p>
                        <p className={`stageno stageno-1 ${currentStage > 1 ? 'completed' : ''}`}>1</p>
                    </div>
                    <div className="stage">
                        <p className="tool-tip">Interests</p>
                        <p className={`stageno stageno-2 ${currentStage > 2 ? 'completed' : ''}`}>2</p>
                    </div>
                    <div className="stage">
                        <p className="tool-tip">Profile Picture</p>
                        <p className="stageno stageno-3">3</p>
                    </div>
                </div>
                <div className="signup-form-content">
                    {currentStage === 1 && (
                        <div className="stage1-content slide-in">
                            <div className="button-container">
                                <div className="text-fields fname">
                                    <label htmlFor="fname"><i className='bx bx-user'></i></label>
                                    <input type="text" name="fname" id="fname" placeholder="Enter your first name" />
                                </div>
                                <div className="text-fields lname">
                                    <label htmlFor="lname"><i className='bx bx-user'></i></label>
                                    <input type="text" name="lname" id="lname" placeholder="Enter your last name" />
                                </div>
                            </div>
                            <div className="button-container">
                                <div className="text-fields dob">
                                    <input type="date" name="dob" id="dob" />
                                </div>
                                <div className="gender-selection">
                                    <p className="field-heading">Gender:</p>
                                    <label htmlFor="male">
                                        <input type="radio" name="gender" id="male" />Male
                                    </label>
                                    <label htmlFor="female">
                                        <input type="radio" name="gender" id="female" />Female
                                    </label>
                                    <label htmlFor="other">
                                        <input type="radio" name="gender" id="other" />Other
                                    </label>
                                </div>
                            </div>
                            <div className="pagination-btns">
                                <input type="button" value="Next" className="nextPage stagebtn1b" onClick={stage1to2} />
                            </div>
                        </div>
                    )}
                    {currentStage === 2 && (
                        <div className="stage2-content slide-in">
                            <div className="button-container">
                                <div className="text-fields phone">
                                    <input type="text" name="phone" id="phone" placeholder="Introduce yourself!" />
                                </div>
                            </div>
                            <div className="button-container">
                                <div className="text-fields dropdown">
                                    <label htmlFor="dropdown">Find your interests!</label>
                                    <select name="dropdown" id="dropdown">
                                        <option value="">Select</option>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pagination-btns">
                                <input type="button" value="Previous" className="previousPage stagebtn2a" onClick={stage2to1} />
                                <input type="button" value="Next" className="nextPage stagebtn2b" onClick={stage2to3} />
                            </div>
                        </div>
                    )}
                    {currentStage === 3 && (
                        <div className="stage3-content slide-in">
                            <div className="upload-image-section">
                                <h3>Upload Profile Picture</h3>
                                <input type="file" id="profile-picture" name="profile-picture" accept="image/*" />
                                <label htmlFor="profile-picture">Choose a file</label>
                                <div className="image-preview">
                                    <img src="" alt="Profile Picture" id="profile-picture-preview" />
                                </div>
                            </div>
                            <div className="pagination-btns">
                                <input type="button" value="Previous" className="previousPage stagebtn3a" onClick={stage3to2} />
                                <input type="submit" value="Submit" className="nextPage stagebtn3b" />
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
