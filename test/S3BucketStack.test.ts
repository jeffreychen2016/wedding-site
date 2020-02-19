import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import stacks = require('../lib');

test('S3Bucket Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new stacks.S3BucketStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::S3::Bucket",{
    BucketName: 'wedding-site-hosting-bucket',
    WebsiteConfiguration: {
        "IndexDocument": "index.html"
      }
  }));
});