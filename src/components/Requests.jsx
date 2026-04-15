import React, { useEffect } from "react"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestSlice";
import axios from "axios";

export default function Requests() {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests)


    const fetchRequests = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/requests/received",
                { withCredentials: true }   
            );
            dispatch(addRequests(res.data.data))

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requests) return;
    if (requests.length === 0) return <h2>No Requests Found!!</h2>

    return (
        <div>
            <h1 className="text-bold text-2xl text-center">requests</h1>
            {requests.map((request, index) => {
                const { _id, firstName, lastName, age, gender, about, photoUrl } = request.fromUserId;

                return (
                    <div className="flex gap-12 items-center mx-auto max-w-[40%] p-4 mt-10 bg-base-300 rounded-2xl">
                        <div>
                            <img src={photoUrl} className="h-32 w-32 rounded-full" />
                        </div>
                        <div>
                            <h2 className='font-bold'>{firstName + " " + lastName}</h2>
                            {age && gender && <h2>{age + " " + gender}</h2>}
                            <p>{about}</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="btn btn-primary">Reject</button>
                            <button className="btn btn-secondary">Accept</button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
