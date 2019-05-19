import React from 'react';
import './App.css';
import Header from './Header';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar';
import IEX from './api/IEX';
import SearchResults from './SearchResults';
import EmptyState from './EmptyState';
import Sidebar from './Sidebar';
import Routes from './constants/Routes';

library.add(faMoneyBillWave);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allStocks: [],
			searchResults: [],
			searchBarValue: '',
			page: window.location.pathname,
		}
	}

	componentDidMount() {
		// IEX.getAllStocks().then(response => {
		// 	this.setState({
		// 		allStocks: response.data,
		// 	});
		// });
	}

	handleSearchBarChange(event) {
		this.setState({
			searchBarValue: event.target.value,
		});

		if (event.target.value.length > 2) {
			if (this.state.emptyStateVisible) {
				this.handleToggleEmptyState();
			}

			const searchResults = IEX.search(this.state.allStocks, event.target.value);

			this.setState({
				searchResults: searchResults,
			});
		} else {
			this.setState({
				searchResults: [],
			});

			if (!this.state.emptyStateVisible) {
				this.handleToggleEmptyState();
			}
		}
	}

	handleToggleEmptyState() {
		this.setState({
			emptyStateVisible: !this.state.emptyStateVisible,
		});
	}

	render() {
		return (
			<div className="App">
				<Sidebar />
				<div className="Content">
					{/* <SearchBar value={this.state.searchBarValue} handleChange={this.handleSearchBarChange.bind(this)} /> */}

					{ this.state.page === '/' ? (
						<EmptyState />
					) : (
						<div>{this.state.page}</div>
					)}
					{/* { this.state.searchResults.length > 0 ? (
						<SearchResults results={this.state.searchResults} />
					) : (
					)} */}
				</div>
			</div>
		);
	}
}

export default App;
