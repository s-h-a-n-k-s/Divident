import axios from "axios";
import routes from '../constants/Routes';


// axios.defaults.headers.common['Authorization'] = 'Bearer sk_6a960a4c21544875a2ea47259e86997b';

const getAllStocks = () => axios.get(routes.API_ALL_STOCKS)
.then(response => {
	return response;
}).catch(error => {
	return error.response;
});

const search = (stocks, searchTerm) => stocks.filter((value, index, array) => {
	return value.name.toLowerCase().search(searchTerm) !== -1 || value.symbol.toLowerCase().search(searchTerm) !== -1;
});

const getStock = (symbol) => axios.get(routes.API_STOCK(symbol))
.then(response => {
	return response;
}).catch(error => {
	return error.response;
});

const getDividends = (symbol) => axios.get(routes.API_DIVIDENDS(symbol))
.then(response => {
	return response;
}).catch(error => {
	return error.response;
});

const getMultipleCompanyDividends = (symbols) => axios.get(routes.API_MULTIPLE_COMPANY_DIVIDENDS(symbols))
.then(response => {
	return response;
}).catch(error => {
	return error.response;
});

export default {
	getAllStocks,
	search,
	getStock,
	getDividends,
	getMultipleCompanyDividends
};