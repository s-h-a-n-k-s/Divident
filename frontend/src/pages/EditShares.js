import React from 'react';
import '../App.css';
import IEX from '../api/IEX';
import { Link } from 'react-router-dom';
import Routes from '../constants/Routes';
import CurrencyInput from 'react-currency-input';
import Database from '../api/Database';

class EditShares extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stock: this.props.stocks.filter((value) => { return value.symbol.search(this.props.match.params.symbol) !== -1 }),
			companyName: '',
			description: '',
			dividends: [],
			logo: '',
			amount: '',
			price: '',
			date: '',
		}
	}

	componentDidMount() {
		const { companyName, logo, amount, price, date } = this.props.location.state;

		this.setState({
			companyName: companyName,
			logo: logo,
			amount: amount,
			price: price,
			date: date
		});

		this.saveChanges = this.saveChanges.bind(this);
		this.delete = this.delete.bind(this);
	}

	saveChanges() {
		Database.updateShares(this.props.match.params.id, this.state.amount, this.state.price, this.state.date).then(response => {
			this.props.updateShares(response);
			this.props.history.push(`/stock/${this.props.match.params.symbol}`);
		});
	}
	
	delete() {
		Database.deleteShares(this.props.match.params.id).then(response => {
			this.props.removeShares(this.props.match.params.id);
			this.props.history.push(`/stock/${this.props.match.params.symbol}`);
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
					<h2>Edit Shares</h2>
					<h3>Amount</h3>
					<input type='number' className="EditInputBox" placeholder="0" value={this.state.amount} onChange={(event) => this.setState({ amount: event.target.value })} />
					<br />
					<h3>Purchase Price</h3>
					<CurrencyInput value={this.state.price} className="EditInputBox" prefix='£' onChangeEvent={(event, maskedValue, floatValue) => this.setState({ price: floatValue })} />
					<br />
					<h3>Purchase Date</h3>
					<input type='date' className="EditInputBox" value={this.state.date} onChange={(event) => this.setState({ date: event.target.value })} />
					<br />
					<button className="CallToAction" style={{marginTop: '2em'}} onClick={this.saveChanges}>Save</button>
					<br />
					<br />
					<button onClick={this.delete} className="DeleteSharesLink">Delete Shares</button>
				</div>
			</div>
		)
	}
}

export default EditShares;