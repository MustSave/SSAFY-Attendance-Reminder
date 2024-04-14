chrome.webRequest.onCompleted.addListener(details => {
        if (details.statusCode >= 400) return;
        const today = new Date().toDateString();
        console.log(details.url, details.statusCode, today);
        chrome.storage.local.set({ "lastLoginDate": today });
    },
    { urls: ["https://edu.ssafy.com/edu/mycampus/attendance/attendanceClassCheckIn.do"] }
);
setInterval(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    if ((hours === 8 && [30, 45, 55, 58].includes(minutes))) {
        chrome.storage.local.get("lastLoginDate", function(data) {
            const storedDate = data.lastLoginDate;
            const today = new Date().toDateString();
            if (storedDate === today) return;

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (!tabs?.at(0)?.id) return;
                chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
            });
        });
    }
}, 58000); // Check every minute