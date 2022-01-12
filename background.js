let urls = [
  [
    "https://calendar.google.com/calendar/u/0/r",
    "https://mail.google.com/mail/u/0/#inbox",
  ],
  ["http://43.155.63.159:3000/", "https://www.tradingview.com/chart/CokzC3Lj/"],
  ["https://google.com", "https://baidu.com"],
];
chrome.runtime.onInstalled.addListener(() => {});

function getIndexParams(command) {
  var _command = command.split("-");
  return Number(_command[1]);
}

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);

  if (command.indexOf("tab") === -1) {
    return;
  }

  let indexParams = getIndexParams(command);
  let urlList = urls[indexParams];
  if (!urlList) {
    return;
  }

  var index = 0;
  urlList.forEach((url) => {
    chrome.windows.create({ url: url }, function (_windowCb) {
      let gridWidth = Math.floor(_windowCb.width / urlList.length);
      chrome.windows.update(_windowCb.id, {
        left: index++ * gridWidth,
        top: 0,
        width: gridWidth,
      });
    });
  });
});
