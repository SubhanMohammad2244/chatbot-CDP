# Assignment 2

## Project Overview
This project is designed to implement a **CDP (Customer Data Platform) Support Chatbot** that assists users in finding documentation for different CDPs, such as Zeotap, Segment, and mParticle. The chatbot retrieves relevant documentation links based on user queries.

## Features
- Users can select a CDP from a dropdown list.
- Users can input a query related to the selected CDP.
- The chatbot fetches relevant search results and provides a clickable link.
- Simple and clean UI for user interaction.

## Technologies Used
- **Frontend:** React, Axios for API requests
- **Backend:** FastAPI (Python), Requests library
- **Deployment:** Localhost

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Python (3.7+)
- Node.js & npm
- FastAPI & necessary Python packages

### Steps
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-repo/CDP-Chatbot.git
   cd CDP-Chatbot
   ```
2. **Backend Setup:**  
   Install dependencies:
   ```bash
   pip install fastapi uvicorn requests
   ```
   Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
3. **Frontend Setup:**  
   Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Open the browser and go to `http://localhost:3000` to access the chatbot.

## API Endpoints
| Method | Endpoint    | Description |
|--------|------------|-------------|
| GET    | `/`        | Home route to check API status |
| GET    | `/ask`     | Fetches search results based on user query |

## Known Issues & Fixes
- **CORS Issue:** If API requests are blocked, install and configure `fastapi.middleware.cors`.
- **Invalid Links:** Ensure that the search URL is correctly formatted using `urllib.parse.quote`.

## Future Enhancements
- Integrate actual API responses from CDP providers.
- Use AI to generate direct answers instead of just search links.
- Improve UI with chatbot-style conversation flow.

## Contributors
- Mohammad Subhan - Developer

## License
This project is licensed under the MIT License.

