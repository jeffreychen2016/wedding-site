import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { Function, Code, Runtime } from '@aws-cdk/aws-lambda'
import { Task, Result, Choice, Condition, StateMachine } from '@aws-cdk/aws-stepfunctions'
import { InvokeFunction } from '@aws-cdk/aws-stepfunctions-tasks'
import path = require('path');

export default class S3BucketStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const bucketName = 'wedding-site-hosting-bucket'

    new Bucket(this, 'WeddingSiteHostingBucket', {
        bucketName:bucketName,
        publicReadAccess: true,
        websiteIndexDocument: 'index.html'
    })

    // create functions for step function tasks
    const submitOrder = new Function(this, 'SubmitOrderFunction', {
      functionName: 'SubmitOrderFunction',
      code: Code.fromAsset(path.join(__dirname,'assets')),
      handler: 'submitOrder.handler',
      runtime: Runtime.NODEJS_10_X
    })

    const checkOrder = new Function(this, 'CheckOrderFunction', {
      functionName: 'CheckOrderFunction',
      code: Code.fromAsset(path.join(__dirname,'assets')),
      handler: 'checkOrder.handler',
      runtime: Runtime.NODEJS_10_X
    })

    const saveOrder = new Function(this, 'SaveOrderFunction', {
      functionName: 'SaveOrderFunction',
      code: Code.fromAsset(path.join(__dirname, 'assets')),
      handler: 'saveOrder.handler',
      runtime: Runtime.NODEJS_10_X
    })


    const deleteOrder = new Function(this, 'DeleteOrderFunction', {
      functionName: 'DeleteOrderFunction',
      code: Code.fromAsset(path.join(__dirname,'assets')),
      handler: 'deleteOrder.handler',
      runtime: Runtime.NODEJS_10_X
    })

    // create tasks
    const submitOrderTask = new Task(this, 'SubmitOrderTask', {
      task: new InvokeFunction(submitOrder),
      // resultPath: '$.order'
    })

    // taking output from submitOrderTask as input
    const checkOrderTask = new Task(this, 'CheckOrderTask', {
      task: new InvokeFunction(checkOrder),
      inputPath: '$',
      // outputPath: '$.shouldDelete'
      // resultPath: '$.shouldDelete'
    })

    const deleteOrderTask = new Task(this, 'DeleteOrderTask', {
      task: new InvokeFunction(deleteOrder)
    })

    const saveOrderTask = new Task(this, 'SaveOrderTask', {
      task: new InvokeFunction(saveOrder)
    })

    // create workflow
    const workflow = submitOrderTask
      .next(checkOrderTask)
      .next(new Choice(this, 'ShouldDeleteOrder?')
        // look at '$.quantity' before calling next lambda function
        .when(Condition.booleanEquals('$.shouldDelete', false), saveOrderTask)
        .when(Condition.booleanEquals('$.shouldDelete', true), deleteOrderTask)
        )
    new StateMachine(this, 'Workflow', {
      definition: workflow
    })
  }
}
