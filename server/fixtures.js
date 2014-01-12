if (Items.find().count() === 0) {
	Items.insert({
		name: 'Jesus Toaster',
		seller: 'Jesus',
		price: 10000
	});
	Items.insert({
		name: 'Shoes',
		seller: 'Amazon',
		price: 42
	});
	Items.insert({
		name: 'Github',
		seller: 'Github',
		price: 19.99
	});
	Items.insert({
		name: 'Stuff',
		seller: 'Somebody',
		price: 5922
	});
}
