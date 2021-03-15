import React, {useState} from 'react'
import {Link} from 'react-router-dom'


const About = (props)=>{

	const [uname, setUname] = useState()
	const [pword, setPword] = useState()

	return(
		<div className='about'>
			<div style={{position:'relative'}} className='about-div'>
				<div style={{position:'absolute', textAlign:'center', top:'0', height:'70px', width:'100%', backgroundColor:'rgba(255,255,255,.5)'}}>
					<h3 className='mt-3'>Development Team In-tax-icated</h3>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/01.jpg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Dinindu</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/03.jpg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Ashen</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/05.jpg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Janith</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/06.jpeg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Issa</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/08.jpeg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Tharushi</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/04.jpg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Heshani</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/02.jpg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Uththara</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/09.jpeg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Janani</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/10.jpeg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Pabasara</h5>
					</div>
				</div>
				<div className='float-left ml-2 mt-4'>
					<div style={{textAlign:'center'}}>
						<img style={{margin:'15px 13px 5px 13px', minWidth:'125px',maxWidth:'125px', maxHeight:'125px', borderRadius:'15px'}} src='images/07.jpeg'/>
						<h5 style={{fontWeight:'400'}} className='text-white'>Udara</h5>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About