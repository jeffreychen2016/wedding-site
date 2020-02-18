#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { WeddingSiteStack } from '../lib/wedding-site-stack';

const app = new cdk.App();
new WeddingSiteStack(app, 'WeddingSiteStack');
