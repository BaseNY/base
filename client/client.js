if (Meteor.isClient) {
    Meteor.subscribe("items");
    Items = new Meteor.Collection("items");
    Session.set('postState',1);
    //Move this stuff over to routing to make it easier
}
