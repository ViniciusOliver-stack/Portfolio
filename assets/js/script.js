let menu = document.querySelector('.menu-btn')

menu.addEventListener('click', () => {
  document.documentElement.onclick = event => {
    if (event.target == menu) {
      menu.classList.toggle('active')
    } else {
      menu.classList.remove('active')
    }

    console.log(event.target)
  }
})

function TreeConstructor(strArr) {
  // code goes here
  let children = []
  let parents = []

  for (let index = 0; index < strArr.length; index++) {
    let newStr = strArr[index].split('')

    let pair = newStr.join('').replace(',', ',').split(',')
    children[pair[0]] = (children[pair[0]] || 0) + 1
    if (children[pair[0]] > 1) {
      return false
    }
    parents[pair[1]] = (parents[pair[1]] || 0) + 1
    if (parents[pair[1]] > 2) {
      return false
    }
  }
  return true
}
