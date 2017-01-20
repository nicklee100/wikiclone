const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: Sequelize.STRING,
  urlTitle: Sequelize.STRING,
  content: Sequelize.TEXT,
  status: Sequelize.STRING
});

const User = db.define('name', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = {
  Page: Page,
  User: User
};
