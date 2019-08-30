var admin = new WebSocket("wss://cloud.achex.ca/moliAssist");
admin.onopen = function(event){
    var data = {
        "auth": "CHECKSTATUSACC",
        "passwd": "none"
    };
    admin.send(JSON.stringify(data));
    var hub = {
        "joinHub": "moliAssist"
    }
    admin.send(JSON.stringify(hub));
}

admin.onmessage = function(event){
    var data = JSON.parse(event.data)
    if(data.toH == "moliAssist" && data.msg != "JOINED MOLI ASSIST SERVER 023146") {
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
    }
}