Debug.order('app-email/email.js');

process.env.MAIL_URL = 'smtp://postmaster@base.us:32e2y27sqr75@smtp.mailgun.org:587';

Meteor.methods({
	'sendEmail': function(to, subject, text, html) {
		return Email.send({
			to: to,
			from: 'Base <messages-noreply@base.us>',
			subject: subject,
			text: text,
			html: html
		});
	}
});

Email.sendEmail = function(to, subject, text, html) {
	return Email.send({
		to: to,
		from: 'Base <messages-noreply@base.us>',
		subject: subject,
		text: text,
		html: html
	});
};

Email.sendWelcomeEmail = function(user) {
	// template in email.handlebars
	return Email.sendEmail(
		user.profile.email,
		'Welcome to Base',
		'You are now officially part of a growing community of buyers and sellers just like you',
		Handlebars.templates.email({
			user: user
		})
	);
};
