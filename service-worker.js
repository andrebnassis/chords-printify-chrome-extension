// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log("This prints to the console of the service worker (background script)")

// Importing and using functionality from external files is also possible.
importScripts('service-worker-utils.js')

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