---
layout: layout.njk
title: Baseline Support for AWS
---

Are you using AWS for all your cloud infrastructure needs? 
With the Baseline for AWS integration you can easily get an overview of all accounts within your AWS account.

## Setting up AWS for Baseline

**Step 1.** Open the AWS Console, log in with your main account.

**Step 2.** Head to the IAM console and create a new IAM user.

**Step 3.** Select `Programmatic access` in the `Select AWS access type` section.

**Step 4.** Attach the `IAMReadOnlyAccess` and `AWSOrganizationsReadOnlyAccess` policy directly to the user.

**Step 5.** Copy & Paste the `Access Key ID` and the `Secret Acces Key` into the Baseline input for AWS.

**Step 7.** You're done! 🎉 

## Required permissions

Baseline relies on the following policies to audit your AWS account:

| Policies                       |
|--------------------------------|
| IAMReadOnlyAccess              |
| AWSOrganizationsReadOnlyAccess |

