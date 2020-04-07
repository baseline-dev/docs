---
layout: layout.njk
title: Baseline Support for G Suite (Google)
---

Are you using the G Suite to manage your team's email, documents and many more features? 
With the Baseline for G Suite integration you can easily get an overview over everybody who makes use of your G Suite account.

## Setting up G Suite for Baseline

Setting up G Suite for Baseline is super simple. Once you have kicked off a new Baseline audit, you can simply click on the Google card on the services selection page. 
You need to be an admin if you want to be able to baseline G Suite.

## Setting up Google Cloud for Baseline

**Step 1:** Enable the Cloud Resources API by heading to the [Google Cloud console](https://console.developers.google.com/apis/library/cloudresourcemanager.googleapis.com).

**Step 2:** Enable the Identity and Access Management API by heading to the [Google Cloud console](https://console.developers.google.com/apis/api/iam.googleapis.com).
 

## Required OAuth permissions

Baseline relies on the following permissions to audit your Google account:

| OAuth Scope                                          |
|------------------------------------------------------|
| profile                                              |
| https://www.googleapis.com/auth/admin.directory.user |
| https://www.googleapis.com/auth/cloud-platform       |

