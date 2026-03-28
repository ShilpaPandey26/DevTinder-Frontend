import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

export default function Login() {
    const [emailId, setEmailId] = useState('shilpa@gmail.com');
    const [password, setPassword] = useState('Shilpa@123');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                "emailId": emailId,
                "password": password
            }, { withCredentials: true });
            console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/")
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className="  fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                {/* <legend className="fieldset-legend">Login</legend> */}
                <h2 className="text-2xl text-center"> Login</h2>
                <label className="label">Email</label>
                <input type="email" value={emailId} className="input" placeholder="Email" onChange={(e) => setEmailId(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="btn btn-primary mt-6 w-1/2 mx-auto" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
