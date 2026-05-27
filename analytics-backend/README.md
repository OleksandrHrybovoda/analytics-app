# Installation/Run Instruction

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
`pip install fastapi uvicorn pandas python-multipart`

*(Note: If you generate a `requirements.txt` later, run `pip install -r requirements.txt` instead).*

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