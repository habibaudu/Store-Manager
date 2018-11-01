[![Build Status](https://travis-ci.org/habibaudu/Store-Manager.svg?branch=ch-Test-161608110)](https://travis-ci.org/habibaudu/Store-Manager)

[![Coverage Status](https://coveralls.io/repos/github/habibaudu/Store-Manager/badge.svg?branch=chore_coverage)](https://coveralls.io/github/habibaudu/Store-Manager?branch=chore_coverage)



# Store-Manager
Store Manager is a web application that helps store owners manage sales and product inventory records. This application is meant for use in a single store.

## Technologies Used


   - HTML CSS JAVASCRIPT for Frontend  
   - Node express For Backend


## ouputs

  - Frontend : https://habibaudu.github.io/Store-Manager/UI/index.html
  - backend : https://store-manager2.herokuapp.com/
   

## How to Clone
On your git bash run the following command
   - git clone https://github.com/habibaudu/Store-Manager.git
   - Run  npm install

## Alternatively
   - Download the Project
   - Run  npm install 



## expected Endpoints
  - POST /api/v1/users/login
  - GET: /api/v1/sales/:salesId
  - GET: /api/v1/sales
  - GET: /api/v1/products
  - GET :/api/v1/produts/:productId
  - POST: /api/v1/products
  - DELETE: /api/v1/products/:productId
  - PUT :/api/v1/products/:productId
  - POST :/api/v1/sales

## Fire up Postman
  Enter the following routes
  - POST : localhost:8080/api/v1/login  
        Enter password and username click send to login and receive token

  - GET : localhost:8080/api/v1/sales/:salesId 
        To get a single sales record, :salesId is id of sales to get

  - GET : localhost:8080/api/v1/sales 
        To get all sales record 

  - GET : localhost:8080/api/v1/products
        To get all products

  - GET : localhost:8080/api/v1/products/:productId
        To get a single product, :productId is id of product to get

  - POST : localhost:8080/api/v1/products  to add a product
         Enter productName,Price,inStock,minimumAllowedInStock and click send to create a product 

  - DELETE : localhost:8080/api/v1/products/:productId
         - To delete a single product, productId is the ID of product to be deleted

  - PUT : localhost:8080/api/v1/products/:productId
        Update a product  productId is the ID of product to be updated

  - POST : localhost:8080/api/v1/sales 
      Enter product,Price,quantity  username, CustomerName and click send to create a sales  
        

 
## license "ISC",