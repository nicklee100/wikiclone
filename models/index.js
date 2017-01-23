const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');




const Page = db.define('page', {
    title: {
        type: Sequelize.STRING, allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        get: function(){
            var title = this.getDataValue(title)
            return '/wiki/'+title;
        }
    },

    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
   //  dateCreated: {
   //     type: Sequelize.DATE,
   //     defaultValue: Sequelize.NOW
   // }
});

Page.hook('beforeValidate', function (page,options) {
  if (page.title) {
     var title = page.title;
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    page.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    page.urlTitle = Math.random().toString(36).substring(2, 7);
  }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};
