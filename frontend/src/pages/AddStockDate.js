import React from 'react';
import '../App.css';
import Database from '../api/Database';

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

		this.addShares = this.addShares.bind(this);
	}

	componentDidMount() {
		const { companyName, logo } = this.props.location.state;

		this.setState({
			companyName: companyName,
			logo: logo,
		});
	}

	addShares() {
		Database.addShares(this.state.companyName, this.props.match.params.symbol, this.props.location.state.amount, this.props.location.state.price, this.state.date)
		.then(response => {
			if (response.status === 200) {
				this.props.addShares(response.data);
				this.props.sendNotification("Stocks Successfully Added", `Your shares in ${this.state.companyName} have been successfully added.`);
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
					<h2>Add Date</h2>
					<input type='date' className="DateInputBox" value={this.state.date} onChange={(event) => this.setState({ date: event.target.value })} />
					<br />
					<button className="CallToAction" onClick={this.addShares} style={{marginTop: '2em'}}>Save</button>
				</div>
			</div>
		)
	}
}

export default AddStockDate;