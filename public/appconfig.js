// var BASE_URL = "http://127.0.0.1:80/"
var BASE_URL = null //"http://47.96.23.168:38081/north-api/"
var BASE_WS_URL = null
var SSO_URL = null //"http://47.96.23.168:38081/north-api/"
var htmlTitle = "VUE工具箱"

window.title = htmlTitle
document.getElementsByTagName("title")[0].innerText = htmlTitle;

if (!BASE_URL) {
    BASE_URL = "http://127.0.0.1:80/"
}
if (!BASE_WS_URL) {
    BASE_WS_URL = BASE_URL.startsWith("https") ? BASE_URL.replace("https", "wss") : BASE_URL.replace("http", "ws")
}
if (!SSO_URL) {
    SSO_URL = "http://127.0.0.1:80/"
}
window.isDev = false

window.BASE_URL = BASE_URL
window.BASE_WS_URL = BASE_WS_URL
window.SSO_URL = SSO_URL
window.appText = "客户端下载地址 <br> 链接：<a href='https://pan.baidu.com/s/1TckrxxV-lWm78shQRnRvPQ'>下载</a> <br>提取码：89ky "
