## Phonebook Backend Exercise 3.9

Execute the hot reload testing env with ``node_modules/.bin/nodemon index.js`` OR ``npm run dev``.


## How does it work

- `../phonebook-frontend/dist` contains all the production code (built with `npm run build`-)
- Middleware `express.static('../phonebook-frontend/dist')` matches urls against files in that folder.

    Because it's a middleware, it will superede all hardcoded urls in `index.js`.

    The idea is basically that the middleware matches the frontend files, and then the front-end calls the API.