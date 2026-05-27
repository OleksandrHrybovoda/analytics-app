import pandas as pd
import io
import orjson
from fastapi import HTTPException
from typing import List
from models.schemas import Statistics, ChartData, UploadResponse

def process_multiple_csvs(files: List[bytes]) -> UploadResponse:
    all_dataframes = []

    for file in files:
        try:
            dataframe = pd.read_csv(file.file, engine='pyarrow')
            dataframe.columns = dataframe.columns.str.strip().str.lower()
            
            id_col = None
            if 'test_id' in dataframe.columns:
              id_col = 'test_id'
            elif 'index' in dataframe.columns:
              id_col = 'index'
            
            if 'result' in dataframe.columns and id_col:
              dataframe = dataframe.rename(columns={id_col: 'identifier'})
              all_dataframes.append(dataframe[['identifier', 'result']])
        except Exception:
            continue
        finally:
            file.file.close()

    if not all_dataframes:
        raise HTTPException(status_code=400, detail="Missing any of the columns (result and test_id/index).")

    combined_dataframe = pd.concat(all_dataframes, ignore_index=True)

    combined_dataframe['result'] = pd.to_numeric(combined_dataframe['result'], errors='coerce')
    combined_dataframe = combined_dataframe.dropna(subset=['result'])

    if combined_dataframe.empty:
      raise HTTPException(status_code=400, detail="No valid numeric data was found.")

    stats = {
      "mean": round(combined_dataframe['result'].mean(), 2),
      "median": round(combined_dataframe['result'].median(), 2),
      "min": round(combined_dataframe['result'].min(), 2),
      "max": round(combined_dataframe['result'].max(), 2)
    }

    chart_data = {
      "identifiers": combined_dataframe['identifier'].astype(str).tolist(),
      "results": combined_dataframe['result'].tolist()
    }

    json_bytes = orjson.dumps({
      "stats": stats,
      "chartData": chart_data
    }, option=orjson.OPT_SERIALIZE_NUMPY)

    return json_bytes