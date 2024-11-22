---

# **School Management API**

This project is a simple School Management System built using Node.js, Express.js, and MySQL. The API provides endpoints for adding new schools and retrieving a list of schools sorted by proximity to a user-specified location.

---

## **Features**   

1. **Add School API**: Allows users to add school details such as name, address, latitude, and longitude.
2. **List Schools API**: Fetches and returns a list of schools sorted by proximity to a given location.
3. Input validation and error handling.
4. Hosted and ready for live testing.

---

## **API Endpoints**

### 1. **Add School**

- **Endpoint**: `POST /API/addSchool`
- **Request Body** (JSON):

  ```json
  {
    "name": "Springfield High",
    "address": "123 Elm St",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```

- **Response**:
  - **Success** (Status 201):

    ```json
    {
      "message": "School added successfully",
      "school Id": 1
    }
    ```

  - **Error** (Status 400/500):

    ```json
    {
      "error": "Invalid input data. Name, address, latitude, and longitude are required."
    }
    ```

### 2. **List Schools**

- **Endpoint**: `GET /api/listSchools`
- **Query Parameters**:
  - `latitude` (required): User's current latitude.
  - `longitude` (required): User's current longitude.
- **Example**:

  ```
  GET /api/listSchools?latitude=40.7128&longitude=-74.0060
  ```

- **Response**:
  - **Success** (Status 200):

    ```json
    [
      {
        "id": 1,
        "name": "Springfield High",
        "address": "123 Elm St",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "distance": 0.5
      },
      ...
    ]
    ```

  - **Error** (Status 400/500):

    ```json
    {
      "error": "Latitude and longitude are required."
    }
    ```

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Deployment**: Render (or chosen hosting platform)
- **API Testing**: Postman

---

## **Setup Instructions**

### 1. **Clone the Repository**

```bash
git clone https://github.com/<your-username>/school-management-api.git
cd school-management-api
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Set Up the Database**

- Create a `schools` table in your MySQL database:

  ```sql
  CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
  );
  ```

- Add your database credentials in a `.env` file:

  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=school_management
  ```

### 4. **Run the Application**

```bash
npm start
```

- The server will start on `http://localhost:3000`.

---

## **Hosting and Live Testing**

- **Live URL**: [https://school-management-api.railway.com](https://school-management-api-production-48e7.up.railway.app/)  
  (Replace with the actual URL after deployment)

---

## **Postman Collection**

- Download the Postman collection: [School Management API.postman_collection.json](#)  
  (Attach the exported `.json` file or include a shareable link)

---

## **Deliverables**

1. **Live API Endpoints**: [Hosted API URL](https://school-management.onrender.com)  
2. **Postman Collection**: [Postman Collection Link](#)  

---

Feel free to contribute or raise issues in the repository. Happy coding! 🚀
