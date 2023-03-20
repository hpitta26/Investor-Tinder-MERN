import React from 'react'

import './Info.css'

function Info() {
  return (
    <div className='n104-whole-page'>
        <h1 className='n104-title-text'>-- Information --</h1>
        <div className='n104-text'>

            <h2>Home:</h2>
            <ul>
                <li><i>Utility:</i> provides users with an interactive way of exploring companies.</li>
                <li>Clicking on the <strong>"Check Icon"</strong> adds that company to the User's Watchlist then increments the displayed company.</li>
                <li>Clicking on the <strong>"Cross Icon"</strong> increments the displayed company.</li>
            </ul>
            <h2>Explore:</h2>
            <ul>
                <li><i>Utility:</i> allows users to search companies in specified industries.</li>
                <li>Users can select up to <strong>3 industries</strong> to explore at a time.</li>
                <li><i>Limitations:</i> selecting 4th industry causes the <strong>"Number of Selected Industries"</strong> to be reset to 1.</li>
            </ul>
            <h2>Watchlist:</h2>
            <ul>
                <li><i>Utility:</i> complies important company metrics to aid user in investment decision.</li>
                <li>Users can <strong>Favorite and Sort</strong> companies based on a variety of selectors.</li>
                <li><i>Limitations:</i> only 1 sorting option can be selected at a time.</li>
            </ul>
            <h2>Portfolio:</h2>
            <ul>
                <li><i>Utility:</i> displays user's investments for easy visualization.</li>
                <li><i>Limitations:</i> investment removal has not been implemented yet (still planning desired implementation).</li>
            </ul>
            <h2>Future:</h2>
            <ul>
                <li>Improve <strong>Investment Form</strong> with form validation, and more investment control.</li>
                <li>Improve <strong>User Profiles</strong> through better UI (to do decided).</li>
                <li>Improve <strong>Watchlist</strong> with simultaneous sorting, more metrics, and selected time period functionality.</li>
                <li>Improve <strong>Portfolio</strong> through investment removal, and before/ after investment value.</li>
                <li>Add <strong>Side Menu</strong> to edit user profile and change App settings.</li>
                <li>Add <strong>Timed Metric Change</strong> so that investment value can change over time (simulate actual companies).</li>
                <li>Implement <strong>Backend</strong> using Node.js and Express.js.</li>
            </ul>
            
        </div>
        <h1 className='n104-author'>-- Created By: Henrique Pitta Laranjinha @ 2nd Year UBC --</h1>
    </div>
  )
}

export default Info
