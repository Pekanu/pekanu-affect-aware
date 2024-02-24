# Run Locally

1. Start the server
```bash
cd server
npm install
npm run dev
```

2. Start the client
```bash
cd client
npm install
npm run dev
```

3. Start flask server
```bash
cd ml
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
 
4. Have MongoDB running on your local machine

5. Open your browser and go to `http://localhost:5173`

<hr />

# Run on Docker

```bash
docker-compose -f docker-compose.dev.yml up
```

<hr />

# Create an admin

1. Create a user with the username `admin` and the password `admin`

2. Login with the user `admin` to access admin portal

# LOG TYPES

```
LOGIN: "login", 
OPENED_COURSE: "opened_course",
CLICK: "click",
OPENED_MODULE: "opened_module",
MUTE: "mute",
UNMUTE: "unmute",
PLAY: "play",
PAUSE: "pause",
SUBMIT_QUIZ: "submit_quiz",
COURSE_REGISTRATION: "course_registration",
COURSE_STARTED: "course_started",
LOGOUT: "logout",
```