import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

//useEffect used to make something happen when the page loads

function Card(props) {

  //{tasks.map((task) => (<h3 key={task.id}>{task.text}</h3>))} //display all the items in a list, each thing must have an unique key

  //setTasks(...tasks, {new task's info}) //how to add a new item to a stateful list

  //Context API or REDUX creates a store which you can pull state from any component

  return (
        <div className='n3-card-container'>

            <Link className='n3-card-link' to={'/user/' + props.currUsername} >

                <figure className='n3-image-wrapper'>
                    <img className='n3-cards-image' src={props.currSrc} alt='Real Estate' />
                </figure>
                <div className='n3-info-wrapper'>
                    <h5 className='n3-info-text'>{props.currText}</h5>
                </div>

            </Link>

            <div className='n3-icons'>
                <div className='n3-grid-item'>
                    <i className={props.currIcons[0]} />
                </div>
                <div className='n3-grid-item'>
                    <i className={props.currIcons[1]} />
                </div>
                <div className='n3-grid-item'>
                    <i className={props.currIcons[2]} />
                </div> 
            </div>

        </div>
  )
}

export default Card
