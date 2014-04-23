if(Meteor.isServer) {
    AWS.config.update({
        accessKeyId: 'AKIAJSAREQ7WXGCYDFDQ',
        secretAccessKey: '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'
    });

    s3 = new AWS.S3();

    s3ImageUpload = function(Id, f) {
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
        return 'https://s3.amazonaws.com/Basel/pics/' + Id + '-' + f.name;
    }
}
