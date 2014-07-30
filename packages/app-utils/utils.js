Debug.order('app-utils/utils.js');

Meteor.isLoggedIn = function() {
    return !!Meteor.userId();
};
