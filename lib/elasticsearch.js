if (Meteor.isClient) {
}

if (Meteor.isServer) {
	Meteor.require('colors');
	var elasticsearch = Meteor.require('elasticsearch');
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

	Router.map(function() {
		this.route('search', {
			where: 'server',
			action: function() {
				var params = this.request.query;
				var res = Meteor.call('searchItem', params.q);
				this.response.end(JSON.stringify(res));
			}
		});
	});
}
