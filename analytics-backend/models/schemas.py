from pydantic import BaseModel
from typing import List, Union

class Statistics(BaseModel):
    mean: float
    median: float
    min: float
    max: float

class ChartData(BaseModel):
    identifiers: List[str]
    results: List[float]

class UploadResponse(BaseModel):
    stats: Statistics
    chartData: ChartData
    