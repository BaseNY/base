if(Meteor.isClient) {
    /*
    FB.init({
        appId: '199242350261474',
        xfbml: true,
        version: 'v2.0'
    });
    //now add fbid to the items.
    getUserFriends = function(func) {
        FB.getLoginStatus(function(response) {

            if (response.authResponse) {
                token = response.authResponse.accessToken;
                FB.api('/me/friends?fields=installed', function(response) {
                    var ret = [];
                    _.each(response.data, function(res) {
                        if(res.installed==true)
                        ret.push(res);

                    });
                    console.log(ret);
                    return ret;
                    // do something here they are logged in and have given you perms   
                });
            } else {
                //           // no user session available, someone you dont know
            }
        });
    }
    */
}
