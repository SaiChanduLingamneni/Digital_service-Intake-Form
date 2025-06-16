# Digital Service Intake e-Form: Setup and Running Instructions

## Prerequisites

## Setup Instructions

Follow these steps to get the project up and running:

### Step 1: Unzip the Project File

Extract the contents of the `digital-service-intake.zip` file to your desired location. You can use your operating system's built-in unzipping utility or a command-line tool.

```bash
unzip digital-service-intake.zip
cd digital-service-intake
```

### Step 2: Install Backend Dependencies

Navigate into the `server` directory and install the necessary Node.js packages for the backend. This will create the `node_modules` folder for the backend.

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

Now, navigate into the `client` directory and install the necessary Node.js packages for the React frontend. This will create the `node_modules` folder for the frontend.

```bash
cd ../client
npm install
```

## Running the Project

To run the application, you need to start both the backend server and the frontend development server. It's recommended to use two separate terminal windows for this.

### Step 1: Start the Backend Server

In your **first terminal window**, navigate to the `server` directory and start the Express.js backend:

```bash
cd /path/to/your/project/digital-service-intake/server
npm start
```

You should see output indicating that the Express server is listening on port 5000 (e.g., `Server running on port 5000`).

### Step 2: Start the Frontend Development Server

In your **second terminal window**, navigate to the `client` directory and start the React development server:

```bash
cd /path/to/your/project/digital-service-intake/client
npm start
```

This will typically open a new browser tab or window automatically, pointing to `http://localhost:3000`.

## Accessing the Application

Once both servers are running, you can access the Digital Service Intake e-Form in your web browser at:

[http://localhost:3000](http://localhost:3000)

