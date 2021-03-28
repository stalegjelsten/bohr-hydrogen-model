//let a_0 = 5.29e-11;
let a_0 = 8;
let incr = 0;
let rydberg = 2.179e-18;
let planck = 6.626e-34;
let cSpeed = 3e8;
let energyLevels = [];
let electron;
let exciteButton;
let emitButton;

function setup() {
  createCanvas(600, 600);
  textFont("monospace");
  textSize(8);
  frameRate(60);
  background(220);
  createP("");
  electron = new Electron(width / 2 + energyLevels[0], height / 2, 6);
  exciteButton = createButton("Eksitér!");
  emitButton = createButton('Emittér!');
  // button.mousePressed(emitter(currentN-1));
  exciteButton.mouseReleased(eksiter)
  emitButton.mouseReleased(emitter)
  for (n = 1; n < 7; n++) {

    noFill();
    let d = 2 * n * n * a_0;

    ellipse(width / 2, height / 2, d, d);
    fill(0);
    text("n = " + n, (width / 2) - 8, height / 2 + d / 2 + 6);
    energyLevels.push(d / 2);


  }

}

function draw() {
  stroke(0);
  electron.emit();
  fill(255, 0, 0);
  ellipse(width / 2, height / 2, 8);
  fill(0);
  text("+", width / 2 - 2, height / 2 + 2);

  for (n = 1; n < 7; n++) {

    noFill();
    let d = 2 * n * n * a_0;

    ellipse(width / 2, height / 2, d, d);
    fill(0);
    text("n = " + n, (width / 2) - 11, height / 2 + d / 2 + 6);

  }

  // let r = width / 2 + 10 + incr;
  fill(255, 255, 0);
  electron.move();
  electron.display();
  // ellipse(r, height / 2, 6, 6);
  // ellipse(r_0, height/2, 8, 8);

  textSize(12)
  text("Bohrs atommodell for Hydrogen", width-215, 20);
  fill(0);
  textSize(16);
  text("∆E = " + (electron.E*1e18).toPrecision(4) + " aJ", 20, 20);
  text(" 𝜆 = " + electron.lam + " nm", 21, 40);
  text(" n = " + electron.currentN, 20, 60);
  if (incr > (width / 2) || incr < energyLevels[0]) {
    incr = energyLevels[0];
  }
  textSize(8);
}

class Electron {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.destX = x;
    this.lam = 0;
    this.theta = 0;
    this.currentN = 1;
    this.lengde = 0;
    this.x0 = width / 2;
    this.E = 0;
  }

  move() {
    this.x = this.x0 + incr;
  }

  emit() {
    if (this.destX < this.x) {
      incr -= 1.5;
      if (this.lam == 434) {
        stroke(40, 0, 255);
        fill(40, 0, 255);
        // background(40, 0, 255);
      } else if (this.lam == 486) {
        stroke(0, 239, 255)
        fill(0, 239, 255)
        // background(0, 239, 255);
      } else if (this.lam == 656) {
        stroke(255, 0, 0)
        fill(255, 0, 0)
        // background(0, 102, 255);
      } else if (this.lam == 410) {
        stroke(126, 0, 219)
        fill(126, 0, 219)
        // background(126, 0, 219);
      }
      background(220);

      // strokeWeight(2);
      let xstart = this.x - 2;
      let ystart = this.y;
      let xslutt = this.lengde * cos(this.theta) + this.x;
      let yslutt = this.lengde * sin(this.theta) + this.y;

      line(xstart, ystart, xslutt, yslutt);
      triangle(1.10 * this.lengde * cos(this.theta) + this.x, 1.10 * this.lengde * sin(this.theta) + this.y, this.lengde * cos(this.theta - 0.05) + this.x, this.lengde * sin(this.theta - 0.05) + this.y, this.lengde * cos(this.theta + 0.05) + this.x, this.lengde * sin(this.theta + 0.05) + this.y);
      fill(0);
      stroke(0);

    } else {
      background(220);
    }
  }

  moveToClosest(i) {
    incr = energyLevels[i];
  }

  emitToX(h) {
    this.destX = width / 2 + h;

  }

  display() {
    ellipse(this.x, this.y, this.r, this.r);
    fill(0);
  }


}

function mouseDragged() {
  incr = incr + 3;
  electron.destX = 1000;
}

function mouseReleased() {
  for (i = energyLevels.length; i >= 0; i--) {
    if (incr >= energyLevels[i]) {
      electron.moveToClosest(i);
      electron.currentN = i + 1;
      break;
    }
  }
  if (mouseButton === RIGHT) {
    emitter(electron.currentN - 1);
  }
}

function eksiter() {
  incr = energyLevels[electron.currentN];
  electron.currentN = electron.currentN + 1;
  electron.destX = 1000;
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    emitter();
  } else if (keyCode === UP_ARROW) {
    eksiter()
  } else if (key == "1") {
    incr = energyLevels[0];
    electron.currentN = 1
    electron.destX = 1000;
  } else if (key == "2") {
    incr = energyLevels[1];
    electron.currentN = 2
    electron.destX = 1000;
  } else if (key == "3") {
    incr = energyLevels[2];
    electron.currentN = 3
    electron.destX = 1000;
  } else if (key == "4") {
    incr = energyLevels[3];
    electron.currentN = 4
    electron.destX = 1000;
  } else if (key == "5") {
    incr = energyLevels[4];
    electron.currentN = 5
    electron.destX = 1000;
  } else if (key == "6") {
    incr = energyLevels[5];
    electron.currentN = 6
    electron.destX = 1000;
  } else if (key == "q") {
    emitTo(1);
  } else if (key == 'w') {
    emitTo(2);
  } else if (key == "e") {
    emitTo(3);
  } else if (key == "r") {
    emitTo(4);
  } else if (key == "t") {
    emitTo(5);
  } else if (key == "y") {
    emitTo(6);
  }

}

function emitTo(n) {
  let oldN = electron.currentN;
  electron.destX = width / 2 + energyLevels[n-1];
  electron.currentN = n
  electron.E = (- (rydberg) * (1 / (oldN * oldN) - 1 / (electron.currentN * electron.currentN)));
  electron.lam = floor((cSpeed * planck) / abs(electron.E) * 1e9);
  electron.theta = random(0, TWO_PI);
  electron.lengde = map(electron.E, 1e-20, 3e-18, 30, 150);
}

function emitter() {
  if (electron.currentN == 1){
    return;
  }
  let origX = electron.x;
  let oldN = electron.currentN;
  to_jump = random(energyLevels.slice(0, electron.currentN - 1));
  // electron.emitToX(to_jump);
  electron.destX = width / 2 + to_jump;
  electron.currentN = energyLevels.indexOf(to_jump) + 1;

  electron.E = (- (rydberg) * (1 / (oldN * oldN) - 1 / (electron.currentN * electron.currentN)));
  electron.lam = floor((cSpeed * planck) / abs(electron.E) * 1e9);
  electron.theta = random(0, TWO_PI);
  electron.lengde = map(electron.E, 1e-20, 3e-18, 30, 150);
}