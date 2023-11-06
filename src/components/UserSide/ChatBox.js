//ChatBox.js

import React from 'react'

export default function ChatBoxReciever({user,message,timestamp}) {
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedTime;
  }
  return (
    <div style={{display:'flex',justifyContent:'flex-start',flexDirection:'row'}}>
      <p style={{padding:10,backgroundColor:'#dcf8c6', borderRadius:10,maxWidth:"60%"}}>
        <strong style={{fontSize:13}}>{user}</strong>
        <br></br>
        {message}
        <br></br>
        <span style={{ fontSize: 11, color: 'gray' }}>{formatTimestamp(timestamp)}</span>
      </p>
    </div>
  )
}

export function ChatBoxSender({user,message,timestamp}) {
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedTime;
  }
    return (
      <div style={{display:'flex',justifyContent:'flex-end',flexDirection:'row'}} >
        <p style={{padding:10,backgroundColor:'#fff', borderRadius:10,maxWidth:"60%"}}>
          <strong style={{fontSize:13}}>{user}</strong>
          <br></br>
          {message}
          <span style={{ fontSize: 11, color: 'gray' }}>{formatTimestamp(timestamp)}</span>
        </p>
      </div>
    )
  }