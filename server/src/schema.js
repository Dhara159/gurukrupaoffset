const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    address: String
    gstin: String
    contact_number: String
  }

  type Query {
    users(
      pageSize: Int
      after: String
    ): LaunchConnection!
    user(id: ID!): User
    me: User
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    users: [User]
  }

  type Mutation {
    login(email: String): String
  }
`;

module.exports = typeDefs;