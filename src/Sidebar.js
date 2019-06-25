import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Routes from './constants/Routes';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Sidebar(props) {
	return (
		<div className="Sidebar">
			<div className="Header">
				<FontAwesomeIcon icon="money-bill-wave" className="Image" />
				<br />
				<span className="Text">DIVIDENT</span>
			</div>
			<div className="Links">
				<ul className="MenuItem">
					{Routes.pages.map(value => {
						return <li><Link to={value.url}>{value.name}</Link></li>
					})}
				</ul>
			</div>
		</div>
	);
}
