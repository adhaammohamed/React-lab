import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './../NavBar/NavBar';

function LayOut() {
  return (
    <>
    <NavBar />
    <div className='container'>
    <Outlet/>
    </div>

    
    </>
  )
}

export default LayOut