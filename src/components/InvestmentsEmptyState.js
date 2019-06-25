import React from 'react';
import '../App.css';
import EmptyStateImage from '../assets/undraw_finance_0bdk.png';
import { Link } from 'react-router-dom';

export default function InvestmentsEmptyState(props) {
	return (
		<div className="InvestmentEmptyState">
			<img src={EmptyStateImage} alt="Empty State" className="EmptyStateImage" />
			<p className="InvestmentEmptyStateTitle">You've not added any shares in {props.companyName}</p>
			<Link to={{
						pathname: `/add-stock/${props.symbol}`,
						state: {
							companyName: props.companyName,
							logo: props.logo,
						}
					}}>
						<button className="CallToAction">Add Shares</button>
					</Link>
		</div>
	);
}
