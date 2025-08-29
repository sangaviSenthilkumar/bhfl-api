# BFHL API
Live endpoint:https://bhfl-api-v59s.onrender.com/bfhl
# API Testing Note
The /bfhl route is implemented as a POST API.

Accessing the link directly in a browser shows Cannot GET /bfhl because browsers send only GET requests.

The correct way to test is by sending a POST request with JSON input (e.g., via Postman or curl).

Below is a sample request and response.
POST https://<your-render-app>.onrender.com/bfhl
Content-Type: application/json

{
"data": ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
}
Sample Response:

json
{
"is_success": true,
"user_id": "john_doe_17091999",
“email” : “john@xyz.com”,
“roll_number”:”ABCD123”,
"odd_numbers": [”5”],
"even_numbers": [“2”,”4”,”92”],
"alphabets": [“A”, "Y", “B”],
“sepcial_characters”: [“&”, “-”, “*”],
"sum": "103",
"concat_string": "ByA"
}
<img width="1302" height="783" alt="image" src="https://github.com/user-attachments/assets/981a8be6-f3c9-47d6-b3c7-2de7d05ecdc3" />
