// 

// Reset dropdowns and manage focus on resize
function resetDropdownsOnResize() {
  const allDropdowns = document.querySelectorAll(".nav__menu .dropdown");
  allDropdowns.forEach((dropdown) => {
    // Close dropdown menus
    const dropdownMenu = dropdown.querySelector("ul");
    if (dropdownMenu) {
      dropdownMenu.classList.remove("show");
    }
    dropdown.classList.remove("focus", "active");
  });

  tabbingOutOfLastLink = false;

  // Manage focus for the first dropdown link in desktop view
  if (window.innerWidth >= 768) {
    const firstDropdownLink = document.querySelector(".nav__menu .dropdown a");
    if (firstDropdownLink) {
      firstDropdownLink.focus();
    }
  }
}

// Prevent showing animation on window resize //
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
    resetDropdownsOnResize();
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

// Add hover event handlers for desktop view
document.querySelectorAll('.nav__menu .dropdown').forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    if (window.innerWidth >= 768) {
      const allDropdowns = document.querySelectorAll('.nav__menu .dropdown');
      allDropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          const otherDropdownMenu = otherDropdown.querySelector('ul');
          if (otherDropdownMenu) {
            otherDropdownMenu.classList.remove('show');
            otherDropdown.classList.remove('active', 'focus');
          }
        }
      });

      const dropdownMenu = dropdown.querySelector('ul');
      if (dropdownMenu && !dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.add('show');
        dropdown.classList.add('active');
      }
    }
  });
});


// Open dropdown on link focus (solve invisible tabbing issue)

document.querySelectorAll('.nav__menu .dropdown ul a').forEach(link => { 
  link.addEventListener('focus', e => { 
    const parentDropdown = link.closest('.dropdown');
    const dropDownMenu = parentDropdown.querySelector('ul');
    if (dropDownMenu && !dropDownMenu.classList.contains('show')) { 
      parentDropdown.querySelector('a').click()
    }
  })
})
