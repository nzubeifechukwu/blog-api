# Blog API

A secure, RESTful API designed to power a dual-frontend blogging platform featuring separate dashboards for **Authors** (to write and manage content) and **Readers** (to consume content and leave feedback).

Built with Node.js, Express, PostgreSQL, and Prisma ORM, this API uses JWT authentication and structured authorization layers to ensure strict content security.

---

## 🚀 Features

- **Dual-Role Authorization:** Dedicated workflows for `AUTHOR` and `READER` accounts.
- **Secure Authentication:** Stateless session management via JSON Web Tokens (JWT) and Passport.js.
- **Comprehensive Post CRUD:** Authors can create, read, update (via dynamic `PATCH` endpoints), and delete articles.
- **Nested Engagement System:** Structured reader interactions allowing users to write and manage comments.
- **Advanced Content Moderation:** Deletion capabilities extended to both the comment creator and the parent post author.
- **Relational Integrity:** Built-in PostgreSQL cascading deletes (`onDelete: Cascade`) to seamlessly clear orphaned data when posts are deleted.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database Driver & ORM:** Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Passport.js (JWT Strategy) & bcryptjs (Password Hashing)

---

## 📋 API Reference & Endpoints

### Authentication & Profiles

| Method  | Endpoint         | Access    | Description                                         |
| ------- | ---------------- | --------- | --------------------------------------------------- |
| `POST`  | `/auth/register` | Public    | Registers a new account (Defaults to `READER`).     |
| `POST`  | `/auth/login`    | Public    | Authenticates credentials and returns a signed JWT. |
| `PATCH` | `/users/role`    | Protected | Upgrades/downgrades a user's role status.           |

### Articles & Posts

| Method   | Endpoint     | Access      | Description                                                                      |
| -------- | ------------ | ----------- | -------------------------------------------------------------------------------- |
| `GET`    | `/posts`     | Public      | Retrieves a listing of all **published** articles.                               |
| `GET`    | `/posts/:id` | Public      | Retrieves a specific article by its unique ID.                                   |
| `POST`   | `/posts`     | Author Only | Creates a new article (defaults to draft format).                                |
| `PATCH`  | `/posts/:id` | Post Owner  | Dynamically updates parts of an article (title, content, or publication status). |
| `DELETE` | `/posts/:id` | Post Owner  | Permanently removes an article and all of its associated comments.               |

### Comments System

| Method   | Endpoint                  | Access        | Description                                                                |
| -------- | ------------------------- | ------------- | -------------------------------------------------------------------------- |
| `POST`   | `/posts/:postId/comments` | Authenticated | Appends a new reader comment to a specific article.                        |
| `DELETE` | `/comments/:commentId`    | Authorized    | Deletes a comment. (Accessible by the comment creator OR the post author). |

---

## ⚙️ Installation & Local Setup

### 1. Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or hosted via a cloud provider like Supabase)

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api

```

### 3. Install Dependencies

This project uses the `npm` package manager exclusively. Do not generate or mix with a `yarn.lock` file.

```bash
npm install

```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of your project and configure the template below:

```env
PORT=10000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"

```

### 5. Run Database Migrations

Synchronize your local PostgreSQL database with the Prisma Schema blueprints and establish relationship constraints (including cascade rules):

```bash
npx prisma migrate dev --name init_blog_schema

```

### 6. Start the Server

To spin up the server with hot-reloading for development:

```bash
npm run dev

```

The server will boot up and listen for requests on `http://localhost:10000`.

---

## 🧪 Quick Test Script

You can verify your endpoints locally using `curl`.

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
