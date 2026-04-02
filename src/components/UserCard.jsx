import React from 'react'

export default function UserCard({ user }) {
    console.log("user", user)
    if (!user) return null;
    const { firstName, lastName, about, photoUrl, age, gender } = user
    return (
        <div className="card bg-base-100 w-96 shadow-sm badge-outline">
            <figure>
                <img
                    src={photoUrl}
                    alt="Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center text-white! my-10">
                    <div className="badge  bg-primary py-4 px-5">Ignore</div>
                    <div className="badge bg-secondary py-4 px-5">Interested</div>
                </div>
            </div>
        </div>
    )
}
