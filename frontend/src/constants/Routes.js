const API_ROUTE = 'https://api.iextrading.com/1.0';
const API_ALL_STOCKS = `${API_ROUTE}/ref-data/symbols`;
const CLOUD_ROUTE = 'https://cloud.iexapis.com/stable';
const TOKEN = 'sk_6a960a4c21544875a2ea47259e86997b';
const API_STOCK_LOGO = (symbol) => `https://storage.googleapis.com/iex/api/logos/${symbol}.png`;
const API_STOCK = (symbol) => `${CLOUD_ROUTE}/stock/${symbol}/company?token=${TOKEN}`;
const API_DIVIDENDS = (symbol) => `${CLOUD_ROUTE}/stock/${symbol}/dividends/5y?token=${TOKEN}`;
const DATABSE_ROUTE = 'http://localhost:8080';
const DATABASE_ALL_STOCKS = `${DATABSE_ROUTE}/stocks`;
const DATABASE_STOCK = `${DATABSE_ROUTE}/stock`;

const pages = [
	{name: 'Dashboard', url: '/'},
	{name: 'Search', url: '/search'},
	{name: 'Manage Stocks', url: '/manage-stocks'},
];

export default {
	API_ALL_STOCKS,
	API_STOCK_LOGO,
	API_STOCK,
	API_DIVIDENDS,
	pages,
	DATABASE_ALL_STOCKS,
	DATABASE_STOCK
}