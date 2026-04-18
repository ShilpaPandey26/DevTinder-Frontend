import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

export default function Feed() {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length > 0) return;
    //  if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data));
      // console.log(res.data)
    } catch (err) {
      console.log("Feed ERROR: ",err);
    }
  }

  useEffect(() => {
    getFeed();

  }, [])

  if(!feed) return ;
  if(feed.length <= 0) return <h2 className='flex justify-center my-10'>No new Users Found!! </h2>

  return (
    feed && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
      </div>
    )
  )
}
