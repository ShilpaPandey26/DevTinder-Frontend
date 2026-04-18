import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

export default function Login() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [isLogin, setIsLogin] = useState(true);

    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId, password
            }, { withCredentials: true });
            // console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/")
        } catch (err) {

            setError(err.response.data)
            console.log(err.message);
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName, lastName, emailId, password
            }, { withCredentials: true });
            // console.log(res.data);
            dispatch(addUser(res?.data?.data));
            return navigate("/profile")
        } catch (err) {
            setError(err.response.data)
            console.log(err.message);
        }
    }

    return (
        <div className='flex justify-center items-center my-10'>
            <div className="  fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">

                <h2 className="text-2xl text-center">{isLogin ? "Login" : "Sign Up"}</h2>

                {
                    !isLogin &&
                    <div>
                        <label className="label">FirstName</label>
                        <input type="text" value={firstName} className="input" placeholder="Enter your First Name" onChange={(e) => setFirstName(e.target.value)} /><br /><br />

                        <label className="label">LastName</label>
                        <input type="text" value={lastName} className="input" placeholder="Enter your Last Name" onChange={(e) => setLastName(e.target.value)} />
                    </div>

                }

                <label className="label">Email</label>
                <input type="email" value={emailId} className="input" placeholder="Email" onChange={(e) => setEmailId(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="text-red">{error} </p>

                <button className="btn btn-primary mt-6 w-1/2 mx-auto" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? " Login" : " Sign Up"}</button><br />
                <p className="text-sm text-center font-semibold cursor-pointer" onClick={() => setIsLogin((value) => !value)}>{isLogin ? "New User? Sign Up" : "Already Registerd ? Login"}</p>
            </div>
        </div>
    )
}
