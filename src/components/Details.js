import React, {useState} from 'react'
import {Link} from 'react-router-dom'


const Details = (props)=>{

	return(
		<div className='login'>
			<div className='details-form'>
				<div style={{position:'relative', clear:'left'}} className='details-input pt-4'>
					<div style={{paddingTop:'50px'}} className='col-md-4 float-left'><h6>Business Name</h6></div>
					<div style={{paddingTop:'50px'}} className='col-md-7 float-left'>
						<input
							type='text'
							name='businessName'
							id='businessName'
							className='form-control'
							placeholder='Enter Business Name'
							value={props.businessName}
							onChange={(event)=>{props.setBusinessName(event.target.value)}}
						/>
					</div>
				</div>
				<div style={{position:'relative', clear:'left'}} className='details-input pt-4'>
					<div className='col-md-4 float-left'><h6>Calendar Year</h6></div>
					<div className='col-md-7 float-left'>
						<input
							type='date'
							name='businessDate'
							id='businessDate'
							className='form-control'
							value={props.businessDate}
							onChange={(event)=>{props.setBusinessDate(event.target.value)}}
						/>
					</div>
				</div>
				<div className='btn-statement'>
					{props.businessName ? props.businessDate ? 
						<Link to='/transaction'><button className='btn'>Create Statements</button></Link>
					:
						<button disabled className='btn'>Create Statements</button>
					:
					<button disabled className='btn'>Create Statements</button>
					}
				</div>
			</div>
		</div>
	)
}

export default Details