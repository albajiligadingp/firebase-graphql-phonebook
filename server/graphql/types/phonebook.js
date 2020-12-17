const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
} = require('graphql')


// User Type
exports.userType = new GraphQLObjectType({
    name: 'phonebook',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            phone: {
                type: GraphQLString
            }
        }
    }
});