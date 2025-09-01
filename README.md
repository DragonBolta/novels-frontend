# 📖 Novels Frontend

A React-based web application for browsing, searching, and reading novels. Connects to the Novels API backend.

**Repository:** [DragonBolta/novels-frontend](https://github.com/DragonBolta/novels-frontend)

## 🚀 Features

- 🔎 Browse novels by title, author, and tags
- 🏷 Include or exclude tags with flexible search
- 📑 Table of contents for chapters
- 🌙 Responsive design with light/dark mode and NSFW toggle

## 🛠 Tech Stack

- 🖥 Frontend: React, TypeScript, Mantine UI, Tailwind CSS
- ⚡ Backend: Connects to Novels API
- 🐳 Deployment: Docker

## 🐳 Run with Docker (Recommended)

Pull and run the latest frontend image:

    # Pull the latest frontend image
    docker pull alvin1212/novels:frontend-latest

    # Run the container
    docker run -d -p 80:80 --name novels-frontend alvin1212/novels:frontend-latest

- 🌐 Frontend is available at [http://localhost](http://localhost)

Stop and remove the container:

    docker stop novels-frontend
    docker rm novels-frontend

> ⚠️ Make sure the backend container is running so the frontend can fetch data.

## 💻 Local Development

To run the frontend locally:

    # Clone the repository
    git clone https://github.com/DragonBolta/novels-frontend.git
    cd novels-frontend

    # Install dependencies
    npm install

    # Configure environment variables (e.g., backend API URL)
    npm start

## 🌐 Backend

The frontend fetches data from the **Novels API**: [DragonBolta/novels-api](https://github.com/DragonBolta/novels-api)
