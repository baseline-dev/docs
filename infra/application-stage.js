const { Stage, CfnOutput } = require('@aws-cdk/core');
const { DocsStack } = require('./docs');

class Application extends Stage {
  constructor(scope, id, props) {
    super(scope, id, props);

    this.docsStack = new DocsStack(this, 'Docs', {});

    this.cloudfrontDistributionId = new CfnOutput(this.docsStack, 'DocsDistributionId', {
      value: this.docsStack.productionDistribution.distributionId
    });
  }
}

module.exports = {
  Application
}