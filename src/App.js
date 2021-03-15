import React, {useState} from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Login from './components/Login'
import About from './components/About'
import Details from './components/Details'
import Interface from './components/Interface'
import Transaction from './components/Transaction'


const App= ()=> {

const [businessName, setBusinessName] =useState()
const [businessDate, setBusinessDate] = useState()

  return (
  	<>
	  	<Router>
	  		<Navbar/>
	  		<Route path="/" exact> 
	  			<Homepage/>
	  		</Route>
	  		<Route path="/login" exact> 
	  			<Login/>
	  		</Route>
	  		<Route path="/about" exact> 
	  			<About/>
	  		</Route>
	  		<Route path="/details" exact> 
	  			<Details 
	  				businessDate={businessDate} 
	  				businessName={businessName}
	  				setBusinessName={setBusinessName}
	  				setBusinessDate={setBusinessDate}
	  			/>
	  		</Route>
	  		<Route path="/transaction" exact>
	  			<Transaction 
	  				businessName={businessName}
	  				businessDate={businessDate}
	  			/>
	  		</Route>
	  		<Redirect to="/" />
	     </Router>
     </>
  );
}

export default App;
