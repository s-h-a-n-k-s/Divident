import axios from "axios";
import routes from '../constants/Routes';

const getAllStocks = () => axios.get(routes.DATABASE_ALL_STOCKS)
.then(response => {
	return response;
})
.catch(error => {
	return error.response;
});

const addShares = (companyName, tickerSymbol, amount, purchasePrice, purchaseDate) => axios.post(routes.DATABASE_STOCK, {
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

const getShares = (tickerSymbol) => axios.get(routes.DATABASE_SHARES(tickerSymbol))
.then(response => {
	return response.data;
})
.catch(error => {
	return error;
});

const updateShares = (id, amount, purchasePrice, purchaseDate) => axios.put(routes.DATABASE_SHARES_ID(id), {
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

const deleteShares = (id) => axios.delete(routes.DATABASE_SHARES_ID(id))
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
	updateShares,
	deleteShares
};