var { GraphQLNonNull, GraphQLString } = require('graphql')
var Phonebook = require('../types/phonebook');
var services = require('../../services');

exports.remove = {
  type: Phonebook.userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return services.deletePhonebook(params);
  }
}