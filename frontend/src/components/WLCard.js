import React from 'react'
import "./WLCard.css"
import { Link } from 'react-router-dom'

function WLCard(props) {


  function handleStarClick() {
    props.updStar(props._id);
  }  

  function handleDeleteClick() {
    props.deleteUser(props._id);
  }

  return (

      <div className='n7-card-container n7-grid'>


          <Link className='n7-card-link n7-cell n7-item-one' to={'/user/' + props.username} >
            <img src={props.src} alt={props.alt} className='n7-profile-pic' />
            <span className='n7-company-industry'>{props.industries}</span>
          </Link>

          <Link className='n7-card-link n7-cell2 n7-item-two' to={'/user/' + props.username} >

            <div className='n7-middle-cell1'>
              <h1 className='n7-company-name'>{props.text}</h1>
              <p><i className="fa-solid fa-location-dot n7-icon1" /> Chicago, Illinois</p>
              <p><i className="fa-solid fa-user-group n7-icon2" /> 21</p>
              <p><i className="fa-solid fa-flag n7-icon3" /> Apr 2010</p>
              
            </div>

            <div className='n7-middle-cell2'>
              <table className='n7-table'>
                <tbody>
                  <tr>
                    <td className='n7-table-r0'>OCF</td>
                    <td className='n7-table-r1'>${props.ocf[0]}</td>
                    <td className='n7-table-r2'>${props.ocf[1]}</td>
                    <td className='n7-table-r3'>${props.ocf[2]}</td>
                  </tr>
                  <tr>
                    <td className='n7-table-r0'>RGR</td>
                    <td>{props.rgr[0] > 0 ? `+${props.rgr[0]}%` : `${props.rgr[0]}%`}</td>
                    <td>{props.rgr[1] > 0 ? `+${props.rgr[1]}%` : `${props.rgr[1]}%`}</td>
                    <td>{props.rgr[2] > 0 ? `+${props.rgr[2]}%` : `${props.rgr[2]}%`}</td>
                  </tr>
                  <tr>
                    <td className='n7-table-r0 n7-table-last'>Sales</td>
                    <td className='n7-table-last'>{props.sales[0]}</td>
                    <td className='n7-table-last'>{props.sales[1]}</td>
                    <td className='n7-table-last'>{props.sales[2]}</td>
                  </tr>
                  </tbody>
              </table>
            </div>

          </Link>

          <div className='n7-cell n7-item-three'>
              <div className='n7-btns-wrapper'>
                  <i className="fa-regular fa-trash-can" onClick={handleDeleteClick}/>
                  <i className={`fa-solid fa-star ${props.star? "star-active" : ""}`} onClick={handleStarClick}/>
              </div>    
          </div> 

      </div>

    
    
  )
}

export default WLCard
