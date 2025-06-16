## Project Structure

```
digital-service-intake/
├── client/             # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/ # React components (e.g., Form.js)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── ...
├── server/             # Express.js backend application
│   ├── server.js       # Main server file
│   ├── submissions.log # Log file for form submissions
│   ├── package.json
│   └── ...
├── prefill_data.json   # JSON file for prefilling form data
├── todo.md             # Project todo list
└── README.md           # Project setup and running instructions
```

## Setup Instructions (Windows)

This guide will help you set up and run the Digital Service Intake e-Form project on your Windows machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js and npm:** Download and install from [nodejs.org](https://nodejs.org/en/download/). npm (Node Package Manager) is included with Node.js.
*   **Git (Optional but Recommended):** Download and install from [git-scm.com](https://git-scm.com/downloads).

### 1. Clone the Repository (if applicable) or Unzip the Project

If you received the project as a Git repository, clone it using:

```bash
git clone <repository_url>
cd digital-service-intake
```

### 2. Backend Setup

Navigate to the `server` directory and install the necessary Node.js packages:

```bash
cd digital-service-intake/server
npm install
```

To start the backend server, run:

```bash
node server.js
```

The server will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a **new** command prompt or terminal window. Navigate to the `client` directory and install the necessary Node.js packages:

```bash
cd digital-service-intake/client
npm install
```

To start the React development server, run:

```bash
npm start
```

This will open the e-form in your default web browser at `http://localhost:3000`.

### 4. Project Files

*   `prefill_data.json`: Contains mock data for prefilling the form.
*   `server/server.js`: The Express.js backend logic for handling API requests and logging submissions.
*   `client/src/App.js`: The main React component for the e-form.
*   `client/src/index.css`: Global CSS for the React app.

### 5. Running the Application

1.  Start the backend server (as described in step 2).
2.  Start the frontend development server (as described in step 3).
3.  Open your web browser and navigate to `http://localhost:3000` to access the e-form.

### 6. Stopping the Application

To stop both the frontend and backend servers, go to their respective terminal windows and press `Ctrl + C`.
