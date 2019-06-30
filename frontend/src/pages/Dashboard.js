import React from 'react';
import '../App.css';
import DashboardEmptyState from '../components/DashboardEmptyState';
import Month from '../components/Month';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.userStocks.length == 0) {
			return (
				<DashboardEmptyState />
			);
		} else {
			return (
				<div className="MonthsContainer">
					<div className="Row">
						<Month dividends={this.props.dividendCalendar[0]} monthName="January" />
						<Month dividends={this.props.dividendCalendar[1]} monthName="February" />
						<Month dividends={this.props.dividendCalendar[2]} monthName="March" />
						<Month dividends={this.props.dividendCalendar[3]} monthName="April" />
						<Month dividends={this.props.dividendCalendar[4]} monthName="May" />
						<Month dividends={this.props.dividendCalendar[5]} monthName="June" />
					</div>
					<div className="Row">
						<div className="TotalPayoutContainer"><span className="Pound">£</span><span className="TotalPayout">{Number.parseFloat(this.props.totalDividendPayout).toFixed(2)}</span><span className="Year">/year</span></div>
					</div>
					<div className="Row">
						<Month dividends={this.props.dividendCalendar[6]} monthName="July" />
						<Month dividends={this.props.dividendCalendar[7]} monthName="August" />
						<Month dividends={this.props.dividendCalendar[8]} monthName="September" />
						<Month dividends={this.props.dividendCalendar[9]} monthName="October" />
						<Month dividends={this.props.dividendCalendar[10]} monthName="November" />
						<Month dividends={this.props.dividendCalendar[11]} monthName="December" />
					</div>
				</div>
			)
		}
	}
}

export default Dashboard;