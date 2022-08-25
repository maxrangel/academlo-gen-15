// Import http library
const http = require('http');

// Dummy data
const users = [
  { id: 1, name: 'Max', age: 23 },
  { id: 2, name: 'John', age: 24 },
  { id: 3, name: 'Joe', age: 25 },
];

const posts = [
  { id: 1, title: 'Post 1', content: 'This is post 1' },
  { id: 2, title: 'Post 2', content: 'This is post 2' },
  { id: 3, title: 'Post 3', content: 'This is post 3' },
];

// Create HTTP server
const server = http.createServer((request, response) => {
  // const url = request.url
  // const method = request.method
  const { url, method } = request;

  // Set response content type header
  response.setHeader('Content-Type', 'application/json');

  // GET /users -> Return users array
  if (method === 'GET' && url === '/users') {
    response.write(JSON.stringify(users));
  } else if (method === 'GET' && url === '/posts') {
    // GET /posts -> Return posts array
    response.write(JSON.stringify(posts));
  } else {
    // Return error message
    response.write(
      JSON.stringify({
        message: `${method} ${url} does not exists in our server`,
      })
    );
  }

  // End the response
  response.end();
});

// Listen on localhost:4000
server.listen(4000);
