# Technical case solution for the Fullstack developer role at Double V Partners

## Prerequisites
1. You must have Docker installed.

## Steps to execute apps:

1. Clone this repository.
2. On the root folder, run `docker-compose up --build ` command.
3. When all services are up, go to `http://localhost:3000` or `127.0.0.1:3000` in your browser.
4. Done.

# API DOCS

For this case, some REST API endpoints were created.

* The first endoint is a `GET` request to `/api/users`, which queries the GitHub public api to retrieve user, limited to the first 10 results.
* The second endpoint is a `GET` request to `/api/users/search?q={USERNAME}`, which is used to query for a specific GitHub user.
* The third endpoint is a `POST` request to `/api/db/users` which lets you save the user in a local databse (postgres). The required information for this endpoint is: `login (username), GitHub's ID, avatar_url`, for example
`{
    "login": "e-jigsaw",
    "id": 557961,
    "avatar_url": "https://avatars.githubusercontent.com/u/557961?v=4"
}`
* The last endpoint is a `GET` request to `/api/db/users` which returns all the users saved locally in the database.
