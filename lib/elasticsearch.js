if (Meteor.isClient) {
	searchItem = function searchItem(search, callback) {
		Meteor.call('searchItem', search, callback);
	}
}

if (Meteor.isServer) {
	var elasticsearch = Meteor.require('elasticsearch');
	var client = new elasticsearch.Client({
		host: 'localhost:9200'
		, log: 'trace'
		, apiVersion: '1.1'
		, sniffOnStart: true
	});

	Meteor.methods({
		'searchItem': function searchItem(search) {
			var items = Async.runSync(function(done) {
				client.search({
					index: 'items'
					, body: {
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
			return items.result;
		}
		, 'addItem': function addItem(item) {
			
		}
	});
}