import React from 'react'
import { Link } from 'react-router-dom'

import './ExploreCard.css'

function ExploreCard(props) {
    
  if (!props.users.length)  {
    return (
        <div className='n8-container'>
          <h1>Industry {props.cardNum}: {props.industry}</h1>
        </div>
      )
  } else {
    return (
        <div className='n8-container'>
          <h1>Industry {props.cardNum}: {props.industry}</h1>
          <div className='n8-cards-wrapper'>
                {props.users.map(user => (
                    <Link key={user._id} className='n8-card' to={'/user/' + user.username} >
                        <img src={user.src} alt={user.alt} className='n8-profile-pic' />
                        <span className='n8-company-name'>{user.text}</span>
                    </Link>
                ))}
           </div>
        </div>
      )
  }
  
}

export default ExploreCard
