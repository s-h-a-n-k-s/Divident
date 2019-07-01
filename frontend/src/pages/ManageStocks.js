import React from 'react';
import '../App.css';

class ManageStocks extends React.Component {
	render() {
		return (
			<div>
				{this.props.userStocks.map((stock) => <div>{stock.companyName}</div>)}
			</div>
		);
	}
}

export default ManageStocks;