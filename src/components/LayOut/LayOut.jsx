import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './../NavBar/NavBar';
// import Footer from './../Footer/Footer';



function LayOut() {
  return (
    <>
    <NavBar />
    <div className='container'>
    <Outlet/>
    </div>
    {/* <Footer /> */}


    
    </>
  )
}

export default LayOut