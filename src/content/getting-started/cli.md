---
layout: layout.njk
title: The Baseline CLI
---

The Baseline CLI is a simple, yet powerful little tool to allow you to execute all Baseline commands.

## Downloading the Baseline CLI

Head over to our [download page](https://baseline.dev/download) to download the latest version of the Baseline CLI.
Once you have downloaded the ZIP. Extract it to a convenient location like your Desktop.

<div class="my-4 rounded bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-sm" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">Currently we only offer a packaged version of the CLI for MacOS.</p>
      <p class="text-sm mb-0">Head to <a href="https://github.com/baseline-dev/cli">the open-source GitHub repository</a> if you want to run the CLI on a different system.</p>
    </div>
  </div>
</div> 

## Installation

You can run the Baseline CLI by simply double-clicking on the file. 
When you do this for the first time, MacOS will show you a warning, similar to the one below:

<img src="/assets/docs/install-can-not-open.jpg" width="415" alt="Can not open Baseline CLI.">

Here you just have to click "Ok" and acknowledge the message. 
Next, head over to System Preferences and open the Security & Privacy section.
You will see a little note at the bottom mentioning "baseline-macos was blocked".
Press the "Open Anyway" button to confirm that you'd like to run the Baseline CLI. See the picture below:   

<img src="/assets/docs/install-allow-system-preferences.jpg" width="617" alt="Confirm to open the Baseline CLI.">

After this, you will get a final confirmation asking whether you want to open the Baseline CLI.  
Click "Open" and the CLI will open 🎉

<img src="/assets/docs/install-confirm.jpg" width="417" alt="Final confirmation before running the Baseline CLI.">

## Requesting the access token

When you run the Baseline CLI for the first time, you are asked to provide "credentials".
After you have requested access to Baseline, we will reach out to you and provide you with these credentials.
Paste the credential into the prompt.

<img src="/assets/docs/cli-credentials.jpg" width="483" alt="Paste your credentials.">

## Running the CLI

You can start the CLI by `double-clicking on the file` or by `opening a terminal` and then running 

```shell
./baseline-macos
```

## Troubleshooting

Sometimes it can happen that the Baseline CLI will return an error. 
If this persists, you can delete all credentials and local settings by running the `clean` command:

<div class="my-4 rounded bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-sm" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="text-sm mb-0">This removes your encrypted credentials. You will need to re-authenticate with all services again.</p>
    </div>
  </div>
</div> 

```shell
./baseline-macos clean
```
