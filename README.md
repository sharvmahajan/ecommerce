# AntiGravity Store - MERN E-Commerce App

A very simple full-stack MERN (MongoDB, Express, React, Node) application built for a Cloud Computing practical assignment. This project demonstrates how to deploy a MERN application on a cloud virtual machine (AWS/Azure/GCP).

## Features
- View list of fictional zero-gravity products.
- View individual product details.
- Add products to a cart.
- Simple checkout simulation (stores order in MongoDB).
- Responsive design with plain CSS.
- Pre-seeded database with 6 initial products.

## Tech Stack
- **Frontend:** React (Vite), Axios, React Router DOM
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), CORS, dotenv

---

## Local Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ECommerce
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env file based on .env.example
cp .env.example .env
# Start the server
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
# Start the development server
npm run dev
```

---

## Deployment Instructions (Ubuntu VM)

Follow these steps to deploy the application on an AWS EC2, Azure VM, or GCP VM running Ubuntu.

### 1. Update System and Install Node.js
```bash
sudo apt update
sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2. Install MongoDB
```bash
# Import the public GPG key
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Reload local package database and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Setup MongoDB (Atlas)
If using MongoDB Atlas (Recommended for cloud deployment):
1.  Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  **CRITICAL STEP: Network Access**
    - Go to **Network Access** in the Atlas sidebar.
    - Click **Add IP Address**.
    - Click **Allow Access From Anywhere** (or add your VM's public IP).
    - Click **Confirm**.
3.  **Database Access**
    - Create a database user and save the password.
4.  **Connection String**
    - Click **Connect** -> **Drivers** -> Copy the connection string.
    - Update your `.env` file on the VM with this string.

### 3. Setup Project on VM
```bash
git clone https://github.com/sharvmahajan/ecommerce.git
cd ecommerce
```

### 4. Setup Backend
```bash
cd backend
npm install
# Create .env file and paste your MONGODB_URI
nano .env 
# PORT=5000
# MONGODB_URI=your_atlas_connection_string

# Install PM2 and start server
sudo npm install -g pm2
pm2 start server.js --name "antigravity-backend"
```

### 5. Setup Frontend
```bash
cd ../frontend
npm install

# IMPORTANT: Build with your VM's Public IP
VITE_API_URL=http://<YOUR_VM_PUBLIC_IP>:5000 npm run build

# Serve the production build
sudo npm install -g serve
pm2 start "serve -s dist -l 3000" --name "antigravity-frontend"
```

### 6. Security Group / Firewall Rules
Open the following ports in your Cloud Provider's console (AWS Security Groups / Azure Networking):
- **Port 3000:** Frontend access (http://<VM_PUBLIC_IP>:3000)
- **Port 5000:** Backend API (Used by frontend to fetch data)

---

## API Endpoints
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch a single product by ID
- `POST /orders` - Place a new order

## .env File Example
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/antigravity
```
