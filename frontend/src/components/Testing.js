import React, {useState, useEffect} from 'react'
import './Testing.css'

//This component was used for testing fetch request to custom backend (NOT ACTUALLY IN APP)

function Testing() {
    const [currentUser, setCurrentUser] = useState({});
    const [portUser, setPortUser] = useState({});
    const [users, setUsers] = useState([]);
    
    useEffect(() => { //called when page is initially loaded
        const fetchCurrUser = async () => {
          const response = await fetch('http://localhost:9000/startups/6411044857917eef6f7ac07e');
          const data = await response.json();
          setCurrentUser(data);
        }
        fetchCurrUser();

        const fetchUsers = async () => {
            const response = await fetch('http://localhost:9000/startups');
            const data = await response.json();
            setUsers(data);
        }
        fetchUsers();

        const fetchPortfolioUser = async() => {
            const response = await fetch(`http://localhost:9000/portfolio?username=${'101-consulting'}`);
            const data = await response.json();
            setPortUser(data);
        }
        fetchPortfolioUser();
        

    }, [])


    if (Object.keys(currentUser).length === 0) {
        return ( //this is rendered when data from the server still has not been fetched (loading time)
            <div className='n1000-whole-page'>
                <h1 className='n1000-loading'>Loading...</h1> 
            </div> 
        )
    } else {
        return (
            <div className='n1000-whole-page'>
               <h1>{currentUser.text}</h1> 
               <h1>{portUser.text}</h1> 
               {users.map(user => (
              <h2 key={user.text}>{user.text}</h2>
            ))}
            </div>
        )
    } 
  
}

export default Testing
