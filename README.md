# Rails and React Microservices

## Overview

Rails and React microservices application. The application contains authentication features and well as product ordering, stock inventory, viewing orders etc. 
The services communicate with each other via HTTP APIs, and an API Gateway is used to route requests to the correct services. The application is developed using Ruby on Rails, React, and TailwindCSS.

### Key Features:
- **User Authentication and Authorization** using Devise with JWT
- **Order Management** service to place and manage customer orders
- **Product Service** to manage inventory, including stock updates and product details
- **API Gateway** for centralized request routing and security
- **React Frontend** for the user interface, with Redux for state management
- **Microservices Communication** via RESTful APIs

---

## Architecture

The system follows a microservices architecture, consisting of the following key components:

### 1. **API Gateway**
- Central point for routing all client requests to the appropriate microservice.
- Handles CORS, authentication, and logging.
- Simplifies client interaction by providing a single entry point for all services.

### 2. **User Service**
- Manages user registration, authentication, and authorization.
- Uses Devise with JWT for token-based authentication.
- Provides user-related operations such as login, signup, and profile management.

### 3. **Product Service**
- Manages product catalog and inventory.
- Handles CRUD operations for products.
- Allows stock management and updates when orders are placed.

### 4. **Order Service**
- Manages the creation and fulfillment of customer orders.
- Handles validation for stock availability by communicating with the Product Service.
- Integrates with the User Service to ensure orders are linked to authenticated users.

### 5. **React Frontend**
- Provides a user interface for customers to view products, place orders, and manage their profiles.
- State management using Redux, including authentication tokens and user session handling.

---


## Technology Stack

- **Backend**:
    - Ruby on Rails (for User, Product, API Gateway and Order services)
    - Devise and Devise-JWT (for authentication)
    - PostgreSQL (for database management)
    - Faraday (for inter-service communication)

- **Frontend**:
    - React (UI Framework)
    - Redux (State management)
    - TailwindCSS (Styling)
    - Axios (HTTP client)

---

### Prerequisites
- **Ruby**: Install Ruby (if running services locally).
- **Node.js**: Install Node.js and npm (for frontend development).

### Clone the Repository
```bash
git clone https://github.com/JarredBaker/rails_microservices.git
cd rails_microservices
```

# Getting started

**IMPORTANT: You will need to generate your own master keys for each server**

1. cd into each directory and run `bundle install`.
2. cd into the following directories and run `rake db:create db:migrate db:seed`. For the following service: `user_service`: `order_service`: `product_service`
3. cd into `user_service` and do the following for devise-jwt:

### Generate the key

`bundle exec rails secret`

### Open code editor

`EDITOR='code --wait' rails credentials:edit`

### Add the following line. IMPORTANT: Don't forget to save the file.

`devise_jwt_secret_key: (copy and paste the generated secret here)`

#### Running the backend: 

Please start each server in a separate terminal.

```bash
bundle exec rails s -p 3001 # API Gateway.
bundle exec rails s -p 3000 # User service.
bundle exec rails s -p 3002 # Product service.
bundle exec rails s -p 3003 # Order service.
```

#### Access the Frontend:

Create a `.env` file at the root directory and add the following: 

```bash
PORT=8080
```

```bash
cd frontend
npm install
npm start
```

### Improvements:

- [ ] Docker integration and or K8's.
- [ ] Use GraphQL to fetch data from multiple service DBs to improve query performance. 
- [ ] Integrate a messaging broker.
- [ ] Add a Nigix reverse proxy.
- [ ] Improve front end UI.
- [ ] Improve front end error handling. 
