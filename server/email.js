Meteor.startup(function() {
    process.env.MAIL_URL = 'smtp://postmaster@base.us:32e2y27sqr75@smtp.mailgun.org:587';
});

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

sendEmail =  function (to, subject, text, html) {
    return Email.send({
        to: to,
           from: 'Base <messages-noreply@base.us>',
           subject: subject,
           text: text,
           html: html
    });
},
    /*
       <html>
       <head>
       <title>Awesome Email Marketing!</title>
       </head>
       <body style="padding:0px; margin:0px;background-color:#fafafa;font-family:Trebuchet MS, Helvetica, sans-serif;">
       <img style="width:100%" src='http://d2rru2br826k2g.cloudfront.net/banner_small.png'/>
       <hr style="border:0px;border-bottom:1px solid #33B5E5;width:75%"/>
       <div style="width:75%;margin:0 auto">
       <h1 style="text-align:center;font-weight:300">Welcome to Base!</h1>
       <p>You are now officially part of a growing community of buyers and sellers. Thank you for your part in helping to expand our community's reach.</p>
       <p>If you haven't already, head back to our <a style= "color:#33B5E5;text-decoration:none" href="http://base.us">site</a> now and go do something!</p>
       <p>or</p>
       <p>Check out our <a style= "color:#33B5E5;text-decoration:none" href="http://base-us/getting-started">getting started</a> guide.</p>
       </div>
       </body>
       </html>
       */

    sendWelcomeEmail = function(user) {
        console.log('sending welcome email');
        sendEmail(user.profile.email,'Welcome to Base','You are now officially part of a growing community of buyers and sellers just like you.','<html>\
                <head>\
                <title>Base Welcome Email</title>\
                </head>\
                <body style="padding:0px; margin:0px;background-color:#fafafa;font-family:Trebuchet MS, Helvetica, sans-serif;border:1px solid lightgrey">\
                <hr style="border:0px;border-bottom:1px solid #33B5E5;width:75%"/>\
                <img style="width:100%" src="http://d2rru2br826k2g.cloudfront.net/banner_small.png"/>\
                <hr style="border:0px;border-bottom:1px solid #33B5E5;width:75%"/>\
                <div style="width:80%;margin:0 auto">\
                \
                <p style="font-size:1.2em">' + user.profile.name + ',</p> \
                <p style="font-size:1.2em">Thank you for signing up for Base.You are now officially a part of our growing community of buyers and sellers. We greatly appreciate your part in expanding our community\'s reach.</p>\
                <p style="font-size:1.2em">Before you start buying and selling, we would recommend you first read Get started with Base: http://base.us/getting-started. Then we encourage you to spread the word about Base through your referral link: http://base.us/signup?ref=' + user._id +'. As a perk for referring at least five new members, we will be rewarding you with Base apparel and other giveaways. With your help, we can expand our program to a larger audience and provide quick and easy buying and selling experiences for everyone.</p>\
<p style="font-size:1.2em">Resources to help you:<br>Getting Started: http://base.us/getting-started<br>Email: support@base.us<br>Facebook: https://www.facebook.com/base.us</p>\
<p style="font-size:1.2em"><!--Be sure to visit our <a href="http://base.us/getting-started">getting started</a> guide to begin your experience with Base and start buying and selling now. --> We hope you enjoy your experience with us and that we can fulfill your buying selling needs!</p>\
<p style="font-size:1.2em;color:grey">This e-mail address has been used for registration at http://base.us.<br>This letter was sent automatically. Please do not reply to it.</p>\
<p style="font-size:1.2em">Thank you,<br>The Base.us Team</p>\
<p style="font-size:1.2em"><a href="http://base.us/">Terms of Service</a> | <a href="http://base.us/">Unsubscribe</a> | <a href="http://base.us/">Privacy Policy</a></p>\
                \
                </div>\
                </body>\
                </html>'
                )    
    }
