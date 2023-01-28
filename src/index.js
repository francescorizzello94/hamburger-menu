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
let tabbingOutOfLastLink = false;

Array.from(desktopMenuDropDown).map((element) => {
  if (element.nextElementSibling) {
    element.addEventListener("focus", function () {
      const allDropdowns = document.querySelectorAll(".nav__menu li.focus");
      Array.from(allDropdowns).forEach((dropdown) =>
        dropdown.classList.remove("focus")
      );
      this.parentElement.classList.add("focus");
    });

    const links =
      element.parentElement.nextElementSibling.querySelectorAll("a");
    const lastLink = links[links.length - 1];
    lastLink.addEventListener("focusout", function () {
      tabbingOutOfLastLink = true;
    });
  } else {
    element.addEventListener("focusin", function () {
      if (tabbingOutOfLastLink) {
        const allDropdowns = document.querySelectorAll(".nav__menu li.focus");
        Array.from(allDropdowns).forEach((dropdown) =>
          dropdown.classList.remove("focus")
        );
        tabbingOutOfLastLink = false;
      }
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
