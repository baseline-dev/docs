#!/usr/bin/env node

const { App } = require('@aws-cdk/core');
const { PipelineStack } = require('../infra/pipeline-stack');

const app = new App();
new PipelineStack(app, 'Docs-Pipeline', {
  stackName: 'Docs-Pipeline',
  description: 'Pipeline stack for Baseline documentation.'
});

app.synth();