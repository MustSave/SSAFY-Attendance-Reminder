chrome.webRequest.onCompleted.addListener(details => {
        if (details.statusCode >= 400) return;
        const isCheckin = details.url.includes("CheckIn");
        const today = new Date().toDateString();
        // console.log(details.url, details.statusCode, today);

        if (isCheckin) chrome.storage.local.set({ lastCheckinDate: today });
        else chrome.storage.local.set({ lastCheckoutDate: today });
    },
    { urls: ["https://edu.ssafy.com/edu/mycampus/attendance/attendanceClassCheckIn.do", "https://edu.ssafy.com/edu/mycampus/attendance/attendanceClassCheckOut.do"] }
);

const intervalTime = 58000;
setInterval(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const checkinCond = hours === 8 && [30, 45, 55, 58].includes(minutes);
    const checkOutCond = hours === 18 && [5, 10, 15, 20, 25, 28].includes(minutes);

    if (!checkinCond && !checkOutCond) return;

    const key = checkinCond ? "lastCheckinDate" : "lastCheckoutDate";
    chrome.storage.local.get(key, (data) => {
        const storedDate = data[key];
        const today = new Date().toDateString();
        if (storedDate === today) return;

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (!tabs?.at(0)?.id) return;
            chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
        });
    });
}, intervalTime);