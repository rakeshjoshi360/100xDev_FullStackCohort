# CoursEd.- E-Learning Web Application

CoursEd. is a full-stack course selling and purchasing web application designed to manage and deliver online courses. It provides an intuitive user interface for both administrators and users. The app employs the MERN stack, JWT for authentication, and Material UI for styling, ensuring a seamless and visually appealing e-learning experience.

## Key Features

- **User Authentication:** Secure user login and registration using JSON Web Token (JWT).
- **Course Management:** Admins can perform CRUD operations on courses, including adding, updating, and deleting courses.
- **Course Catalog:** Users can browse through a comprehensive list of available courses, viewing essential details for each course.
- **Course Purchase:** Users can easily purchase the course to access them later.
- **User Dashboard:** After purchasing a course, users gain access to a personalized dashboard, tracking their enrolled courses.

## Tech Stack

- **Frontend:** React with Material UI for styling.
- **Backend:** Node.js with Express.
- **Database:** MongoDB for storing course and user-related data.
- **Authentication:** JSON Web Token (JWT) for secure user authentication.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your_username/CourseEd..git
   cd Project-\ Course-Selling-WebApp
2. **Install dependencies for both frontend and backend:**
    ```bash
    cd admin-client
    npm install
    cd ..
    cd server
    npm install
3. **Set Up Environment variables:**
    - **Copy the `env.template` file:**
        ```bash
        cp env.template .env
    - **Setup the .env file:**
        1. Open the `.env` in text editor:
            ```bash
            vi nano .env
        2. Replace the placeholder values with your actual database credentials.(MongoDB username,password; JWT admin secret, user secret; Port)
        3. Save the `.env` file
    - Update `BASE_URL` in `/admin-client/cofig.js` accordingly.

4. **Start the development server:**
    ```bash
    node index.js
    cd ..
    cd admin-client
    npm run dev

5. Open your browser and visit `http://localhost:5173/` to access the application. And the backend is running on the Port from `.env` or 3000(default).

## Future Enhancements

- Implement search functionality for courses based on keywords or categories.
- Integrate a recommendation system to suggest courses based on user interests.
- Create discussion forums to foster interaction between users and instructors.
- Add a notification system for course updates and announcements.

## Contributions

Contributions to Coursify are welcome! If you find any issues or have ideas for enhancements, please feel free to open an issue or submit a pull request.

## Acknowledgments

- **Material UI:** For providing a beautiful and responsive UI.
- **JWT:** For secure user authentication.

## Demo

It is live at Vercel: [CoursEd. Demo]("https://course-ed.vercel.app")