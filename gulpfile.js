'use strict';

let gulp = require('gulp');
let fs = require('fs');
let AWS = require('aws-sdk');
let gutil = require('gulp-util');
let using = require('gulp-using')
let async = require('async');
let environment = process.env.ENVIRONMENT || 'dev';
let appName = environment === 'production' ? process.env.APPNAME_PROD : process.env.APPNAME || 'TEST';
let bucketName = appName +"-"+environment;
let awsConfig = {
	accessKeyId: environment === 'production' ? process.env.AWS_ACCESS_KEY_ID_PROD : process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: environment === 'production' ? process.env.AWS_SECRET_ACCESS_KEY_PROD : process.env.AWS_SECRET_ACCESS_KEY,
	region: environment === 'production' ? process.env.AWS_REGION_PROD : process.env.AWS_REGION
  }

 

AWS.config.update(awsConfig);
let gulps3 = require('gulp-s3-upload')(awsConfig);


gulp.task('s3-create', function(done) {
	let s3 = new AWS.S3();
	let policy = {
		Version: '2012-10-17',
		Statement: [{
			Sid: 'Allow Public Access to All Objects',
			Effect: 'Allow',
			Principal: '*',
			Action: 's3:GetObject',
			Resource: 'arn:aws:s3:::' + bucketName + '/*'
		}]
	};
	s3.createBucket({
		Bucket: bucketName
	}, function(err) {
		if (err) {
			throw new gutil.PluginError('deploy', err);
		}
		async.parallel([
			s3.putBucketPolicy.bind(s3, {
				Bucket: bucketName,
				Policy: JSON.stringify(policy)
			}),
			s3.putBucketWebsite.bind(s3, {
				Bucket: bucketName,
				WebsiteConfiguration: {
					IndexDocument: {
						Suffix: 'index.html'
					}
				}
			})
		], function(err) {
			if (err) {
				throw new gutil.PluginError('deploy', err);
			}
			done();
		});
	});
});


gulp.task('deploy',['s3-create'], function(done) {
	gulp.src("dist/**/*")
	.pipe(using())
	.pipe(gulps3({
		Bucket: bucketName,
		ACL:    'public-read'
	}))
});

