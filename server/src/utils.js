const SQL = require('sequelize');
const isEmail = require('isemail');

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('gurukrupaoffset', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
  });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: SQL.STRING,
      allowNull: false
    },
    email: {
      type: SQL.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    contact_number: {
      type: SQL.STRING,
      allowNull: false,
    },
    address: {
      type: SQL.STRING,
      allowNull: false,
    },
    gstin: {
      type: SQL.STRING,
      allowNull: true,
    },
    password: {
      type: SQL.STRING,
      allowNull: false,
    },
    active: {
      type: SQL.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: SQL.DATE,
      allowNull: false
    },
    updated_at: {
      type: SQL.DATE,
      allowNull: false
    }
  });

  users.removeAttribute('createdAt');
  users.removeAttribute('updatedAt');
  // users.sync({ force: true });
  return { users };
};


module.exports.authorizeUser = async ({ req }) => {
  const auth = req.headers && req.headers.authorization || '';
  const email = Buffer.from(auth, 'base64').toString('ascii');
  if (!isEmail.validate(email)) return { user: null };

  const users = await store.users.findAll({ where: email });
  const user = users && users[0] || null;

  return { user: { ...user.dataValues } };
};