const { ApolloServer } = require("apollo-server-express");

const expressApp = require("./src/app");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({
    app: expressApp,
    cors: true,
  });

  expressApp.listen(4000, () => {
    console.log("Server ready at http://localhost:4000");
    console.log("Graphql Server ready at http://localhost:4000/graphql");
  });
};

startServer();
