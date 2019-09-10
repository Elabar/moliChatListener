console.log("Connecting to the server...")
var admin = new WebSocket("wss://cloud.achex.ca/moliAssist");
admin.onopen = function(event){
    console.log("Connected to the server")
    setInterval(function(){
        console.log("RC packet");
        var joinNoti = {
            "toH": "moliAssist",
            "msg": "JOINED MOLI ASSIST SERVER 023146"
        };
        admin.send(JSON.stringify(joinNoti));
    }, 300000);
    var data = {
        "auth": "CHECKSTATUSACC",
        "passwd": "none"
    };
    admin.send(JSON.stringify(data));
    var hub = {
        "joinHub": "moliAssist"
    }
    console.log("Joining hub...")
    admin.send(JSON.stringify(hub));
}

admin.onmessage = function(event){
    var data = JSON.parse(event.data)
    if(data.auth == "OK"){
        console.log("Joined hub")
        console.log("Listening to new message...")
    }
    if(data.toH == "moliAssist" && data.msg != "JOINED MOLI ASSIST SERVER 023146") {
        console.log(data)
        var msg = data.FROM + ": " + data.msg;
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function(tabs) {
            if(tabs.length > 0){
                if(tabs[0].url != "https://moli.surge.sh/chatv2"){
                    var opt = {
                        type: "basic",
                        title: "New message from moli.surge.sh",
                        message: msg,
                        iconUrl: "noti.png"
                    }
                    chrome.notifications.create("", opt)
                }
            }else{
                var opt = {
                    type: "basic",
                    title: "New message from moli.surge.sh",
                    message: msg,
                    iconUrl: "noti.png"
                }
                chrome.notifications.create("", opt)
            }
        });
        console.log("Listening to new message...")
    }
}

chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
    chrome.tabs.create({url: "https://moli.surge.sh/chatv2"});
});