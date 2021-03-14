import React, {useState} from 'react'


const TAccounts = (props)=>{

	const [deleteRow, setDeleteRow] =useState({})

	const [amounts, setAmounts] =useState({
		admin:'',
		sell:'',
		purchase:'',
		finance:'',
		sales:'',
		otherIncome:'',
		netProfit:''
	})

	React.useEffect(()=>{

		let admin = null;
		let sell =null;
		let finance = null;
		let purchase = null;
		let sales =null;
		let otherIncome = null;
		let netProfit = null;

		if(props.changed){
			props.finishedTransactions.map((item)=>{
				if(item.typeId === 5){
					admin = +admin + +item.amount 
				}
				else if(item.typeId === 6){
					sell = +sell + +item.amount
				}
				else if(item.typeId === 7){
					finance = +finance + +item.amount
				}
				else if(item.typeId === 4 && item.typeSubId === 1){
					purchase = +purchase + +item.amount
				}
				else if(item.typeId === 3 && item.typeSubId === 1){
					purchase = +purchase + +item.amount
				}
				else if(item.typeId === 2){
					otherIncome = +otherIncome + +item.amount
				}
				else if(item.typeId === 4 && item.typeSubId === 0){
					purchase = +purchase + -item.amount
				}
				else if(item.typeId === 3 && item.typeSubId === 0){
					purchase = +purchase + -item.amount
				}
				else if(item.typeId === 1 && item.typeSubId === 1){
					sales = +sales + +item.amount
				}
				else if(item.typeId === 1 && item.typeSubId === 0){
					sales = +sales + -item.amount
				}
				else if(item.typeId === 13){
					purchase = +purchase + +item.amount
				}
			})

			netProfit=otherIncome+ sales - purchase - admin - sell - finance;

			setAmounts({
				...amounts,
				admin: admin,
				sell: sell,
				finance: finance,
				purchase: purchase,
				sales: sales,
				otherIncome: otherIncome,
				netProfit: netProfit
			})

			props.setNetProfit(netProfit)
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


	const RenderStock=(name)=>{
		console.log()
		let arr = props.finishedTransactions.filter((item)=> name.name + ' Stock' === item.type)
		if(arr.length > 0){
			let transId = props.finishedTransactions.filter((item)=> name.name + ' Stock' === item.type)[0].transactionId
			return(
				<tr onMouseEnter={()=>{
						setDeleteRow({
							...deleteRow,
							[transId]: true
						})
					}} 
					onMouseLeave={()=>{
						setDeleteRow({
							...deleteRow,
							[transId]: false
						})
					}} >
					<td style={{position:'relative'}}>{name.name + ' Stock'}
					<div style={ deleteRow[transId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
						<button onClick={()=>{handleDelete(transId)}} className='btn btn-dark delete'>Delete</button>
					</div>
					</td>
					<td style={{textAlign:'right'}}>{props.finishedTransactions.filter((item)=> name.name + ' Stock' === item.type)[0].amount}</td>
					<td></td>
				</tr>
			)
		}
		else{
			return(
				<tr>
					<td>{name.name + ' Stock'}</td>
					<td style={{textAlign:'right'}}></td>
					<td></td>
				</tr>	
			)
		}

	}

	const RenderOtherIncome=()=>{
		let arr = props.finishedTransactions.filter((item) => 2 === item.typeId)

		if(arr.length > 0){
			const Data = arr.map((item)=>{
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
							}}  key={item.transactionId}>
								<td style={{position:'relative'}}>{item.name}
								<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
									<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
								</div>
								</td>
								<td style={{textAlign:'right'}}>{item.amount}</td>
								<td></td>
							</tr>
					)
			})

			return(
				<>
					{Data}
					<tr><td></td><td></td><td style={{textAlign:'right'}}>{amounts.otherIncome}</td></tr>
					<tr><td></td><td></td><td></td></tr>
				</>
			)
		}
		else{
			return(
				<>
					<tr><td></td><td></td><td></td></tr>
					<tr><td></td><td></td><td></td></tr>
				</>
			)
		}

	}

	const RenderCostOfSales=()=>{
		let arr = props.finishedTransactions.filter((item) => 13 === item.typeId)
		
		if(arr.length > 0){
			const Data = arr.map((item)=>{
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
							}}  key={item.transactionId}>
								<td style={{position:'relative'}}>{item.name}
								<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
									<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
								</div>
								</td>
								<td style={{textAlign:'right'}}>{item.amount}</td>
								<td></td>
							</tr>
					)
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

	const RenderPurchases=()=>{
		let arr = props.finishedTransactions.filter((item) => 3 === item.typeId)

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
								<td style={{position:'relative'}}>Purchases ({item.name})
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
								<td style={{position:'relative'}}>Return Outwards ({item.name})
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

	const RenderSales=()=>{

		let saleAmount = ''
		
		let arr = props.finishedTransactions.filter((item) => 1 === item.typeId)
		if(arr.length > 0){
			const Data = arr.map((item)=>{
				if(item.typeSubId === 1){
					saleAmount = +item.amount + +saleAmount
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
							<td style={{position:'relative'}}>Sales {item.name ? '(' +item.name+ ')' : ''}
							<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
								<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
							</div>
							</td>
							<td></td>
							<td style={{textAlign:'right'}}>{item.amount}</td>
						</tr>
					)
				}
				else{
					saleAmount = -item.amount + +saleAmount
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
							<td style={{position:'relative'}}>Return Inwards ({item.name})
							<div style={ deleteRow[item.transactionId] ? {visibility:'visible',position:'absolute', right:'5px',bottom:'5px', fontSize:'10px'} : {visibility:'hidden',position:'absolute', right:'20px', fontSize:'10px'}}>
								<button onClick={()=>{handleDelete(item.transactionId)}} className='btn btn-dark delete'>Delete</button>
							</div>
							</td>
							<td></td>
							<td style={{textAlign:'right'}}>-{item.amount}</td>
						</tr>
					)
				}
			})

			return(
				<>
					{Data}
					<tr style={{fontWeight:'550'}}>
						<td></td>
						<td></td>
						<td style={{textAlign:'right'}}>{amounts.sales}</td>
					</tr>
					<tr><td></td><td></td><td></td></tr>
					<tr><td></td><td></td><td></td></tr>
				</>
			)
		}
		else{
			return(null)
		}
	}


	const RenderExpenses=(no)=>{
		let expAmount = '';
		let arr = props.finishedTransactions.filter((item) => no.no === item.typeId)
		if(arr.length > 0){
			const Data = arr.map((item)=>{
			expAmount = +item.amount + +expAmount
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
						<td style={{textAlign:'right'}}>{item.amount}</td>
						<td></td>						
					</tr>
				)
			})

			return(
				<>
					{Data}
					<tr><td></td><td></td><td style={{textAlign:'right'}}>{amounts[no.name]}</td></tr>
					<tr><td></td><td></td><td></td></tr>
					<tr><td></td><td></td><td></td></tr>
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
		
			<div className='mt-1'style={{padding:'20px 80px', marginTop:'10px'}}>
				<div style={{textAlign:'center'}}><h4>Araliya Enterprises</h4></div> 
				<div style={{textAlign:'center'}}><h4>Profit & Loss Statement</h4></div> 
				<div style={{textAlign:'center', marginBottom:'30px'}}><h5>For the Year Ended 31<sup>st</sup> December 2020</h5></div> 
				<table className='table table-bordered financial-tables' style={{lineHeight:'.7'}}>

				<RenderSales/>

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Cost of Sales</td>
					<td></td>
					<td></td>
				</tr>
				<RenderStock name='Opening'/>

				<RenderPurchases/>

				<RenderCostOfSales/>

				<RenderStock name='Closing'/>		

				<tr style={{fontWeight:'550'}}>
					<td>Cost of Sales</td>
					<td></td>
					<td style={{textAlign:'right'}}>{amounts.purchase < 0 ? amounts.purchase : '-' +amounts.purchase}</td>
				</tr>
				<tr style={{fontWeight:'550'}}>
					<td>Gross Profit</td>
					<td></td>
					<td style={{textAlign:'right'}}>{amounts.sales - amounts.purchase}</td>
				</tr>
				<tr><td></td><td></td><td></td></tr>	

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Other Income</td>
					<td></td>
					<td></td>
				</tr>

				<RenderOtherIncome/>	

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Administrative Expenses</td>
					<td></td>
					<td></td>
				</tr>

				<RenderExpenses no={5} name='admin'/>

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Selling & Distribution Expenses</td>
					<td></td>
					<td></td>
				</tr>

				<RenderExpenses no={6} name='sell'/>

				<tr style={{fontWeight:'700', lineHeight:'1.5'}}>
					<td>Finance & Other Expenses</td>
					<td></td>
					<td></td>
				</tr>

				<RenderExpenses no={7} name='finance'/>

				<tr style={{fontWeight:'550'}}>
					<td>Net Profit</td>
					<td></td>
					<td style={{textAlign:'right'}}>{amounts.netProfit}</td>
				</tr>

				</table>
			</div>
	)
}

export default TAccounts;