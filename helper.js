document.addEventListener("DOMContentLoaded", function(){
    var saved = localStorage.getItem("noti")
    if(saved === null){
        localStorage.setItem("noti",true)
    }else{
        if(saved == "true"){
            document.getElementById("noti").checked = true
        }
    }
    var checkbox = document.getElementById("noti")
    checkbox.addEventListener('click',function (){
        var check = document.getElementById("noti").checked
        localStorage.setItem("noti",check)
    })
})

console.log("loaded")