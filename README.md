# API with Node, Express, Prisma, Postgre
Using 
- Node / JavaScript
- Express
- PostgreSQL / Prisma
- Deploying on render.
- TS 

Project:  imaginary ChangeLog app - posting product updates

## Resources
- [github repo track ](https://github.com/Hendrixer/API-design-v4-course)
- [github repo track live](https://hendrixer.github.io/API-design-v4/)




## 01 - Vanilla API
Using http native module
```js
import http from "http";

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "hello" }));

    res.end();
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "nope" }));
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
```

Callback function of http
- req: gets every details request 
- res: to use to send to FE
HTTP provides an event driven architecture ( the requests made against our API )

### Why does the request did not show in the network tab XHR Request?
- because we need to explicitly call XHR / or fetch using JS
- this is just the browser making a request to load html


# API
- API is the code running in the server
- the server can be without API - an app with no visual representation
- usually servers facilitate access to DB

Required for server
- must run on an available port
- must run on an ip address


# Route
Address a server, a web site can access
- unique combination of http method and URL path
Methods: 
- GET: get information
- POST: send information ( mutation or creation )
- PUT: replace information
- PATCH: update existing information
- DELETE: delete existing information
- OPTIONS: CORS security check related - browser checking if the client can communicate with API

# Route handler
Are function handling the request matching the endpoint - the call back from the server

# API DESIGN PATTERN
( REST, rpc, GraphQL, etc ...)
Using REST Design Pattern ( representational state transfer)

# Express
- API lightweight framework commonly used otherwise new packages may rely on it.

# Status codes
- 200 to < 299: successful request
- 300 to < 399: redict responses
- 400 to < 499: user based error
- 500 to < 599: server based error

# ORM
Oriented Relation Mapping - allows to interface sql query as object
>> Is there any advantage using Mongo over Postgres,especially since Postgres stores JSON?
Before MongoDB was mainly ACID, couldn't do transaction but it is not the case anymore so,
at this stage any of them is good ( what do you prefer, which are you comfortable with )

# Prisma
Database agnostic, type safe ORM --> detects types by itself
Handles: basics to advanced queries, migrations, seeding and sophisticated writes
Tends to be the ORM choice for Node
- type-safe ORM: awareness of the schema describing when using the ORM
and can provide autocompletion when interacting with the database
- automatically autocomplete based on types 

# Setup PostGres and Prisma x Render
- postgre as a database
- prisma as postgre ORM
- render as hosting service for the database

## Setup Render
- create an account
- in dashboard > select "new +" > "PostGreSQL"
- ensure to select the free database
- fill the fields and create:
  - name: as we want
  - database: do not provide anything
  - user: do not provide anything
  - region: let the region pre-selected
  - datadog api key: do not provide anything
  - select the instance type: free
  - select create a database
- select your database : 
  - copy the external database url into your .env file as a variable to use it secretly

## Setup Prisma
Typescript + Prisma combined enables Prisma autocompletion type on the DB schema.  
This is why we download both typescript and prisma

- install TS and Prisma
> `npm i typescript ts-node @types/node prisma --save-dev`
or
> `pnpm install -D typescript ts-node @types/node prisma`

extra --> @type/express to type express

- set `tsconfig.json`
`npx tsc --init`
  - compilerOptions.strict: true
  - compilerOptions.target: "es2016", 
  - compilerOptions.lib: [ "esnext" ],
  - compilerOptions.sourcemap: true --- which can be removed in order to avoid too much errors
  - compilerOptions.outdir: "dist",

- set prisma CLI
`npx prisma init`
which will create :
  - a prisma folder
  - a schema file in that folder schema.prisma
  - follow the prompt steps
  ```txt
    Next steps:
    1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
    2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
    3. Run prisma db pull to turn your database schema into a Prisma schema.
    4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
  ```
  - if using vscode --> it is highly recommended to install prisma extension
      - gives syntax highlighting and others. ( prisma extension by prisma )

## change js files into ts
With ts and its config we can now change all the file to be ts and we can use the import syntax instead of require in node.
- modify exports `module.exports = {}` by `export {}`
- modify imports `require()` by `import {} from ''`
- add missing types
- modify package.json entry point using referring to the old js file

## extra:
  ℹ️ Note: for personal use copy and paste the files
- add types for express `@types/express`
- add nodemon.json config to run ts and watch
```json
// nodemon.json
{
  "watch": ["server"],
  "ext": "ts",
  "exec": "ts-node ./server/index.ts"
}
// package.json
{
  "start" :"rm -rf dist/ && tsc --project . && node dist/index.js",
  "dev": "nodemon ."
}
```
- add rimraf package: allows to remove folder for both windows and linux.
https://khalilstemmler.com/blogs/typescript/node-starter-project/
`pnpm install -D rimraf`
- set `build` command
