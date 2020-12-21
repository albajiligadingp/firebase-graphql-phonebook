var { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')
var services = require('../../services');
var userType = require('../types/phonebook').userType;
const PaginationArgType = require('../types/paginationParam');
const PaginatedListType = require('../types/paginationOutput');

// Query
exports.queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            phonebooks: {
                type: new GraphQLList(userType),
                args: {
                    name: { type: GraphQLString },
                    phone: { type: GraphQLString },
                    pagination: {
                        type: PaginationArgType,
                        defaultValue: { offset: 0, limit: 3 }
                    },
                },
                resolve: services.getPhonebooks
            }
        }
    }
});