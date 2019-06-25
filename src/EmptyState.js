import React from 'react';
import './App.css';
import EmptyStateImage from './assets/undraw_finance_0bdk.svg';
import { Link } from 'react-router-dom';

export default function EmptyState(props) {
	return (
		<div className={props.visible ? "EmptyState" : "EmptyState Hidden"}>
			<img src={EmptyStateImage} alt="Empty State" className="EmptyStateImage" />
			<p className="EmptyStateTitle">Add some stocks to get started</p>
			<Link to="/search"><button className="CallToAction">Add Stocks</button></Link>
		</div>
	);
}
