Meteor.subscribe('items');

if (Meteor.isClient) {
    Session.set('postState',1);
    //Move this stuff over to routing to make it easier
}
