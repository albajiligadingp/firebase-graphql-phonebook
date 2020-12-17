var { GraphQLNonNull, GraphQLID } = require('graphql')
var Phonebook = require('../types/phonebook');
var services = require('../../services');

exports.remove = {
  type: Phonebook.userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    return services.deletePhonebook(params);
  }
}