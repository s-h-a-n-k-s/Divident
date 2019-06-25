import React from 'react';
import './App.css';
import SearchResult from './SearchResult';
import { Link } from 'react-router-dom';

export default function SearchResults(props) {
	return (
		<div className="SearchResults">
			{props.results.map(value => {
				// return <Link to={`/stock/${value.symbol}`}><SearchResult stock={value} key={value.iexId} /></Link>
				return <SearchResult stock={value} key={value.iexId} />
			})}
		</div>
	)
}