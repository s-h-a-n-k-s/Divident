import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header(props) {
	return (
		<div className="Header">
			<FontAwesomeIcon icon="money-bill-wave" className="Image" />
			<br />
			<span className="Text">DIVIDENT</span>
		</div>
	);
}
