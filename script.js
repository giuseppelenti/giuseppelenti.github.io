document.addEventListener("DOMContentLoaded", function() {
    // Animazioni per .slide
    let slides = document.querySelectorAll(".slide");
    slides.forEach(slide => {
        slide.classList.remove("bounce-in-right");
        slide.style.opacity = "0";
    });

    // IntersectionObserver per animazioni solo quando necessario
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("bounce-in-right");
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    slides.forEach(slide => observer.observe(slide));

    // Animazione del testo dell'H1
    let h1 = document.querySelector("h1");
    let text = "CIAO! I'M GIUSEPPE";
    let index = 0;

    function typeText() {
        if (index < text.length) {
            h1.innerHTML = `<span class="highlight">${text.substring(0, index + 1)}</span>`;
            index++;
            setTimeout(typeText, 100);
        } else {
            h1.innerHTML = `<span class="highlight done">${text}</span>`;
        }
    }

    setTimeout(typeText, 500);
    window.history.replaceState({}, document.title, window.location.pathname);

    // Aggiungi animazione alla GIF quando entra in vista
    let projectSection = document.querySelector("#project");
    let gifAnimation = document.querySelector(".gif-animation");

    window.addEventListener("scroll", function() {
        if (!projectSection || !gifAnimation) return;
        let sectionTop = projectSection.offsetTop;
        let sectionHeight = projectSection.offsetHeight;
        let scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            gifAnimation.classList.add("show");
        }
    });

    // Navbar e indicatori di posizione
    let sections = document.querySelectorAll("section, .container-fluid, footer");
    let navLinks = document.querySelectorAll(".nav-link");
    let activeDot = document.querySelector(".active-dot");

    // Funzione per aggiornare l'indicatore di sezione attiva
    function updateActiveNav() {
        let currentSection = null;
        let scrollPosition = window.scrollY + window.innerHeight / 2;
        let pageBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 5;

        sections.forEach(section => {
            let sectionTop = section.offsetTop;
            let sectionHeight = section.offsetHeight;
            let sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight || (section.tagName.toLowerCase() === "footer" && pageBottom)) {
                currentSection = sectionId;
            }
        });

        // Usa `requestAnimationFrame` per aggiornamenti più fluidi
        requestAnimationFrame(() => {
            navLinks.forEach(link => {
                let linkHref = link.getAttribute("href").substring(1);
                if (linkHref === currentSection) {
                    let linkRect = link.getBoundingClientRect();
                    let navbarRect = link.closest(".navbar").getBoundingClientRect();
                    activeDot.style.top = `${linkRect.bottom - navbarRect.top + 5}px`;
                    activeDot.style.left = `${linkRect.left - navbarRect.left + linkRect.width / 2 - activeDot.offsetWidth / 2}px`;
                    activeDot.style.opacity = "1";
                }
            });

            if (!currentSection) {
                activeDot.style.opacity = "0";
            }
        });
    }

    // Aggiungi debounce per migliorare le performance dello scroll
    let debounceTimer;
    window.addEventListener("scroll", function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updateActiveNav, 50); // Ritardo di 50ms
    });

    window.addEventListener("resize", updateActiveNav);
    updateActiveNav();

document.getElementById("send-button").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const formData = {
    name: name,
    email: email,
    message: message
  };

  emailjs.send("service_h4su60f", "template_55pkhe8", formData)
    .then(() => {
      alert("Email successfully sent!");
      document.getElementById("contact-form").reset();
    })
    .catch(error => {
      console.error("Error sending the email:", error);
      alert("Email not sent. Try again.");
    });
});

});
