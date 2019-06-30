import React from 'react';
import '../App.css';

export default function Month(props) {
	return (
		<div className="MonthContainer">
			<div className="Top">
				<div className="DividendCount">{props.dividends.length} DIVIDEND{(props.dividends.length === 0 || props.dividends.length > 1) ? "S" : ""}</div>
			</div>
			<div className="Middle">
			{props.dividends.length > 0 ? (
				<div className="LogoContainer">
					{props.dividends.map(item => {
						return <img src={item.logo} alt={item.companyName} className="DashboardLogo" />
					})}
				</div>
			) : (
				<div className="NoDividends">You've got no dividend payouts this month</div>
			)}
			</div>
			<div className="Bottom">
				{props.dividends.map((dividend) => dividend.sharesCount * dividend.amount).join("") !== '' &&
					<div className="Total">£{Number.parseFloat(props.dividends.map((dividend) => dividend.sharesCount * dividend.amount).reduce((previousValue, currentValue) => previousValue + currentValue, 0)).toFixed(2)}</div>
				}
				<p className="Title">{props.monthName.toUpperCase()}</p>
			</div>
		</div>
	);
}