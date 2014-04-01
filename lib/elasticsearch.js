Meteor.require('colors');

if (Meteor.isServer) {
	var elasticsearch = Meteor.require('elasticsearch');
	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'trace',
		apiVersion: '1.1',
		sniffOnStart: true
	});

	es = (function(client) {
		var c = Async.wrap(client, ['search', 'create']);
		_.extend(c, {
			indices: Async.wrap(client.indices, ['exists', 'create'])
		});
		return client;
	})(client);

	var initializeIndex = function(name) {
		if (!es.indices.exists({index: name})) {
			es.indices.create({index: name});
		} else {
			console.log((name + " index found").green);
		}
	};
	initializeIndex('base');
}

if (Meteor.isClient) {
}
