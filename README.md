# e-commerce

Feature

### 1. Login

| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| POST    | /users/login                    |        user login to system                                    |
 POST    | /users/login                    |        user login to system                                    |
> input: "email" & "password",
> expected output : code 200, accesstoken 

### 2. Register
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| POST    | /users/register                    |        create new user                                   |
> input: "email" & "password" & "username",
> expected output : code 201, object user 


#####need auth
### 3. Dashboard / products
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| GET    | /products                    |        show product list based-on user_id                                   |
> expected output : code 200, array of object product 

| POST    | /products                    |        create new product                                  |
> input: name,category,price
> expected output : code 201, object product
 
| DELETE    | /products/:productid                    |        delete one product                                 |
> expected output : code 200

#####need auth
### 4. Cart
| POST    | /carts                    |        create cart                                  |
> input: user_id, product_id
> expected output : code 201, object product
 
| DELETE    | /carts/:id                    |        delete cart                                 |
> expected output : code 200

### 5. Main Page /products
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| GET    | /products                    |        show all product list                                   |
> expected output : code 200, array of object product 

### 6. Search
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| GET    | /products/search?p={}                    |        show all product list by search                                   |
> expected output : code 200, array of object product 


