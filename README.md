# Blog API

A REST API designed to power a dual-frontend blogging platform: one frontend is for writing, editing and publishing posts, while the other is for reading and commenting on posts.

Built with Node.js, Express, PostgreSQL, and Prisma ORM, this API uses JWT authentication to ensure security.

https://blog-api-lld2.onrender.com/

---

## Features

- **Dual-Role Authorization:** Dedicated workflows for `AUTHOR` and `READER` accounts.
- **Secure Authentication:** Stateless session management via JSON Web Tokens (JWT) and Passport.js.
- **Comprehensive Post CRUD:** Authors can create, read, update and delete articles.
- **Engagement/Feedback System:** Users can write comments.
- **Content Moderation:** Deletion capabilities extended to both the comment creator and the parent post author.

---

## Tech Stack

- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database Driver & ORM:** Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Passport.js (JWT Strategy) & bcryptjs (Password Hashing)
- **Input Validation:** express-validator

---

## API Reference & Endpoints

### Authentication & Profiles

| Method  | Endpoint      | Access    | Description                                         |
| ------- | ------------- | --------- | --------------------------------------------------- |
| `POST`  | `/users`      | Public    | Registers a new account (Defaults to `READER`).     |
| `POST`  | `/login`      | Public    | Authenticates credentials and returns a signed JWT. |
| `PATCH` | `/users/role` | Protected | Updates a user's role status.                       |

### Articles & Posts

| Method   | Endpoint     | Access      | Description                                                          |
| -------- | ------------ | ----------- | -------------------------------------------------------------------- |
| `GET`    | `/posts`     | Public      | Retrieves a listing of all published articles.                       |
| `GET`    | `/posts/:id` | Public      | Retrieves a specific article by its unique ID.                       |
| `POST`   | `/posts`     | Author Only | Creates a new article (defaults to draft format).                    |
| `PATCH`  | `/posts/:id` | Post Owner  | Updates parts of an article (title, content, or publication status). |
| `DELETE` | `/posts/:id` | Post Owner  | Removes an article and all of its associated comments.               |

### Comments System

| Method   | Endpoint              | Access        | Description                                                                |
| -------- | --------------------- | ------------- | -------------------------------------------------------------------------- |
| `POST`   | `/posts/:id/comments` | Authenticated | Appends a new comment to an article.                                       |
| `DELETE` | `/comments/:id`       | Authorized    | Deletes a comment (accessible by the comment creator and the post author). |

---

## Installation & Local Setup

### 1. Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or hosted via a cloud provider like Supabase)

### 2. Clone the Repository

```bash
git clone https://github.com/nzubeifechukwu/blog-api.git
cd blog-api

```

### 3. Install Dependencies

This project uses the `npm` package manager.

```bash
npm install

```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of your project and configure the template below:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"

```

### 5. Run Database Migrations

Synchronize your local PostgreSQL database with the Prisma Schema blueprints and establish relationship constraints:

```bash
npx prisma migrate dev --name init_blog_schema

```

### 6. Start the Server

To spin up the server with hot-reloading for development:

```bash
node --watch app.js

```

The server will boot up and listen for requests on `http://localhost:10000`.

---

## Quick Test Script

You can verify your endpoints locally using `curl`. Examples are given below for a few endpoints and methods.

### Edit an existing post (PATCH):

```bash
curl -X PATCH http://localhost:10000/posts/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Article Title", "published": true}'

```

### Delete a comment (DELETE):

```bash
curl -X DELETE http://localhost:10000/comments/5 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

```

---

## Inspiration

This [Blog API project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api) is part of the The Odin Project's [Full-Stack Web Development (JavaScript) path](https://www.theodinproject.com/paths/full-stack-javascript).

---

## Contact

You can reach me on [X](https://x.com/NzubeIfechukwu) or [LinkedIn](https://www.linkedin.com/in/nzubeifechukwu/).
