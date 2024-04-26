import React, { useRef } from "react"
import { NavLink, Outlet } from "react-router-dom"

const RootLayout = () => {
  const activeLinkStyle = ({isActive} : {isActive:boolean}) => {
    return (
      isActive ? {color: "#fff", backgroundColor: "#6C63FF"} : {color: "#fff"} 
    )
  }


  return (
    <>
      <nav className="w-64 flex flex-col bg-bg-left justify-center gap-8">
        <img src="../public/assets/logo.png"></img>
        <NavLink style={activeLinkStyle} to="/dashboard" className="flex group visible justify-start pl-8 py-4 align-center hover:bg-gray-3">
          <div className="flex justify-around align-center items-center group-hover:text-blue-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
            </svg>
            <span className="text-white font-bold text-xl ml-2 group-hover:text-blue-2">Dashboard</span>
          </div>
        </NavLink>
        <NavLink style={activeLinkStyle} to="/addTransaction" className="flex group justify-start pl-8 py-4 align-center hover:bg-gray-3">
          <div className="flex justify-around align-center items-center group-hover:text-blue-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
            </svg>
            <span className="text-white font-bold text-xl ml-2 group-hover:text-blue-2">Add Transaction</span>
          </div>
        </NavLink>
        <NavLink style={activeLinkStyle} to="/transactions" className="flex group justify-start pl-8 py-4 align-center hover:bg-gray-3">
          <div className="flex justify-around align-center items-center group-hover:text-blue-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
            </svg>
            <span className="text-white font-bold text-xl ml-2 group-hover:text-blue-2">View Transaction</span>
          </div>
        </NavLink>
        <NavLink style={activeLinkStyle} to="/reports" className="flex group justify-start pl-8 py-4 align-center hover:bg-gray-3">
          <div className="flex justify-around align-center items-center group-hover:text-blue-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
            </svg>
            <span className="text-white font-bold text-xl ml-2 group-hover:text-blue-2">Reports</span>
          </div>
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default RootLayout