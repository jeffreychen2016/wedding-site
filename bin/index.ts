#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { S3BucketStack } from '../lib';

const env = {account: '246230896069', region:'us-east-1'}
const app = new cdk.App();
new S3BucketStack(app, 'S3BucketStack', {env});
