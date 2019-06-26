package com.nationwide.persistence;

import java.util.List;

import com.nationwide.domain.Stock;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

	List<Stock> findAllByTickerSymbol(String symbol);

}