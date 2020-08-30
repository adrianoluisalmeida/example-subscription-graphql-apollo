import express from 'express';
import { createServer } from 'http';
import { PubSub } from 'apollo-server';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const pubsub = new PubSub();
const MESSAGE_CREATED = 'MESSAGE_CREATED';

const typeDefs = gql`
  type Query {
    messages: [Message!]!
  }

  type Subscription {
    messageCreated: Message
  }

  type Mutation {
    messageCreate(content: String) : Message
  }

  type Message {
    content: String
  }
`;

const resolvers = {
  Query: {
    messages: () => [
      { content: 'Hello!' },
      { content: 'Bye!' },
    ],
  },
  Mutation: {
    messageCreate: (root, args) => {
      pubsub.publish(MESSAGE_CREATED, {
        messageCreated: { content: args.content },
      });
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});