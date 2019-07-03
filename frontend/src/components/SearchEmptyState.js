import React from 'react';
import '../App.css';
import EmptyStateImage from '../assets/undraw_portfolio_update_nqhs.svg';

export default function SearchEmptyState() {
	return (
		<div className="EmptyState">
			<img src={EmptyStateImage} alt="Empty State" className="EmptyStateImage" />
			<p className="EmptyStateTitle">Enter a search term to find Stocks</p>
		</div>
	);
}
