if (Meteor.settings.testing) {
	console.log("Creating user fixtures");
	var users = [{
		"_id": "vcyDEte8PWYTrHSbP",
		"createdAt": new Date("2014-06-29T23:38:11.664Z"),
		"friends": ["309673612542383", "1432799883663191"],
		"profile": {
			"email": "ddymwwf_carrierowitz_1403992028@tfbnw.net",
			"gender": "male",
			"firstName": "James",
			"lastName": "Carrierowitz",
			"name": "James Amfjgbcdhehh Carrierowitz",
			"img": "http://graph.facebook.com/1509263279286069/picture?width=100&height=100"
		},
		"services": {
			"facebook": {
				"accessToken": "CAAUOiukFj3MBAFIvNnvatwjiZCPGXOlksZC7J5jAZC8q033fCCpMhcYbnZCw5vjfmJxFtGC4fncxyRzSrAwHMCyVcXQ4JEwuRxyKG2WFJCrxvBxELYPzCnhtBAsEGsWwgAM2ZCYbIiKnN9zraBiSoHIMvET9n2RNnEMqrcVgadRcPDkOoLu0h",
				"email": "ddymwwf_carrierowitz_1403992028@tfbnw.net",
				"expiresAt": 1409265919368,
				"first_name": "James",
				"gender": "male",
				"id": "1509263279286069",
				"last_name": "Carrierowitz",
				"link": "https://www.facebook.com/app_scoped_user_id/1509263279286069/",
				"locale": "en_US",
				"name": "James Amfjgbcdhehh Carrierowitz"
			},
			"resume": {
				"loginTokens": []
			}
		},
		"subscribed": ["X8abhsXvM3kwqiZhr", "GmatyKWkHG3oSc3KG", "5TWzrf4KZ6oDZpA58", "65iTyBjmBTvHddEuR", "2oAymQbhBsTSm4Nmd", "mJMxzo3dShtGQAiaT"]
	}, {
		"_id": "nXh9FFKnv6e4TKCt6",
		"createdAt": new Date("2014-06-30T03:15:45.347Z"),
		"friends": [],
		"profile": {
			"email": "roflxgod@gmail.com",
			"gender": "male",
			"firstName": "Steve",
			"lastName": "Zhu",
			"name": "Steve Zhu",
			"img": "http://graph.facebook.com/766969053323975/picture?width=100&height=100"
		},
		"services": {
			"facebook": {
				"accessToken": "CAAUOiukFj3MBAIZCU9nlT649taPKfWRTUHvMidZBMbjwHRcNhO3HuZBhBHIUb0zn7ksm4n8j7nrZAPgryfECxjskP9ZBzm8ZC4RVEHUZCnpRjGBf0suJSzEUCgrFJM5OAFga7Fkc1SmnY2KjumrN0ZAPJGhtQfaa404oL2ZBbZBaY0FWnb7jemiVlsA0ZCVgsFocZB8ZD",
				"expiresAt": 1409196868130,
				"id": "766969053323975",
				"email": "roflxgod@gmail.com",
				"name": "Steve Zhu",
				"first_name": "Steve",
				"last_name": "Zhu",
				"link": "https://www.facebook.com/app_scoped_user_id/766969053323975/",
				"gender": "male",
				"locale": "en_US"
			},
			"resume": {
				"loginTokens": [{
					"when": new Date("2014-06-30T03:15:45.649Z"),
					"hashedToken": "lwGEFbznv13468ebhkYi+YE2glazXCZx9RhKs0S3XJA="
				}]
			}
		},
		"subscribed": ["X8abhsXvM3kwqiZhr", "GmatyKWkHG3oSc3KG", "5TWzrf4KZ6oDZpA58", "65iTyBjmBTvHddEuR", "2oAymQbhBsTSm4Nmd", "mJMxzo3dShtGQAiaT"]
	}, {
		"_id": "ZAWiaZnu4vtJMkGHq",
		"createdAt": new Date("2014-06-30T10:45:53.584Z"),
		"friends": ["327495717406261", "1509263279286069", "1432799883663191"],
		"profile": {
			"email": "lilbfui_chaiberg_1403992049@tfbnw.net",
			"gender": "female",
			"firstName": "Lisa",
			"lastName": "Chaiberg",
			"name": "Lisa Amdiibdjhfhj Chaiberg",
			"img": "http://graph.facebook.com/309673612542383/picture?width=100&height=100"
		},
		"services": {
			"facebook": {
				"accessToken": "CAAUOiukFj3MBAP2zZCMfABi6PHtWuZAkBvrI5ZCE2bprQmwphdYJZBxbZAjxc1azWhUNJqM5PovuaNZBwydxhag5RDxuYvsJfAUqZBtbqeclqzRxcDuhxcguYZCWZCbZC0f6qMciwRCyum3TndRbIQPGUOFD7aNZAzt8wFCagUSSykkAtYBvw2RIAJW",
				"email": "lilbfui_chaiberg_1403992049@tfbnw.net",
				"expiresAt": 1409309152434,
				"first_name": "Lisa",
				"gender": "female",
				"id": "309673612542383",
				"last_name": "Chaiberg",
				"link": "https://www.facebook.com/app_scoped_user_id/309673612542383/",
				"locale": "en_US",
				"name": "Lisa Amdiibdjhfhj Chaiberg"
			},
			"resume": {
				"loginTokens": []
			}
		},
		"subscribed": ["X8abhsXvM3kwqiZhr", "GmatyKWkHG3oSc3KG", "5TWzrf4KZ6oDZpA58", "65iTyBjmBTvHddEuR", "2oAymQbhBsTSm4Nmd", "mJMxzo3dShtGQAiaT"]
	}, {
		"_id": "nhGWzS5osp8jsLw6N",
		"createdAt": new Date("2014-06-30T11:05:20.461Z"),
		"friends": ["327495717406261", "309673612542383", "1509263279286069"],
		"profile": {
			"email": "dcfgyha_liangman_1404081854@tfbnw.net",
			"gender": "female",
			"firstName": "Nancy",
			"lastName": "Liangman",
			"name": "Nancy Amgiiegiebaf Liangman",
			"img": "http://graph.facebook.com/1432799883663191/picture?width=100&height=100"
		},
		"services": {
			"facebook": {
				"accessToken": "CAAUOiukFj3MBAIAzPwI87bJ1Hu7tYoarrtfCLILZA0ZCZASvQyAfxqH4ymZCsQCF5g8g6G7SjojZCYQQLVZBPMKav8KqvzZAZABD4RcLfuSbHSFjGHgKimocdG4ZBCYV2QJHZBGDHcD1u8XeZAQE8jGmZClNAZABwkKIOXcTtZCIn7C6PLgzlupPZBg3BK0",
				"expiresAt": 1409310319344,
				"id": "1432799883663191",
				"email": "dcfgyha_liangman_1404081854@tfbnw.net",
				"name": "Nancy Amgiiegiebaf Liangman",
				"first_name": "Nancy",
				"last_name": "Liangman",
				"link": "https://www.facebook.com/app_scoped_user_id/1432799883663191/",
				"gender": "female",
				"locale": "en_US"
			},
			"resume": {
				"loginTokens": []
			}
		},
		"subscribed": ["X8abhsXvM3kwqiZhr", "GmatyKWkHG3oSc3KG", "5TWzrf4KZ6oDZpA58", "65iTyBjmBTvHddEuR", "2oAymQbhBsTSm4Nmd", "mJMxzo3dShtGQAiaT"]
	}, {
		"_id": "EW6JrneAJCGPQTZSa",
		"createdAt": new Date("2014-06-30T11:05:58.455Z"),
		"friends": ["309673612542383", "1509263279286069", "1432799883663191"],
		"profile": {
			"email": "daroyly_fallerson_1404124595@tfbnw.net",
			"gender": "male",
			"firstName": "Richard",
			"lastName": "Fallerson",
			"name": "Richard Amdcgejfijbg Fallerson",
			"img": "http://graph.facebook.com/327495717406261/picture?width=100&height=100"
		},
		"services": {
			"facebook": {
				"accessToken": "CAAUOiukFj3MBAGZCAHsAXUi2lccv7WpgZBArddErkUVvEfcfdDCZAGd8oRrtr5kJuT9WQNpFbA3Pi5G1ZCl7Jsru3nv062cZAVKPgYGhTgP7b0xhnaG2D6LXSUsWxlxvZCLI5two6ZAdPhKUD7a1LGRxfIKL3WJGJZBDqRdH31P6ORTCYuzAS9ZCZC",
				"expiresAt": 1409310357370,
				"id": "327495717406261",
				"email": "daroyly_fallerson_1404124595@tfbnw.net",
				"name": "Richard Amdcgejfijbg Fallerson",
				"first_name": "Richard",
				"last_name": "Fallerson",
				"link": "https://www.facebook.com/app_scoped_user_id/327495717406261/",
				"gender": "male",
				"locale": "en_US"
			},
			"resume": {
				"loginTokens": [{
					"when": new Date("2014-06-30T11:05:58.679Z"),
					"hashedToken": "Jij411bowmpX1z+1g6O+M+RmuVz7ouudBLA0cFCEMl8="
				}]
			}
		},
		"subscribed": ["X8abhsXvM3kwqiZhr", "GmatyKWkHG3oSc3KG", "5TWzrf4KZ6oDZpA58", "65iTyBjmBTvHddEuR", "2oAymQbhBsTSm4Nmd", "mJMxzo3dShtGQAiaT"]
	}];


	if (!Meteor.users.findOne()) {
		_.each(users, function(user) {
			Meteor.users.insert(user);
		});
		console.log('Created test users');
	}
}
