
Introduction 
-----------
Divident is a stock tracking system and dividend calculator. It has been built using:

-   [Spring boot](https://spring.io/projects/spring-boot)
-   [React.js](https://reactjs.org/)
-   [H2](https://www.h2database.com)


Running the application
-----
Step 1:
Clone the project using the following command:
```
git clone https://github.com/scrappy1987/todo-app.git
```
Step 2:
Open a command line window in the "/backend" folder an execute:
```
mvn clean install
```
Step 3:
In the command line, cd into the target folder and execute the jar:
```
java -jar [jar-in-this-folder]
```
Step 4:
From a browser access the API by executing the following HTTP request:
http://localhost:8080/stocks
```
The service should return an empty JavaScript array.
```
Step 5:
From a browser access the database by navigating to:
http://localhost:8080/h2-console

Step 6:
Enter the following details and log into the DB:
```
JDBC URL: jdbc:h2:mem:stock
User name: root
Password: root
```
Step 7:
Enter data into the database with the following SQL statement:
```
INSERT INTO STOCK (ID, AMOUNT, COMPANY_NAME, PURCHASE_DATE, PURCHASE_PRICE, TICKER_SYMBOL) VALUES (1, 10, 'Apple, Inc.', CURRENT_DATE(), 1.00, 'AAPL')
```
Step 8:
From a browser access the API by executing the following HTTP request:
http://localhost:8080/stocks
```
The service should return an array of STOCK objects
```
Step 9:
Open a command line window in the "/frontend" folder and execute:
```
npm install
```
Step 10:
Execute the following command:
```
npm start
```
Step 11:
From a browser navigate to the app at the following URL:
```
http://localhost:3000
```
Step 12:
From the browser add and remove stock information from the web application.