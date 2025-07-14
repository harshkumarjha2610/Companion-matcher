# Companion-matcher
harsh kumar jha project
Companion Matcher

Welcome to Companion Matcher, a modern dating application designed to help users find their perfect match. Built with React Native for the frontend (in the harshapp directory) and Node.js with Express for the backend (in the userlogin directory), this app provides a seamless experience for registration, login, and match management, featuring a romantic theme and full-screen layouts.

Table of Contents





Overview



Features



Prerequisites



Installation





Frontend Setup



Backend Setup



Usage



File Structure



API Endpoints



Contributing



License



Contact

Overview

Companion Matcher is a mobile-first dating app that allows users to create profiles, log in, and discover potential matches based on shared interests. The app uses MongoDB Atlas for data storage, bcrypt for secure password hashing, and Expo for cross-platform development. The UI features a romantic theme with soft reds, whites, and grays, ensuring an engaging user experience.

Features





User registration with name, age, interests, profile photo, Gmail ID, and password.



Secure login with password hashing.



Match management with a shortlisted users feature.



Full-screen responsive design across devices.



Photo selection from camera or gallery.



Skip login option for guest mode.

Prerequisites





Node.js (v18.x or later recommended)



npm or yarn



Expo Go (for testing the frontend on mobile devices)



MongoDB Atlas account for database hosting



Git (optional, for version control)

Installation

Frontend Setup





Clone the Repository:

git clone https://github.com/your-username/companion-matcher.git
cd companion-matcher/harshapp



Install Dependencies:

npm install
npx expo install expo-router expo-image-picker @react-native-async-storage/async-storage lucide-react-native



Run the App:

npx expo start





Use Expo Go on your mobile device or an emulator to test the app.



Ensure the backend is running (see below) for API calls to work.

Backend Setup





Clone the Repository:

cd companion-matcher/userlogin



Install Dependencies:

npm install
npm install express mongoose bcryptjs dotenv cors



Configure Environment Variables:





Create a .env file in the userlogin directory:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.iiejdkx.mongodb.net/dating-app?retryWrites=true&w=majority
PORT=3000



Replace <username> and <password> with your MongoDB Atlas credentials.



Ensure your MongoDB Atlas cluster allows network access from your IP.



Run the Backend:

node server.js





The server should start on http://localhost:3000, and you’ll see a MongoDB connection message.

Usage





Launch the App:





Open the frontend in Expo Go or an emulator.



The welcome screen will appear, offering options to log in, sign up, or skip login.



Registration:





Navigate to the registration screen, fill in your details (name, age, interests, Gmail ID, password, and profile photo), and submit.



A successful registration redirects to the matches screen.



Login:





Use your registered Gmail ID and password to log in.



Successful login takes you to the matches screen.



Matches:





View and toggle shortlisted matches.



The list updates dynamically with API calls.



Guest Mode:





Skip login to access the matches screen without authentication (for demo purposes).

File Structure

companion-matcher/
├── harshapp/                  # Frontend directory
│   ├── app/
│   │   ├── _layout.tsx        # Root navigation layout
│   │   ├── welcome.tsx        # Welcome screen
│   │   ├── (auth)/
│   │   │   ├── dating-login.tsx # Login screen
│   │   │   ├── userregistration.tsx # Registration screen
│   │   ├── (tabs)/
│   │   │   ├── matches.tsx    # Matches screen
│   ├── package.json
├── userlogin/                 # Backend directory
│   ├── models/
│   │   ├── User.js           # Mongoose user model
│   ├── controllers/
│   │   ├── userController.js # User-related API logic
│   ├── routes/
│   │   ├── userRoutes.js     # API route definitions
│   ├── server.js             # Express server entry point
│   ├── package.json
├── README.md
├── .env                      # Environment variables (backend)

API Endpoints





POST /api/users





Register a new user with name, age, interests, profile photo, Gmail ID, and password.



POST /api/users/login





Authenticate a user with Gmail ID and password.



GET /api/users





Retrieve user details by name (query parameter).



PUT /api/users/shortlisted





Update the shortlisted matches for a user.
