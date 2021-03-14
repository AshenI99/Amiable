import React, {useState} from 'react'


const SPF = (props)=>{
	
	const [amounts, setAmounts] =useState({
		nonCurrentAssets:'',
		currentAssets:'',
		nonCurrentLiabilities:'',
		currentLiabilities:'',
		equity:''
	})

	const [deleteRow, setDeleteRow] =useState({})

	React.useEffect(()=>{

		let nonCurrentAssets = null;
		let currentAssets =null;
		let nonCurrentLiabilities = null;
		let currentLiabilities = null;
		let equity = null;


		if(props.changed){
			props.finishedTransactions.map((item)=>{
				if(item.typeId === 9){
					nonCurrentAssets = +nonCurrentAssets + +item.amount 
				}
				else if(item.typeId === 8 && item.typeSubId === 1){
					currentAssets = +currentAssets + +item.amount
				}
				else if(item.typeId === 8 && item.typeSubId === 0){
					currentAssets = +currentAssets + -item.amount
				}
				else if(item.typeId === 10){
					nonCurrentLiabilities = +nonCurrentLiabilities + +item.amount 
				}
				else if(item.typeId === 11){
					currentLiabilities = +currentLiabilities + +item.amount 
				}
				else if(item.typeId === 12 && item.typeSubId === 1){
					equity = +equity + +item.amount 
				}
				else if(item.typeId === 12 && item.typeSubId === 0){
					equity = +equity + -item.amount 
				}
			})

			equity = props.netProfit + equity

			setAmounts({
				...amounts,
				nonCurrentAssets: nonCurrentAssets,
				currentAssets: currentAssets,
				nonCurrentLiabilities: nonCurrentLiabilities,
				currentLiabilities: currentLiabilities,
				equity: equity
			})
			props.setChanged(false)
		}
	})

	const handleDelete=(transactionId)=>{
		let oldTransactions = JSON.parse(JSON.stringify(props.defaultTransactions));

		for(var i = 0; i < oldTransactions.length ; i++){
			if(oldTransactions[i].transactionId === transactionId){
				oldTransactions.splice(i,1)
				break;
			}
		}

		props.setDefaultTransactions(oldTransactions)
	}

	const RenderEquity=(no)=>{
		let arr = props.finishedTransactions.filter((item) => no.no === item.typeSubId && 12 === item.typeId)
		if(arr.length > 0){
			const Data = arr.map((item)=>{
					if(no.no === 1){
						return(
							<tr onMouseEnter={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: true
								})
							}} 
							onMouseLeave={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: false
								})
							}} 
							key={item.transactionId}>
								<td style={{position:'relative'}}>Capital {item.name ? '(' +item.name+ ')' : ''}
								<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
									<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
								</div>
								</td>								
								<td style={{textAlign:'right'}}>{item.amount}</td>
								<td></td>
							</tr>
						)
					}
					else{
						return(
							<tr onMouseEnter={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: true
								})
							}} 
							onMouseLeave={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: false
								})
							}} key={item.transactionId}>
								<td style={{position:'relative'}}>Drawings {item.name ? '(' +item.name+ ')' : ''}
								<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
									<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
								</div>
								</td>
								<td style={{textAlign:'right'}}>-{item.amount}</td>
								<td></td>	
							</tr>
						)	
					}
			})

			return(
				<>
					{Data}
				</>
			)
		}
		else{
			return(null)
		}
	}



	const RenderAssets=(no)=>{
		let arr = props.finishedTransactions.filter((item) => no.no === item.typeId)
		if(arr.length > 0){
			const Data = arr.map((item)=>{
				if(item.typeSubId === 1){
					return(
						<tr onMouseEnter={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: true
								})
							}} 
							onMouseLeave={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: false
								})
							}} key={item.transactionId}>
							<td style={{position:'relative'}}>{item.name}
							<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
								<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
							</div>
							</td>
							
							{no.name === 'nonCurrentAssets' || no.name === 'nonCurrentLiabilities' ? 
								<td></td>	
							:''}

							<td style={{textAlign:'right'}}>{item.amount}</td>

							{no.name === 'currentAssets' || no.name === 'currentLiabilities' ? 
								<td></td>	
							:''}
						</tr>
					)
				}
				else{
					return(
						<tr onMouseEnter={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: true
								})
							}} 
							onMouseLeave={()=>{
								setDeleteRow({
									...deleteRow,
									[item.transactionId]: false
								})
							}} key={item.transactionId}>
							<td style={{position:'relative'}}>{item.name}
							<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
								<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
							</div>
							</td>
							
							{no.name === 'nonCurrentAssets' ? 
								<td></td>	
							:''}

							<td style={{textAlign:'right'}}>-{item.amount}</td>

							{no.name === 'currentAssets' ? 
								<td></td>	
							:''}
						</tr>
					)
				}
			})

			return(
				<>
					{Data}
					<tr><td></td><td></td><td style={{textAlign:'right'}}>{amounts[no.name]}</td></tr>
					
				</>
			)
		}
		else{
			return(
			<>
				<tr><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td></tr>
				<tr><td></td><td></td><td></td></tr>
			</>
			)
		}
	}

	return(
		
			<div className='mt-1' style={{padding:'20px 80px', marginTop:'10px'}}>
				
				<div style={{textAlign:'center'}}><h4>Araliya Enterprises</h4></div> 
				<div style={{textAlign:'center'}}><h4>Financial Position Statement</h4></div> 
				<div style={{textAlign:'center', marginBottom:'30px'}}><h5>As at 31<sup>st</sup> December 2020</h5></div> 	

				<table className='table table-bordered financial-tables' style={{lineHeight:'.7'}}>

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Non Current Assets</td>
					<td></td>
					<td></td>
				</tr>

				<RenderAssets no={9} name='nonCurrentAssets'/>

				<tr><td></td><td></td><td></td></tr>									

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Current Assets</td>
					<td></td>
					<td></td>
				</tr>

				<RenderAssets no={8} name='currentAssets'/>

				<tr style={{fontWeight:'550'}}>
					<td>Total Assets</td>
					<td></td>
					<td style={{textAlign:'right'}}>{amounts.nonCurrentAssets+ amounts.currentAssets}</td>
				</tr>

				<tr><td></td><td></td><td></td></tr>									

				<tr style={{fontWeight:'600', lineHeight:'1.5'}}>
					<td>Total Equity & Liability</td>
					<td></td>
					<td></td>
				</tr>	

				<RenderEquity no={1}/>

				<tr>
					<td>Net profit</td>
					<td style={{textAlign:'right'}}>{props.netProfit}</td>
					<td></td>
				</tr>

				<RenderEquity no={0}/>

				<tr style={{fontWeight:'550'}}>
					<td></td>
					<td></td>
					<td style={{textAlign:'right'}}>{amounts.equity}</td>
				</tr>

				<tr><td></td><td></td><td></td></tr>

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Non Current Liabilities</td>
					<td></td>
					<td></td>
				</tr>

				<RenderAssets no={10} name='nonCurrentLiabilities'/>


				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Current Liabilities</td>
					<td></td>
					<td></td>
				</tr>

				<RenderAssets no={11} name='currentLiabilities'/>

				<tr style={{fontWeight:'550'}}>
					<td></td>
					<td></td>
					<td style={{textAlign:'right'}}>{amounts.nonCurrentLiabilities+ amounts.currentLiabilities}</td>
				</tr>

				<tr style={{fontWeight:'550'}}>
					<td>Total Equity & Liability</td>
					<td></td>
					<td style={{textAlign:'right'}}>{amounts.nonCurrentLiabilities+ amounts.currentLiabilities + amounts.equity}</td>
				</tr>

				</table>
			</div>
	)
}

export default SPF;