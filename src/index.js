// Prevent showing animation on window resize //
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

// Menu toogle on mobile //
const navToggle = document.querySelector(".nav-toggle");
const menuToggle = document.querySelector(".menu-toggle");

navToggle.addEventListener("click", function (e) {
  this.classList.toggle("open");
  menuToggle.classList.toggle("active");
  e.stopPropagation();
});

// Keyboard navigation by adding focus class equivalent to hover class //

const desktopMenuDropDown = document.querySelectorAll(".nav__menu li a");

Array.from(desktopMenuDropDown).map((element) => {
  if (element.nextElementSibling) {
    element.addEventListener("focus", function () {
      this.parentElement.classList.add("focus");
    });

    const dropDown = element.parentElement.nextElementSibling;
    const dropDownElements = dropDown.querySelectorAll("a");
    const lastElementIndex = dropDownElements.length - 1;
    const lastElement = dropDownElements[lastElementIndex];
    lastElement.addEventListener("blur", function () {
      return element.parentElement.classList.remove("focus");
    });
  }
});

// Dropdown toogle on mobile and collapse dropdown on click //
const dropdown = document.querySelectorAll(".dropdown a");

Array.from(dropdown).map((element) => {
  element.addEventListener("click", function (e) {
    this.nextElementSibling.classList.toggle("show");
    this.parentNode.classList.toggle("active");
    if (this.parentNode.nextElementSibling.children[1]) {
      this.parentNode.nextElementSibling.children[1].classList.remove("show");
      this.parentNode.nextElementSibling.classList.remove("active");
    } else if (this.parentElement.children[1]) {
      this.parentElement.parentElement.children[0].children[1].classList.remove(
        "show"
      );
      this.parentElement.previousElementSibling.classList.remove("active");
    }
    e.stopPropagation();
  });
});
