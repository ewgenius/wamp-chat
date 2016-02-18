import express from 'express';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import graphqlHTTP from 'express-graphql';

let PORT = process.env.PORT || 3000;
let app = express();

var userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
  }
});

var data = {
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Lee"
  },
  "3": {
    "id": "3",
    "name": "Nick"
  }
};

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: {
            type: GraphQLString
          }
        },
        resolve: function(_, args) {
          return data[args.id];
        }
      }
    }
  })
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true
}));

let server = app.listen(PORT, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`GraphQL listening at http://${host}:${port}`);
})
