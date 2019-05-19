import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Routes from './constants/Routes';

export default function Sidebar(props) {
	return (
		<div className="Sidebar">
			<div className="Header">
				<FontAwesomeIcon icon="money-bill-wave" className="Image" />
				<br />
				<span className="Text">DIVIDENT</span>
			</div>
			<div className="Content">
				<ul className="MenuItem">
					{Routes.pages.map(value => {
						return <li><a href={value.url}>{value.name}</a></li>
					})}
				</ul>
			</div>
		</div>
	);
}
