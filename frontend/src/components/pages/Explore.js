import React, {useState, useEffect} from 'react'
import ExploreCard from '../ExploreCard';

import './Explore.css'

function Explore() {
  const [industries, setIndustries] = useState([])
  const [users1, setUsers1] = useState([])
  const [users2, setUsers2] = useState([])
  const [users3, setUsers3] = useState([])

  const [allUsers, setAllUsers] = useState([])

  useEffect(() => { //called when page is initially loaded
    const fetchAllUsers = async () => {
      const response = await fetch('http://localhost:9000/startups');
      const data = await response.json();
      setAllUsers(data)
    }
    fetchAllUsers();
  }, []) 

  function updateDisplayedUsers(industry1, industry2, industry3) {
    setUsers1(allUsers.filter(user => user.industries === industry1))
    setUsers2(allUsers.filter(user => user.industries === industry2))
    setUsers3(allUsers.filter(user => user.industries === industry3))
  }

  function handleClick(event) {
    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active'); //if this is already active, removes active and returns out of the function
      var tempArray = industries.filter(industry => industry !== event.target.id)

      switch (tempArray.length) {
        case 0:
          setIndustries(['', '', ''])
          updateDisplayedUsers('', '', '')
          break;
        case 1:
          setIndustries([tempArray[0], '', ''])
          updateDisplayedUsers(tempArray[0], '', '')
          break; 
        case 2:
          setIndustries([tempArray[0], tempArray[1], ''])
          updateDisplayedUsers(tempArray[0], tempArray[1], '')
          break; 
        default:  
      }
      return;
    }

    var iconsList = document.querySelectorAll('.n101-icons-wrapper');
    var activeCount = 0;
    iconsList.forEach(icon => {
      if (icon.classList.contains('active')) {
        activeCount++;
      }
    })

    if (activeCount === 3) {
      iconsList.forEach(icon => {
        icon.classList.remove('active');
      })
    }
    event.target.classList.add('active');
    switch (activeCount) {
      case 0:
        setIndustries([event.target.id, '', ''])
        updateDisplayedUsers(event.target.id, '', '')
        break;
      case 1:
        setIndustries([industries[0], event.target.id, ''])
        updateDisplayedUsers(industries[0], event.target.id, '')
        break; 
      case 2:
        setIndustries([industries[0], industries[1], event.target.id])
        updateDisplayedUsers(industries[0], industries[1], event.target.id)
        break;
      case 3:
        setIndustries([event.target.id, '', ''])
        updateDisplayedUsers(event.target.id, '', '')
        break; 
      default:
    }

  }

  return (
    <div className='n101-whole-page'>
      <h1 className='n101-title-text'>-- Explore --</h1>

      <div className='n101-icons-container'>

        <div id='Delivery' className='n101-icons-wrapper' onClick={handleClick}>
          <i className='fa-solid fa-car n101-icon'/>
          <label className='n101-industry-label'>Delivery</label>
        </div>

        <div id='Hospitality' className='n101-icons-wrapper' onClick={handleClick}>
        <i className='fa-solid fa-utensils n101-icon'/>
          <label className='n101-industry-label'>Hospitality</label>
        </div>

        <div id='Pet' className='n101-icons-wrapper' onClick={handleClick}>
        <i className='fa-solid fa-paw n101-icon'/>
          <label className='n101-industry-label'>Pet</label>
        </div>

        <div id='Professional Services' className='n101-icons-wrapper' onClick={handleClick}>
        <i className='fa-solid fa-handshake n101-icon'/>
          <label className='n101-industry-label'>Prof Services</label>
        </div>

        <div id='Real Estate' className='n101-icons-wrapper' onClick={handleClick}>
        <i className='fa-solid fa-house-chimney n101-icon'/>
          <label className='n101-industry-label'>Real Estate</label>
        </div>
        <div id='Sport' className='n101-icons-wrapper' onClick={handleClick}>
        <i className='fa-solid fa-heart-pulse n101-icon'/>
          <label className='n101-industry-label'>Sport</label>
        </div>

        <div id='Tech' className='n101-icons-wrapper' onClick={handleClick}>
          <i className='fa-solid fa-computer n101-icon'/>
          <label className='n101-industry-label'>Tech</label>
        </div>
        
      </div>

      <div className='n101-cards-container'>
        <ExploreCard cardNum={1} industry={industries[0]} users={users1}/>
        <ExploreCard cardNum={2} industry={industries[1]} users={users2}/>
        <ExploreCard cardNum={3} industry={industries[2]} users={users3}/>
      </div>

    </div>
  )
}

export default Explore
