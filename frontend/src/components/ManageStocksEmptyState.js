import React from 'react';
import '../App.css';
import EmptyStateImage from '../assets/undraw_personal_settings_kihd.svg';
import { Link } from 'react-router-dom';

export default function ManageStocksEmptyState(props) {
	return (
		<div className="EmptyState">
			<img src={EmptyStateImage} alt="Empty State" className="EmptyStateImage" />
			<p className="EmptyStateTitle">You've got no stocks to manage!</p>
			<Link to="/search"><button className="CallToAction">Add Stocks</button></Link>
		</div>
	);
}
