import React, {useState, useRef} from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import { useReactToPrint } from 'react-to-print';


import TAccounts from './PandL'
import SPF from './SPF'


const Interface =(props)=>{

	const printRefPNL = useRef();
	const printRefSFP = useRef();

	const [accType, setAccType] = useState()
	const [accName, setAccName] = useState()
	const [transactionAmount, setTransactionAmount] = useState()

	const [isOkay, setOkay] = useState(false)
	const [changed, setChanged] = useState(false)
	const [isOptional, setOptional] = useState(false)

	const [finishedTransactions, setFinishedTransactions] = useState([])

	const [isAccTypeClicked, setIsAccTypeClicked] = useState()
	const [isAlertOpen, setIsAlertOpen] = useState(false)

	const [netProfit, setNetProfit] = useState()

	const types = [
		{name:'Administrative Expense', cat:5, type:1, tableId:1, optional: false}, 
		{name:'Selling & Distribution Expense',cat:6, type:1, tableId:1, optional: false}, 
		{name:'Finance & Other Expense',cat:7, type:1, tableId:1, optional: false}, 
		{name:'Sales',cat:1, type:1, tableId:1, optional: true}, 
		{name:'Return Inwards',cat:1, type:0, tableId:1, optional: false}, 
		{name:'Other Income',cat:2, type:1, tableId:1, optional: false},
		{name:'Opening Stock',cat:4, type:1, tableId:1, optional: true},
		{name:'Closing Stock',cat:4, type:0, tableId:1, optional: true},
		{name:'Return Outwards',cat:3, type:0, tableId:1, optional: false},
		{name:'Purchase',cat:3, type:1, tableId:1, optional: false},
		{name:'Current Assets',cat:8, type:1, tableId:2, optional: false},
		{name:'Non Current Assets',cat:9, type:1, tableId:2, optional: false},
		{name:'Provision for Doubtful debt',cat:8, type:0, tableId:2, optional: false},	
		{name:'Non Current Liabilities',cat:10, type:1, tableId:2, optional: false},
		{name:'Current Liabilities',cat:11, type:1, tableId:2, optional: false},	
		{name:'Capital',cat:12, type:1, tableId:2, optional: true},
		{name:'Drawings',cat:12, type:0, tableId:2, optional: true},
		{name:'Cost of Sales',cat:13, type:1, tableId:1, optional: false},	
	]

	const handlePrintPNL = useReactToPrint({
	    content: () => printRefPNL.current,
	  });

	const handlePrintSFP = useReactToPrint({
	    content: () => printRefSFP.current,
	  });

	const handleAddTrascation=()=>{


		setChanged(true)
		let oldTransactions = JSON.parse(JSON.stringify(finishedTransactions));

		oldTransactions.push({
			'transactionId': 'transactionNo' + (finishedTransactions.length + 1),
			'tableId': types.filter((item)=> accType.toLowerCase() === item.name.toLowerCase())[0].tableId,
			'typeId': types.filter((item)=> accType.toLowerCase() === item.name.toLowerCase())[0].cat,
			'typeSubId': types.filter((item)=> accType.toLowerCase() === item.name.toLowerCase())[0].type, 
			'type': types.filter((item)=> accType.toLowerCase() === item.name.toLowerCase())[0].name,
			'name': accName ? accName : '',
			'amount': transactionAmount
		})

		setFinishedTransactions(oldTransactions)
		setAccType('')
		setAccName('')
		setTransactionAmount('')
		setOptional(false)

		setIsAlertOpen(true)
		setTimeout(()=>{
			setIsAlertOpen(false)
		},1500)
	}



	React.useEffect(()=>{
		if(accType){
			if(types.filter((item)=> item.name.trim().toLowerCase() === accType.trim().toLowerCase()).length>0 && types.filter((item)=> item.name.trim().toLowerCase() === accType.trim().toLowerCase())[0].optional){
				setOptional(true)
			}
		}
	})


	const RenderButton=()=>{
		if(accType && isOkay  && transactionAmount && (accName || isOptional)){
			return(
				<button onClick={handleAddTrascation} className='btn btn-primary mt-2 ml-4'>Save Transaction</button>
			)
		}
		else{
			return(
				<button disabled className='btn btn-primary mt-2 ml-4'>Save Transaction</button>
			)
		}
	}


	const RenderAccTypes =()=>{
		if(accType){
			const Type = types.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0)).filter((item)=>item.name.toLowerCase().includes(accType.toLowerCase())).map((item)=>{
				if((item.name === 'Opening Stock' && finishedTransactions.filter((trans)=> item.name === trans.type).length > 0) || (item.name === 'Closing Stock' && finishedTransactions.filter((trans)=> item.name === trans.type).length > 0)){
					return(null)
				}
				else{
					return(
						<div onClick={()=>{
							setAccType(item.name)
							setIsAccTypeClicked(false)
							setOkay(true)
							if(item.optional){
								setOptional(true)
							}
							else{
								setOptional(false)
							}
						}}>{item.name}</div>	
					)
				}				
			})

			return(
				<>
					{Type}
				</>
			)
		}
		else{
			const Type = types.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0)).map((item)=>{
				if((item.name === 'Opening Stock' && finishedTransactions.filter((trans)=> item.name === trans.type).length > 0) || (item.name === 'Closing Stock' && finishedTransactions.filter((trans)=> item.name === trans.type).length > 0)){
					return(null)
				}
				else{
					return(
						<div onClick={()=>{
							setAccType(item.name)
							setIsAccTypeClicked(false)
						}}>{item.name}</div>	
					)
				}				
			})

			return(Type)
		}
	}

	return(
		<>
			<div className='container-fluid'>
				<div style={{position:'relative', clear:'right', paddingBottom:'5px'}} className='container-fluid'>
					<div className='col-md-4 float-left'>
					<div>Account Type</div>
						<input 
							type='text'
							name='accType'
							id='accType' 
							className='form-control'
							value={accType}
							onChange={(event)=>{
								setAccType(event.target.value)
								if(types.filter((item)=> item.name.trim().toLowerCase() === event.target.value.trim().toLowerCase()).length > 0){
									setIsAccTypeClicked(false)
									setOkay(true)
									if(types.filter((item)=> item.name.trim().toLowerCase() === event.target.value.trim().toLowerCase())[0].optional){
										setOptional(true)
									}
									else{setOptional(false)}
								}
								else{
									setOkay(false)
									setIsAccTypeClicked(true)
								}
							}}
							onBlur={()=>{
								if(accType){
									if(types.filter((item)=> item.name.trim().toLowerCase() === accType.trim().toLowerCase()).length > 0){
										setOkay(true)
									}
									else{setOkay(false)}
								}
							}}
							onFocus={()=>{
								if(accType){
									if(types.filter((item)=> item.name.trim().toLowerCase() === accType.trim().toLowerCase()).length > 0){
										setIsAccTypeClicked(false)
									}
									else{
										setIsAccTypeClicked(true)	
									}
								}
							}}
							onClick={()=>{
								if(accType){
									if(types.filter((item)=> item.name.trim().toLowerCase() === accType.trim().toLowerCase()).length > 0){
										setIsAccTypeClicked(false)
									}
									else{
										setIsAccTypeClicked(true)	
									}
								}
							}}
						/>
					</div>
					<div className='col-md-4 float-left'>
					<div>Account Name</div>
						<input 
							type='text'
							name='accName'
							id='accName'
							className='form-control'
							placeholder={isOptional ? 'Optional' : ''}
							value={accName}
							onChange={(event)=>{
								setAccName(event.target.value)
							}}
						/>
					</div>
					<div className='col-md-4 float-left'>
					<div>Transaction Amount</div>
						<input 
							type='number'
							name='transactionAmount'
							id='transactionAmount'
							className='form-control'
							value={transactionAmount}
							onChange={(event)=>{
								setTransactionAmount(event.target.value)								
							}}
						/>
					</div>

					{isAccTypeClicked ? 
							<OutsideClickHandler onOutsideClick={()=>{setIsAccTypeClicked(false)}}>
								<div className='col-md-4 clickable-div' style={{position:'absolute', top:'62px'}} >
									<RenderAccTypes/>
								</div>
							</OutsideClickHandler>
					:''}

				</div>

				<div style={{clear:'left'}} className='pb-4'>
					<div className='float-left'>
						<RenderButton/>
					</div>

					{isAlertOpen ? 
						<div className='alert float-left'>
							Transaction added successfully
						</div>
					:''}
				</div>

				<div className='mt-5 mb-5'>
					{finishedTransactions.filter((item)=> 1 === item.tableId).length > 0 ? 
						<div className='print-doc' ref={printRefPNL}>
							<TAccounts 
								finishedTransactions={finishedTransactions.filter((item)=> 1 === item.tableId)}
								changed={changed}
								setChanged={setChanged}
								setNetProfit={setNetProfit}
								defaultTransactions={finishedTransactions}
								setDefaultTransactions={setFinishedTransactions}
							/>
							<button onClick={handlePrintPNL} className='btn btn-primary ml-5 mb-3'>Print P&L</button>
						</div>
					: ''}
				</div>

						<div className='mt-4' style={{clear:'left'}}>
							{finishedTransactions.filter((item)=> 2 === item.tableId).length > 0 ? 
								<div className='print-doc' ref={printRefSFP}>
									<SPF 
										finishedTransactions={finishedTransactions.filter((item)=> 2 === item.tableId)}
										changed={changed}
										setChanged={setChanged}
										netProfit={netProfit}
										defaultTransactions={finishedTransactions}
										setDefaultTransactions={setFinishedTransactions}
									/>
									<button onClick={handlePrintSFP} className='btn btn-primary ml-5 mb-5'>Print SFP</button>
								</div>
							: ''}
						</div>

			</div>		
		</>
	)
}

export default Interface