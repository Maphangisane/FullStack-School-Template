
import React,{useState, useEffect} from 'react'

function Sidebar() {
  const [userRole, setUserRole] = useState();
  
  return (
    <>
    <div className="sidebar-wrapper" >
      <div className="logo">
          <i className="fa-solid fa-school"></i> 
          <a href="http://localhost:5173">Sebitja<span>Secondary</span></a>
      </div>
      <div className="sidebar_links">
          <span className='links-subtitle'>Main page</span>
          <a href=""><i className="lni lni-grid-alt"></i>Dashboard </a>
          <a  href=""><i className="lni lni-quotation"></i>About</a>
          <a href=""><i className="lni lni-comments"></i>Blog<i  className="lni lni-chevron-right"></i></a>
          <div className="blog-links">
            <a href="">Create blog</a>
            <a href="">Blog posts</a>
          </div>
          <a href=""><i className="fa-regular fa-address-book"></i>Contact</a>
          <a  href=""><i className="fa-solid fa-users"></i>User</a>
      </div>
    </div>
    </>
  )
}

export default Sidebar