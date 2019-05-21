import React from 'react';
import '../App.css';
import EmptyState from '../EmptyState';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.userStocks.length == 0) {
			return (
				<EmptyState />
			);
		}
	}
}

export default Dashboard;