import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoneyBillWave, faIndustry, faLink, faUserTie } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar';
import IEX from './api/IEX';
import SearchResults from './SearchResults';
import EmptyState from './EmptyState';
import Sidebar from './Sidebar';
import Routes from './constants/Routes';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Stock from './pages/Stock';
import AddStockAmount from './pages/AddStockAmount';
import AddStockPrice from './pages/AddStockPrice';
import AddStockDate from './pages/AddStockDate';
import AddStockOverview from './pages/AddStockOverview';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Database from './api/Database';

library.add(faMoneyBillWave, faIndustry, faLink, faUserTie);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allStocks: [],
			userStocks: [],
			page: window.location.pathname,
		}
	}

	componentDidMount() {
		IEX.getAllStocks().then(response => {
			this.setState({
				allStocks: response.data,
			});
		});

		Database.getAllStocks().then(response => {
			this.setState({
				userStocks: response.data,
			});
			console.log(JSON.stringify(response.data));
		});
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Sidebar />
					<div className="Content">
						<Route path="/" exact render={props => <Dashboard {...props} userStocks={this.state.userStocks} />} />
						<Route path="/search" render={props => <Search {...props} stocks={this.state.allStocks} />} />
						<Route path="/stock/:symbol" render={props => <Stock {...props} stocks={this.state.allStocks} />} />
						<Route path="/add-stock/:symbol" render={props => <AddStockAmount {...props} stocks={this.state.allStocks} />} />
						<Route path="/add-stock-price/:symbol" render={props => <AddStockPrice {...props} stocks={this.state.allStocks} />} />
						<Route path="/add-stock-date/:symbol" render={props => <AddStockDate {...props} stocks={this.state.allStocks} />} />
						<Route path="/add-stock-overview/:symbol" render={props => <AddStockOverview {...props} stocks={this.state.allStocks} />} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
