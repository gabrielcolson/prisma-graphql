# Prisma-GraphQL
Boilerplate for GraphQL API made for the
[utopia boilerplate generator](https://github.com/gabrielcolson/utopia)


## Usage
This boilerplate is meant to be used with [utopia](https://github.com/gabrielcolson/utopia):
```bash
go get -u github.com/gabrielcolson/utopia
utopia mySuperNewProject https://github.com/gabrielcolson/prisma-graphql.git
```


## Getting started
First, you will need to setup your environment. You can use
[direnv](https://direnv.net/):
```bash
cp .envrc.example .envrc
direnv allow
```

You will also need a PostgreSQL database. Here is how you can setup one
using [docker](https://www.docker.com/):
```bash
docker run                          \
    --name db                       \
    -e POSTGRES_PASSWORD=postgres   \
    -e POSTGRES_USER=postgres       \
    -p 5432:5432                    \
    -d                              \
    postgres
```

Then, create a new model in `schema.prisma`. Here is an example:
```graphql
# prisma/schema.prisma
# ...

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

Save and apply the migration to your database:
```bash
npm install
npm run db:migrate:save
npm run db:migratet:up
```

Run the development server:
```bash
npm run dev
```

Now, you are good to go! Your [local GraphQL Playground](http://localhost:4000/graphql)
should be up. Enjoy!
