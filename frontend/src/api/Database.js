import axios from "axios";
import routes from '../constants/Routes';

const getAllStocks = () => axios.get('http://localhost:8080/stocks')
.then(response => {
	return response;
})
.catch(error => {
	return error.response;
});

const addShares = (companyName, tickerSymbol, amount, purchasePrice, purchaseDate) => axios.post('http://localhost:8080/stock', {
	companyName: companyName,
	tickerSymbol: tickerSymbol,
	amount: amount,
	purchasePrice: purchasePrice,
	purchaseDate: purchaseDate
})
.then(response => {
	return response;
})
.catch(error => {
	return error.response;
});

const getShares = (tickerSymbol) => axios.get(`http://localhost:8080/shares/${tickerSymbol}`)
.then(response => {
	return response.data;
})
.catch(error => {
	return error;
});

const updateShares = (id, amount, purchasePrice, purchaseDate) => axios.put(`http://localhost:8080/shares/${id}`, {
	amount: amount,
	purchasePrice: purchasePrice,
	purchaseDate: purchaseDate
})
.then(response => {
	return response.data;
})
.catch(error => {
	return error;
});

export default {
	getAllStocks,
	addShares,
	getShares,
	updateShares
};