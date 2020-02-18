#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { S3BucketStack } from '../lib';

const app = new cdk.App();
new S3BucketStack(app, 'S3BucketStack');
