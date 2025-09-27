import React from 'react'
import getLanguageFlag from './getLanguageFlag'
import { Link } from 'react-router-dom'

const FriendCard = ({friend}) => {
  return (
    <div className='card bg-base-200 hover:shadow-mg transition-shadow'>
        <div className='card-body p-4'>
        <div className='flex items-center gap-3 mb-3'>
        <div className='avatar size-12'>
        <img src={friend.profilePic} alt={friend.fullName} />
        </div>
        <h3 className='font-semibold truncate'>{friend.fullname}</h3>
        </div>

        <div className="flex flex-wrap flex-col gap-2 mb-3">
  <span className="badge badge-secondary text-xs whitespace-normal break-words">
    {getLanguageFlag(friend.nativeLanguage)} 
    Native: {friend.nativeLanguage}
  </span>

  <span className="badge badge-outline text-xs whitespace-normal break-words">
    {getLanguageFlag(friend.learningLanguage)} 
    Learning: {friend.learningLanguage}
  </span>
</div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">Message</Link>
        </div>
    </div>
  )
}

export default FriendCard;


