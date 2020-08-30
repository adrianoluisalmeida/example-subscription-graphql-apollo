# Example-subscription-graphql-apollo

Practical tests using apollo and graphql

### Server

* `cd server`
* `npm install`
* `npm start`

### Client

* `cd client`
* `npm install`
* `npm start`
* running `http://localhost:3000`


### Send messages with mutation in playground: http://localhost:8000

```graphql
# Write your query or mutation here
mutation {
  messageCreate(content: "teste"){
    content
  }
}
```


