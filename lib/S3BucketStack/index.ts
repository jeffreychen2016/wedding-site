import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { PolicyStatement, Effect, AccountPrincipal, } from '@aws-cdk/aws-iam';

export default class S3BucketStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const bucketName = 'wedding-site-hosting-bucket'

    const bucket = new Bucket(this, 'WeddingSiteHostingBucket', {
        bucketName:bucketName,
    })

    const statement = new PolicyStatement({
        effect: Effect.ALLOW,
        principals:[new AccountPrincipal('*')],
        actions:['s3:GetObject'],
        resources: ['arn:aws:s3:::wedding-site-hosting-bucket/*']
    })

    bucket.addToResourcePolicy(statement);
  }
}
