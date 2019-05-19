import React from 'react';
import './App.css';

export default function SearchResult(props) {
	return (
		<div className="SearchResult">
			<p>{props.stock.name}</p>
		</div>
	)
}