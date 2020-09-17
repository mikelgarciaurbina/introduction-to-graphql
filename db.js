import _ from 'lodash';
import faker from 'faker';
import Sequelize from 'sequelize';

const db = new Sequelize('graphql', null, null, {
  dialect: 'sqlite',
  storage: './graphql.sqlite',
  logging: true,
});

const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
  lastname: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
});

const ArticleModel = db.define('article', {
  description: { type: Sequelize.STRING },
  title: { type: Sequelize.STRING },
});

UserModel.hasMany(ArticleModel);
ArticleModel.belongsTo(UserModel);

const USERS = 4;
const ARTICLES_PER_USER = 3;

faker.seed(123);
db.sync({ force: true }).then(() => (
  _.times(USERS, () => (
    UserModel.create({
      email: faker.internet.email(),
      lastname: faker.lorem.words(3),
      name: faker.lorem.words(3),
      username: faker.internet.userName(),
    }).then((user) => (
      _.times(ARTICLES_PER_USER, () => (
        user.createArticle({
          description: faker.lorem.words(30),
          title: faker.lorem.words(5),
        })
      ))
    ))
  ))
));

const Article = db.models.article;
const User = db.models.user;

export { Article, User };
