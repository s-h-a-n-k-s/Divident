package com.nationwide.rest;

import java.util.List;

import com.nationwide.business.StockService;
import com.nationwide.domain.Stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

	@Autowired
	private StockService stockService;

	@GetMapping(path = "/stocks")
	public ResponseEntity<List<Stock>> getStocks() {
		return ResponseEntity.ok(stockService.getStocks());
	}
}