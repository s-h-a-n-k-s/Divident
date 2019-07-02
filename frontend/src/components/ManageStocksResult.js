import React from 'react';
import '../App.css';
import Routes from '../constants/Routes';
import { Link } from 'react-router-dom';

export default function ManageStocksResult(props) {
	return (
		<Link to={`/stock/${props.stock.tickerSymbol}`}  className="SearchResult">
			<img src={Routes.API_STOCK_LOGO(props.stock.tickerSymbol)} alt={props.stock.name} className="Logo" />
			<div>
				<p className="Title">{props.stock.companyName}</p>
			</div>
		</Link>
	)
}