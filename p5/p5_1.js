let c1
let d1

let refresh
let c = []
let d = []

let ringNumber = 3
const gap = 15
const emptySpace = 5

let color = 255
// color = 0

let scaler = 0.825
let strokerboi = 6


function setup() {
  var c = createCanvas(200, 400);
  c.parent('p5Div');
  runSketch()
}

function runSketch() {

  for (let i = 0; i < ringNumber; i++) {
    c[i] = new circleRing(i * gap + emptySpace, ringNumber * gap + emptySpace)
  }
  for (let i = 0; i < ringNumber; i++) {
    d[i] = new circleRing2(i * gap + emptySpace, ringNumber * gap + emptySpace)
  }
}

function draw() {
  clear() // print(frameRate())

  push()
  translate(55, 54)
  scale(scaler)
  // circleUp()

  for (let i = 1; i < c.length; i++) {
    c[i].update()
  }

  pop()

  push()
  translate(145, 54)
  scale(scaler)
  // circleUp()

  for (let i = 1; i < c.length; i++) {
    d[i].update()
  }

  pop()

  if (frameCount % 40 === 0) {
    runSketch()
  }
}

class circleRing {
  constructor(radius, bigRadius) {
    //general
    // randomSeed(9223);

    this.random = random(0, 13)


    //cirler
    this.bigRadius = bigRadius
    this.rotate = 0.0015
    // this.rotate = 0.00025
    this.r = 13
    this.r2 = 12
    this.num = round(random(10, 20))
    this.circNum = round(random(6, 14))
    this.radius = radius
    this.angle = TAU / this.num
    this.circAngle = TAU / this.circNum

    //liner
    this.lineNum = random(1, 10)
    this.lineStroke = strokerboi

    //radianter
    this.lineLength = 30
    this.radius1 = this.radius + this.lineLength / 5
    this.radius2 = this.radius - this.lineLength / 5

    //squarer
    this.squareNum = round(random(6, 12))
    this.squareSize = 11
    this.squareAngle = TAU / this.squareNum
    this.squareRand = random(0, 2)

  }

  style() {
    // stroke(this.stroke)
    // fill(this.fill)
    noStroke()
    fill(color)
    // stroke(0)
    // noFill()
  }


  update(pos) {

    this.style()

    if (this.random < 3) {
      this.circler()
    } else if (this.random > 3 && this.random < 7) {
      this.liner()
    } else if (this.random > 7 && this.random < 10) {
      this.radianter()
    } else if (this.random > 10 && this.random < 13) {
      this.squarer()
    }

    // this.radianter()
    this.outliner()
  }

  //cirler////cirler////cirler////cirler////cirler////cirler//
  circler() {
    rotate(frameCount * this.rotate)

    noStroke()
    fill(color)

    for (let i = 0; i < this.circNum; i++) {

      this.x = sin(i * this.circAngle) * this.radius
      this.y = cos(i * this.circAngle) * this.radius

      ellipse(this.x, this.y, this.r)
    }
  }

  //liner////liner////liner////liner////liner////liner//
  liner() {

    stroke(color)
    noFill()
    strokeWeight(this.lineStroke)

    for (let i = 0; i < this.lineNum; i++) {

      circle(0, 0, (this.radius * 2) - (i * this.lineNum / 2) + (i * this.lineNum / 2))

    }
  }

  //radianter////radianter////radianter////radianter////radianter////radianter//
  radianter() {

    rotate(frameCount * this.rotate)
    stroke(color)
    strokeWeight(this.lineStroke)
    strokeCap(SQUARE)

    for (let i = 0; i < this.num; i++) {

      this.x1 = cos(i * this.angle) * this.radius1
      this.y1 = sin(i * this.angle) * this.radius1
      this.x2 = cos(i * this.angle) * this.radius2
      this.y2 = sin(i * this.angle) * this.radius2

      line(this.x1, this.y1, this.x2, this.y2)
    }
  }

  //squarer////squarer////squarer////squarer////squarer////squarer//
  squarer() {

    fill(color)
    noStroke()
    rectMode(CENTER)

    for (let i = 0; i < this.squareNum; i++) {

      push()
      translate(this.radius, 0)
      if (this.squareRand <= 1) {
        rotate(radians(45))
      }
      // console.log(this.squareRand)
      rect(0, 0, this.squareSize, this.squareSize)

      pop()
      rotate(this.squareAngle)
    }
  }

  outliner() {
    strokeWeight(this.lineStroke)
    // strokeWeight(5)
    noFill()
    stroke(color)
    circle(0, 0, this.bigRadius * 2)
    // circle(0, 0, this.radius)

    // circle(0, 0, 1)
    // line()
  }
}

class circleRing2 {
  constructor(radius, bigRadius) {
    //general
    // randomSeed(9223);

    this.random = random(0, 13)


    //cirler
    this.bigRadius = bigRadius
    this.rotate = 0.0015
    // this.rotate = 0.00025
    this.r = 13
    this.r2 = 12
    this.num = round(random(10, 20))
    this.circNum = round(random(6, 14))
    this.radius = radius
    this.angle = TAU / this.num
    this.circAngle = TAU / this.circNum

    //liner
    this.lineNum = random(1, 10)
    this.lineStroke = strokerboi

    //radianter
    this.lineLength = 30
    this.radius1 = this.radius + this.lineLength / 5
    this.radius2 = this.radius - this.lineLength / 5

    //petaler
    this.petNum = round(random(10, 50))
    // this.petNum = round(random(1,10))
    this.petSize = random(2, 20)
    this.petAngle = TAU / this.petNum
    this.petRadius = random(5, 20)
    this.petStroke = this.petRadius / 2

    //squarer
    this.squareNum = round(random(6, 12))
    this.squareSize = 11
    this.squareAngle = TAU / this.squareNum
    this.squareRand = random(0, 2)

  }

  style() {
    // stroke(this.stroke)
    // fill(this.fill)
    noStroke()
    fill(color)
    // stroke(0)
    // noFill()
  }


  update(pos) {

    this.style()

    if (this.random < 3) {
      this.circler()
    } else if (this.random > 3 && this.random < 7) {
      this.liner()
    } else if (this.random > 7 && this.random < 10) {
      this.radianter()
    } else if (this.random > 10 && this.random < 13) {
      this.squarer()
    }

    // this.radianter()
    this.outliner()
  }

  //cirler////cirler////cirler////cirler////cirler////cirler//
  circler() {
    rotate(frameCount * this.rotate)

    noStroke()
    fill(color)

    for (let i = 0; i < this.circNum; i++) {

      this.x = sin(i * this.circAngle) * this.radius
      this.y = cos(i * this.circAngle) * this.radius

      ellipse(this.x, this.y, this.r)
    }
  }

  //liner////liner////liner////liner////liner////liner//
  liner() {

    stroke(color)
    noFill()
    strokeWeight(this.lineStroke)

    for (let i = 0; i < this.lineNum; i++) {

      circle(0, 0, (this.radius * 2) - (i * this.lineNum / 2) + (i * this.lineNum / 2))

    }
  }

  //radianter////radianter////radianter////radianter////radianter////radianter//
  radianter() {

    rotate(frameCount * this.rotate)
    stroke(color)
    strokeWeight(this.lineStroke)
    strokeCap(SQUARE)

    for (let i = 0; i < this.num; i++) {

      this.x1 = cos(i * this.angle) * this.radius1
      this.y1 = sin(i * this.angle) * this.radius1
      this.x2 = cos(i * this.angle) * this.radius2
      this.y2 = sin(i * this.angle) * this.radius2

      line(this.x1, this.y1, this.x2, this.y2)
    }
  }

  //squarer////squarer////squarer////squarer////squarer////squarer//
  squarer() {

    fill(color)
    noStroke()
    rectMode(CENTER)

    for (let i = 0; i < this.squareNum; i++) {

      push()
      translate(this.radius, 0)
      if (this.squareRand <= 1) {
        rotate(radians(45))
      }
      // console.log(this.squareRand)
      rect(0, 0, this.squareSize, this.squareSize)

      pop()
      rotate(this.squareAngle)
    }
  }

  outliner() {
    strokeWeight(this.lineStroke)
    // strokeWeight(5)
    noFill()
    stroke(color)
    circle(0, 0, this.bigRadius * 2)
    // circle(0, 0, this.radius)

    // circle(0, 0, 1)
    // line()
  }
}
