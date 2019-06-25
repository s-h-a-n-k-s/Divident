import React from 'react';
import '../App.css';
import IEX from '../api/IEX';
import { Link } from 'react-router-dom';
import Routes from '../constants/Routes';
import InvestmentsEmptyState from '../components/InvestmentsEmptyState';
import DividendsEmptyState from '../components/DividendsEmptyState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
			shares: [
				{
					id: 1,
					symbol: 'APPL',
					company_name: 'Apple, Inc.',
					amount: 10,
					purchase_price: 101,
					purchase_date: '2019-03-03',
					created_at: '2019-03-03',
					updated_at: '2019-03-03'
				}
			],
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
			this.setState({
				dividends: response.data,
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
							{ this.state.shares == 0 ? (
								<InvestmentsEmptyState companyName={this.state.companyName} symbol={this.props.match.params.symbol} logo={Routes.API_STOCK_LOGO(this.props.match.params.symbol)} />
							) : this.state.shares.map(value => {
								return (
									<div className="DividendContainer">
										<div className="Amount">{value.amount} <small>shares</small></div>
										<div className="Dates">
											<div className="PricePaid">Price: £{value.purchase_price} (per share)</div>
											<div className="PurchaseDate">Purchase date: {value.purchase_date}</div>
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