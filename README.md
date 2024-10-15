# Rails Microservices

# Getting started

**IMPORTANT: You will need to generate your own master keys**

1. cd into each directory and run `bundle install`.
2. cd into the following directories and run `rails db:create db:migrate`. `user_service`: `order_service`: `product_service`
3. cd into `user_service` and do the following for devise-jwt:

### Generate the key

`bundle exec rails secret`

### Open code editor

`EDITOR='code --wait' rails credentials:edit`

### Add the following line. IMPORTANT: Don't forget to save the file.

`devise_jwt_secret_key: (copy and paste the generated secret here)`

### Improvements:

- [ ] Docker integration and or K8's.
- [ ] Use GraphQL to fetch data from multiple service DBs to improve query performance. 
- [ ] Integrate a messaging broker. 