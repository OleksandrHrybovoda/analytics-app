# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

# Installation/Run Instruction

It is built with **React**, **TypeScript**, and **Vite**. There is a drag-and-drop interface for uploading CSV files and for data visualization is used **Echarts**.

## Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm**

## Installation & Setup

**1. Install dependencies:**
`npm install`

**2. Configure Environment Variables:**
Create a `.env` file in the root directory and specify the backend API URL. 
`VITE_API_URL=http://localhost:8000`

## Running the Application

Start the Vite development server:
`npm run dev`

- The application will be accessible at: `http://localhost:5173`

## How to Use
1. Ensure the FastAPI backend server is running.
2. Open the application in your browser.
3. Drag and drop one or multiple `.csv` files into the upload zone.
   *(Note: CSV files must contain a `result` column and either a `test_id` or `index` column).*
4. View the generated statistics and D3.js chart.

# Explanation of the implementation

* **Framework:** Built with React.
* **File Uploads:** Uses `react-dropzone` to handle both drag-and-drop and manual multi-file selection.
* **Performance-Optimized Validation:** Uses the native `FileReader` to read only a small chunk of the file just to verify headers. This prevents the browser from freezing on huge files (e.g., millions of rows). The rest of the heavy validation is offloaded to the backend.
* **Notifications:** Uses `react-hot-toast` for error handling. It's fast to implement, comes with ready-made styles, and handles auto-hiding automatically.
* **State Reset:** Added a simple **Reset** button to quickly clear all data and start over.
* **Data Visualization:** Built with `echarts`. The backend sends a raw array of data, and echarts was chosen because it renders on Canvas by default, it has a lot of built-in features that easy to implement. Works well on millions of data.