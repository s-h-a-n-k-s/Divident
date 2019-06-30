import React from 'react';
import '../App.css';
import Routes from '../constants/Routes';
import { Link } from 'react-router-dom';

export default function SearchResult(props) {
	return (
		// <div className="SearchResult">
			<Link to={`/stock/${props.stock.symbol}`}  className="SearchResult">
				<img src={Routes.API_STOCK_LOGO(props.stock.symbol)} alt={props.stock.name} className="Logo" />
				<div>
					<p className="Title">{props.stock.name}</p>
					{/* <p>{props.stock.symbol}</p> */}
				</div>
			</Link>
		// </div>
	)
}