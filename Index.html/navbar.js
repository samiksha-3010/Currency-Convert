document.addEventListener("DOMContentLoaded", function() {
      var navbar = document.getElementById("navbar");
      var upperDiv = document.getElementById("upperDiv");
      var lowerDiv = document.getElementById("lowerDiv");
  
      var isNavbarHidden = false;
  
      window.addEventListener("scroll", function() {
          var scrollPos = window.scrollY;
  
          if (scrollPos > 50 && !isNavbarHidden) {
              navbar.classList.add("Navbar-hidden");
              isNavbarHidden = true;
          } else if (scrollPos <= 50 && isNavbarHidden) {
              navbar.classList.remove("Navbar-hidden");
              isNavbarHidden = false;
          }
      });
  });