# Analytics Frontend

## Installation/Run Instruction

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

# Analytics Backend

## Installation/Run Instruction

## Prerequisites

- **Python** (v3.9 or higher)

## Installation & Setup

**1. Create a virtual environment:**
`python -m venv venv`

**2. Activate the virtual environment:**
- On **Windows**:
  `venv\Scripts\activate`
- On **macOS / Linux**:
  `source venv/bin/activate`

**3. Install dependencies:**
`pip install fastapi uvicorn pandas`

## Running the Server

Start the application using Uvicorn with live reload:
`uvicorn main:app --reload --port 8000`

- The API will be running at: `http://localhost:8000`
- API documentation (Swagger UI) is available at: `http://localhost:8000/docs`

# Explanation of the implementation

* **Framework:** Used `FastAPI`, automated interactive documentation (Swagger), and native asynchronous support.
* **Concurrency:** Uses asynchronous I/O to read multiple uploaded files into memory concurrently.
* **Data Processing:** Used `orjson.OPT_SERIALIZE_NUMPY` flag instructs to serialize NumPy data types (`float64`, `int64`) directly at the binary level instead of slow iterations in Python.
* **Data Validation:** It dynamically standardizes headers, safely drops missing or non-numeric values (`NaNs`), and skips entirely malformed files without crashing the main server process.
* **Serialization:** Serialized JSON bytes are generated inside an isolated worker thread via `asyncio.to_thread` and immediately returned using a `Response`.