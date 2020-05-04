const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const fs = require('fs');


const audioConvert = (source, target, targetType) => {
    if (path.extname(source) === `.${targetType}`) return Promise.resolve({code: 0, msg: `已经是${targetType}格式，无需转换`})

    let filename =  path.basename(source, path.extname(source)) + `.${targetType}`;
    
    let targetDir = path.resolve(path.dirname(source), config.output);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    };
    
    if (!target) target = path.resolve(targetDir, filename);

    return new Promise((resolve, reject) => {
        let res = shell.exec(`ffmpeg -i ${source}  ${target}`);
        if (res.code === 0) resolve(res);
        else reject(res)
    })
}
/**
 * 音频转换成mp3格式
 * @param {*} source 
 * @param {*} target 
 */
const audioConvertMp3 = (source, target) => audioConvert(source, target, 'mp3');
const audioConvertM4a = (source, target) => audioConvert(source, target, 'm4a');


const getFilesByDir = dir =>  fs.readdirSync(dir, { withFileTypes: true }).filter(item => !item.isDirectory() && item.name !== '.DS_Store');
/**
 * 获取
 * @param {*} dir 
 * @param {*} withExtname 
 */
const getFilesNameByDir = (dir, withExtname = false) => {
    let files = getFilesByDir(dir);
    const arr = files.map(item => path.basename(item.name, path.extname(item.name)));
    fs.writeFileSync(path.resolve(dir, 'filesName.json'),  JSON.stringify(arr));
}

const getAllOperaters = utils => {
    return [
        {name: 'audioConvertMp3', mean: '音频转换成mp3格式', params: '(source, [target])', startWorkType: 1},
        {name: 'audioConvertM4a', mean: '音频转换成m4a格式', params: '(source, [target])', startWorkType: 1},
        {name: 'getFilesNameByDir', mean: '获取指定目录下所有文件名', params: '(dir)', startWorkType: 2}
    ]
}

module.exports = {
    audioConvertMp3,
    audioConvertM4a,
    getAllOperaters,
    getFilesNameByDir
}