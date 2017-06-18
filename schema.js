import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  // GraphQLNonNull,
} from 'graphql';
import { /* Article ,*/ User } from './db';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    email: {
      type: GraphQLString,
    },
    lastname: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    // articles: {
    //   type: new GraphQLList(ArticleType),
    //   resolve: parent => (
    //     parent.getArticles()
    //   ),
    // },
  }),
});

// const ArticleType = new GraphQLObjectType({
//   name: 'Article',
//   description: 'This represents a Article',
//   fields: () => ({
//     id: {
//       type: GraphQLInt,
//     },
//     title: {
//       type: GraphQLString,
//     },
//     description: {
//       type: GraphQLString,
//     },
//     user: {
//       type: UserType,
//       resolve: article => (
//         article.getUser()
//       ),
//     },
//   }),
// });

const UsersQuery = {
  type: new GraphQLList(UserType),
  args: {},
  resolve: () => (
    User.findAll()
  ),
};

// const ArticlesQuery = {
//   type: new GraphQLList(ArticleType),
//   args: {},
//   resolve: () => (
//     Article.findAll()
//   ),
// };

// const addArticleQuery = {
//   type: ArticleType,
//   args: {
//     title: {
//       type: new GraphQLNonNull(GraphQLString),
//     },
//     description: {
//       type: GraphQLString,
//     },
//     user_id: {
//       type: new GraphQLNonNull(GraphQLInt),
//     },
//   },
//   resolve: async (parent, args) => {
//     const user = await User.findOne({ where: { id: args.user_id } });
//     const article = await user.createArticle({
//       title: args.title,
//       description: args.description,
//     });
//
//     return article;
//   },
// };

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      users: UsersQuery,
      // articles: ArticlesQuery,
    }),
  }),
  // mutation: new GraphQLObjectType({
  //   name: 'Mutations',
  //   fields: () => ({
  //     addArticle: addArticleQuery,
  //   }),
  // }),
});

export default Schema;
