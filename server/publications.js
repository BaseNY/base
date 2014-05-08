Meteor.publish('items', function(selector, options) {
	if (!selector) {
		selector = {};
	}
        if(!options) {
                options = {};
        }
	return Items.find(selector, options);
});

Meteor.publish('offers', function(selector, options) {
	if (!selector) {
		selector = {};
	}
	return Offers.find(selector);
});

Meteor.publish('messages', function(selector, options) {
	if (!selector) {
		selector = {};
	}
	return Messages.find(selector);
});

Meteor.publish('ftoi', function(limit, id) {
	if (id) {
		if (id[0] == '@')
			return FtoI.find({
				sellerId: id.substring(1)
			}, {
				sort: {
					score: -1
				},
				limit: limit
			});
		else
			return FtoI.find({
				feedId: id
			}, {
				sort: {
					score: -1
				},
				limit: limit
			});
	} else
		return FtoI.find({}, {
			sort: {
				score: -1
			},
			limit: limit
		});
});

Meteor.publish('ftoItems', function(limit, id) {
	filter = {};
	if (id) {
		if (id[0] == '@') {
			filter = {sellerId: id.substring(1)};
		} else {
			filter = {feedId: id};
		}
	}

	console.log(filter);

	return Meteor.publishWithRelations({
		handle: this,
		collection: FtoI,
		filter: filter,
		options: {
			sort: {score: -1},
			limit: limit
		},
		mappings: [{
			key: 'itemId',
			collection: Items
		}]
	});
});

Meteor.publish('feeds', function() {
	return Feeds.find();
});

Meteor.publish('userData', function() {
	return Meteor.users.find({
		_id: this.userId
	}, {
		fields: {
			'profile': 1,
			'_id': 1,
			'new_message': 1
		}
	});
});
Meteor.publish('allUserData', function() {
	return Meteor.users.find({}, {
		fields: {
			'profile': 1,
			'_id': 1
		}
	});
});
