---
layout: layout.njk
title: The Baseline Application
---

The Baseline Application allows you to access all Baseline features.

## Downloading the Baseline Application


<div class="my-4 rounded bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-sm" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">You can currently use the Baseline Application on MacOS.</p>
      <p class="text-sm mb-0">Please <a href="mailto:support@baseline.dev">let us know</a> if you are interested in a version for Windows or Linux. You can also follow the link to <a href="https://github.com/baseline-dev/desktop-client">the open-source GitHub repository</a> if you want to run the application on a different system.</p>
    </div>
  </div>
</div> 

Head over to our [download page](https://baseline.dev/download) to download the latest version of the Baseline Application.
Once you have downloaded the DMG, double click the download. You can then move the Baseline Application to your Applications folder.

<img src="/assets/docs/app-install.jpg" class="shadow-none" width="770" alt="Baseline Application Installer.">

## Installation

When you launch Baseline for the first time, OSX will prompt you to confirm that you want to open Baseline. 
Click `Open` to proceed.

<img src="/assets/docs/app-confirm-running.jpg" class="shadow-none" width="532" alt="Baseline Application Confirm launch.">


## Requesting the access token

When you run the Baseline Application for the first time, you are asked to provide your "Access Token".
After you have requested access to Baseline, we will reach out to you and provide you with this "Access Token".
Paste the token into the prompt.

<img src="/assets/docs/app-access-key.jpg" class="shadow-none" width="1011" alt="Baseline Application Access Key Screen.">
     
## Troubleshooting

Head over to the Settings section if you happen to run into issues with Baseline.
There are a few things you can do:

<img src="/assets/docs/app-settings.jpg" class="shadow-none" width="911" alt="Baseline Application Settings.">

### Delete Access Key

This will delete your Baseline Access Key. You will need to provide a new key before you can continue using the app.

### Delete Public / Private Keypair

This will delete the keys which are used to encrypt / decrypt your service keys. 
When you delete these keys, the Baseline Application will also delete your service credentials. 
They are now unusable as they are encrypted by those keys.

### View Baseline Logs

We also store logs on your machine in case you want to debug issues. We do not send these logs to us.