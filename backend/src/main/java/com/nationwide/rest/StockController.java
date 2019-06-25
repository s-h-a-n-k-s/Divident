package com.nationwide.rest;

import java.util.List;

import com.nationwide.business.StockService;
import com.nationwide.domain.Stock;
import com.nationwide.constants.Constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

	@Autowired
	private StockService stockService;

	@GetMapping(path = Constants.STOCKS)
	public ResponseEntity<List<Stock>> getStocks() {
		return ResponseEntity.ok(stockService.getStocks());
	}

	@RequestMapping(value = Constants.STOCK, method = RequestMethod.POST)
	public ResponseEntity<Stock> createStock(@RequestBody Stock stock) {
		return ResponseEntity.ok(stockService.addStock(stock));
	}
}