import React from 'react';
import '../App.css';

export default function SearchBar(props) {
	return (
		<div className="Search">
			<input type="text" className="SearchBar" placeholder="Search by name or ticker symbol" value={props.value} onChange={props.handleChange} />
		</div>
	);
}