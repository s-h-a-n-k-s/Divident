import React from 'react';
import './App.css';
import Header from './Header';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar';
import IEX from './api/IEX';
import SearchResults from './SearchResults';
import EmptyState from './EmptyState';

library.add(faMoneyBillWave);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allStocks: [],
			searchResults: [],
			searchBarValue: '',
			emptyStateVisible: true,
		}
	}

	componentDidMount() {
		IEX.getAllStocks().then(response => {
			this.setState({
				allStocks: response.data,
			});
		});
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
				<Header />
				<SearchBar value={this.state.searchBarValue} handleChange={this.handleSearchBarChange.bind(this)} />
				
				{ this.state.searchResults.length > 0 ? (
					<SearchResults results={this.state.searchResults} />
				) : (
					<EmptyState visible={this.state.emptyStateVisible} />
				)}
			</div>
		);
	}
}

export default App;
