import React from 'react'
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios'

export default function UserCard({ user }) {

    if (!user) return null;
    const { _id, firstName, lastName, about, photoUrl, age, gender } = user;

    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log("UserCard Error: ", err.message)

        }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm badge-outline max-h-fit my-10">
            <figure>
                <img
                    src={photoUrl}
                    alt="Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center text-white! my-10">
                    <div className="badge  bg-primary py-4 px-5" onClick={() => handleSendRequest("ignored", _id)}>Ignore</div>
                    <div className="badge bg-secondary py-4 px-5" onClick={() => handleSendRequest("interested", _id)}>Interested</div>
                </div>
            </div>
        </div>
    )
}
