const ballsColor = 'white'
const ballsCount = 30;
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = ballsColor;

class Ball {
  constructor(effect) {
    this.effect = effect;
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
    this.radius = Math.random() * 90 + 10;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
  }

  update() {
    if (this.x < this.radius || this.x > this.effect.width - this.radius) {
      this.speedX *= -1
      this.changeColor();
    }
    if (this.y < this.radius || this.y > this.effect.height - this.radius) {
      this.speedY *= -1;
      this.changeColor();
    }


    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
  }

  changeColor() {
    this.effect.fillStyle = '#' +  Math.floor(Math.random()*16777215).toString(16);
  }

  reset() {
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
  }
}

class MetaBallsEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.metaBallsArray = [];
  }

  init(numberOfBalls) {
    for(let i = 0; i < numberOfBalls; i++) {
      this.metaBallsArray.push(new Ball(this))
    }
  }

  update() {
    this.metaBallsArray.forEach(metaBall => metaBall.update())
  }

  draw(context) {
    this.metaBallsArray.forEach(metaBall => metaBall.draw(context))
  }

  reset(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    this.metaBallsArray.forEach(metaBall => metaBall.reset())
  }

}

const effect = new MetaBallsEffect(canvas.width, canvas.height);
effect.init(ballsCount);

function animate () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.update()
  effect.draw(ctx)
  requestAnimationFrame(animate);
}

animate()

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = ballsColor
  effect.reset(canvas.width, canvas.height)
})