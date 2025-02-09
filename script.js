const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let leftX = 50, rightX = 350;
const speed = 5;
const alpacaWidth = 60; // Width of each alpaca
const stopDistance = alpacaWidth; // Stop when distance equals alpaca width

function drawAlpaca(x, color, hasGlasses, isFlipped = false) {
    ctx.save(); // Save the current canvas state
    if (isFlipped) {
        // Flip the alpaca horizontally
        ctx.translate(x + alpacaWidth, 0); // Move the origin to the right edge of the alpaca
        ctx.scale(-1, 1); // Flip horizontally
        x = 0; // Reset x to 0 after flipping
    }

    // Body
    ctx.fillStyle = color;
    ctx.fillRect(x, 130, alpacaWidth, 40); // Wider body for a better look

    // Neck and Head
    ctx.fillRect(x + 40, 100, 20, 30); // Neck
    ctx.fillRect(x + 50, 90, 30, 40);  // Head

    // Fluffy Ears
    ctx.beginPath();
    ctx.arc(x + 60, 95, 8, 0, Math.PI * 2); // Left ear
    ctx.arc(x + 80, 95, 8, 0, Math.PI * 2); // Right ear
    ctx.fill();

    // Eyes
    ctx.fillStyle = "black";
    ctx.fillRect(x + 60, 110, 5, 5); // Left eye
    ctx.fillRect(x + 75, 110, 5, 5); // Right eye

    // Glasses
    if (hasGlasses) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 58, 108, 10, 10); // Left glass
        ctx.strokeRect(x + 72, 108, 10, 10); // Right glass
        ctx.beginPath();
        ctx.moveTo(x + 68, 112);
        ctx.lineTo(x + 72, 112);
        ctx.stroke();
    }

    // Legs
    ctx.fillStyle = color;
    ctx.fillRect(x + 10, 170, 10, 20); // Front leg
    ctx.fillRect(x + 40, 170, 10, 20); // Back leg

    ctx.restore(); // Restore the canvas state
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAlpaca(leftX, "#ffcc80", true); // Left alpaca (facing right)
    drawAlpaca(rightX, "#ff80bf", true, true); // Right alpaca (facing left, flipped)
}

drawScene();

function moveAlpacas() {
    let interval = setInterval(() => {
        if (rightX - leftX <= alpacaWidth * 1.8) { // Stop when distance equals alpaca width
            clearInterval(interval);
            document.getElementById("heart").style.display = "block";
            document.getElementById("sound").play();
        } else {
            leftX += speed;
            rightX -= speed;
            drawScene();
        }
    }, 100);
}

function showBrokenHeart() {
    document.getElementById("broken-heart").style.display = "block";
}
