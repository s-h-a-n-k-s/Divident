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
			dividendCalendar: Array(12).fill([]),
		}

		this.getDashboard = this.getDashboard.bind(this);
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
			
			this.getDashboard(response.data);

		});
	}

	getDashboard(userStocks) {
		const tickerSymbols = userStocks.map((stock) => stock.tickerSymbol).filter((v, i, a) => a.indexOf(v) === i);
		let dividendCalendar = Array(12).fill([]);
		console.log('DC', dividendCalendar);
		IEX.getMultipleCompanyDividends(tickerSymbols.join()).then(response => {
			for (const item in response.data) {
				const stock = response.data[item];
				const yearsDividends = stock.dividends.filter((dividend) => dividend.paymentDate.search(new Date().getFullYear()) !== -1);
				
				if (yearsDividends.length > 0) {
					yearsDividends.forEach((dividend) => {
						const dividendObject = {companyName: stock.company.companyName, logo: stock.logo.url, paymentDate: dividend.paymentDate, declaredDate: dividend.declaredDate, amount: dividend.amount, currency: dividend.currency};
						const x = new Date(dividendObject.paymentDate).getMonth();
						console.log(dividendObject.companyName, dividendObject.declaredDate, dividendObject.paymentDate, x);
						dividendCalendar[x] = dividendCalendar[x].concat([dividendObject]);
						// var newarray=new Array();
						// 	newarray.push(dividendCalendar[x]);
						// 	mewarrya.push("treee");

						//dividendCalendar[x].push(dividendObject);
						// dividendCalendar[x]=newarray;
					});
				}
			}

			console.log(dividendCalendar);

			this.setState({
				dividendCalendar: dividendCalendar
			});
		});
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Sidebar />
					<div className="Content">
						<Route path="/" exact render={props => <Dashboard {...props} userStocks={this.state.userStocks} dividendCalendar={this.state.dividendCalendar} />} />
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
