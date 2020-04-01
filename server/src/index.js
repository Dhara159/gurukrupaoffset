const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const resolvers = require('./resolvers');
const { createStore, authorizeUser } = require('./utils');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => await authorizeUser({ req }),
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});