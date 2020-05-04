

const inquirer = require('inquirer');
const operaters = require('./operaters');
const fs = require('fs');
const path = require('path');

const allOperaters = operaters.getAllOperaters();
const listAllOperaters = () => console.table(allOperaters);

let curOperater = '';
let sourceDir = '';


const askOperater = () => {
    return inquirer.prompt({
        name: "index",
        type: "number",
        message: "What operater? please input index. >> "
    }).then(res => {
        curOperater = allOperaters[res.index];
    })
}

const askSource = () => {
    return inquirer.prompt({
        name: "dir",
        type: "input",
        message: "input source dir >> "
    }).then(res => {
        sourceDir = res.dir;
    })
}

const startWork = async () => {
    let files = fs.readdirSync(sourceDir, { withFileTypes: true }).filter(item => !item.isDirectory() && item.name !== '.DS_Store');

    // 第一种启动方式，按文件
    let startWorkType = curOperater.startWorkType;
    console.log('startWorkType', startWorkType);
    if (startWorkType === 1) {
        
        if (!files || files.length <= 0) return Promise.resolve(true);
        for(file of files) {
            await operaters[curOperater.name](path.resolve(sourceDir, file.name));
        }
    } else if (startWorkType === 2) {
        await operaters[curOperater.name](sourceDir);
    }

}

module.exports = {
    listAllOperaters,
    askOperater,
    askSource,
    startWork
}