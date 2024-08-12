# 🚀 Blog API

Welcome to the m API project! This is a simple Express-based backend API following the hexagonal architecture pattern and integrated with Swagger for API documentation.

## 📦 Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### 🎯 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/products/docker-desktop) (for running MongoDB)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### ⚙️ Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/fulltime-api.git
   cd fulltime-api
   ```

2. **Install Dependencies**

   Install the required Node.js dependencies:

   ```bash
   npm install
   ```

3. **Set Up MongoDB with Docker**

   - Create a `docker-compose.yml` file with the following content:

     ```yaml
     version: '3.8'

     services:
       mongo:
         image: mongo:latest
         container_name: my-mongo
         ports:
           - "27017:27017"
         environment:
           MONGO_INITDB_ROOT_USERNAME: root
           MONGO_INITDB_ROOT_PASSWORD: <<password>>
         volumes:
           - mongo-data:/data/db

     volumes:
       mongo-data:
     ```

   - Start MongoDB with Docker:

     ```bash
     docker-compose up -d
     ```

4. **Create a `.env` File**

   Create a `.env` file in the root directory with the following content:

   ```env
   MONGODB_URI=mongodb://root:<<password>></password>@localhost:27017/mydatabase?authSource=admin
   PORT=3000
   GOOGLE_CLIENT_ID=<<hash>>.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=<<GOOGLE_CLIENT_SECRET>>
   PORT=4000
   ```

5. **Start the Application**

   - **For Development:**

     Use `ts-node` and `nodemon` to run the server with automatic reloading:

     ```bash
     npm run dev
     ```

   - **For Production:**

     Build the project and run the compiled JavaScript:

     ```bash
     npm run build
     npm run serve
     ```

### 🌐 API Documentation

Once your server is running, you can view and interact with the API documentation using Swagger UI:

- Open your browser and navigate to: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 🛠️ Scripts

- **`npm run dev`**: Start the server in development mode with automatic reloading.
- **`npm run build`**: Compile TypeScript code to JavaScript.
- **`npm run serve`**: Start the server in production mode with compiled JavaScript.

### 📂 Project Structure

```
fulltime-api/
├── src/
│ ├── adapters/
│ ├── config/
│ ├── core/
│ ├── infrastructure/
│ ├── models/
│ └── routes/
├── .env
├── docker-compose.yml
├── package.json
└── tsconfig.json
```