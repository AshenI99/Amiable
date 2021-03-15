import React from 'react'


const Homepage = (props)=>{
	return(
		<div className='homepage'>
			<h1 className='topic'>Amiable</h1>
			<div className='dark-div'>
				<p className='p-4'>
					Welcome to Amiable community !<br/>
					Amiable lets you to manage your financial matters better to make your life easier.<br/>
					Don't ever let your business get ahead of the financial side of your business.<br/>  
					We are always backing you .<br/>
					Amiable Accounting Software, the easy way to a happier business !<br/>
				</p>
			</div>
			<div style={{textAlign:'center'}}>
				<img style={{width:'205px', height:'245px'}} src='images/logo.png'/>
			</div>
		</div>
	)
}

export default Homepage