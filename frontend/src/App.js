import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoneyBillWave, faIndustry, faLink, faUserTie, faEdit } from '@fortawesome/free-solid-svg-icons'
import IEX from './api/IEX';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Stock from './pages/Stock';
import AddStockAmount from './pages/AddStockAmount';
import AddStockPrice from './pages/AddStockPrice';
import AddStockDate from './pages/AddStockDate';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Database from './api/Database';
import EditShares from './pages/EditShares';
import update from 'immutability-helper';
import ManageStocks from './pages/ManageStocks';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

library.add(faMoneyBillWave, faIndustry, faLink, faUserTie, faEdit);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allStocks: [],
			userStocks: [],
			page: window.location.pathname,
			dividendCalendar: Array(12).fill([]),
			totalDividendPayout: 0,
			sortedStocks: Array(26).fill([]),
			stocksCount: 0,
		}

		this.getDashboard = this.getDashboard.bind(this);
		this.getManageStocks = this.getManageStocks.bind(this);

		this.addNotification = this.addNotification.bind(this);
		this.notificationDOMRef = React.createRef();
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
			this.getManageStocks(response.data);

		});
	}

	getDashboard(userStocks) {
		if (userStocks.length > 0) {
			const tickerSymbols = userStocks.map((stock) => stock.tickerSymbol).filter((v, i, a) => a.indexOf(v) === i);
			let dividendCalendar = Array(12).fill([]);
			let totalDividendPayout = 0;

			IEX.getMultipleCompanyDividends(tickerSymbols.join()).then(response => {
				for (const item in response.data) {
					const stock = response.data[item];
					const yearsDividends = stock.dividends.filter((dividend) => dividend.paymentDate.search(new Date().getFullYear()) !== -1);
					
					if (yearsDividends.length > 0) {
						yearsDividends.forEach((dividend) => {
							const shares = userStocks.filter(value => value.tickerSymbol.toLowerCase().search(item.toLowerCase()) !== -1);
							const month = new Date(dividend.paymentDate).getMonth()
							let sharesCount = 0;
							let addToCalendar = false;

							shares.forEach(share => {
								const purchaseDate = new Date(share.purchaseDate);
								const exDate = new Date(dividend.exDate);
								
								if (purchaseDate < exDate) {
									sharesCount += share.amount;
									addToCalendar = true;
									totalDividendPayout += (share.amount * dividend.amount)
								}
							});

							const dividendObject = {companyName: stock.company.companyName, logo: stock.logo.url, sharesCount: sharesCount, paymentDate: dividend.paymentDate, declaredDate: dividend.declaredDate, amount: dividend.amount, currency: dividend.currency};

							if (addToCalendar) {
								dividendCalendar[month] = dividendCalendar[month].concat([dividendObject]);
							}
						});
					}
				}

				this.setState({
					dividendCalendar: dividendCalendar,
					totalDividendPayout: totalDividendPayout
				});
			});
		}
	}

	getManageStocks(userStocks) {
		const stocksWithoutDuplicates = Array.from(new Set(userStocks.map(a => a.tickerSymbol))).map(tickerSymbol => userStocks.find(a => a.tickerSymbol === tickerSymbol))
		let alphabeticallySortedStocks = Array(26).fill([]);

		for (let index = 0; index < 26; index++) {
			const character = String.fromCharCode(65 + index);
			alphabeticallySortedStocks[index] = alphabeticallySortedStocks[index].concat(stocksWithoutDuplicates.filter(value => value.companyName.toUpperCase().startsWith(character)));
		}

		this.setState({
			sortedStocks: alphabeticallySortedStocks,
			stocksCount: stocksWithoutDuplicates.length,
		});
	}

	addShares(shares) {
		this.setState((prevState) => update(prevState, {
			userStocks: {
				$push: [shares],
			}
		}));

		this.getDashboard(this.state.userStocks);
		this.getManageStocks(this.state.userStocks);
	}

	updateShares(shares) {
		const index = this.state.userStocks.findIndex(stock => stock.id === shares.id);

		this.setState((prevState) => update(prevState, {
			userStocks: {
				[index]: {
					$set: shares,
				}
			}
		}));
		
		this.getDashboard(this.state.userStocks);
		this.getManageStocks(this.state.userStocks);
	}

	removeShares(id) {
		const index = this.state.userStocks.findIndex(stock => stock.id === id);
		
		this.setState(prevState => ({
			userStocks: update(prevState.userStocks, {$splice: [[index, 1]]})
		}));

		this.getDashboard(this.state.userStocks);
		this.getManageStocks(this.state.userStocks);
	}

	addNotification(title, message) {
		this.notificationDOMRef.current.addNotification({
			title: title,
			message: message,
			type: "success",
			insert: "top",
			container: "top-right",
			animationIn: ["animated", "fadeIn"],
			animationOut: ["animated", "fadeOut"],
			dismiss: { duration: 2000 },
			dismissable: { click: true }
		});
	  }

	render() {
		return (
			<Router>
				<div className="App">
					<Sidebar />
					<div className="Content">
						<Route path="/" exact render={props => <Dashboard {...props} userStocks={this.state.userStocks} dividendCalendar={this.state.dividendCalendar} totalDividendPayout={this.state.totalDividendPayout} />} />
						<Route path="/search" render={props => <Search {...props} stocks={this.state.allStocks} />} />
						<Route path="/stock/:symbol" render={props => <Stock {...props} stocks={this.state.allStocks} />} />
						<Route path="/add-stock/:symbol" render={props => <AddStockAmount {...props} stocks={this.state.allStocks} />} />
						<Route path="/add-stock-price/:symbol" render={props => <AddStockPrice {...props} stocks={this.state.allStocks} />} />
						<Route path="/add-stock-date/:symbol" render={props => <AddStockDate {...props} stocks={this.state.allStocks} addShares={this.addShares.bind(this)} sendNotification={this.addNotification.bind(this)} />} />
						<Route path="/edit-shares/:symbol/:id" render={props => <EditShares {...props} stocks={this.state.allStocks} updateShares={this.updateShares.bind(this)} removeShares={this.removeShares.bind(this)} sendNotification={this.addNotification.bind(this)} />} />
						<Route path="/manage-stocks" render={props => <ManageStocks {...props} sortedStocks={this.state.sortedStocks} stocksCount={this.state.stocksCount} />} />
					</div>
					<ReactNotification ref={this.notificationDOMRef} />
				</div>
			</Router>
		);
	}
}

export default App;
