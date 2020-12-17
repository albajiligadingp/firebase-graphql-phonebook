var { GraphQLObjectType, GraphQLList } = require('graphql')
var services = require('../../services');
var userType = require('../types/phonebook').userType;

// Query
exports.queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            phonebooks: {
                type: new GraphQLList(userType),
                resolve: services.getPhonebooks
            }
        }
    }
});