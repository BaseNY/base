Meteor._ensure(Meteor, 'settings', 'public');

ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
if (Meteor.settings.public.debug) {
	ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: '664363396976522',
		secret: '18380703d340e5c4725e03992dfbf27d'
	});
} else {
	ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: '655164321229763',
		secret: '8f0efa53e0417109a6d9f28226df89c0'
	});
}
