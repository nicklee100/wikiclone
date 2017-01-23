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
            var title = this.getDataValue(urlTitle)
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
