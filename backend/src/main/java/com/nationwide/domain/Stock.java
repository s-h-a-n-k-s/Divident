package com.nationwide.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Stock {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String tickerSymbol;
	private String companyName;
	private int amount;
	private float purchasePrice;
	private Date purchaseDate;

	public Stock() {}

	public Stock(Long id, String tickerSymbol, String companyName, int amount, float purchasePrice, Date purchaseDate) {
		this.id = id;
		this.tickerSymbol = tickerSymbol;
		this.companyName = companyName;
		this.amount = amount;
		this.purchasePrice = purchasePrice;
		this.purchaseDate = purchaseDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTickerSymbol() {
		return tickerSymbol;
	}

	public void setTickerSymbol(String tickerSymbol) {
		this.tickerSymbol = tickerSymbol;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public float getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(float purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public Date getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
}