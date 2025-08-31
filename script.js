const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const navLinks = document.querySelectorAll(".nav-link");

btn.addEventListener("click", () => {
  const expanded = btn.getAttribute("aria-expanded") === "true" || false;
  btn.setAttribute("aria-expanded", !expanded);
  menu.classList.toggle("hidden");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", false);
    }
  });
});

const text = "Ronald Mark L. Masalonga, 21";
const typingElement = document.getElementById("typing");
let index = 0;

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      typingElement.innerHTML = "";
      index = 0;
      type();
    }, 3000);
  }
}

type();
const slider = document.getElementById("slider");

// The slider content is already duplicated in HTML for infinite scroll effect, so no need to duplicate here.

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.getElementById("modal-close");

// Open modal on button click
slider.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const title = btn.getAttribute("data-title");
    const description = btn.getAttribute("data-description");
    const image = btn.getAttribute("data-image");

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalImage.src = image;
    modalImage.alt = `Image representing ${title}`;

    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.focus();
  });
});

// Close modal function
function closeModal() {
  modal.classList.add("opacity-0", "pointer-events-none");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

// Close modal on outside click
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("opacity-0")) {
    closeModal();
  }
});

