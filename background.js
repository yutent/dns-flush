/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-07-07 20:59:35
 * @version $Id$
 */

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.benchmarking.clearHostResolverCache()
  chrome.benchmarking.closeConnections()
  chrome.tabs.executeScript(tab.id, { code: 'location.reload()' })
})
