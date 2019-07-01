# e-commerce

Feature and Endpoint

### 1. Login

| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| POST    | /users/login                    |        user login to system                                    |

> input: "email" & "password",
> expected output : code 200, accesstoken, role

### 2. Register
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| POST    | /users/register                    |        create new user                                   |
> input: "email" & "password" & "username", "role : admin or customer",
> expected output : code 201, object user 


#####need auth
### 3. Dashboard / products
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| GET    | /products                    |        show product list based-on user_id                                   |
> expected output : code 200, array of object product 

| POST    | /products                    |        create new product                                  |
> input: name,stock,price,picture
> expected output : code 201, object product
 
| DELETE    | /products/:productid                    |        delete one product                                 |
> expected output : code 200

| PUT    | /products/:productid                    |        edit one product                                 |
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


