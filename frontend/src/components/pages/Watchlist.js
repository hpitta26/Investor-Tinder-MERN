import React, {useState, useEffect} from 'react'
import './Watchlist.css';

import WLCard from '../WLCard';


function Watchlist() {
  const [wlUsers, setWlUsers] = useState([]);
  const [timePeriod, setTimePeriod] = useState("Month");

  const currIndustries = ["Delivery", "Hospitality", "Pet", "Prof Services", "Real Estate", "Sport", "Tech"];


  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch('http://localhost:9000/watchlist');
      const data = await response.json();
      setWlUsers(data);
    }

    fetchWatchlist();
  }, [])


  const updateStar = async (_id) => {
    const res = await fetch(`http://localhost:9000/watchlist/${_id}`);
    const targetUser = await res.json();

    const upd = await fetch(`http://localhost:9000/watchlist/${_id}`, {
      method: 'PATCH', //update only data
      headers: {'Content-type': 'application/json'}, //sent data will be in form of JSON Object
      body: JSON.stringify( { star:  !targetUser.star} )
    })

    const updData = await upd.json();

    setWlUsers(wlUsers.map((user => user._id === _id ? {...user, star: updData.star} : user )))
  }

  
  const deleteUserFromWatchlist = async (_id) => {
      await fetch(`http://localhost:9000/watchlist/${_id}`, {method: 'DELETE'});

      setWlUsers(wlUsers.filter((user) => user._id !== _id));
  }


  document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-btn]");
    try {
      if (!isDropdownButton && !e.target.matches("[data-menu]")) {
        document.getElementById('n102-filter').classList.remove('active')
      }
      if (isDropdownButton) {
        document.getElementById('n102-filter').classList.add('active')
      }
    } catch {
      //The click was not in this page
    }
    
  })


  function onlyOneChecked(event) {

    if (!event.target.checked) { //resets the watchlist when checkbox is unchecked
      const fetchWatchlist = async () => {
        const response = await fetch('http://localhost:9000/watchlist');
        const data = await response.json();
        setWlUsers(data);
      }
      fetchWatchlist();
      return;
    }

    document.querySelectorAll('.n102-checkbox').forEach(cb => {
      if (cb.id !== event.target.id) { //cb == checkbox
        cb.checked = false;
      } 
    })

    function getAverage(arr) {
      var avg = 0;
      for (var i = 0; i < arr.length; i++) {
        avg = avg + arr[i];
      }
      return avg/arr.length
    }

    switch(event.target.id) {
      case 'fav':
        // console.log('fav');
        const fetchWatchlistFav = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          const data = await response.json();
          var data1 =  data.filter( users => {
            return users.star
          })
          var data2 =  data.filter( users => {
            return !users.star
          })
          var dataFull = data1.concat(data2);
          setWlUsers(dataFull);
        }
        fetchWatchlistFav();
        break;
      case 'ocf':
        // console.log('ocf');
        const fetchWatchlistOcf = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          let data = await response.json();
          data.sort((a,b) => b.ocf[0] - a.ocf[0])
          setWlUsers(data);
        }
        fetchWatchlistOcf();
        break;
      case 'rgr':
        // console.log('rgr');
        const fetchWatchlistRgr = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          let data = await response.json();
          data.sort((a,b) => b.rgr[0] - a.rgr[0])
          setWlUsers(data);
        }
        fetchWatchlistRgr();
        break; 
      case 'sales':
        // console.log('sales');
        const fetchWatchlistSales = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          let data = await response.json();
          data.sort((a,b) => b.sales[0] - a.sales[0])
          setWlUsers(data);
        }
        fetchWatchlistSales();
        break; 
      case 'a-ocf':
        // console.log('a-ocf');
        const fetchWatchlistAocf = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          let data = await response.json();
          data.sort((a,b) => getAverage(b.ocf) - getAverage(a.ocf))
          setWlUsers(data);
        }
        fetchWatchlistAocf();
        break; 
      case 'a-rgr':
        // console.log('a-rgr');
        const fetchWatchlistArgr = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          let data = await response.json();
          data.sort((a,b) => getAverage(b.rgr) - getAverage(a.rgr))
          setWlUsers(data);
        }
        fetchWatchlistArgr();
        break;     
      case 'a-sales':
        // console.log('a-sales');
        const fetchWatchlistAsales = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          let data = await response.json();
          data.sort((a,b) => getAverage(b.sales) - getAverage(a.sales))
          setWlUsers(data);
        }
        fetchWatchlistAsales();
        break;  
      default:
        // console.log('industry');
        const fetchWatchlistIndustry = async () => {
          const response = await fetch('http://localhost:9000/watchlist');
          const data = await response.json();
          var targetInd = event.target.id;
          if (event.target.id === 'Prof Services') {
            targetInd = 'Professional Services'
          }
          var filter1 = data.filter((user) => user.industries === targetInd);
          var filter2 = data.filter((user) => user.industries !== targetInd);
          setWlUsers(filter1.concat(filter2));
        }
        fetchWatchlistIndustry();
    }
  }



  
  // console.log(wlUsers);

  if (!wlUsers.length) {
    return (
      <div className='n102-whole-page'>
        <h1 className='n102-title-text'>-- Your Watchlist --</h1>
      </div>    
    )
  } else {
    return (
      <div className='n102-whole-page'>
        <h1 className='n102-title-text'>-- Your Watchlist --</h1>



        <div className='n102-list-wrapper'>

          <div className='n102-labels-container'>


            <div id="n102-filter" className='n102-filter' data-wrapper>
              <button className='n102-sort-btn' data-btn>Sort <i className="fa-solid fa-sort" /></button>
              <div id='dropDown' className='n102-dropdown-menu' data-menu>



                <div className='n102-dropdown-menu-cell' data-menu>
                  <input className='n102-checkbox' type="checkbox" id="fav" name="fav" data-menu onClick={onlyOneChecked}/>
                  <label data-menu>Favorites</label>
                </div>

                <hr className='n102-divider' data-menu></hr>

                <label className='n102-dropdown-header' data-menu>Industry</label>
                <div className='n102-menu-grid' data-menu> 
                  {currIndustries.map(industry => (
                    <div className='n102-dropdown-menu-cell' key={industry} data-menu>
                      <input className='n102-checkbox' type="checkbox" id={industry} name={industry} data-menu onClick={onlyOneChecked}/>
                      <label data-menu>{industry}</label>
                    </div>
                  ))}
                </div>

                <hr className='n102-divider' data-menu></hr>

                <div className='n102-menu-grid' data-menu>
                  <div className='n102-menu-stat-list'>

                    <label className='n102-dropdown-header' data-menu>Current</label>
                    <div className='n102-dropdown-menu-cell' data-menu>
                      <input className='n102-checkbox' type="checkbox" id="ocf" name="ocf" data-menu onClick={onlyOneChecked}/>
                      <label data-menu>OCF</label>
                    </div>
                    <div className='n102-dropdown-menu-cell' data-menu>
                      <input className='n102-checkbox' type="checkbox" id="rgr" name="rgr" data-menu onClick={onlyOneChecked}/>
                      <label data-menu>RGR</label>
                    </div>
                    <div className='n102-dropdown-menu-cell' data-menu>
                      <input className='n102-checkbox' type="checkbox" id="sales" name="sales" data-menu onClick={onlyOneChecked}/>
                      <label data-menu>Sales</label>
                    </div>

                  </div>

                  <div className='n102-menu-stat-list' data-menu>

                    <label className='n102-dropdown-header' data-menu>Average</label>
                    <div className='n102-dropdown-menu-cell' data-menu>
                      <input className='n102-checkbox' type="checkbox" id="a-ocf" name="a-ocf" data-menu onClick={onlyOneChecked}/>
                      <label data-menu>OCF</label>
                    </div>
                    <div className='n102-dropdown-menu-cell' data-menu>
                      <input className='n102-checkbox' type="checkbox" id="a-rgr" name="a-rgr" data-menu onClick={onlyOneChecked}/>
                      <label data-menu>RGR</label>
                    </div>
                    <div className='n102-dropdown-menu-cell' data-menu>
                      <input className='n102-checkbox' type="checkbox" id="a-sales" name="a-sales" data-menu onClick={onlyOneChecked}/>
                      <label data-menu>Sales</label>
                    </div>

                  </div>
                </div>

            
              </div>
            </div>


            <div className='n102-labels-grid'>
              <div className='n102-labels n102-labels-grid-cell'>
                <p>Metrics</p>
                <p>{`${timePeriod} 1`}</p>
                <p>{`${timePeriod} 2`}</p>
                <p>{`${timePeriod} 3`}</p>
              </div>
              <div className='n102-time-btn-wrapper n102-labels-grid-cell'>
                {/* <p>Buttton</p> */}
                <select className='n102-time-btn' name='time-select' id='time-period' onChange={(event)=>{
                  const currTime = event.target.value;
                  setTimePeriod(currTime);
                  // console.log(currTime);
                }}>
                  <option value="Month">Monthly</option>
                  <option value="Quarter">Quarterly</option>
                  <option value="Year">Annual</option>
                </select>
              </div>
            </div>

          </div>

          <div className='n102-cards-wrapper'>
            {wlUsers.map(user => (
              <div className='n102-watchlist-cards' key={user._id}>
                <WLCard 
                  src={user.src} 
                  alt={user.alt} 
                  text={user.text} 
                  industries={user.industries} 
                  star={user.star} 
                  _id={user._id} 
                  ocf={user.ocf} 
                  rgr={user.rgr} 
                  sales={user.sales} 
                  username={user.username}
                  updStar={updateStar} 
                  deleteUser={deleteUserFromWatchlist}
                />
              </div>
            ))}
          </div>

          
        </div>

      </div>  
    )
  }

}

export default Watchlist
