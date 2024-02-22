
const fs = require('fs');
const path = require('path');
const nodeHtmlParser = require('node-html-parser');
const urlRegex = require('url-regex');
const { glob } = require("glob");



const urlPattern = /(https?:\/\/[^/]*)/i;
const urls = new Set()

async function searchDomain() {
    // 需要查找遍历dist目录下的css，js,html文件，读取其中的http链接
    // const files = await glob('dist/**/*.{js,css,html}');
    const files = await glob('dist/**/*.html');
    for (const file of files) {
        const source = fs.readFileSync(file, 'utf-8');
        // console.log('glob files :>>>>>>>>>>>>> ', source);
        const matches = source.match(urlRegex({strict: true}));
        console.log('matches urlRegex :>>>>>>>>>>>>> ', matches);
        if (matches) {
            matches.forEach((url)=> {
                const match = url.match(urlPattern);
                if(match && match[1]){
                    urls.add(match[1])
                }
            });
        }
    }
}

async function insertLinks(){
    // 找出Html入口文件，插入link标签
    const files = await glob('dist/**/*.html');
    const links = [...urls].map((url)=> `<link rel="dns-prefetch" href="${url}" />`).join('\n');
    for (const file of files) {
        const html = fs.readFileSync(file, 'utf-8');
        const dom = nodeHtmlParser.parse(html)
        const title = dom.querySelector('title');
        title.insertAdjacentHTML('afterend', links);
        fs.writeFileSync(file, dom.toString(), 'utf-8');
    }
}


async function main(){
    await searchDomain();
    console.log('matches urls :>>>>>>>>>>>>>>>>>>>>> ', urls);
    // html中插入link标签
    await insertLinks();
    console.log('main :>>>>>>>>> 文件链接dns-prefetch处理成功！');
}

main();