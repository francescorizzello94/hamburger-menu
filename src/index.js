import './style.css'

// Prevent showing animation on window resize
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});


// Menu toogle on mobile
const navToggle = document.querySelector('.nav-toggle');
const menuToggle = document.querySelector('.menu-toggle');

navToggle.addEventListener('click', function (e) {
  this.classList.toggle('open');
  menuToggle.classList.toggle('active');
  e.stopPropagation();
});

const desktopMenuDropDown = document.querySelectorAll('.nav__menu li a');

Array.from(desktopMenuDropDown)
  .map(element => { 
    element.addEventListener('focus',
      function () {
        this.classList.add('focus');
        this.parentElement.classList.add('focus');
        console.log(this);
    })
  //console.log(element.parentElement);
})

// Dropdown toogle on mobile
const dropdown = document.querySelectorAll('.dropdown a');

Array.from(dropdown)
  .map(element => {
    element
      .addEventListener('click', function (e) {
        this.nextElementSibling.classList.toggle('show');
        this.parentNode.classList.toggle('active');
        e.stopPropagation();
      })

  });


// Second level dropdown toggle on mobile
const deepDropdown = document.querySelectorAll('.dropdown second-level a');

Array.from(deepDropdown)
  .map(element => {
    element
      .addEventListener('click', function (e) {
        this.nextElementSibling.classList.toggle('show');
        this.parentNode.classList.toggle('active');
        e.stopPropagation();
      })
  });