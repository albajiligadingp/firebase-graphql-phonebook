var { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')
var Phonebook = require('../types/phonebook');
var services = require('../../services');

exports.update = {
  type: Phonebook.userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return services.updatePhonebook(params)
  }
}