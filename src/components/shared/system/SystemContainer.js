import React from 'react'
import Sidebar from "./Sidebar";
import Header from "./Header";

const SystemContainer = props => {
  return (
    <div className="main-wrapper">
      <div className="app">
        <Header/>

        <Sidebar/>

        {props.children}

      </div>
    </div>
  )
}

export default SystemContainer