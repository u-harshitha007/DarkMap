from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DarkMap",
    description="Visualizing Crime. Revealing Patterns.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"project": "DarkMap", "status": "running"}
