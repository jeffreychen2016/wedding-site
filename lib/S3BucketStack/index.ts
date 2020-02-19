import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';

export default class S3BucketStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const bucketName = 'wedding-site-hosting-bucket'

    new Bucket(this, 'WeddingSiteHostingBucket', {
        bucketName:bucketName,
        publicReadAccess: true
    })
  }
}
