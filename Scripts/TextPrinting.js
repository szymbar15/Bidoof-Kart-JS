function printingTextOnScreen() {
    ctx.fillStyle = "black";
    ctx.font = "20px Bungee";
    ctx.strokeStyle = 'white';
    ctx.miterLimit = 2;
    ctx.lineJoin = 'circle';
    var currentTime = Math.floor(mainGameProperties.currentLapTime/1000 % 60)  + ":" + ("000" + Math.round(mainGameProperties.currentLapTime % 1000)).slice(-3);
    // draw an outline, then filled
    strokeText(currentTime, canvas.width*0.02, canvas.height*0.05, 5);
    strokeText("Lap " + mainGameProperties.currentLap, canvas.width*0.92, canvas.height*0.05, 5);
    strokeText("PB: " + Math.floor(mainGameProperties.currentBestLapTime/1000 % 60) + ":" + ("000" + Math.round(mainGameProperties.currentBestLapTime % 1000)).slice(-3), canvas.width*0.02, canvas.height*0.97, 5);
    
    if (mainGameProperties.newLapTextFrame>0) {
        ctx.font = 20+mainGameProperties.newLapTextFrame/2 + "px Bungee";
        var toPrint = '';
        if (mainGameProperties.previousLapTime==mainGameProperties.currentBestLapTime)
            toPrint += "PB! "
        toPrint += Math.floor(mainGameProperties.previousLapTime/1000 % 60) + ":" + ("000" + Math.round(mainGameProperties.previousLapTime % 1000)).slice(-3);
        if (!(mainGameProperties.newLapTextFrame%4==0) || !(mainGameProperties.newLapTextFrame%4==1)) {
            strokeText(toPrint, canvas.width*0.40-mainGameProperties.newLapTextFrame, canvas.height*0.45+mainGameProperties.newLapTextFrame/2,15);
        }

        mainGameProperties.newLapTextFrame++;
        if (mainGameProperties.newLapTextFrame>150) 
            mainGameProperties.newLapTextFrame=0;
    }
    
}

function menuText() {
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.miterLimit = 2;
    ctx.lineJoin = 'circle';
    ctx.fillStyle = "white";
    ctx.font = "30px Bungee";
    strokeText("Select your favorite character!", canvas.width*0.265, canvas.height*0.2, 8);
    ctx.font = "20px"
    switch (menuThings.selectedId) {
        case 0:
            strokeText("The leader of the bunch, Bidoof!", canvas.width*0.27, canvas.height*0.35, 8);
            break;
        case 1:
            strokeText("WOBBAWOBBAfett, confirmed epic each time.", canvas.width*0.205, canvas.height*0.35, 8);
            break;
        case 2:
            strokeText("Ludicolo instantly accelerates. He's cool.", canvas.width*0.205, canvas.height*0.35, 8);
            break;
        case 3:
            strokeText("The cutest member of Corpish family!", canvas.width*0.235, canvas.height*0.35, 8);
            break;
        case 4:
            strokeText("Probopass is extremely hard to navigate...", canvas.width*0.205, canvas.height*0.35, 8);
            break;
        case 5:
            strokeText("Stunfisk's stuck on a different planet.", canvas.width*0.235, canvas.height*0.35, 8);
            break;
    }
    

    ctx.fillText("OK", canvas.width/2-20, canvas.height-canvas.height/4+54);
}

function strokeText(text, width, height, targetWidth) {
    ctx.lineWidth = targetWidth;
    ctx.strokeText(text, width, height);
    ctx.lineWidth = 1;
    ctx.fillText(text, width, height);
}

function countdownClock() {
    ctx.fillStyle = 'rgba(255,140,0,1)';
    ctx.font = 30 + (300-mainGameProperties.countdownClock)/2 + "px Bungee";
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.miterLimit = 2;
    ctx.lineJoin = 'circle';
    var currentAlpha = 1;
    var beforeCountdown = document.getElementById("start-your-engines");
    if (mainGameProperties.countdownClock>200) {
        beforeCountdown.play();
        beforeCountdown.volume = 0.5;
    } else if (mainGameProperties.countdownClock>140 && mainGameProperties.countdownClock<=200) {
        var countdown = document.getElementById("countdown");
        countdown.play();
        countdown.volume = 0.5;
        currentAlpha = (mainGameProperties.countdownClock-140)/60;
        ctx.fillStyle = 'rgba(255,140,0,' + currentAlpha + ')';
        ctx.strokeStyle = 'rgba(0,0,0,' + currentAlpha + ')';
        strokeText("3", canvas.width*0.49, canvas.height*0.55, 10);
    } else if (mainGameProperties.countdownClock>80 && mainGameProperties.countdownClock<=200) {
        currentAlpha = (mainGameProperties.countdownClock-80)/60;
        ctx.fillStyle = 'rgba(255,140,0,' + currentAlpha + ')';
        ctx.strokeStyle = 'rgba(0,0,0,' + currentAlpha + ')';
        strokeText("2", canvas.width*0.49, canvas.height*0.55, 10);
    } else if (mainGameProperties.countdownClock>0 && mainGameProperties.countdownClock<=100) {
        currentAlpha = (mainGameProperties.countdownClock)/80;
        ctx.fillStyle = 'rgba(255,140,0,' + currentAlpha + ')';
        ctx.strokeStyle = 'rgba(0,0,0,' + currentAlpha + ')';
        strokeText("1", canvas.width*0.49, canvas.height*0.55, 10);
    } else if (mainGameProperties.countdownClock<=0 && mainGameProperties.goClock>0) {
        currentAlpha = (mainGameProperties.goClock)/100;
        ctx.font = 200 + (300-mainGameProperties.countdownClock)/2 + "px Bungee";
        ctx.fillStyle = 'rgba(255,140,0,' + currentAlpha + ')';
        ctx.strokeStyle = 'rgba(0,0,0,' + currentAlpha + ')';
        strokeText("GO!", canvas.width*0.25, canvas.height*0.7, 10);

        mainGameProperties.goClock--;
    }
    if (mainGameProperties.goClock<30) {
        var f8 = document.getElementById("f8-circuit");
        f8.play();
        f8.loop = true;
        f8.volume = 0.5;
    }
    if (!beforeCountdown.paused) {
        mainGameProperties.initiated = true;
    }    
    if (mainGameProperties.initiated) {
        mainGameProperties.countdownClock--;
    } else {
        ctx.fillText("Loading...", canvas.width*0.5, canvas.height*0.05);
    }
}