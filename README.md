ZapLink - URL Shortener
Overview
ZapLink is a modern URL shortening service that allows users to shorten long URLs, track visits, and manage their shortened links. Built with a focus on usability and scalability, it features a responsive interface, dark mode support, and integration with QR codes for easy sharing.
Features

URL Shortening: Convert long URLs into short, manageable links.
QR Code Generation: Generate QR codes for shortened URLs.
Copy to Clipboard: Easily copy short URLs with a single click.
Visit Tracking: Monitor the number of visits for each shortened link.
Search Functionality: Search through saved URLs by long URL.
Dark Mode: Toggle between light and dark themes.
Sorting and Pagination: Sort URLs by creation date or visits, with pagination support.
Error Handling: Robust error boundaries to handle runtime issues gracefully.
Rate Limiting: Backend protection against excessive requests.

Technologies Used

Frontend:
React 19.1.0 with TypeScript
Vite as the build tool
PrimeReact 10.9.5 for UI components
Tailwind CSS 3.4.14 for styling
react-router-dom 7.5.3 for routing
react-toastify 11.0.5 for notifications


Backend:
Node.js with Express


Other:
Axios for API requests
QR Code generation via backend API



Prerequisites

Node.js (v18 or later)
Yarn package manager

Installation
Clone the Repository
git clone [(https://github.com/Vkeybhoi/ZapLink.git)]
cd zaplink

Backend Setup

Navigate to the backend directory:
cd backend


Install dependencies:
yarn


Configure environment variables:

Create a .env file in the backend directory with the following:
PORT=3001





Start the backend:
yarn dev



Frontend Setup

Navigate to the frontend directory:
cd frontend


Install dependencies:
yarn


Start the frontend:
yarn dev



Run Both Simultaneously
Use the root package.json script to start both backend and frontend concurrently:
yarn start


Frontend will be available at http://localhost:5173.
Backend API will run at http://localhost:3001.

Usage

Visit http://localhost:5173 in your browser.
Enter a long URL in the input field and click "Shorten".
View the shortened URL, QR code, and copy it to your clipboard.
Search for existing URLs or view the list with visit statistics.
Toggle dark mode using the theme switch in the navbar.

Project Structure
zaplink/
├── backend/          # Express backend with MongoDB
│   ├── config/       # Configuration files
│   ├── controllers/  # API controllers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── server.ts     # Main server file
├── frontend/         # React frontend with Vite
│   ├── src/          # Source code
│   │   ├── components/ # Reusable components
│   │   ├── context/    # Context providers
│   │   ├── pages/      # Page components
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Utility functions
│   ├── public/       # Static assets
│   └── vite.config.ts # Vite configuration
├── package.json      # Root project configuration
└── README.md         # This file


