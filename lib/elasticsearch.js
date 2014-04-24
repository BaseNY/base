if (Meteor.isClient) {
	var defaultItems = function() {
		Meteor.call('createItem', {
			name: 'Shoe',
			desc: 'cool',
			price: 135.95,
			image: 'https://scontent-b-iad.xx.fbcdn.net/hphotos-prn2/1472912_392496540884825_988596881_n.jpg'
		}, function(err, res) {});
		Meteor.call('createItem', {
			name: 'Allen Edmonds',
			desc: 'black cap toe shoes',
			price: 300.95,
			image: 'http://img12.imageshack.us/img12/7812/img2852bn7.jpg'
		}, function(err, res) {});
		Meteor.call('createItem', {
			name: 'iPhone',
			desc: 'apple',
			price: 299,
			image: 'http://cdn2.vox-cdn.com/entry_photo_images/8781761/iphone5_ios7_large_verge_medium_landscape.jpg'
		}, function(err, res) {});
		Meteor.call('createItem', {
			name: 'elastic search',
			desc: 'search',
			price: 1,
			image: 'https://pbs.twimg.com/profile_images/631946075/realistic.png'
		}, function(err, res) {});
		Meteor.call('createItem', {
			name: 'Dog',
			desc: 'cute and knows tricksies',
			price: 345.12,
			image: 'http://kcen.images.worldnow.com/images/23411805_BG1.jpg'
		}, function(err, res) {});
	};
	//defaultItems();
	Template.search.items = function() {
		console.log(Session.get('sResults').hits.hits);
		return Session.get('sResults').hits.hits;
	}
	searchItem = function(searchString, callback) {
		Meteor.call('searchItem', searchString, callback);
	};
}


if (Meteor.isServer) {
	Meteor.require('colors');
elasticsearch = Meteor.require('elasticsearch');
	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'trace',
		apiVersion: '1.0',
		sniffOnStart: true,
		keepAlive: false
	});
	var indexName = 'base';

	// wrapping elasticsearch
	es = (function(client) {
		var c = Async.wrap(client, ['search', 'create']);
		_.extend(c, {
			indices: Async.wrap(client.indices, ['exists', 'create'])
		});
		return c;
	})(client);

	// initializing index
	(function(name) {
		if (!es.indices.exists({index: name})) {
			es.indices.create({index: name});
		} else {
			console.log((name + " index found").green);
		}
	})(indexName);

	Meteor.methods({
		searchItem: function(searchString) {
			return es.search({
				index: indexName,
				type: 'item',
				body: {
					query: {
						"fuzzy_like_this": {
							"like_text": searchString
						}
					}
				}
			});
		},
		createItem: function(item) {
			return es.create({
				index: indexName,
				type: 'item',
				body: item
			});
		}
	});

}
