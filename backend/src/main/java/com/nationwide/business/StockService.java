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

	public void deleteStock(Long id) {
		stockRepository.deleteById(id);
	}

	public Stock addStock(Stock stock) {
		return stockRepository.save(stock);
	}

	public List<Stock> getShares(String symbol) {
		return stockRepository.findAllByTickerSymbol(symbol);
	}
}