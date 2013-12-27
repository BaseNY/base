if (Meteor.isServer) {
    Items = new Meteor.Collection("items");
    Meteor.publish('items', function() {
	return Items.find({});
    });

    Meteor.methods({
	addProduct: function(p) {
	    console.log('called');
	    p.user = this.userId;
	    p.time = new Date();
	    var temp = Items.insert(p);
	    console.log(Items);
	    return temp;
	}
    })
    Meteor.startup(function () {
        Accounts.loginServiceConfiguration.remove({
            service: "facebook"
        });
        Accounts.loginServiceConfiguration.insert({


            service: "facebook",
            appId: "581722495207267",
   //         appId:"1382563015306531",
            secret:"c756e217e627b5699e96bfef0cfebede"
 //           secret: "559eaba1052b2bf3e289d5111d1af729"
        });
    }); 
}
