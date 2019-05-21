import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar';
import IEX from './api/IEX';
import SearchResults from './SearchResults';
import EmptyState from './EmptyState';
import Sidebar from './Sidebar';
import Routes from './constants/Routes';
import Dashboard from './pages/Dashboard';
import AddStocks from './pages/AddStocks';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

library.add(faMoneyBillWave);

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
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Sidebar />
					<div className="Content">
						<Route path="/" exact render={props => <Dashboard {...props} userStocks={this.state.userStocks} />} />
						<Route path="/add-stocks" render={props => <AddStocks {...props} stocks={this.state.allStocks} />} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
