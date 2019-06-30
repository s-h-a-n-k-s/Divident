import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class AddStockAmount extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stock: this.props.stocks.filter((value) => { return value.symbol.search(this.props.match.params.symbol) !== -1 }),
			companyName: '',
			description: '',
			dividends: [],
			logo: '',
			amount: '',
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
					<h2>Add Shares</h2>
					<input type='number' className="InputBox" placeholder="0" value={this.state.amount} onChange={(event) => this.setState({ amount: event.target.value })} />
					<br />
					<Link to={{
						pathname: `/add-stock-price/${this.props.match.params.symbol}`,
						state: {
							companyName: this.state.companyName,
							logo: this.state.logo,
							amount: this.state.amount,
						}
					}}>
						<button className="CallToAction" style={{marginTop: '2em'}}>Next</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default AddStockAmount;