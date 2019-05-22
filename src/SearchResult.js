import React from 'react';
import './App.css';
import Routes from './constants/Routes';

export default function SearchResult(props) {
	return (
		<div className="SearchResult">
			<img src={Routes.API_STOCK_LOGO(props.stock.symbol)} alt={props.stock.name} className="Logo" />
			<div>
				<p className="Title">{props.stock.name}</p>
				{/* <p>{props.stock.symbol}</p> */}
			</div>
		</div>
	)
}