const API_ROUTE = 'https://api.iextrading.com/1.0';
const API_ALL_STOCKS = `${API_ROUTE}/ref-data/symbols`;
const CLOUD_ROUTE = 'https://cloud.iexapis.com/stable';
const TOKEN = 'sk_6a960a4c21544875a2ea47259e86997b';
const API_STOCK_LOGO = (symbol) => `https://storage.googleapis.com/iex/api/logos/${symbol}.png`;
const API_STOCK = (symbol) => `${CLOUD_ROUTE}/stock/${symbol}/company?token=${TOKEN}`;
const API_DIVIDENDS = (symbol) => `${CLOUD_ROUTE}/stock/${symbol}/dividends/5y?token=${TOKEN}`;
const API_MULTIPLE_COMPANY_DIVIDENDS = (symbols) => `${CLOUD_ROUTE}/stock/market/batch?symbols=${symbols}&types=dividends,company,logo&range=1y&token=${TOKEN}`;
const DATABASE_ROUTE = 'http://localhost:8080';
const DATABASE_ALL_STOCKS = `${DATABASE_ROUTE}/stocks`;
const DATABASE_STOCK = `${DATABASE_ROUTE}/stock`;
const DATABASE_SHARES = (symbol) => `${DATABASE_ROUTE}/shares/${symbol}`;
const DATABASE_SHARES_ID = (id) => `${DATABASE_ROUTE}/shares/${id}`;

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
	API_MULTIPLE_COMPANY_DIVIDENDS,
	pages,
	DATABASE_ALL_STOCKS,
	DATABASE_STOCK,
	DATABASE_SHARES,
	DATABASE_SHARES_ID
}