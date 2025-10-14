from fastapi import FastAPI

app = FastAPI()

sample_data = {
    "title": "This is a test note.",
    "content": "Programming is fun!",
}

@app.get("/")
async def read_root():
    return sample_data