import React from 'react';
import '../App.css';
import ManageStocksResult from '../components/ManageStocksResult';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

class ManageStocks extends React.Component {
	render() {
		return (
			<div className="MangeStocksWrapper">
				<div className="ManageStocksContent">
					<h1>You have shares in {(this.props.stocksCount)} companies</h1>
					{this.props.sortedStocks.map((stocks, index) => {
						if (stocks.length > 0) {
							return (
								<div id={String.fromCharCode(65 + index)} className="Section">
								<a name={String.fromCharCode(65 + index)}></a>
									<h2 className="SectionTitle">{String.fromCharCode(65 + index)}</h2>
									<div className="SectionContent">
										{stocks.map((stock) => <ManageStocksResult stock={stock} key={stock.iexId} />)}
									</div>
								</div>
							)
						}
					})}
				</div>
				<div className="LetterSelector">
					{this.props.sortedStocks.map((stocks, index) => {
						if (stocks.length > 0) {
							return (
								<HashLink smooth to={`#${String.fromCharCode(65 + index)}`}><div>{String.fromCharCode(65 + index)}</div></HashLink>
							);
						} else {
							return (
								<div>{String.fromCharCode(65 + index)}</div>	
							);
						}
					})}
				</div>
			</div>
		);
	}
}

export default ManageStocks;