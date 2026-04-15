import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice';


export default function Connection() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections)

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      console.log(res.data.data);
      dispatch(addConnection(res.data.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h2>No connection Found!!</h2>



  return (
    <div>
      <h1 className="text-bold text-2xl text-center">Connections</h1>
      {connections.map((connection, index) => {
        const { firstName, lastName, age, gender, about, photoUrl } = connection;

        return (
          <div className="flex gap-12 items-center mx-auto w-[30%] p-4 mt-10 bg-base-300 rounded-2xl">
            <div>
              <img src={photoUrl} className="h-32 w-32 rounded-full" />
            </div>
            <div>
              <h2 className='font-bold'>{firstName + " " + lastName}</h2>
             {age && gender && <h2>{age + " " + gender}</h2>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}
