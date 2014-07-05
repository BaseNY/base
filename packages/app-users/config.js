Meteor._ensure(Meteor, 'settings', 'public');

ServiceConfiguration.configurations.remove({
	service: 'facebook'
});
if (Meteor.settings.public.debug) {
	ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: "1423364661284723",
		secret: "940d8ca3eb8615602879739ade1201d4"
	});
} else {
	ServiceConfiguration.configurations.insert({
		service: 'facebook',
		appId: '655164321229763',
		secret: '8f0efa53e0417109a6d9f28226df89c0'
	});
}
