import React from 'react'
import Interface from './Interface'



const Transaction = (props)=>{
	return(
		<div className='transaction'>
			<Interface 
				businessName={props.businessName}
	  			businessDate={props.businessDate}
	  		/>
		</div>
	)
}

export default Transaction