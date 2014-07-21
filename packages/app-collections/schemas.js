Debug.order('app-collections/schemas.js')

Schemas = {}

Schemas.autoValue = {
	// value can also be a function
	// in which case it will be evaluated and the result will be used as the value
	insert: function(context, value, preventUpdate) {
		if ((context.isInsert || context.isUpsert) && _.isFunction(value)) {
			value = value.call(context);
		}
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
