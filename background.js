/**
 * DNS缓存杀手
 * @author yutent<yutent.io@gmail.com>
 * @date 2020/11/04 17:54:49
 */

chrome.browserAction.onClicked.addListener(function(ctab) {
  var cid = ctab.id
  var tid = null
  var code = `
    var script = document.createElement('script')
    script.textContent = \`
      chrome.send('clearHostResolverCache')
      chrome.send('flushSocketPools')
    \`
    document.body.appendChild(script)
  `
  var callback = function() {
    chrome.tabs.remove(tid)
    chrome.tabs.executeScript(cid, { code: 'location.reload()' })
  }

  chrome.tabs.query({}, function(tabs) {
    var done = false
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
