import axios from "axios";
import routes from '../constants/Routes';

const getAllStocks = () => axios.get('http://localhost:8080/stocks')
.then(response => {
	return response;
})
.catch(error => {
	return error.response;
});

export default {
	getAllStocks
};