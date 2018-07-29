/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-07-07 20:59:35
 * @version $Id$
 */

chrome.browserAction.onClicked.addListener(function(ctab) {
  let cid = ctab.id
  let tid = null
  let code = `
    let script = document.createElement('script')
    script.textContent = \`
      chrome.send('clearHostResolverCache')
      chrome.send('flushSocketPools')
    \`
    document.body.appendChild(script)
  `
  let callback = function() {
    chrome.tabs.remove(tid)
    chrome.tabs.executeScript(cid, { code: 'location.reload()' })
  }

  chrome.tabs.query({}, function(tabs) {
    let done = false
    for (let i = 0, tab; (tab = tabs[i++]); ) {
      if (/^chrome:\/\/net-internals/.test(tab.url)) {
        tid = tab.id
        chrome.tabs.executeScript(tab.id, { code }, callback)
        done = true
        break
      }
    }
    if (!done) {
      chrome.tabs.create(
        { url: 'chrome://net-internals/#dns', active: false },
        function(tab) {
          tid = tab.id
          chrome.tabs.executeScript(tab.id, { code }, callback)
        }
      )
    }
  })
})
