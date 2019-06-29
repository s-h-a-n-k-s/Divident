import React from 'react';
import '../App.css';
import IEX from '../api/IEX';
import { Link } from 'react-router-dom';
import Routes from '../constants/Routes';
import InvestmentsEmptyState from '../components/InvestmentsEmptyState';
import DividendsEmptyState from '../components/DividendsEmptyState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Database from '../api/Database';

class Stock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stock: this.props.stocks.filter((value) => { return value.symbol.search(this.props.match.params.symbol) !== -1 }),
			companyName: '',
			description: '',
			industry: '',
			website: '',
			ceo: '',
			dividends: [],
			shares: [],
			totalNumberofShares: 0,
			yearsDividends: 0,
			dividendPayout: 0,
			currency: '',
		}
	}

	componentDidMount() {
		IEX.getStock(this.props.match.params.symbol).then(response => {
			this.setState({
				companyName: response.data.companyName,
				description: response.data.description,
				industry: response.data.industry,
				website: response.data.website,
				ceo: response.data.CEO,
			});
		});

		IEX.getDividends(this.props.match.params.symbol.toLowerCase()).then(response => {
			const yearsDividends = response.data.filter((dividend) => dividend.exDate.search(new Date().getFullYear()) !== -1);
			const dividendPayout = (yearsDividends.length > 0) ? yearsDividends.reduce((previousValue, currentValue) => previousValue.amount + currentValue.amount) : 0;
			const currency = (response.data[0] !== undefined) ? response.data[0].currency : '';
			
			this.setState({
				dividends: response.data,
				yearsDividends: yearsDividends.length,
				dividendPayout: dividendPayout,
				currency: currency,
			});
		});

		Database.getShares(this.props.match.params.symbol).then(response => {
			const totalNumberofShares = response.map((share) => share.amount).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
			console.log('TNS', totalNumberofShares);
			// const totalNumberofShares = (response.length > 0) ? response.reduce((previousValue, currentValue) => previousValue.amount + currentValue.amount) : 0;

			this.setState({
				shares: response,
				totalNumberofShares: totalNumberofShares,
			});
		});
	}

	render() {
		return (
			<div className="PageWrapper">
				<div className="Header">
					<img src={Routes.API_STOCK_LOGO(this.props.match.params.symbol)} alt={this.props.companyName} className="Logo" />
					<div style={{fontSize: 20, marginBottom: 5, fontWeight: 500, color: '#27AE60'}}>{this.state.companyName}</div>
					<Link to={{
						pathname: `/add-stock/${this.props.match.params.symbol}`,
						state: {
							companyName: this.state.companyName,
							logo: Routes.API_STOCK_LOGO(this.props.match.params.symbol)
						}
					}}>
						<button className="AddStocksButton">+</button>
					</Link>
				</div>
				<div className="PageContent">
					<h2 className="Title">Company Information</h2>
					<div className="CompanyInformation">
						<p className="Title"><b>Description</b></p>
						<p className="Description">{this.state.description}</p>
						<div className="Items">
							<div className="Item">
							<FontAwesomeIcon icon="industry" className="Image" />
							<p className="Title"><b>Industry</b></p>
							<p className="Text">{this.state.industry}</p>
							</div>
							<div className="Item">
							<FontAwesomeIcon icon="link" className="Image" />
							<p className="Title"><b>Website</b></p>
							<p className="Text"><a href={this.state.website}>{this.state.website}</a></p>
							</div>
							<div className="Item">
							<FontAwesomeIcon icon="user-tie" className="Image" />
							<p className="Title"><b>CEO</b></p>
							<p className="Text">{this.state.ceo}</p>
							</div>
						</div>					
					</div>
					{ this.state.shares.length > 0 &&
						<div>
							<h2 className="Title">Your Statistics</h2>
							<div className="Statistics">
								<div>
									<p>You own</p>
									<h2>{this.state.totalNumberofShares}</h2>
									<p>shares in {this.state.companyName}</p>
								</div>

								<div className="Divider"></div>

								<div>
									<p>You'll earn</p>
									<h2>{(this.state.dividendPayout * this.state.totalNumberofShares)} {this.state.currency}</h2>
									<p>this year</p>
								</div>
								
								<div className="Divider"></div>

								<div>
									<p>{this.state.companyName} has announced</p>
									<h2>{this.state.yearsDividends}</h2>
									<p>dividends this year</p>
								</div>
							</div>
						</div>
					}
						
					<div className="Columns">
						<div className="Column">
							<h2 className="Title">Dividends</h2>
							{ this.state.dividends == 0 ? (
								<DividendsEmptyState companyName={this.state.companyName} />
							) : this.state.dividends.map(value => {
								return (
									<div className="DividendContainer">
										<div className="Amount">{value.amount} {value.currency}</div>
										<div className="Dates">
											<div className="ExDate">Ex date: {value.exDate}</div>
											<div className="PaymentDate">Payment date: {value.paymentDate}</div>
										</div>
									</div>
								)
							})}
						</div>

						<div className="Column">
							<h2 className="Title">Your Investments</h2>
							{ this.state.shares.length === 0 ? (
								<InvestmentsEmptyState companyName={this.state.companyName} symbol={this.props.match.params.symbol} logo={Routes.API_STOCK_LOGO(this.props.match.params.symbol)} />
							) : this.state.shares.map(value => {
								return (
									<div className="DividendContainer">
										<div className="Amount">{value.amount} <small>shares</small></div>
										<div className="Dates">
											<div className="PricePaid">Price: £{value.purchasePrice} (per share)</div>
											<div className="PurchaseDate">Purchase date: {value.purchaseDate}</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Stock;