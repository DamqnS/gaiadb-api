# API server using Nodejs and Expressjs

Basic server that allows CRUD operations against a MongoDB

https://localhost:5000

## Setup

```sh
npm install
```

\*\*Make sure to update `.env` with your database URI.

## Start server

```sh
cd server
npm start
```

## Document schema

### Required fields

| Field       | Type    | Required |
| ----------- | ------- | -------- |
| name        | String  | yes      |
| class       | String  | yes      |
| type        | String  | yes      |
| rarity      | String  | yes      |
| level       | Number  | yes      |
| description | Strinig | no       |
| skills      | Object  | no       |
| stats       | Array   | no       |

## API endpoints

- POST new item '/api/items'
- GET all items '/api/items'
- GET single item '/api/items/:id'
- GET specific item from query param '/api/items?`param=*`'
- DELETE single item '/api/items/:id

## Query parameters

- `?search= ` **-** to search by name
- `?class= ` **-** to search by class
- `?type= ` **-** to search by type
- `?rarity= ` **-** to search by rarity