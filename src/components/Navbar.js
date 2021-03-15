import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = (props)=>{
	return(
		<div style={{position:'relative'}} className='navbar'>
			<img style={{position:'absolute', width:'110px', height:'115px'}} src='images/logo.png'/>
			<div style={{textAlign:'right', position:'absolute', right:'10px'}}>
				<Link to='/'><button className='btn' style={{backgroundColor:'#091C51', color:'#fff'}}>Home</button></Link>
				<Link to='/login'><button className='btn' style={{backgroundColor:'#091C51', color:'#fff'}}>Login</button></Link>
				<Link to='/about'><button className='btn' style={{backgroundColor:'#091C51', color:'#fff'}}>About Us</button></Link>
			</div>
		</div>
	)
}

export default Navbar