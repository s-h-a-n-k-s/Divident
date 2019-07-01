package com.nationwide.rest;

import java.util.List;

import com.nationwide.business.StockService;
import com.nationwide.domain.Stock;
import com.nationwide.constants.Constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

	@Autowired
	private StockService stockService;

	@GetMapping(path = Constants.STOCKS)
	public ResponseEntity<List<Stock>> getStocks() {
		return ResponseEntity.ok(stockService.getStocks());
	}

	@GetMapping(path = Constants.SHARES_WITH_SYMBOL)
	public ResponseEntity<List<Stock>> getStock(@PathVariable("symbol") String symbol) {
		return ResponseEntity.ok(stockService.getShares(symbol));
	}

	@RequestMapping(value = Constants.STOCK, method = RequestMethod.POST)
	public ResponseEntity<Stock> addShares(@RequestBody Stock stock) {
		return ResponseEntity.ok(stockService.addShares(stock));
	}

	@RequestMapping(value = Constants.SHARES_WITH_ID, method = RequestMethod.PUT)
	public ResponseEntity<Stock> updateShares(@PathVariable Long id, @RequestBody Stock stock) {
		return ResponseEntity.ok(stockService.updateShares(id, stock));
	}

	@RequestMapping(value = Constants.SHARES_WITH_ID, method = RequestMethod.DELETE)
	public ResponseEntity deleteShares(@PathVariable Long id) {
		stockService.deleteShares(id);
		return ResponseEntity.ok().body("{'success': true}");
	}
}