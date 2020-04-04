---
layout: layout.njk
title: Baseline Support for GitHub
---

Are you using GitHub personal or organizations in your team? 
With the Baseline for GitHub integration you can easily review who has access to which organization or repository.

## Setting up GitHub for Baseline

Setting up GitHub for Baseline is super simple. Once you have kicked off a new Baseline audit, you can simply click on the GitHub card on the services selection page. 
You need to be an organization admin if you want to be able to baseline organizations.
Please make sure that you uncheck organizations that you don't want to baseline in the GitHub authentication flow.

## Required OAuth permissions

Baseline relies on the following permissions to audit your GitHub account:

| OAuth Scope |
|-------------|
| user:email  |
| repo        |       
| read:org    |

