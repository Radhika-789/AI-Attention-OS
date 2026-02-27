from fastapi import FastAPI
from routes.sync import router as sync_router

app = FastAPI()

app.include_router(sync_router)