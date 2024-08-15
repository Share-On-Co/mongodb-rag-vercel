"use client";

import { useEffect, useState } from 'react';
import '../finishProfile.css';
import { useScript } from "@uidotdev/usehooks";
import Image from 'next/image';
import { handlefinishProfile } from '@/utils/user';
import Multiselect from 'multiselect-react-dropdown';
import { useRouter } from 'next/navigation';

export default function FinishProfile() {
    useScript("https://unpkg.com/boxicons@2.1.4/dist/boxicons.js");

    const [currentStage, setCurrentStage] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [bio, setBio] = useState('');
    const [interest, setInterest] = useState<string[]>([]);
    const [profilePicture, setProfilePicture] = useState('');

    const router = useRouter();

    function handleSubmit() {
        //👇 Add your logic here
        handlefinishProfile(firstName, lastName, dob, gender, bio, interest, profilePicture)
        router.push('/');
    }
    
    async function handleFileChange(files: any[] | FileList | null) {
        if (files && files.length > 0) {
            let image = files[0];
            let reader = new FileReader();
            reader.onload = () => setProfilePicture(reader.result as string);
            reader.readAsDataURL(image);
        }
    };
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
    const onSelect = (selectedList: any[], selectedItem: any) => {
        setInterest(selectedList.map((item) => item.name));
        console.log(interest);
    }
    
    const onRemove = (selectedList: any[], removedItem: any) => {
        setInterest(selectedList.map((item) => item.name));
        console.log(interest);
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
                                    <input type="text" name="fname" id="fname" placeholder="Enter your first name" onChange={(e) => setFirstName(e.target.value)}/>
                                </div>
                                <div className="text-fields lname">
                                    <label htmlFor="lname"><i className='bx bx-user'></i></label>
                                    <input type="text" name="lname" id="lname" placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="button-container">
                                <div className="text-fields dob">
                                    <input type="date" name="dob" id="dob" onChange={(e) => setDob(e.target.value)} />
                                </div>
                                <div className="gender-selection">
                                    <p className="field-heading">Gender:</p>
                                    <label htmlFor="male">
                                        <input type="radio" name="gender" id="male" onClick={() => setGender('male')}/>Male
                                    </label>
                                    <label htmlFor="female">
                                        <input type="radio" name="gender" id="female" onClick={() => setGender('female')}/>Female
                                    </label>
                                    <label htmlFor="other">
                                        <input type="radio" name="gender" id="other" onClick={() => setGender('other')}/>Other
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
                                    <input type="text" name="phone" id="phone" placeholder="Introduce yourself!" onChange={(e) => setBio(e.target.value)}/>
                                </div>
                            </div>
                            <div className="button-container">
                                <div className="text-fields dropdown">
                                    <label htmlFor="dropdown">Find your interests!</label>
                                    <Multiselect id='dropdown'
                                        options={[
                                            { name: 'Depression', id: 1 },
                                            { name: 'Bipolar', id: 2 },
                                            { name: 'Stressed', id: 3 },
                                            { name: 'School', id: 4 },
                                            { name: 'Lonely', id: 5 },
                                            { name: 'Lost', id: 6 },
                                            { name: 'Heartbroken', id: 7 },
                                            { name: 'OCD', id: 8 },
                                            { name: 'PTSD', id: 9 }
                                          ]} // Options to display in the dropdown
                                        onSelect={onSelect} // Function will trigger on select event
                                        onRemove={onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    />
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
                                <input type="file" id="profile-picture" name="profile-picture" accept="image/*" onChange={(e) => handleFileChange(e.target.files)} />
                                <label htmlFor="profile-picture">Choose a file</label>
                                <div className="image-preview">
                                    <Image src={profilePicture} alt="Profile Picture" id="profile-picture-preview" width={50} height={50}/>
                                </div>
                            </div>
                            <div className="pagination-btns">
                                <input type="button" value="Previous" className="previousPage stagebtn3a" onClick={stage3to2} />
                                <input type="submit" value="Submit" className="nextPage stagebtn3b" onClick={handleSubmit} />
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
