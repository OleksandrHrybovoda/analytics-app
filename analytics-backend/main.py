import asyncio

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from typing import List

from services.data_processor import process_multiple_csvs

app = FastAPI(title="Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    valid_files = [file for file in files if file.filename.endswith('.csv')]

    if not valid_files:
        raise HTTPException(status_code=400, detail="No valid .csv files were found among the uploaded ones.")

    json_bytes = await asyncio.to_thread(process_multiple_csvs, valid_files)

    return Response(content=json_bytes, media_type="application/json")
