Notifications = new Meteor.Collection('notifs');

/*
 * prototypes
 *
 * |someone comments on your post|
 * type: 1
 * commenters: [name1, name2, name3, ...]
 * userId: _id
 * postId: _id
 * postName: -name-
 * read: false
 * "Name1, Name2 and -x- others commented on your post: Really Cool Shoes"
 *
 * |someone comments on a post you commented on|
 * type: 2
 * commenters: [name1, name2, name3, ...]
 * postID: _id
 * read: false
 */
