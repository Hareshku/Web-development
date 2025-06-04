
var typed = new Typed(".text", {
    strings: ["Programming" , "Data Science" , "Web Development"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});


function handleMenuToggle() {
  if (window.innerWidth < 1000) {
    // Select the checkbox input and the navigation links container
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.links');

    // Toggle the visibility of the navigation links when the checkbox is clicked
    menuToggle.addEventListener('change', function() {
      if (menuToggle.checked) {
        navLinks.style.display = 'block';
      } else {
        navLinks.style.display = 'none';
      }
    });

    // Hide the navigation links when a link is clicked and scroll to the section
    document.querySelectorAll('.links a').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });

        // Uncheck the checkbox to hide the menu
        menuToggle.checked = false;
        navLinks.style.display = 'none';
      });
    });
  }
}

// Initial execution
handleMenuToggle();

// Re-execute the function on window resize
window.addEventListener('resize', handleMenuToggle);


const toTop = document.querySelector(".top");
window.addEventListener("scroll",() =>{
    if (window.scrollY > 100){
        toTop.classList.add("active");
    }
    else{
        toTop.classList.remove("active");
    }
})



window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.header');
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = '#175d68'; // Change to desired color
    } else {
      navbar.style.backgroundColor = ''; // Reset to initial color
    }
  });
