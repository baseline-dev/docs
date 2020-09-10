const { join } = require('path');
const { Stack, Duration } = require('@aws-cdk/core');
const { PublicHostedZone, RecordTarget, ARecord } = require('@aws-cdk/aws-route53');
const { CloudFrontTarget } = require('@aws-cdk/aws-route53-targets');
const { PriceClass, CloudFrontWebDistribution } = require('@aws-cdk/aws-cloudfront');
const { Bucket, BucketAccessControl } = require('@aws-cdk/aws-s3');
const { BucketDeployment, Source, CacheControl } = require('@aws-cdk/aws-s3-deployment');

class DocsStack extends Stack {

  constructor(app, id, props) {
    super(app, id, props);

    const docsHostName = this.node.tryGetContext('docsHostName');
    const certificateArn = this.node.tryGetContext('certificateArn');
    const {hostedZoneId, zoneName} = this.node.tryGetContext('zone');

    const zone = PublicHostedZone.fromHostedZoneAttributes(this, 'route-53', {
      hostedZoneId,
      zoneName
    });
    
    const docsAssets = new Bucket(this, `${id}-docs-production-assets`, {
      accessControl: BucketAccessControl.PUBLIC_READ,
      bucketName: `docs-prod-static-assets`,
      publicReadAccess: true
    });

    new BucketDeployment(this, 'DeployDocs', {
      actionName: 'Docs Deployment',
      sources: [Source.asset(join(__dirname, '..', 'build'))],
      destinationBucket: docsAssets,
      cacheControl: [CacheControl.setPublic(), CacheControl.maxAge(Duration.days(365))]
    });

    this.productionDistribution = new CloudFrontWebDistribution(this, `${id}-docs-production-distribution`, {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: docsAssets
        },
        behaviors: [{
          isDefaultBehavior: true,
          compress: true
        }]
      }],
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [docsHostName]
      },
      priceClass: PriceClass.PRICE_CLASS_100
    });

    new ARecord(this, `${id}-alias-record-production`, {
      zone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.productionDistribution)),
      recordName: docsHostName
    });
  }
}

module.exports = { DocsStack }