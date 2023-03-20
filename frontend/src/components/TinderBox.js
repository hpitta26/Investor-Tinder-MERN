import React, {useState, useEffect, useContext} from 'react'
import './TinderBox.css'
import Card from './Card';

import { CurrUserContext } from '../App';


function TinderBox() {
  const [userList, setUserList] = useState([]);

  const currUser = useContext(CurrUserContext).user
  const setCurrUser = useContext(CurrUserContext).setUser

  useEffect(() => { //called when page is initially loaded
    const getUsers = async () => {
        const usersFromServer = await fetchUsers();
        setUserList(usersFromServer);
    }
    getUsers();
  }, [])


  //Fetch Users
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:9000/startups');
    const data = await response.json(); //parses the json String and makes it a JS Array

    return data; //returns userList from JsonServer
  }

  //Used to loop through the Cards the user sees
  function handleCurrUser() {
    if (currUser < userList.length - 1) {
        setCurrUser(currUser + 1);
        
    } else {
        setCurrUser(0);
    }
  }

  const addToWatchList = async () => {

    handleCurrUser();

    const response = await fetch(`http://localhost:9000/startups/${userList[currUser]._id}`);
    const targetUser = await response.json();
    console.log(targetUser)
    

    const watchListUser = {
      // id: targetUser.id,
      industries: targetUser.industries,
      src: targetUser.src,
      alt: targetUser.alt,
      text: targetUser.text,
      username: targetUser.username,
      ocf: targetUser.ocf,
      rgr: targetUser.rgr,
      sales: targetUser.sales,
      star: false
    }

    try {
       await fetch('http://localhost:9000/watchlist', {
        method:'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(watchListUser)
      })
    } catch {
      
    }
    
  }


  if (!userList.length) {
    return (
        <h1>Loading...</h1> //this is rendered when data from the server still has not been fetched (loading time)
    )
  } else {
    return (
        <div className='n4-cards-space'>
                <div className='n4-triple-item-list'>
                    <div className='n4-list-item-tick' onClick={addToWatchList}>
                        <i className="fa-solid fa-check" />
                    </div>

                    <Card currText={userList[currUser].text} currSrc={userList[currUser].src} currUsername={userList[currUser].username} currIcons={userList[currUser].icons}/>
    
                    <div className='n4-list-item-cross' onClick={handleCurrUser}>
                        <i className="fa-solid fa-xmark" />
                    </div>
                </div>
        </div>
    )
  }

    // This Array of Object Literals were used as the initial Startup data

    //   const cardList = [
    //     {src: 'images/homes1.jpg', alt:'Real Estate', text: 'Home Builders', username: 'home-builders'},
    //     {src: 'images/cafe2.jpg', alt:'Cafe', text: 'Little Cafe', username: 'little-cafe'},
    //     {src: 'images/code1.jpg', alt:'Software', text: 'Design You', username: 'design-you'},
    //     {src: 'images/consulting2.jpg', alt:'Consulting', text: '101 Consulting', username: '101-consulting'},
    //     {src: 'images/food-delivery1.jpg', alt:'Food Delivery', text: 'Insta Grocery', username: 'insta-grocery'},
    //     {src: 'images/golf1.jpg', alt:'Green Golf', text: 'Green Golf', username: 'green-golf'},
    //     {src: 'images/pet1.jpg', alt:'Pet Store', text: 'Your Bestfriend', username: 'your-bestfriend'},
    //     {src: 'images/restaurant1.jpg', alt:'Restaurant', text: 'Italian Heritage', username: 'italian-heritage'},
    //     {src: 'images/snowboard1.jpg', alt:'Winter Sports', text: 'Inov Boards', username: 'inov-boards'},
    //     {src: 'images/tourism2.jpg', alt:'Tourism', text: 'Travel Together', username: 'travel-together'}
    //   ] 


}

export default TinderBox
