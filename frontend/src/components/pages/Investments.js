import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Investments.css'

function Investments() {
  const [portUsers, setPortUsers] = useState([]);

  useEffect(() => {
    const fetchPortolio = async () => {
      const response = await fetch('http://localhost:9000/portfolio');
      const data = await response.json();
      setPortUsers(data);
    }

    fetchPortolio();
  }, [])

  if (!portUsers.length) {
    return (
      <div className='n103-whole-page'>
        <h1 className='n103-title-text'>-- Your Portfolio --</h1>
      </div>    
    )
  } else {
    return (
      <div className='n103-whole-page'>
        <h1 className='n103-title-text'>-- Your Portfolio --</h1>
        <div className='n103-list-wrapper'>
          {portUsers.map(user => (
            <Link key={user._id} className='n103-card-link n103-cell' to={'/user/' + user.username} >

              <div className='n103-card-item1'>
                <img src={user.src} alt={user.alt} className='n103-profile-pic' />
                <span className='n103-company-industry'>{user.text}</span>
              </div>
              <div className='n103-card-item2'>
                <h1 className='n103-invest-amount'>${user.amount}</h1>
              </div>
              
            </Link>
          ))}
        </div>
      </div>
    )
  }

  
}

export default Investments
