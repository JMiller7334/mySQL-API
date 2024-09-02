# API Documentation

## Overview

This API offers endpoints for managing customer and usage data for the Web Dashboard Project. It interacts with a MySQL database and supports full CRUD (Create, Read, Update, Delete) operations on the `customers` and `usage_data` tables.

# **Technologies Used**

## Development Technologies:
- **Node.js** - JavaScript runtime used for server-side scripting.
- **Express** - Web application framework for Node.js to build the API.
- **Sequelize** - ORM for interacting with the MySQL/MariaDB database.
- **MySQL/MariaDB** - Relational database used to store and manage data.
- **PM2** - Process manager for Node.js applications used to manage and keep the API running.

## Tested With:
- **Insomnia** - API client used for testing API endpoints.
- **MySQL Workbench**: Tool for managing the local MySQL database.
- **Nodemon**: Utility for automatically restarting the server during development.

## Deployment Technologies:
- **VPS (Virtual Private Server)** - Used to host the API and database.
- **FileZillas** - Used to transfer files between local machine and VPS.


## Base URL
`http://jacobjmiller.com:8080`


## Endpoints

### **Customers**

#### **1. Get All Customers**

- **Endpoint:** `GET /customers?`
- **Description:** Retrieves a list of all customers.
- **Response:**
  - **Status Code:** `200 OK`
  - **Body:** JSON array of customer objects.

    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "address": "123 Main St",
        "phone": "1234567890",
        "email": "john.doe@example.com",
        "customer_type": "regular"
      },
      ...
    ]
    ```

#### **2. Get Customer by ID**

- **Endpoint:** `GET /customers?id={id}`
- **Description:** Retrieves a specific customer by ID.
- **Parameters:**
  - **Query Parameter:** `id` (required) - The ID of the customer.
- **Response:**
  - **Status Code:** `200 OK`
  - **Body:** JSON object of the customer.

    ```json
    {
      "id": 1,
      "name": "John Doe",
      "address": "123 Main St",
      "phone": "1234567890",
      "email": "john.doe@example.com",
      "customer_type": "regular"
    }
    ```

#### **3. Create a New Customer**

- **Endpoint:** `POST /customers`
- **Description:** Creates a new customer.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Body:** JSON object with customer details.

    ```json
    {
      "name": "Jane Doe",
      "address": "456 Elm St",
      "phone": "0987654321",
      "email": "jane.doe@example.com",
      "customer_type": "premium"
    }
    ```

- **Response:**
  - **Status Code:** `201 Created`
  - **Body:** JSON object of the created customer.

    ```json
    {
      "id": 2,
      "name": "Jane Doe",
      "address": "456 Elm St",
      "phone": "0987654321",
      "email": "jane.doe@example.com",
      "customer_type": "premium"
    }
    ```

#### **4. Update a Customer**

- **Endpoint:** `PUT /customers?id={id}`
- **Description:** Updates an existing customer.
- **Parameters:**
  - **Query Parameter:** `id` (required) - The ID of the customer.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Body:** JSON object with updated customer details.

    ```json
    {
      "name": "Jane Smith",
      "address": "789 Oak St",
      "phone": "1122334455",
      "email": "jane.smith@example.com",
      "customer_type": "vip"
    }
    ```

- **Response:**
  - **Status Code:** `200 OK`
  - **Body:** JSON object of the updated customer.

    ```json
    {
      "id": 2,
      "name": "Jane Smith",
      "address": "789 Oak St",
      "phone": "1122334455",
      "email": "jane.smith@example.com",
      "customer_type": "vip"
    }
    ```

#### **5. Delete a Customer**

- **Endpoint:** `DELETE /customers?id={id}`
- **Description:** Deletes a customer by ID.
- **Parameters:**
  - **Query Parameter:** `id` (required) - The ID of the customer.
- **Response:**
  - **Status Code:** `204 No Content` - Success
  - **Status Code:** `404 Not Found` - If the customer is not found.



## Usage Data API

### **1. Get Usage Data by Customer ID**

- **Endpoint:** `GET /usage?`
- **Description:** Retrieves a list of usage data records. Filters by `customerId` if provided.
- **Query Parameters:**
  - **customerId** (optional) - The ID of the customer to filter usage data.
- **Response:**
  - **Status Code:** `200 OK`
  - **Body:** JSON array of usage data objects if `customerId` is provided, otherwise, a list of all usage data.

    ```json
    [
      {
        "id": 1,
        "customerId": 1,
        "usage_month": "2024-08",
        "customer_usage": 123.45
      },
      ...
    ]
    ```

  - **Status Code:** `404 Not Found` - If no usage data is found for the provided `customerId`.

    ```json
    {
      "error": "No usage data found for the provided customer ID"
    }
    ```

  - **Status Code:** `500 Internal Server Error` - For server issues.

    ```json
    {
      "error": "Server error"
    }
    ```

### **2. Create New Usage Data**

- **Endpoint:** `POST /usage`
- **Description:** Creates a new usage data record.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Body:** JSON object with usage data details.

    ```json
    {
      "customerId": 1,
      "usage_month": "2024-08",
      "customer_usage": 678.90
    }
    ```

- **Response:**
  - **Status Code:** `201 Created`
  - **Body:** JSON object of the created usage data.

    ```json
    {
      "id": 2,
      "customerId": 1,
      "usage_month": "2024-08",
      "customer_usage": 678.90
    }
    ```

  - **Status Code:** `500 Internal Server Error` - For server issues.

    ```json
    {
      "error": "Server error"
    }
    ```

### **3. Update Usage Data**

- **Endpoint:** `PUT /usage?id={id}`
- **Description:** Updates an existing usage data record.
- **Query Parameters:**
  - **id** (required) - The ID of the usage data to be updated.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Body:** JSON object with updated usage data details.

    ```json
    {
      "customerId": 1,
      "usage_month": "2024-09",
      "customer_usage": 123.45
    }
    ```

- **Response:**
  - **Status Code:** `200 OK`
  - **Body:** JSON object of the updated usage data.

    ```json
    {
      "id": 2,
      "customerId": 1,
      "usage_month": "2024-09",
      "customer_usage": 123.45
    }
    ```

  - **Status Code:** `404 Not Found` - If the usage data is not found.

    ```json
    {
      "error": "Usage data not found"
    }
    ```

  - **Status Code:** `500 Internal Server Error` - For server issues.

    ```json
    {
      "error": "Server error"
    }
    ```

### **4. Delete Usage Data**

- **Endpoint:** `DELETE /usage?id={id}`
- **Description:** Deletes a usage data record by ID.
- **Query Parameters:**
  - **id** (required) - The ID of the usage data to be deleted.
- **Response:**
  - **Status Code:** `204 No Content` - Success.
  - **Status Code:** `404 Not Found` - If the usage data is not found.

    ```json
    {
      "error": "Usage data not found"
    }
    ```

  - **Status Code:** `500 Internal Server Error` - For server issues.

    ```json
    {
      "error": "Server error"
    }
    ```
