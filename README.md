🚀 Lear2Code

Lear2Code is a modern web-based platform designed for sharing skills, learning, and connecting with peers. It combines features of social media with course management, ideal for learners, educators, and professionals.
🔑 Core Features

    User Authentication – Secure registration & login with role-based access.

    Profile Management – Custom user profiles and search functionality.

    Follow System – Follow/unfollow users, view followers & following.

    Dashboard Feed – Post updates, view content from followed users.

    Course Management – Create, update, and manage educational content.

🧰 Tech Stack

    Backend: Spring Boot (Java)

    Database: MySQL / PostgreSQL

    Auth: JWT (JSON Web Tokens)

    API: RESTful APIs

    Frontend: Compatible with React, Angular, or Vue

    Tools: Git, GitHub

🛠️ Setup Instructions

    Clone the Repo

git clone https://github.com/SayumiNelithma/Learn2Code
cd skillshare-platform

Configure Environment

    Rename .env.example to .env and update:

    DB_URL=jdbc:mysql://localhost:3306/skillshare_db
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    JWT_SECRET=your_secret_key

Build & Run

    mvn clean install
    mvn spring-boot:run

🔌 API Overview
Function	Endpoint
Register/Login	/auth/register, /auth/login
Profile	/users/profile/{id}
Follow	/follow/{userId}
Feed & Posts	/dashboard/feed/{userId}
Courses	/courses/{courseId}

For full documentation, refer to the docs/ folder (if included).
🤝 Contributing

    Fork → Create Branch → Commit → Push → Pull Request

    Use meaningful commit messages.

    Follow clean code practices.
