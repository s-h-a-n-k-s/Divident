package com.nationwide.business;

import java.util.List;

import com.nationwide.domain.Stock;
import com.nationwide.persistence.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockService {
	
	@Autowired
	private StockRepository stockRepository;

	public List<Stock> getStocks() {
		return stockRepository.findAll();
	}

	public void deleteShares(Long id) {
		stockRepository.deleteById(id);
	}

	public Stock addShares(Stock stock) {
		return stockRepository.save(stock);
	}

	public Stock updateShares(Long id, Stock stock) {
		Stock databaseStock = stockRepository.findById(id).get();

		databaseStock.setAmount(stock.getAmount());
		databaseStock.setPurchasePrice(stock.getPurchasePrice());
		databaseStock.setPurchaseDate(stock.getPurchaseDate());
		
		return stockRepository.save(databaseStock);
	}

	public List<Stock> getShares(String symbol) {
		return stockRepository.findAllByTickerSymbol(symbol);
	}
}