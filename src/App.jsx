
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchNewData();
  }, [])

  function makeRequestForUserDataReturnPromise() {
    return fetch('https://randomuser.me/api/')
  }

  function processRequest(response) {
    return response.json();
  }

  async function fetchNewData() {

    try {
      let userDataPromise = await makeRequestForUserDataReturnPromise();
      console.log('Retrieved user data!');
      let userDataJson = await processRequest(userDataPromise);
      console.log('Processed user data!');
      console.log(userDataJson);
      setUserInfo(userDataJson);
    } catch(error) {
      console.log(error);
    }

    // fetch('https://randomuser.me/api/')
    // .then(res => res.json())
    // .then(
    //   (results) => {
    //     console.log(results);
    //     setUserInfo(results);
    //   },

    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  return (
    <div className="app">
      <div className="profile">
        <div className="profile-pic">
          {userInfo && <img src={userInfo.results[0].picture.large} alt="" /> }
        </div>
        <div className="profile-name">
          {userInfo && <p>{userInfo.results[0].name.title}. {userInfo.results[0].name.first} {userInfo.results[0].name.last}</p> }
        </div>
      </div>
      <button
        onClick={fetchNewData}
      >New Data</button>
    </div>
  );
}

export default App;
