---
layout: layout.njk
title: Baseline Support for Cloudflare
---

Cloudflare, Inc. is an American web-infrastructure and website-security company, providing content-delivery-network services, DDoS mitigation, Internet security, and distributed domain-name-server services. [Wikipedia](https://en.wikipedia.org/wiki/Cloudflare)

## Setting up the Cloudflare credentials

To use audit users which have access to Cloudflare, you need to create an apiToken in the Cloudflare console.

**Step 1.** Head to "My Profile" in the menu.

**Step 2.** Click on "API Tokens" in the navigation of the page.

**Step 3.** Click on "Create Token".

**Step 4.** Provide a name for the token, for example "Baseline.dev access" so you know what this token is used for at a later point.

**Step 5.** Select permission: Account / Account Settings / Read

   <img src="/assets/docs/services/cloudflare/cloudflare-permissions-form.jpg" width="612" alt="Cloudflare permissions.">

**Step 6.** Click on "Continue to Summary" and confirm by clicking "Create Token" on the next page.

**Step 7.** Copy & Paste the token into the Baseline input for Cloudflare.

**Step 8.** Why don't you celebrate this wonderful day? 🎉

## Required Permissions and Internals

Baseline relies on the following permissions to audit your Cloudflare account:

| Resource | Scope            | Permission |
|----------|------------------|------------|
| Account  | Account Settings | Read       |

