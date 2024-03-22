import React, { useEffect, useState } from 'react'
import './style.css';
import icon from '../assets/img/dee.png';
import Notifications from "react-notifications-menu"

const DEFAULT_NOTIFICATION = {
  image:
    "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
  message: "Notification one.",
  detailPage: "/events",
  receivedTime: "12h ago"
};

const TopBar = ({user}) => {
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
       fetchGraphData();
       setMessage(`test ke-${data.length}`)
      },5*1000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
  
  const fetchGraphData = () =>{
    console.log(message.length)
    setData("")
    /* if (message.length > 0) {
      setData([
        ...data,
        {
          ...DEFAULT_NOTIFICATION,
          message
        }
      ]);
      setMessage("");
      // alert("notification added");
    } */
  }
  return (
    <>
    <div className='topbar'>
      <div className='topName'>
      </div>
      <div className='topOut'>
        <img src={icon} width="30" height="30"alt="Logo" className='imgTop' />
        Hi, {user?.uname} 

        <Notifications
          data={data}
          header={{
            title: "Notifications",
            option: { text: "View All", onClick: () => console.log("Clicked") }
          }}
          markAsRead={(data) => {
            // console.log(data);
          }}
        />
      </div>
    </div>
    </>
  )
}

export default TopBar
