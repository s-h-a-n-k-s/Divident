import React from 'react';
import '../App.css';
import IEX from '../api/IEX';
import { Link } from 'react-router-dom';
import Routes from '../constants/Routes';
import CurrencyInput from 'react-currency-input';
import Database from '../api/Database';

class AddStockOverview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stock: this.props.stocks.filter((value) => { return value.symbol.search(this.props.match.params.symbol) !== -1 }),
			companyName: '',
			description: '',
			dividends: [],
			logo: '',
		}
	}

	componentDidMount() {
		const { companyName, logo } = this.props.location.state;

		this.setState({
			companyName: companyName,
			logo: logo,
		});

		this.addShares = this.addShares.bind(this);
	}

	addShares() {
		Database.addShares(this.state.companyName, this.props.match.params.symbol, this.props.location.state.amount, this.props.location.state.price, this.props.location.state.date)
		.then(response => {
			if (response.status === 200) {
				this.props.addShares(response.data);
				this.props.history.push(`/stock/${this.props.match.params.symbol}`);
			}
		});
	}

	render() {
		return (
			<div className="PageWrapper">
				<div className="Header">
					<img src={this.state.logo} alt={this.props.companyName} className="Logo" />
					<div style={{fontSize: 20, marginBottom: 5, fontWeight: 500, color: '#27AE60'}}>{this.state.companyName}</div>
					<div style={{width: 60.94}}></div>
				</div>
				<div className="PageContent">
					<h2>Overview</h2>
					<br />
					<div>{this.props.location.state.amount} {this.props.location.state.price} {this.props.location.state.date}</div>
					<Link to={{
						pathname: `/add-stock-overview/${this.props.match.params.symbol}`,
						state: {
							companyName: this.state.companyName,
							logo: this.state.logo,
							amount: this.props.location.state.amount,
							price: this.props.location.state.price,
							date: this.state.date,
						}
					}}>
						<button className="CallToAction" onClick={this.addShares} style={{marginTop: '2em'}}>Save</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default AddStockOverview;