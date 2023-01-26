const ora = require('ora');
const spinner = ora()
function oraStart(text = 'Downloading...'){
    spinner.start(text);
}
function oraStop(text = 'stop'){
    spinner.stop(text);
}
function oraSucceed(text = 'success'){
    spinner.succeed(text);
}
function oraFail(text = 'fail'){
    spinner.fail(text);
}
function oraStreamWritable(text){
    spinner.stream.Writable = text;
}
function oraText(text){
    spinner.text = text;
}
module.exports = {
    oraStart,
    oraStop,
    oraSucceed,
    oraFail,
    oraText,
    oraStreamWritable
}
