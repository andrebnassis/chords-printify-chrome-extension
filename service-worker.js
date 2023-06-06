// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

// Importing and using functionality from external files is also possible.
// importScripts('service-worker-utils.js')

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    
    if(changeInfo.status === "complete")
    chrome.tabs.sendMessage(tabId, {
        type:"tabs.onUpdated",
        data:{
        tabId, 
        tab
        }
    })
})

//https://developer.chrome.com/docs/extensions/reference/tabs/#event-onActivated
chrome.tabs.onActivated.addListener(async (activeInfo) => {

    const tab = await getCurrentTab();
    
    chrome.tabs.sendMessage(activeInfo.tabId, {
        type: "tabs.onActivated",
        data:{
        tabId:activeInfo.tabId,
        tab
    }
    })
})

//https://stackoverflow.com/questions/10994324/chrome-extension-content-script-re-injection-after-upgrade-or-install
chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
      for (const tab of await chrome.tabs.query({url: cs.matches})) {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: cs.js,
        });
      }
    }
  });