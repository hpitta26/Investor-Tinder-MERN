import React, {useState, useEffect} from 'react'
import "./UPInvest.css"
import { useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'

function UPInvest() {
    const [currentUser, setCurrentUser] = useState({});
    const [popupBool, setPopupBool] = useState(false);
    const { username } = useParams(); //used to get the username from the URL
    const { register, handleSubmit } = useForm();

    useEffect(() => { //called when page is initially loaded
      const fetchCurrUser = async () => {
        const response = await fetch('http://localhost:9000/startups');
        const data = await response.json();
        const targetUser = data.filter(user => user.username === username);
        setCurrentUser(targetUser[0]);
      }
      fetchCurrUser();
    }, [username])
  

    const onSubmit = (data) => {
      setPopupBool(data.agreement);
      
      document.getElementById('n6-popup').classList.add('active');
      document.getElementById('value-slider').value = '5000';
      document.getElementById('value-label').innerHTML = '$5000';
      
      if (!data.agreement) {
        return
      } 
      

      const getUser = async () => {
        const response = await fetch(`http://localhost:9000/portfolio?username=${currentUser.username}`)
        if (!response.ok) {
          //not there POST

          const portfolioUser = {
            id: currentUser.id,
            industries: currentUser.industries,
            src: currentUser.src,
            alt: currentUser.alt,
            text: currentUser.text,
            username: currentUser.username,
            amount: +data.amount,
          }

          await fetch('http://localhost:9000/portfolio', {
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(portfolioUser)
          })
        } else {
          //already there PATCH
          const targetUser = await response.json();

          fetch(`http://localhost:9000/portfolio?username=${targetUser.username}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'}, //sent data will be in form of JSON Object
            body: JSON.stringify({ amount: targetUser.amount + +data.amount })
          })
        }


      }
      getUser();

      


    }

    function handleClick() {
      document.getElementById('n6-popup').classList.remove('active');
    }

    
    const valueSlider = document.getElementById('value-slider');
    var valueLabel = document.getElementById('value-label');
    if (valueSlider !== null) {
      valueSlider.oninput = function() {
        valueLabel.innerHTML = "$"+this.value;
      }
    }

     
    if (Object.keys(currentUser).length === 0) {
      return ( //this is rendered when data from the server still has not been fetched (loading time)
        <div className='n6-whole-page'>
          <h1 className='n6-loading'>Loading...</h1> 
        </div> 
      )
    } else {
      return (
        <div className='n6-whole-page n6-grid'>

            <div id='n6-popup' className='n6-popup-container'>
              <div className='n6-popup-wrapper n6-popup-cell'>
                <div></div>
                <div className='n6-popup-cell n6-popup-top'>
                  <i className={popupBool ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation n6-popup-btn-false'}/>
                  <h1>{popupBool ? 'SUCCESS' : 'ERROR'}</h1>
                </div>
                
                {popupBool ? 
                <p className='n6-popup-text n6-popup-cell'> 
                  Thank you for investing in <strong>{currentUser.text}</strong>.<br></br>You can see your new investment in your portfolio!
                </p>
                :
                <p className='n6-popup-text n6-popup-cell'> 
                  Error occured when trying to submit your invesment to <strong>{currentUser.text}</strong>.<br></br>Check if you agreed to invest!
                </p>
                }

                <div className='n6-popup-cell'>
                  <button className={'n6-popup-btn ' + (popupBool ? 'n6-true' : 'n6-false')} onClick={handleClick}>{popupBool ? 'Continue' : 'Try Again'}</button>
                </div>
                
              </div>
              
            </div> 

            <div className='n6-cell'>
                <h1 className='n6-title-text'>-- Invest in "{currentUser.text}" Here! --</h1>
            </div>

            <div className='n6-cell n6-invest-form'>
              

              <form className='n6-grid-form' onSubmit={handleSubmit(onSubmit)}>

                <div className='n6-form-cell'>
                  <h1 className='n6-form-header'>Investment Form</h1>
                </div>

                <div className='n6-form-cell'>
                  <label className='n6-form-amount'>
                    <font size="+2">Asking: {currentUser.analytics[3]}</font>
                  </label>
                </div>

                <hr className='n6-divider' data-menu></hr>

                <div className='n6-slider-wrapper n6-form-cell'>
                  <label className='n6-form-amount' id="value-label">
                    $5000
                  </label>
                  <input id="value-slider" className='n6-input-box' type="range" min='1' max='10000' defaultValue='5000' {...register("amount")}/>
                </div>
                
                <div className='n6-agreement-wrapper n6-form-cell'>
                  <div>
                    <input type="checkbox" {...register("agreement")}/>
                    <label>I Agree to invest the amount above</label>
                  </div>
                  <div className='n6-submit-wrapper'>
                    <input className='n6-input-submit n6-form-cell' type="submit" />
                  </div>
                </div>
                
                
              </form>

    
            </div>
    
        </div>
      )
    }
  
}

export default UPInvest
