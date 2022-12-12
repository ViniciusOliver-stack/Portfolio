let menu = document.querySelector('.menu-btn')

menu.addEventListener('click', () =>{
 

  document.documentElement.onclick = (event) => {
    if(event.target == menu){
      menu.classList.toggle('active')
    }else{
      menu.classList.remove('active')

    }

    console.log(event.target)
  }
})



