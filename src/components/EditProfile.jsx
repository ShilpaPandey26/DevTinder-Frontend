import React, { useState } from 'react'
import UserCard from './UserCard';
import { BASE_URL } from "../utils/constants"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

export default function EditProfile({ user }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch()

    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            }, { withCredentials: true })
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
            },3000)
            // console.log("profile saved")
        } catch (err) {
            // console.log(err.message)
            setError(err.response.data);
        }
    }

    return (
        <div className="flex justify-center gap-5">
            <div className='flex justify-center items-center my-10'>
                <div className="  fieldset bg-base-300 border-base-300 rounded-box w-md border p-4">
                    {/* <legend className="fieldset-legend">Login</legend> */}
                    <h2 className="text-2xl text-center">Edit Profile</h2>
                    <label className="label">FirstName</label>
                    <input type="text" value={firstName} className="input" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />


                    <label className="label">LastName</label>
                    <input type="text" value={lastName} className="input" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />


                    <label className="label">Age</label>
                    <input type="text" value={age} className="input" placeholder="Age" onChange={(e) => setAge(e.target.value)} />

                    <label className="label">Gender</label>
                    <input type="text" value={gender} className="input" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />

                    <label className="label">About</label>
                    <input type="text" value={about} className="input" placeholder="About" onChange={(e) => setAbout(e.target.value)} />


                    <label className="label">PhotoUrl</label>
                    <input type="text" value={photoUrl} className="input" placeholder="photoUrl" onChange={(e) => setPhotoUrl(e.target.value)} />
                    <p className="text-red-600">{error}</p>
                    <button className="btn btn-primary mt-6 w-1/2 mx-auto" onClick={saveProfile}>Save Profile</button>

                    {showToast && (
                        <div className="toast toast-top toast-center">
                            <div className="alert alert-success">
                                <span>Profile saved successfully</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
        </div>
    )
}

