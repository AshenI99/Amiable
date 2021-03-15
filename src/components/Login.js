import React, {useState} from 'react'
import {Link} from 'react-router-dom'


const Login = (props)=>{

	const [uname, setUname] = useState()
	const [pword, setPword] = useState()

	return(
		<div className='login'>
			<div className='login-form'>
				<div><h3>Sign In</h3></div>
				<div style={{position:'relative'}} className='form-input mt-4'>
					<i style={{position:'absolute', fontSize:'25px', top:'6px', left:'10px'}} className='fa fa-user'></i>
					<input
						type='text'
						name='username'
						id='username'
						className='form-control'
						placeholder='Username'
						value={uname}
						onChange={(event)=>{setUname(event.target.value)}}
					/>
				</div>
				<div style={{position:'relative'}} className='form-input mt-4'>
					<i style={{position:'absolute', fontSize:'25px', top:'6px', left:'10px'}} className='fa fa-lock'></i>
					<input
						type='password'
						name='password'
						id='password'
						value={pword}
						onChange={(event)=>{setPword(event.target.value)}}
						className='form-control'
						placeholder='Passowrd'
					/>
				</div>
				<div className='form-input mt-4'>
					<input
						type='checkbox'
						name='remember'
						id='remember'
						className='form-check-input'
					/>
					<h6 style={{fontWeight:'500'}} className='ml-4 text-white'>Remember Me</h6>
				</div>
				<div className='float-right btn-login'>
					{uname ? pword ? 
						<Link to='/details'><button className='btn'>Login</button></Link>
					:
						<button disabled className='btn'>Login</button>
					:
					<button disabled className='btn'>Login</button>
					}
				</div>
				<div className='signup'>
					<h5 className='pt-2'>Don't have an account?</h5>
					<h6 className=''>Sign Up</h6>
				</div>
			</div>
		</div>
	)
}

export default Login