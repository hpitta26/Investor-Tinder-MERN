import React, {useState, useEffect} from 'react'

import { useParams, Link } from 'react-router-dom'

import './UserProfile.css'

function UserProfile() { 
  const [currentUser, setCurrentUser] = useState({});
  const { username } = useParams(); //used to get the username from the URL

  useEffect(() => { //called when page is initially loaded
    const fetchCurrUser = async () => {
      const response = await fetch('http://localhost:9000/startups');
      const data = await response.json();
      const targetUser = data.filter(user => user.username === username);
      setCurrentUser(targetUser[0]);
    }
    fetchCurrUser();
  }, [username]) 


  

  if (Object.keys(currentUser).length === 0) {
    return ( //this is rendered when data from the server still has not been fetched (loading time)
      <div className='n5-whole-page'>
        <h1 className='n5-loading'>Loading...</h1> 
      </div> 
    )
  } else {
    return (
      <div className='n5-whole-page'> 
  
        {/*START: of top*/}
        <div className='n5-user-profile-top n5-grid-up-top'>
          <div className='n5-cell-up-top'>
            <figure>
              <img src={"/"+currentUser.src} alt={currentUser.alt} className='n5-profile-pic' />
            </figure>
          </div>
          
          <div className='n5-cell-up-top n5-username-wrapper'>
            <h1 className='n5-username'>{currentUser.text} </h1>
          </div>

          <div className='n5-cell-up-top n5-btn-wrapper'>
            <Link className='n5-invest-link' to={'/user/' + username + "/invest"} >
              <div className="n5-box-1">
                <div className="n5-btn n5-btn-one">
                  <span>INVEST</span>
                </div>
              </div>
            </Link>
          </div>

        </div> 
        {/*END: of top*/}


  
        {/*START: of middle*/}  
        <div className='n5-user-profile-middle'>
  
          {/*START: Analytics + Achievements*/}  
          <div className='n5-middle-col1'>
  
            <div className='n5-user-analytics'>
              <h2 className='n5-stats-header'>Analytics</h2>
              <ul className='n5-stats-list'>
                <li className='n5-stats-list-item'>
                  <h4>Year Founded:</h4>
                  <p>{currentUser.analytics[0]}</p>
                </li>
                <li className='n5-stats-list-item'>
                  <h4>Location:</h4>
                  <p>{currentUser.analytics[1]}</p>
                </li>
                <li className='n5-stats-list-item'>
                  <h4>Area:</h4>
                  <p>{currentUser.analytics[2]}</p> 
                </li>
                <li className='n5-stats-list-item'>
                  <h4>Target Funding:</h4>
                  <p>{currentUser.analytics[3]}</p> 
                </li>
              </ul>
            </div>
  
            <div className='n5-user-achieve'>
              <h2 className='n5-stats-header'>Achievements</h2>
              <ul className='n5-stats-list'>
                <li className='n5-stats-list-item'>
                  <h4>Year Founded:</h4>
                  <p>{currentUser.achievements[0]}</p>
                </li>
                <li className='n5-stats-list-item'>
                  <h4>Location:</h4>
                  <p>{currentUser.achievements[1]}</p>
                </li>
                <li className='n5-stats-list-item'>
                  <h4>Current Funding:</h4>
                  <p>{currentUser.achievements[2]}</p> 
                </li>
                <li className='n5-stats-list-item'>
                  <h4>Target Funding:</h4>
                  <p>{currentUser.achievements[3]}</p> 
                </li>
              </ul>
            </div>
          </div>
          {/*END: Analytics + Achievements*/}  
  
          {/*START: Bio + Gallery + Business Model*/}
          <div className='n5-middle-col2'>
  
            <div className='n5-bio-gallery'>
  
              <div className='n5-user-bio'>
                <h2 className='n5-user-bio-header'>Bio</h2>
                <p className='n5-user-bio-body'>
                  {currentUser.bio}
                </p>
              </div>
  
              <div className='n5-user-gallery'>
                <h2 className='n5-user-gallery-header'>Gallery</h2>
                <div className='n5-photo-container'>
                  <img src='/images/realestate1.jpg' alt='image1'/>
                  <img src='/images/hospitality2.jpg' alt='image2'/>
                  <img src='/images/hospitality1.jpg' alt='image3'/>
                  <img src='/images/profservices1.jpg' alt='image4'/>
                </div>
              </div>
  
            </div>
  
            <div className='n5-user-bm'>
              <h2 className='n5-bm-header'>Business Model</h2>
              <p className='n5-bm-body'>
                {currentUser.businessModel}
              </p>
            </div>
          </div>
          {/*END: Bio + Gallery + Business Model*/}
  
        </div>
        {/*END: of middle*/}
      </div>
    )
  }
}

export default UserProfile
