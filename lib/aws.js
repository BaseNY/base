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


    s3ImageUpload = function(Id, file, f) {
        var d = new Date();
        var s3 = new AWS.S3();
        var urlEnd = 'pics/' + Id + '/' + d.valueOf() + '-' + file.name;
        s3.putObject({
            Bucket: 'Basel',
            Key: urlEnd,
            ContentType: file.type,
            ACL: 'public-read',
            Body: file
        }, function(e,r) {
            if(e)
            console.log(e);
            else{
                f(urlEnd);
            }
        });
        //atm this code assumes there's only going to be one item with that name.
    }
}
