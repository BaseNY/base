if (Meteor.isServer) {
	var elasticsearch = Meteor.require('elasticsearch');
	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'trace',
		apiVersion: '1.1',
		sniffOnStart: true
	});
	Async.runSync(function(done) {
		client.indices.exists({
			index: 'base'
		}, function(error, response) {
			if (error) {
				console.error(error);
			} else if (!response) {
				client.indices.create({
					index: 'base'
				}, function(error, response) {
					done(error, response);
				});
			}
		});
	});

	Meteor.methods({
		'searchItem': function(search) {
			var items = Async.runSync(function(done) {
				client.search({
					index: 'base',
					type: 'item',
					body: {
						query: {
							query_string: {
								query: search
							}
						}
					}
				}, function(error, response) {
					done(error, response);
				});
			});
			console.log(items.result);
			return items.result;
		},
		'addItem': function(item) {
			var items = Async.runSync(function(done) {
				client.create({
					index: 'base',
					type: 'item',
					body: item
				}, function(error, response) {
					done(error, response);
				});
			});
			return items.result;
		}
	});
}

if (Meteor.isClient) {
	/*
	searchItem = function(search, callback) {
		Meteor.call('searchItem', search, callback);
	};*/
	console.log(Meteor.call('searchItem', 'test'));
}
