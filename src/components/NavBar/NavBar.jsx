import React, { useContext } from 'react'
import {  NavLink } from 'react-router-dom'
import { CounterContext } from './../../Context/ConterContext';
import { TokenContext } from '../../Context/TokenContext';
import { useSelector } from 'react-redux';
function NavBar() {
  const counter = useSelector((state) => state.cart.counter);
  console.log(counter);
  
  // let {counter} = useContext(CounterContext)
  let {token,setToken} = useContext(TokenContext)
  function LogOut(){
    localStorage.removeItem("token")
    setToken(null)
  }
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <NavLink className="navbar-brand"  to={'/home'}>E-commerce </NavLink>
            <button className="navbar-toggler" type="button" >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse ms-auto" id="navbarSupportedContent">
              <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                <li className="nav-item">
                    <NavLink className="nav-link active" to={'/home'} >Home</NavLink>
                  </li>
            
                  <li className="nav-item">
                    <NavLink className="nav-link active" to={'/category'} >category</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link active" to={'/cart'} >cart <sup className=' h6 text-bg-warning '>{counter==0?"":counter}</sup> </NavLink>
                  </li>                 


                {token ? <>
                  <li className="nav-item">
                  <NavLink className="nav-link" onClick={LogOut} to={'/home'}>Loge Out</NavLink>
                  </li>
                  </>
    
                :<>
                  <li className="nav-item">
                  <NavLink className="nav-link" to={'/register'}>Register</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink className="nav-link" to={'/login'}>login</NavLink>
                 </li>
           
                 </>
                 }


         
              </ul>

            </div>
          </div>
        </nav>
    </>
  )
}

export default NavBar