import React from 'react';
import './App.css';
import EmptyStateImage from './assets/undraw_finance_0bdk.png';

export default function EmptyState(props) {
	return (
		<div className={props.visible ? "EmptyState" : "EmptyState Hidden"}>
			<img src={EmptyStateImage} alt="Empty State" className="EmptyStateImage" />
			<p className="EmptyStateTitle">Use the search above to start adding stocks...</p>
		</div>
	);
}
