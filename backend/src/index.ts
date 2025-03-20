import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { serveStatic } from 'hono/serve-static';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();
app.use('/*', cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

app.get("/", (c) => {
  return c.html(`
    <html>
    <head>
      <title>API Documentation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
        h1, h2, h3 { color: #333; }
      </style>
    </head>
    <body>
      <h1>API Documentation</h1>
      <h2>Base URL</h2>
      <pre>https://medium-backend.kathokeyash68.workers.dev//api/v1</pre>

      <h2>Authentication</h2>
      <p>All protected routes require an Authorization header with a valid JWT token.</p>
      <pre>Authorization: Bearer &lt;token&gt;</pre>

      <hr>

      <h2>User Routes</h2>

      <h3>Signup</h3>
      <pre>
        POST /api/v1/user/signup
        Request Body:
        {
          "email": "user@example.com",
          "password": "securepassword"
        }
        Response:
        {
          "token": "your-jwt-token"
        }
      </pre>

      <h3>Signin</h3>
      <pre>
        POST /api/v1/user/signin
        Request Body:
        {
          "email": "user@example.com",
          "password": "securepassword"
        }
        Response:
        {
          "token": "your-jwt-token"
        }
      </pre>

      <hr>

      <h2>Blog Routes</h2>

      <h3>Get All Posts (Protected)</h3>
      <pre>
        GET /api/v1/blog/bulk
        Headers:
        Authorization: Bearer &lt;token&gt;
        Response:
        {
          "posts": [
            {
              "id": "1",
              "title": "Sample Title",
              "content": "Sample Content",
              "author_id": "123"
            }
          ]
        }
      </pre>

      <h3>Get Single Post (Protected)</h3>
      <pre>
        GET /api/v1/blog/:id
        Headers:
        Authorization: Bearer &lt;token&gt;
        Response:
        {
          "post": {
            "id": "1",
            "title": "Sample Title",
            "content": "Sample Content",
            "author_id": "123"
          }
        }
      </pre>

      <h3>Create a New Post (Protected)</h3>
      <pre>
        POST /api/v1/blog/
        Headers:
        Authorization: Bearer &lt;token&gt;
        Request Body:
        {
          "title": "New Blog Post",
          "content": "This is the content of the new post."
        }
        Response:
        {
          "id": "1"
        }
      </pre>

      <h3>Update a Post (Protected)</h3>
      <pre>
        PUT /api/v1/blog/
        Headers:
        Authorization: Bearer &lt;token&gt;
        Request Body:
        {
          "id": "1",
          "title": "Updated Title",
          "content": "Updated Content"
        }
        Response:
        {
          "id": "1"
        }
      </pre>

      <hr>

      <h2>Error Responses</h2>
      <ul>
        <li><strong>401 Unauthorized</strong> - Invalid or missing JWT token.</li>
        <li><strong>403 Forbidden</strong> - Unauthorized access.</li>
        <li><strong>404 Not Found</strong> - Resource not found.</li>
        <li><strong>500 Internal Server Error</strong> - Something went wrong on the server.</li>
      </ul>

      <hr>

      <h2>Notes</h2>
      <ul>
        <li>All API responses are in JSON format.</li>
        <li>JWT token is required for all <code>/api/v1/blog/*</code> routes.</li>
        <li>Use <code>signup</code> to create a new user and <code>signin</code> to obtain a token for authentication.</li>
      </ul>
    </body>
    </html>
  `);
});




export default app
