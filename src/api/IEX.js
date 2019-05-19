import axios from "axios";
import routes from '../constants/Routes';

const getAllStocks = () => axios.get(routes.API_ALL_STOCKS)
.then(response => {
	return response;
}).catch(error => {
	return error.response;
});

const search = (stocks, searchTerm) => stocks.filter((value, index, array) => {
	return value.name.toLowerCase().search(searchTerm) !== -1 || value.symbol.toLowerCase().search(searchTerm) !== -1;
});

export default {
	getAllStocks,
	search
};