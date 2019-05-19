const API_ROUTE = 'https://api.iextrading.com/1.0';
const API_ALL_STOCKS = `${API_ROUTE}/ref-data/symbols`;
const API_STOCK_LOGO = (symbol) => `https://storage.googleapis.com/iex/api/logos/${symbol}.png`;

const pages = [
	{name: 'Dashboard', url: '/'},
	{name: 'Add Stocks', url: '/add-stocks'},
	{name: 'Search', url: '/search'},
	{name: 'Manage Stocks', url: '/manage-stocks'},
];

export default {
	API_ALL_STOCKS,
	API_STOCK_LOGO,
	pages
}