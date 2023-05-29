chrome.runtime.onInstalled.addListener(function (details) {
    const defaultData = {
        'radioSelection': [0, 1],
        'comment': '我对本课程非常满意。课程内容的深度、教师的专业知识和教学方法的实用性，都使我对这门课程感到满意。希望更多的人能参与到这样优秀的课程中来。',
        'checkboxSelection': 1,
        'autoSubmission': 1,
        'fillComment': 1
    };

    chrome.storage.local.get('MyCOS', function (result) {
        if (!result.MyCOS) {
            chrome.storage.local.set({ 'MyCOS': defaultData }, function () {
                console.log('Default values are set.');
            });
        }
    });
});

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.actionButtonClicked) {
//             chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                 const activeTab = tabs[0];
//                 chrome.scripting.executeScript({
//                     target: { tabId: activeTab.id },
//                     func: () => { console.log('You clicked the action button!'); }
//                 });
//             });
//         }
//     }
// );

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      chrome.storage.local.get('MyCOS').then((data) => {
        let mycosData = data.MyCOS;
  
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: function(data) {
            // Helper function to dispatch event
            function dispatchEventWithData() {
              var event = new CustomEvent('MyCOSData', { detail: data });
              window.dispatchEvent(event);
            }
            
            // Load the script you want to inject
            var script = document.createElement('script');
            script.src = chrome.runtime.getURL('MyCOS/MyCOS.js');
            script.onload = dispatchEventWithData;  // Dispatch the event once script has loaded
            document.head.appendChild(script);
          },
          args: [mycosData],
        })
        .then(() => {
          console.log('Injected mycos.js into tab: ' + tabId);
        })
        .catch(err => console.log('Injection failed: ', err));
      });
    }
  });
  