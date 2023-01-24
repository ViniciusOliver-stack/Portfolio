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

const closeThemeModal = (e) => {
  if(e.target.classList.contains('customize-theme')){
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
    if(size.classList.contains('font-size-1')){
      fontSize = '12px'
    }
    else if(size.classList.contains('font-size-2')){
      fontSize = '14px'
    }
    else if(size.classList.contains('font-size-3')){
      fontSize = '16px'
    }
    else if(size.classList.contains('font-size-4')){
      fontSize = '18px'
    }

    //Change font size of the root html element
    document.querySelector('html').style.fontSize = fontSize
  })
})


/*Select Colors */

const changeActiveColorClass = () =>{
  colorPalette.forEach(colorPicker => {
    colorPicker.classList.remove('active')
  })
}
colorPalette.forEach(color => {
  color.addEventListener('click', () => {
    let primaryHue
    changeActiveColorClass()

    if(color.classList.contains('color-1')){
      console.log(252)
      primaryHue = 252
    }else if(color.classList.contains('color-2')){
      primaryHue = 340
    }else if(color.classList.contains('color-3')){
      primaryHue = 352
    }else if(color.classList.contains('color-4')){
      primaryHue = 142
    }else if(color.classList.contains('color-5')){
      primaryHue = 202
    }
    color.classList.add('active')
    root.style.setProperty('--hue-color', primaryHue);
  })
})

/*Theme BAckground */
let lightColorLightness
let whiteColorLightness
let darkColorLightness

const changeBG = () =>{
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