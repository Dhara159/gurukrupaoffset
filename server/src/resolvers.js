const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    users: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allUsers = await dataSources.userAPI.fetchUsers();
      allUsers.reverse();
      const users = paginateResults({
        after,
        pageSize,
        results: allUsers
      });
      return {
        users,
        cursor: users.length ? users[users.length - 1].cursor : null,
        hasMore: users.length ? users[users.length - 1].cursor !== allUsers[allUsers.length - 1].cursor : false
      }
    },
    user: (_, { id }, { dataSources }) => dataSources.userAPI.fetchUserById({ id })
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findUser({ email });
      if (user) return Buffer.from(email).toString('base64');
    }
  }
}