---
layout: layout.njk
title: Baseline Support for self hosted Wordpress
---

Are you using Wordpress as your content platform of choice? 
With the Baseline for self hosted Wordpress integration you can easily review who has access to your Wordpress platform.

## Getting started

Selfhosted Wordpress does not offer an API by default which you can connect to with API tokens like [JWT tokens](https://jwt.io/introduction).
This means that Baseline would not be able to connect to Wordpress unless you install a custom plugin or enable API auth support in some other way.
When you use the self hosted Wordpress integration, we require you to provide two parameters:

| Parameter        | Description                                                |
|------------------|------------------------------------------------------------|
| wordpressUrl     | URL to your Wordpress instance.                            |
| jwtToken         | Authentication token which we pass to your Wordpress API   |
 
 We are making the following call to your Wordpress API:
 
<div class="my-4 rounded bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-sm" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="text-sm mb-0">We are sending both the `Authentication` and `Authorization` header as some of the available plugins make use of the non-standard `Authorization` header.</p>
    </div>
  </div>
</div> 
 
 ```
curl \
-H 'Content-Type: application/json' \
-H 'Cache-Control: no-cache' \
-H 'Authentication: Bearer YOUR_TOKEN' \
-H 'Authorization: Bearer YOUR_TOKEN' \
'YOUR_WORDPRESS_URL/wp-json/wp/v2/users/?context=edit'
```

## Using the Advanced Access Manager plugin

You can use the [Advanced Access Manager](https://wordpress.org/plugins/advanced-access-manager/) plugin to easily create an expiring JWT token.
To do this, follow these steps:

**Step 1.** Go to your Wordpress plugin section and search for `Advanced Access Manager`.

**Step 2.** Install and activate the plugin.

**Step 3.** Go to the plugin settings and select a user with Admin privileges. Note that you can create a [custom role and scoped down access](#required-access-to-api-endpoint). We recommend this for the Baseline integration.

**Step 4.** Now create a new JWT token. You need to set an expiration date. Pick one which you are comfortable with.

<img src="/assets/docs/services/wordpress/wordpress-aam-jwt-tokens.jpg" width="814" alt="Wordpress AAM JWT tokens."> 

**Step 5.** Paste the JWT token and your Wordpress URL into the baseline authentication screen.

**Step 6.** Profit 🎉.

## Wordpress security

We have seen cases where certain managed Wordpress providers would apply very aggressive caching to the Wordpress instances.
These providers would even ignore `Cache-Control` headers. This could result that responses to requests to admin APIs are cached. 
Users without admin access could then query the cached API endpoint without having to use an authentication token:

```
curl \
-H 'Content-Type: application/json' \
-H 'Cache-Control: no-cache' \
-H 'Authorization: Bearer YOUR_TOKEN' \
'YOUR_WORDPRESS_URL/wp-json/wp/v2/users/?context=edit'
```

This request would correctly authenticate and return your results.

```
curl \
-H 'Content-Type: application/json' \
-H 'Cache-Control: no-cache' \
'YOUR_WORDPRESS_URL/wp-json/wp/v2/users/?context=edit'
```

Now after calling this endpoint without the credentials, you still get the authenticated response. 
This is very bad!

**We got your back 🙌**

When you provide your Wordpress credentials to Baseline, we check if this behaviour is seen with your instance.
If we detect that the API response gets cached, we will not allow you to store your credentials and ask you to first address this issue.

<div class="my-4 rounded bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-sm" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="text-sm mb-0">
      When we detect this behaviour note that we will not be able to clear your cache. 
      Please check your hosting provider or services like Cloudflare for a mechanism to clear your cache.
      </p>
    </div>
  </div>
</div> 


## Required access to API endpoint

Baseline relies on the following APIs to audit your Wordpress instance.
Use this information if you want to scope down access to just these endpoints.

| METHOD      | API endpoint                       |
|-------------|------------------------------------|
| GET         | /wp-json/wp/v2/users/?context=edit |


 