import { strict } from "assert";

const fs = require("fs");
const path = require("path");
const os = require("os");
export class Import {
    public rule = /\s{1}第.{1,7}(章|节|集|卷|部|篇).{0,}/g;
    public navList:any = [];
    public content: any = [];
    public log;
    public success;
    constructor(success=(e:any)=>{},file: string = "", log =(text:any)=>{}) {
        this.log = log;
        this.success = success;
        if (file) {
            this.read(file);
        }
    }

    on(text: any) {
        this.log(text);
    }

    read(file: string) {
        var platform = os.platform();
        if (platform.search("win") !== false) {
            file = file.replace('\/', '');
        }
        var data = fs.readFileSync(file);
        this.praseNav(data.toString());
        this.praseContent(data.toString());
        this.success(this);
    }

    praseNav(text: string) {
        this.on('正在解析目录');
        var navList;
        while (navList = this.rule.exec(text)) {
            this.navList.push([navList[0]]);
        }
        this.on('解析目录结束');
    }

    praseContent(text: string) {
        this.on('正在解析章节内容');
        var content = text.split(this.rule);
        var contents: any = [];
        var i = -1;
        for (var key in content) {
            if (content[key].length === 1 && '章节集卷部篇'.search(content[key]) !== -1) {
                i += 1;
            }
            if (i >= 0) {
                contents[i] = content[key];
            }
        }
        this.content = contents;
        this.on('解析章节内容结束');

    }

}