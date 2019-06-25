import React from 'react';
import '../App.css';
import EmptyStateImage from '../assets/undraw_savings_hjfl.svg';

export default function DividendsEmptyState(props) {
	return (
		<div className="InvestmentEmptyState">
			<img src={EmptyStateImage} alt="Empty State" className="EmptyStateImage" />
			<p className="InvestmentEmptyStateTitle">{props.companyName} hasn't announced any dividends</p>
		</div>
	);
}
