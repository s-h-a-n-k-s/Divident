import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';

class AddStockPrice extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stock: this.props.stocks.filter((value) => { return value.symbol.search(this.props.match.params.symbol) !== -1 }),
			companyName: '',
			description: '',
			dividends: [],
			logo: '',
			price: '',
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
					<h2>Add Price</h2>
					<CurrencyInput value={this.state.price} className="InputBox" prefix='£' onChangeEvent={(event, maskedValue, floatValue) => this.setState({ price: floatValue })} />
					<br />
					<Link to={{
						pathname: `/add-stock-date/${this.props.match.params.symbol}`,
						state: {
							companyName: this.state.companyName,
							logo: this.state.logo,
							amount: this.props.location.state.amount,
							price: this.state.price,
						}
					}}>
						<button className="CallToAction" style={{marginTop: '2em'}}>Next</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default AddStockPrice;