var block = document.getElementsByClassName('block');
var score = document.getElementById('score');
var start = document.getElementById('start');
var chose = document.getElementById('chose')
var done = document.getElementById('done');
var wait = document.getElementById('wait');
var noti = document.getElementById('noti')
var popup = document.getElementById('popup')
var control = document.getElementById('control')
var replay = document.getElementById('replay')
var quit = document.getElementById('quit')
var game = document.getElementById('game')
var qg = document.getElementById('qg')
var gd = document.getElementById('game-display')

var home = document.getElementById('home')
var toplay = document.getElementById('toplay');
var guide = document.getElementById('guide');
var settings = document.getElementById('settings');
var about = document.getElementById('about');

var audio
var win
var lose

var sfx = document.getElementById('sfx')
var sw = document.getElementById('sw')

audio = new Audio('click.mp3')
lose = new Audio('lose.mp3')
win = new Audio('win.mp3')

var sound = false;
if (sfx.checked) {
    sound = true;
}
else {
    sound = false;
}
sfx.onchange = function () {
    if (this.checked) {
        sound = true;
    }
    else {
        sound = false;
    }
}

var scr = 0;
score.innerText = scr;

popup.open = false;

var i;
for (var i = 0; i < block.length; i++) {
    block[i].style.visibility = "hidden";
}
done.style.visibility = "hidden";

start.onclick = function () {
    play();
}

replay.onclick = function () {
    play();
}

function play() {
    start.innerText = "Play again"
    noti.innerText = ""
    popup.open = false;
    for (var i = 0; i < block.length; i++) {
        block[i].style.visibility = "visible";
    }
    scr = 0;
    score.innerText = scr;
    game.style.filter = "unset"

    manclick()
}

function manclick() {
    var m = remain();
    var count = 0;

    if (m === 25) {
        popup.style.textAlign = "center";
        noti.innerText = "You lose with the score of " + String(scr) + "!";
        control.style.visibility = "visible";

        if (sound === true) {
            lose = new Audio('lose.mp3')
            lose.play()
        }

        popup.open = true;
        done.style.visibility = "hidden";

        gd.style.filter = "blur(3px)";
        return;
    }

    done.style.visibility = "visible"
    popup.open = false;
    gd.style.filter = "none"

    for (i = 0; i < block.length; i++) {
        block[i].onclick = function () {
            var n = remain();
            if (n === 24) { count = 4 }

            if (this.style.visibility === "visible") {
                this.style.visibility = "hidden";
                if (sound === true) {
                    audio = new Audio('click.mp3')
                    audio.play()
                }

                scr++;
                score.innerText = scr;
                count++;
                console.log(count);
                chose.click();
            }
        }
    }

    done.onclick = function () {
        count = 5;
        chose.click();
    }

    chose.onclick = function () {
        if (count >= 5) {
            console.log("hehe");
            for (i = 0; i < block.length; i++) {
                block[i].onclick = function () {
                    console.log("no")
                }
            }
            popup.style.textAlign = "unset";
            control.style.visibility = "hidden";
            noti.innerText = "Your turn is ended. Now it is computer's..."
            popup.open = true
            gd.style.filter = "blur(3px)";

            comclick()
        }
    }

}

function comclick() {
    var m = remain();
    if (m === 25) {
        popup.style.textAlign = "center";
        noti.innerText = "You win with the score of " + String(scr) + "!";
        control.style.visibility = "visible";

        if (sound === true) {
            win = new Audio('win.mp3')
            win.play()
        }

        popup.open = true
        done.style.visibility = "hidden";
        gd.style.filter = "blur(3px)";
        return;
    }

    var n = 25 - remain();
    if (n <= 5) {
        popup.style.textAlign = "center";
        noti.innerText = "You lose with the score of " + String(scr) + "!";
        control.style.visibility = "visible";
        popup.open = true

        if (sound === true) {
            lose = new Audio('lose.mp3')
            lose.play()
        }

        var bruh;
        for (bruh = 0; bruh < block.length; bruh++) {
            block[bruh].style.visibility = "hidden";
        }

        done.style.visibility = "hidden";
        gd.style.filter = "blur(3px)";
        return;
    }

    done.style.visibility = "hidden";
    wait.style.visibility = "visible";
    wait.style.animation = "rotate 3s"
    setTimeout(() => {
        noti.innerText = ""
        wait.style.visibility = "hidden";
        wait.style.animation = "unset"
        game.style.filter = "unset";
        popup.open = false

        var arr = []

        var i
        var k = 0;
        for (i = 0; i < block.length; i++) {
            if (block[i].style.visibility === "visible") {
                arr[k] = i;
                k++
            }
        }

        var hehe = arr.length;
        var aturn = 5

        var turn;
        var cho;

        for (turn = 0; turn < aturn; turn++) {
            cho = Math.floor(Math.random() * hehe)
            block[arr[cho]].style.visibility = "hidden";
        }

        manclick()
    }, 3000);

}

function remain() {
    var n = 0;
    for (i = 0; i < block.length; i++) {
        if (block[i].style.visibility === "hidden") {
            n++;
        }
    }
    return n;
}

toplay.onclick = function () {
    home.style.animation = "fadeout 500ms"
    home.style.visibility = "hidden"
    game.style.animation = "fadein 500ms"
    game.style.visibility = "visible"

    play()
}

qg.onclick = function () {
    game.style.animation = "fadeout 500ms"
    game.style.visibility = "hidden"

    wait.style.visibility = "hidden"
    var q;
    for (q = 0; q < block.length; q++) {
        block[q].style.visibility = "hidden"
    }
    done.style.visibility = "hidden"
    control.style.visibility = "hidden"

    home.style.animation = "fadein 500ms"
    home.style.visibility = "visible"
}

quit.onclick = function () {
    win.pause()
    lose.pause()
    
    game.style.animation = "fadeout 500ms"
    game.style.visibility = "hidden"

    wait.style.visibility = "hidden"
    var q;
    for (q = 0; q < block.length; q++) {
        block[q].style.visibility = "hidden"
    }
    done.style.visibility = "hidden"
    control.style.visibility = "hidden"

    home.style.animation = "fadein 500ms"
    home.style.visibility = "visible"
}

var how = document.getElementById('how')
var got = document.getElementById('got')

guide.onclick = function () {
    got.style.visibility = "visible"
    how.style.animation = "down 500ms"
    how.style.visibility = "visible"
}

got.onclick = function () {
    got.style.visibility = "hidden"
    how.style.animation = "up 500ms"
    setTimeout(function () {
        how.style.visibility = "hidden"
    }, 300)
}

var ab = document.getElementById('ab')
var gotab = document.getElementById('gotab')

about.onclick = function () {
    gotab.style.visibility = "visible"
    ab.style.animation = "downab 500ms"
    ab.style.visibility = "visible"
}

gotab.onclick = function () {
    gotab.style.visibility = "hidden"
    ab.style.animation = "upab 500ms"
    setTimeout(function () {
        ab.style.visibility = "hidden"
    }, 300)
}

var set = document.getElementById('set')
var doneset = document.getElementById('doneset')

settings.onclick = function () {
    sw.style.visibility = "visible"
    doneset.style.visibility = "visible"
    set.style.animation = "downst 600ms"
    set.style.visibility = "visible"
}

doneset.onclick = function () {
    sw.style.visibility = "hidden"
    doneset.style.visibility = "hidden"
    set.style.animation = "upst 600ms"
    setTimeout(function () {
        set.style.visibility = "hidden"
    }, 300)
}

var rotate = document.getElementById('rotate')
var display = document.getElementById('display')
if (window.innerWidth > window.innerHeight) {
    rotate.style.visibility = "visible";
    display.style.display ="none"
}

else {
    rotate.style.visibility = "hidden";
    display.style.display ="flex"
}

window.onresize = function () {
    if (window.innerWidth > window.innerHeight) {
        rotate.style.visibility = "visible";
        display.style.display="none"
    }

    else {
        rotate.style.visibility = "hidden";
        display.style.display="flex"
    }
}