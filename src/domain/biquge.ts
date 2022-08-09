export default {
    "name": "笔趣阁",
    "url": "https://www.xbiquge.so",
    "searchUrlChartSet": "gbk",
    "searchUrl": "/modules/article/search.php?searchkey={name}",
    "parseSearch": {
        "list": "#main li",
        "url": ".s2 a:href",
        "content": ".s2"
    },
    "parseCatalog": {
        "list": "dd a",
        "url": ":href",
        "content": ""
    },
    "parseContent": {
        "content": "#content"
    }
};