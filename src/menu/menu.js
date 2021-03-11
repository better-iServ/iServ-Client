const { remote, app } = require('electron');
const fs = require('fs');
request = require('request');    

let domain_ = ""

var contin = document.getElementById('cont');
var change = document.getElementById('chan');
var settings = document.getElementById('set');
var server = document.getElementById('server');
var image = document.getElementById('image');
var tipp = document.getElementById('tipp');

function log(msg)
{
  var timestamp = Date.now(),
  date = new Date(timestamp)
  fs.appendFile(remote.app.getPath("userData") + "\\app.log", `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${msg} \n`, function (err) {
    if (err) throw err;
  });
}

var win = remote.getCurrentWindow()
var application = remote.app
try 
{
    const data = fs.readFileSync(remote.app.getPath('userData') + '\\iserv.domain', 'utf8')
    console.log(data)
    domain_ = data;

} catch (err) {

  
}



server.innerHTML = "<b>" + domain_ + "</b>";
image.src = "https://" + domain_ + "/iserv/logo/logo.png"



let theme = fs.readFileSync(remote.app.getPath('userData') + '\\current.theme', 'utf8')
if(theme === "0")
{
    if(Math.floor(Math.random() * 5) < 1) tipp.innerHTML = "<strong>Tipp: </strong> Du kannst das Design von iServ in den Einstellungen ändern."
} 
else if(theme === "1")
{
    tipp.innerHTML = ""
} 



contin.addEventListener('click', () => { 

    log("Menu: Continue with " + domain_)
    fs.writeFile(remote.app.getPath('userData') + '\\menu.showed', "menu showed => continue", function (err) {
        if (err) return console.log(err);
        finish()
    });
    fs.writeFile(remote.app.getPath('userData') + '\\update.later', "update later", function (err) {
        if (err) return console.log(err);
    });

});

settings.addEventListener('click', () => { 

    win.loadFile(__dirname  + "/settings.html")

});

change.addEventListener('click', () => { 
    log("Menu: Change account...")
    try {
        fs.unlinkSync(remote.app.getPath('userData') + '\\iserv.domain');
        console.log('successfully deleted pref file');
        fs.writeFile(remote.app.getPath('userData') + '\\update.later', "update later", function (err) {
            if (err) return console.log(err);
        });
        finish()
    } catch (err) {
        console.log(err);
    }
});

function finish()
{
    log("#### MENU CLOSED => RELAUNCHING APP ####")
    application.relaunch()
    application.exit()
}