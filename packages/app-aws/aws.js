Debug.order('app-aws/aws.js');

/**http://stackoverflow.com/questions/10099202/how-would-one-handle-a-file-upload-with-meteor
 * USE THIS
 *
 * https://www.eventedmind.com/feed/meteor-build-a-file-upload-package
 */

AWS.config.update({
	accessKeyId: 'AKIAJSAREQ7WXGCYDFDQ',
	secretAccessKey: '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'
});

S3 = {};
S3.Url = 'http://d2rru2br826k2g.cloudfront.net/';
S3.imageUpload = function(Id, file, f) {
	var d = new Date();
	var s3 = new AWS.S3();
	var urlEnd = 'pics/' + Id + '_' + d.valueOf() + '.png';
	console.log(urlEnd);
	console.log(file);
	s3.putObject({
		Bucket: 'baseimgs',
		Key: urlEnd,
		ContentType: 'image/png',
		ACL: 'public-read',
		Body: file
	}, function(e, r) {
		if (e)
			console.log(e);
		else {
			f(urlEnd);
		}
	});
	//atm this code assumes there's only going to be one item with that name.
}


/*
AWS.config.update({
	accessKeyId: 'AKIAJSAREQ7WXGCYDFDQ',
	secretAccessKey: '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'
});

S3 = new AWS.S3();

S3.imageUpload = function(userId, file, callback) {
	var date = new Date();
	var urlEnd = 'pics/' + userId + '_' + date.valueOf() + '.png';
	Debug.log('S3.imageUpload, urlEnd', urlEnd);
	S3.putObject({
		Bucket: 'baseimgs',
		Key: urlEnd,
		ContentType: 'image/png',
		ACL: 'public-read',
		Body: file
	}, function(err, res) {
		callback(err, urlEnd);
	});
};
*/
