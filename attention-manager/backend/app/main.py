from fastapi import FastAPI
from routes.sync import router as sync_router
from routes.dashboard import router as dashboard_router
from routes.pomodoro import router as pomodoro_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
        allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],  # adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(sync_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api/dashboard")
app.include_router(pomodoro_router, prefix="/api/pomodoro")