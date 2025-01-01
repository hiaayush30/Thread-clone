import React, { useState } from 'react'
import { useFollowUserMutation } from '../../redux/api'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProfileBar({ user }) {
    const navigate=useNavigate();
    const { myInfo,darkMode } = useSelector(state => state.service);
    const [following, setFollowing] = useState(()=>{
        if(user.followers.includes(myInfo._id)) return true
        return false;
    });
    console.log(following)
    const [followUser, { isLoading }] = useFollowUserMutation();
    const handleFollow = async () => {
        try {
            await followUser(user._id).unwrap();
            const message = following ? `unfollowed ${user.username}`:`following ${user.username}`;
            toast.success(message, {
                autoClose: 2000,
                theme: darkMode ? 'dark' : 'light'
            });
            setFollowing(!following);
        } catch (error) {
            console.log(error);
            const message=error?.data?.message ? error.data.message : 'Something wnet wrong'
            toast.error(message, {
                autoClose: 2000,
                theme: darkMode ? 'dark' : 'light'
            });
        }
    }
    return (
        <div className='md:w-[50vw] flex justify-start w-[80vw] py-2 my-2 hover:shadow-lg transition-all duration-300'>
            <div className='mx-4 rounded-full bg-slate-800 w-11 h-11 flex justify-center items-center'>
                <img onClick={()=>navigate(`/profile/threads/${user._id}`)} 
                src={user?.profilePic} alt={user?.username}
                    className='text-white cursor-pointer h-full w-full rounded-full object-cover'></img>
            </div>
            <div className='w-[80%] flex border-b justify-between items-start'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <div className='font-semibold'>{user?.username}</div>
                        <div>{user.bio}</div>
                    </div>
                    <div className='font-light'>
                        {user.followers.length} followers
                    </div>
                </div>
                {following ? <button onClick={handleFollow} disabled={isLoading}
                    className='dark:bg-green-500 bg-green-500 dark:hover:scale-105 px-4 py-1 border rounded-lg text-zinc-800 font-medium hover:bg-slate-100'
                >Following</button>: <button onClick={handleFollow} disabled={isLoading}
                className='dark:bg-blue-300 bg-blue-300 dark:hover:scale-105 px-4 py-1 border rounded-lg text-zinc-800 font-medium hover:bg-slate-100'
            >Follow</button>}
            </div>
        </div>
    )
}

export default ProfileBar