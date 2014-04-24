/**http://stackoverflow.com/questions/10099202/how-would-one-handle-a-file-upload-with-meteor
 * USE THIS 
 *
 * https://www.eventedmind.com/feed/meteor-build-a-file-upload-package
 */

if(Meteor.isClient) {
    Meteor.startup(function(){
        AWS.config.update({
            accessKeyId: 'AKIAJSAREQ7WXGCYDFDQ',
        secretAccessKey: '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'
        });
    });


    s3ImageUpload = function(Id, f) {
        var s3 = new AWS.S3();
        s3.putObject({
            Bucket: 'Basel',
            Key: 'pics/' + Id + '-' + f.name,
            ContentType: f.type,
            ACL: 'public-read',
            Body: f
        }, function(e,r) {
            if(e)
            console.log(e);
            else 
            console.log(r);
        });
        //atm this code assumes there's only going to be one item with that name.
        var d = new Date();
        return 'https://s3.amazonaws.com/Basel/pics/' + Id + '-' + f.name + d.valueOf();
    }
}
