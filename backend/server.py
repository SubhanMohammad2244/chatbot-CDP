import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import quote

app = FastAPI()

# Enable CORS for frontend requests (React running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change if frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"message": "CDP Chatbot Backend is Running!"}

# Function to search Google for CDP documentation
def google_search(cdp_name, query):
    try:
        search_query = f"{query} site:{cdp_name}.com/docs"
        google_url = f"https://www.google.com/search?q={quote(search_query)}"
        return google_url
    except Exception as e:
        return f"Error occurred: {str(e)}"

@app.get("/ask")
def ask_question(cdp: str, query: str):
    if not cdp or not query:
        return {"error": "CDP and query parameters are required."}

    answer = google_search(cdp, query)

    if "Error occurred" in answer:
        return {"cdp": cdp, "query": query, "answer": "Failed to process request."}

    return {"cdp": cdp, "query": query, "answer": f"Here are the best search results: {answer}"}
