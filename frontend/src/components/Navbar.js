import React, {useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'



function Navbar() {
  const [click, setClick]= useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div className='n2-grid'>

      <div className='n2-cell n2-logo-container'>
        <Link to='/' className='n2-navbar-logo'>
          INVST <i className='fa-solid fa-brain' />
        </Link>
      </div>

      <div className='n2-cell n2-link-list'>
        <Link to='/' className='n2-link'>Home</Link>
        <Link to='/explore' className='n2-link'>Explore</Link>
        <Link to='/watchlist' className='n2-link'>Watchlist</Link>
        <Link to='/investments' className='n2-link'>Portfolio</Link>
      </div>

      <div className='n2-cell n2-side-menu' onClick={handleClick}>
        {/* <i className= {click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} /> */}
        <Link to='/info' className='n2-info'>
          <i class="fa-solid fa-circle-question"></i>
        </Link>
      </div>

    </div>    
      
      
  )
}

export default Navbar
