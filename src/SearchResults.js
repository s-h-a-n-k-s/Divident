import React from 'react';
import './App.css';
import SearchResult from './SearchResult';

export default function SearchResults(props) {
	return (
		<div className="SearchResults">
			{props.results.map(value => {
				return <SearchResult stock={value} key={value.iexId} />
			})}
		</div>
	)
}