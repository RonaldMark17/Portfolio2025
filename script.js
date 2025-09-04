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

const text = "Ronald Mark Masalonga, 21";
const typingElement = document.getElementById("typing");
const typingContainer = document.getElementById("typing-container");
let index = 0;

function resizeFont() {
  let parentWidth = typingContainer.parentElement.offsetWidth;
  let fontSize = 40; // start big
  typingContainer.style.fontSize = fontSize + "px";

  while (typingContainer.scrollWidth > parentWidth && fontSize > 12) {
    fontSize--; // shrink until it fits
    typingContainer.style.fontSize = fontSize + "px";
  }
}

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    resizeFont(); // adjust size each time
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      typingElement.innerHTML = "";
      index = 0;
      typingContainer.style.fontSize = "40px"; // reset to big
      type();
    }, 5000);
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

var map = L.map("map").setView([14.079226211949175, 121.31036092065423], null);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

navigator.geolocation.watchPosition(
  function (position) {
    // var lat = position.coords.latitude;
    // var lon = position.coords.longitude;

    var lat = 14.079226211949175;
    var lon = 121.31036092065423;
    var accuracy = position.coords.accuracy;
    var marker = L.marker([lat, lon]).addTo(map).bindPopup("Here").openPopup();
    var circle = L.circle([lat, lon], { radius: accuracy }).addTo(map);
    map.setView([lat, lon], 10);
  },
  function (err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }
);
