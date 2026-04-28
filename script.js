const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const topBtn = document.getElementById("topBtn");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    nav.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  topBtn.classList.toggle("show", window.scrollY > 500);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const speed = Math.max(1, Math.floor(target / 70));

    const update = () => {
      current += speed;

      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(update);
      }
    };

    update();
  });

  countersStarted = true;
}

const heroStats = document.querySelector(".hero-stats");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounters();
    }
  });
}, {
  threshold: 0.5
});

if (heroStats) {
  counterObserver.observe(heroStats);
}

const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    productCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || filter === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    faqItems.forEach(faq => {
      if (faq !== item) {
        faq.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const button = contactForm.querySelector("button");

  button.textContent = "Sending...";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = "Inquiry Sent";
    formMessage.textContent = "Thank you. Your inquiry has been prepared successfully.";

    setTimeout(() => {
      button.textContent = "Send Inquiry";
      button.disabled = false;
      formMessage.textContent = "";
      contactForm.reset();
    }, 2500);
  }, 900);
});