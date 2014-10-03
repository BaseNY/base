Debug.order('app-collections/schemas.js')

Schemas = {}

Schemas.autoValue = {
	insert: function(context, value, preventUpdate) {
		if (context.isInsert) {
			return value;
		} else if (context.isUpsert) {
			return {$setOnInsert: value};
		} else if (preventUpdate) {
			context.unset();
		}
	}
};


Schemas.defaults = {
	_id: {
		label: 'Id',
		type: String
	},
	createdAt: {
		label: 'Created At',
		type: Date,
		autoValue: function() {
			return Schemas.autoValue.insert(this, new Date);
		}
	}
};
