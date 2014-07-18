Debug.order('app-utils/utils.js');

Meteor.isLoggedIn = function() {
    return !!Meteor.user();
};

Utils = {
    // generates a publish function that simply allows selector and options pass through
    defaultPublishFunction: function(collection) {
        return function(selector, options) {
            //Debug.utils('In publish function for ' + collection._name);
            if (!selector) {
                selector = {};
            }
            if (!options) {
                options = {};
            }
            return collection.find(selector, options);
        };
    },

    //604800000 is the magic number for a week in milliseconds
    timify: function(date) {
        d = moment(date);
        c = moment();
        var d_diff = c.diff(d, 'days');
        if (c.diff(d, 'hours') <= 12)
            return d.fromNow();
        else if (d_diff <= 1)
            return d.calendar();
        else if (d_diff < 4)
            return d.fromNow() + ' at ' + d.format('h:mm a');
        else if (d_diff <= 7)
            return d.calendar();
        else return d.format('LL');
    },

    getItemIdArray: function(c) {
        var ret = [];
        _.each(c, function(o) {
            ret.push(o.itemId);
        });
        return ret;
    },

    formatNotif: function(obj) {
        text = '';
        if (obj.type == 1) {
            var nameList = obj.commenters.reverse();
            var i = nameList.length;
            if (i == 1)
                text = text + nameList[0];
            if (i == 2)
                text = text + nameList[0] + ' and ' + nameList[1];
            if (i == 3)
                text = text + nameList[0] + ', ' + nameList[1] + ', and ' + nameList[2];
            if (i == 4)
                text = text + nameList[0] + ', ' + nameList[1] + ', and ' + (i - 2) + ' others';
            if (!obj.postName)
                text = text + ' commented on your post.';
            else
                text = text + ' commented on your post: ' + obj.postName;
        } else if (obj.type == 2) {
            var nameList = obj.commenters.reverse();
            var i = nameList.length;
            if (i == 1)
                text = text + nameList[0];
            if (i == 2)
                text = text + nameList[0] + ' and ' + nameList[1];
            if (i == 3)
                text = text + nameList[0] + ', ' + nameList[1] + ', and ' + nameList[2];
            if (i == 4)
                text = text + nameList[0] + ', ' + nameList[1] + ', and ' + (i - 2) + ' others';
            if (!obj.postName)
                text = text + ' commented on a post you commented on.';
            else
                text = text + ' commented on a post you commented on: ' + obj.postName;
        }
        return text;
    },

    dataURItoBlob: function(dataURI) {
        'use strict'
            var byteString,
        mimestring

            if (dataURI.split(',')[0].indexOf('base64') !== -1) {
                byteString = atob(dataURI.split(',')[1])
            } else {
                byteString = decodeURI(dataURI.split(',')[1])
            }

        mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

            var content = new Array();
        for (var i = 0; i < byteString.length; i++) {
            content[i] = byteString.charCodeAt(i)
        }

        return new Blob([new Uint8Array(content)], {
            type: mimestring
        });
    }
};

Utils.readUrl = function(input, name) {
    if (input.files && input.files[0]) {
        if (!(input.files[0].type.match(/image.*/)))
            return -1;
        var reader = new FileReader();

        file = input.files[0];

        img = document.createElement('img');
        img.src = window.URL.createObjectURL(file);

        var canvas = document.createElement('canvas');

        img.onload = function() {
            var MAX_WIDTH = 1024;
            var MAX_HEIGHT = 1024;
            var width = img.width;
            var height = img.height;
            var resized = false;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    resized = true;
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    resized = true;
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            if(resized) {
                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext('2d');


                ctx.drawImage(img, 0, 0, width, height);

                dataurl = canvas.toDataURL('image/png');
                console.log('content: ' + dataurl.content);

                //            var barray = Base64Binary.decodeArrayBuffer(dataurl.content.subsi
                file = Utils.dataURItoBlob(dataurl);
            }

            reader.onload = function(e) {
                console.log('reader onload inside');
                $('#' + name).attr('src', e.target.result);

                Session.set('uploading', true);
                S3.imageUpload(Meteor.userId(), file, function(r) {
                    $('#' + name).toggleClass('uploading');
                    Session.set('uploading', false);
                    Session.set('uploadUrl', r);
                });
            }
            reader.readAsDataURL(input.files[0]);
        }

    }
};
