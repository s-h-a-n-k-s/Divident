import React from 'react';
import '../App.css';
import SearchBar from '../components/SearchBar';
import IEX from '../api/IEX';
import SearchResults from '../components/SearchResults';

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchBarValue: '',
			searchResults: [],
		}
	}

	handleSearchBarChange(event) {
		this.setState({
			searchBarValue: event.target.value,
			searchResults: [],
		});

		if (event.target.value.length > 2) {
			const searchResults = IEX.search(this.props.stocks, event.target.value);

			this.setState({
				searchResults: searchResults,
			});
		} else {
			this.setState({
				searchResults: [],
			});
		}
	}

	render() {
		return (
			<div>
				<SearchBar value={this.state.searchBarValue} handleChange={this.handleSearchBarChange.bind(this)} />
				<SearchResults results={this.state.searchResults} />
			</div>
		);
	}
}

export default Search;