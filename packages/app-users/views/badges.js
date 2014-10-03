Template.badges.refBadge = function() {
	if (Meteor.user().profile.referrals) {
		return Meteor.user().profile.referrals.length >= 5;
	}
	return false;
}

Template.postBadges.refBadge = function() {
	var refs = Meteor.users.findOne({_id: this.sellerId}).profile.referrals;
	if (refs) {
		return refs.length >= 5;
	}
	return false;
}

Template.publicBadges.refBadge = function() {
	var refs = Meteor.users.findOne({_id: this._id}).profile.referrals;
	if (refs) {
		return refs.length >= 5;
	}
	return false;
}
