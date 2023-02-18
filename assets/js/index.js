const navMenu = document.querySelector('#nav-menu')
const navToggle = document.querySelector('#nav-toggle')
const navClose = document.querySelector('#nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*Remove menu mobile*/
const navLink = document.querySelectorAll('.nav-link')

function actionLink() {
  const navMenu = document.querySelector('.nav-menu')

  navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', actionLink))

/*Accordion Skills */
const skillsContent = document.querySelectorAll('.skills-content')
const skillsHeader = document.querySelectorAll('.skills-header')

function toggleSkills() {
  let itemClass = this.parentNode.className

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills-content skills-close'
  }

  if (itemClass === 'skills-content skills-close') {
    this.parentNode.className = 'skills-content skills-open'
  }
}

skillsHeader.forEach(el => {
  el.addEventListener('click', toggleSkills)
})

/*Scroll sections active links */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav-menu a[href*=' + sectionId + ']')
        .classList.add('active-link')
    } else {
      document
        .querySelector('.nav-menu a[href*=' + sectionId + ']')
        .classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*Change background header */
function scrollHeader() {
  const nav = document.querySelector('#header')

  if (this.scrollY >= 80) {
    nav.classList.add('scroll-header')
  } else {
    nav.classList.remove('scroll-header')
  }
}

window.addEventListener('scroll', scrollHeader)

/*Show scroll Up */

function scrollUp() {
  const scrollUp = document.querySelector('#scroll-up')

  if (scrollY >= 320) {
    scrollUp.classList.add('show-scroll')
  } else {
    scrollUp.classList.remove('show-scroll')
  }
}

window.addEventListener('scroll', scrollUp)

/*Theme Customization */
const theme = document.querySelector('#theme-button')
const themeModal = document.querySelector('.customize-theme')
const fontSizes = document.querySelectorAll('.choose-size span')
const colorPalette = document.querySelectorAll('.choose-color span')
let root = document.querySelector(':root')
const bg1 = document.querySelector('.bg-1')
const bg2 = document.querySelector('.bg-2')
const bg3 = document.querySelector('.bg-3')

//Open Modal
const openThemeModal = () => {
  themeModal.style.display = 'grid'
}

const closeThemeModal = e => {
  if (e.target.classList.contains('customize-theme')) {
    themeModal.style.display = 'none'
  }
}

theme.addEventListener('click', openThemeModal)
themeModal.addEventListener('click', closeThemeModal)

const removeSizeSelector = () => {
  fontSizes.forEach(size => {
    size.classList.remove('active')
  })
}

fontSizes.forEach(size => {
  size.addEventListener('click', () => {
    removeSizeSelector()
    let fontSize
    size.classList.toggle('active')
    if (size.classList.contains('font-size-1')) {
      fontSize = '12px'
    } else if (size.classList.contains('font-size-2')) {
      fontSize = '14px'
    } else if (size.classList.contains('font-size-3')) {
      fontSize = '16px'
    } else if (size.classList.contains('font-size-4')) {
      fontSize = '18px'
    }

    //Change font size of the root html element
    document.querySelector('html').style.fontSize = fontSize
  })
})

/*Select Colors */

const changeActiveColorClass = () => {
  colorPalette.forEach(colorPicker => {
    colorPicker.classList.remove('active')
  })
}
colorPalette.forEach(color => {
  color.addEventListener('click', () => {
    let primaryHue
    changeActiveColorClass()

    if (color.classList.contains('color-1')) {
      console.log(252)
      primaryHue = 252
    } else if (color.classList.contains('color-2')) {
      primaryHue = 340
    } else if (color.classList.contains('color-3')) {
      primaryHue = 352
    } else if (color.classList.contains('color-4')) {
      primaryHue = 142
    } else if (color.classList.contains('color-5')) {
      primaryHue = 202
    }
    color.classList.add('active')
    root.style.setProperty('--hue-color', primaryHue)
  })
})

/*Theme BAckground */
let lightColorLightness
let whiteColorLightness
let darkColorLightness

const changeBG = () => {
  root.style.setProperty('--light-color-lightness', lightColorLightness)
  root.style.setProperty('---color-lightness', whiteColorLightness)
  root.style.setProperty('--dark-color-lightness', darkColorLightness)
}

//Change background color
bg1.addEventListener('click', () => {
  bg1.classList.add('active')
  bg2.classList.remove('active')
  bg3.classList.remove('active')

  window.location.reload()
})

bg2.addEventListener('click', () => {
  darkColorLightness = '95%'
  whiteColorLightness = '20%'
  lightColorLightness = '15%'

  bg2.classList.add('active')
  bg1.classList.remove('active')
  bg3.classList.remove('active')

  changeBG()
})

bg3.addEventListener('click', () => {
  darkColorLightness = '95%'
  whiteColorLightness = '10%'
  lightColorLightness = '0%'

  bg3.classList.add('active')
  bg2.classList.remove('active')
  bg1.classList.remove('active')

  changeBG()
})

/*==================================================== */
/** 
This is a snake game I made with Vanilla Javascript.
Follow me on twitter @fariatondo
**/

let dom_replay = document.querySelector('#replay')
let dom_score = document.querySelector('#score')
let dom_canvas = document.createElement('canvas')
document.querySelector('#canvas').appendChild(dom_canvas)
let CTX = dom_canvas.getContext('2d')

const W = (dom_canvas.width = 400)
const H = (dom_canvas.height = 400)

let snake,
  food,
  currentHue,
  cells = 20,
  cellSize,
  isGameOver = false,
  tails = [],
  score = 00,
  maxScore = window.localStorage.getItem('maxScore') || undefined,
  particles = [],
  splashingParticleCount = 20,
  cellsCount,
  requestID

let helpers = {
  Vec: class {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
    add(v) {
      this.x += v.x
      this.y += v.y
      return this
    }
    mult(v) {
      if (v instanceof helpers.Vec) {
        this.x *= v.x
        this.y *= v.y
        return this
      } else {
        this.x *= v
        this.y *= v
        return this
      }
    }
  },
  isCollision(v1, v2) {
    return v1.x == v2.x && v1.y == v2.y
  },
  garbageCollector() {
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].size <= 0) {
        particles.splice(i, 1)
      }
    }
  },
  drawGrid() {
    CTX.lineWidth = 1.1
    CTX.strokeStyle = '#232332'
    CTX.shadowBlur = 0
    for (let i = 1; i < cells; i++) {
      let f = (W / cells) * i
      CTX.beginPath()
      CTX.moveTo(f, 0)
      CTX.lineTo(f, H)
      CTX.stroke()
      CTX.beginPath()
      CTX.moveTo(0, f)
      CTX.lineTo(W, f)
      CTX.stroke()
      CTX.closePath()
    }
  },
  randHue() {
    return ~~(Math.random() * 360)
  },
  hsl2rgb(hue, saturation, lightness) {
    if (hue == undefined) {
      return [0, 0, 0]
    }
    let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
    let huePrime = hue / 60
    let secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))

    huePrime = ~~huePrime
    let red
    let green
    let blue

    if (huePrime === 0) {
      red = chroma
      green = secondComponent
      blue = 0
    } else if (huePrime === 1) {
      red = secondComponent
      green = chroma
      blue = 0
    } else if (huePrime === 2) {
      red = 0
      green = chroma
      blue = secondComponent
    } else if (huePrime === 3) {
      red = 0
      green = secondComponent
      blue = chroma
    } else if (huePrime === 4) {
      red = secondComponent
      green = 0
      blue = chroma
    } else if (huePrime === 5) {
      red = chroma
      green = 0
      blue = secondComponent
    }

    let lightnessAdjustment = lightness - chroma / 2
    red += lightnessAdjustment
    green += lightnessAdjustment
    blue += lightnessAdjustment

    return [
      Math.round(red * 255),
      Math.round(green * 255),
      Math.round(blue * 255)
    ]
  },
  lerp(start, end, t) {
    return start * (1 - t) + end * t
  }
}

let KEY = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
  resetState() {
    this.ArrowUp = false
    this.ArrowRight = false
    this.ArrowDown = false
    this.ArrowLeft = false
  },
  listen() {
    addEventListener(
      'keydown',
      e => {
        if (e.key === 'ArrowUp' && this.ArrowDown) return
        if (e.key === 'ArrowDown' && this.ArrowUp) return
        if (e.key === 'ArrowLeft' && this.ArrowRight) return
        if (e.key === 'ArrowRight' && this.ArrowLeft) return
        this[e.key] = true
        Object.keys(this)
          .filter(f => f !== e.key && f !== 'listen' && f !== 'resetState')
          .forEach(k => {
            this[k] = false
          })
      },
      false
    )
  }
}

class Snake {
  constructor(i, type) {
    this.pos = new helpers.Vec(W / 2, H / 2)
    this.dir = new helpers.Vec(0, 0)
    this.type = type
    this.index = i
    this.delay = 5
    this.size = W / cells
    this.color = 'white'
    this.history = []
    this.total = 1
  }
  draw() {
    let { x, y } = this.pos
    CTX.fillStyle = this.color
    CTX.shadowBlur = 20
    CTX.shadowColor = 'rgba(255,255,255,.3 )'
    CTX.fillRect(x, y, this.size, this.size)
    CTX.shadowBlur = 0
    if (this.total >= 2) {
      for (let i = 0; i < this.history.length - 1; i++) {
        let { x, y } = this.history[i]
        CTX.lineWidth = 1
        CTX.fillStyle = 'rgba(225,225,225,1)'
        CTX.fillRect(x, y, this.size, this.size)
      }
    }
  }
  walls() {
    let { x, y } = this.pos
    if (x + cellSize > W) {
      this.pos.x = 0
    }
    if (y + cellSize > W) {
      this.pos.y = 0
    }
    if (y < 0) {
      this.pos.y = H - cellSize
    }
    if (x < 0) {
      this.pos.x = W - cellSize
    }
  }
  controlls() {
    let dir = this.size
    if (KEY.ArrowUp) {
      this.dir = new helpers.Vec(0, -dir)
    }
    if (KEY.ArrowDown) {
      this.dir = new helpers.Vec(0, dir)
    }
    if (KEY.ArrowLeft) {
      this.dir = new helpers.Vec(-dir, 0)
    }
    if (KEY.ArrowRight) {
      this.dir = new helpers.Vec(dir, 0)
    }
  }
  selfCollision() {
    for (let i = 0; i < this.history.length; i++) {
      let p = this.history[i]
      if (helpers.isCollision(this.pos, p)) {
        isGameOver = true
      }
    }
  }
  update() {
    this.walls()
    this.draw()
    this.controlls()
    if (!this.delay--) {
      if (helpers.isCollision(this.pos, food.pos)) {
        incrementScore()
        particleSplash()
        food.spawn()
        this.total++
      }
      this.history[this.total - 1] = new helpers.Vec(this.pos.x, this.pos.y)
      for (let i = 0; i < this.total - 1; i++) {
        this.history[i] = this.history[i + 1]
      }
      this.pos.add(this.dir)
      this.delay = 5
      this.total > 3 ? this.selfCollision() : null
    }
  }
}

class Food {
  constructor() {
    this.pos = new helpers.Vec(
      ~~(Math.random() * cells) * cellSize,
      ~~(Math.random() * cells) * cellSize
    )
    this.color = currentHue = `hsl(${~~(Math.random() * 360)},100%,50%)`
    this.size = cellSize
  }
  draw() {
    let { x, y } = this.pos
    CTX.globalCompositeOperation = 'lighter'
    CTX.shadowBlur = 20
    CTX.shadowColor = this.color
    CTX.fillStyle = this.color
    CTX.fillRect(x, y, this.size, this.size)
    CTX.globalCompositeOperation = 'source-over'
    CTX.shadowBlur = 0
  }
  spawn() {
    let randX = ~~(Math.random() * cells) * this.size
    let randY = ~~(Math.random() * cells) * this.size
    for (let path of snake.history) {
      if (helpers.isCollision(new helpers.Vec(randX, randY), path)) {
        return this.spawn()
      }
    }
    this.color = currentHue = `hsl(${helpers.randHue()}, 100%, 50%)`
    this.pos = new helpers.Vec(randX, randY)
  }
}

class Particle {
  constructor(pos, color, size, vel) {
    this.pos = pos
    this.color = color
    this.size = Math.abs(size / 2)
    this.ttl = 0
    this.gravity = -0.2
    this.vel = vel
  }
  draw() {
    let { x, y } = this.pos
    let hsl = this.color
      .split('')
      .filter(l => l.match(/[^hsl()$% ]/g))
      .join('')
      .split(',')
      .map(n => +n)
    let [r, g, b] = helpers.hsl2rgb(hsl[0], hsl[1] / 100, hsl[2] / 100)
    CTX.shadowColor = `rgb(${r},${g},${b},${1})`
    CTX.shadowBlur = 0
    CTX.globalCompositeOperation = 'lighter'
    CTX.fillStyle = `rgb(${r},${g},${b},${1})`
    CTX.fillRect(x, y, this.size, this.size)
    CTX.globalCompositeOperation = 'source-over'
  }
  update() {
    this.draw()
    this.size -= 0.3
    this.ttl += 1
    this.pos.add(this.vel)
    this.vel.y -= this.gravity
  }
}

function incrementScore() {
  score++
  dom_score.innerText = score.toString().padStart(2, '0')
}

function particleSplash() {
  for (let i = 0; i < splashingParticleCount; i++) {
    let vel = new helpers.Vec(Math.random() * 6 - 3, Math.random() * 6 - 3)
    let position = new helpers.Vec(food.pos.x, food.pos.y)
    particles.push(new Particle(position, currentHue, food.size, vel))
  }
}

function clear() {
  CTX.clearRect(0, 0, W, H)
}

function initialize() {
  CTX.imageSmoothingEnabled = false
  KEY.listen()
  cellsCount = cells * cells
  cellSize = W / cells
  snake = new Snake()
  food = new Food()
  dom_replay.addEventListener('click', reset, false)
  loop()
}

function loop() {
  clear()
  if (!isGameOver) {
    requestID = setTimeout(loop, 1000 / 60)
    helpers.drawGrid()
    snake.update()
    food.draw()
    for (let p of particles) {
      p.update()
    }
    helpers.garbageCollector()
  } else {
    clear()
    gameOver()
  }
}

function gameOver() {
  maxScore ? null : (maxScore = score)
  score > maxScore ? (maxScore = score) : null
  window.localStorage.setItem('maxScore', maxScore)
  CTX.fillStyle = '#4cffd7'
  CTX.textAlign = 'center'
  CTX.font = 'bold 30px Poppins, sans-serif'
  CTX.fillText('GAME OVER', W / 2, H / 2)
  CTX.font = '15px Poppins, sans-serif'
  CTX.fillText(`SCORE   ${score}`, W / 2, H / 2 + 60)
  CTX.fillText(`MAXSCORE   ${maxScore}`, W / 2, H / 2 + 80)
}

function reset() {
  dom_score.innerText = '00'
  score = '00'
  snake = new Snake()
  food.spawn()
  KEY.resetState()
  isGameOver = false
  clearTimeout(requestID)
  loop()
}

initialize()
const width = window.screen.width
console.log(width)

var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
}

var konamiCode = [
  'up',
  'up',
  'down',
  'down',
  'left',
  'right',
  'left',
  'right',
  'b',
  'a'
]

var konamiCodePosition = 0

document.addEventListener('keydown', function (e) {
  var key = allowedKeys[e.keyCode]
  var requiredKey = konamiCode[konamiCodePosition]

  if (key == requiredKey) {
    konamiCodePosition++

    if (konamiCodePosition == konamiCode.length) {
      if (width >= 768) {
        activateCheats()
      }
      konamiCodePosition = 0
    }
  } else {
    konamiCodePosition = 0
  }
})

function activateCheats(e) {
  document.querySelector('.container-game').classList.toggle('active')

  setTimeout(function () {
    document.querySelector('.notificacao').style.display = 'none'
  }, 3000)
}
