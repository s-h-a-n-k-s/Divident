import React from 'react';
import '../App.css';
import IEX from '../api/IEX';
import { Link } from 'react-router-dom';
import Routes from '../constants/Routes';
import CurrencyInput from 'react-currency-input';

class AddStockDate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stock: this.props.stocks.filter((value) => { return value.symbol.search(this.props.match.params.symbol) !== -1 }),
			companyName: '',
			description: '',
			dividends: [],
			logo: '',
			date: '',
		}
	}

	componentDidMount() {
		const { companyName, logo } = this.props.location.state;

		this.setState({
			companyName: companyName,
			logo: logo,
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
					<h2>Add Date</h2>
					<input type='date' className="DateInputBox" value={this.state.date} onChange={(event) => this.setState({ date: event.target.value })} />
					<br />
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
						<button className="CallToAction" style={{marginTop: '2em'}}>Next</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default AddStockDate;