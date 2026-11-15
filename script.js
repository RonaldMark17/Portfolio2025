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

const text = "Ronald Mark Masalonga, 22";
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
const sliderContainer = document.getElementById("slider-container");
const awardsPreviousButton = document.getElementById("awards-prev");
const awardsNextButton = document.getElementById("awards-next");

function updateAwardsControls() {
  const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;
  awardsPreviousButton.disabled = sliderContainer.scrollLeft <= 1;
  awardsNextButton.disabled = sliderContainer.scrollLeft >= maxScroll - 1;
}

function scrollAwards(direction) {
  const firstAward = slider.querySelector("button");
  const cardWidth = firstAward ? firstAward.getBoundingClientRect().width + 16 : 320;
  sliderContainer.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
}

awardsPreviousButton.addEventListener("click", () => scrollAwards(-1));
awardsNextButton.addEventListener("click", () => scrollAwards(1));
sliderContainer.addEventListener("scroll", updateAwardsControls, { passive: true });
window.addEventListener("resize", updateAwardsControls);
window.addEventListener("load", updateAwardsControls);
updateAwardsControls();

// Awards can be explored with the arrows, keyboard focus, trackpad, or touch swipe.

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
    map.setView([lat, lon], 9);
  },
  function (err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }
);

// --- Set Current Year in Footer ---
document.getElementById("current-year").textContent = new Date().getFullYear();

// Add lightweight, clickable previews for every certificate PDF.
const certificateCards = document.querySelectorAll('#certifications a[href$=".pdf"]');

certificateCards.forEach((card, index) => {
  const preview = document.createElement("div");
  const frame = document.createElement("iframe");
  const fallback = document.createElement("div");

  card.classList.add("certificate-card", "is-ready");
  if (index >= 6) card.classList.add("is-collapsed");
  card.style.setProperty("--certificate-delay", `${Math.min(index * 65, 390)}ms`);
  preview.className = "certificate-preview";
  fallback.className = "certificate-preview-fallback";
  fallback.innerHTML = '<i class="fas fa-file-pdf"></i><span>PDF preview</span>';
  frame.src = encodeURI(card.getAttribute("href"));
  frame.title = "PDF certificate preview";
  frame.setAttribute("aria-hidden", "true");
  frame.tabIndex = -1;
  preview.append(fallback, frame);
  card.prepend(preview);
});

const certificateToggle = document.getElementById("certificate-toggle");

certificateToggle?.addEventListener("click", () => {
  const isExpanded = certificateToggle.getAttribute("aria-expanded") === "true";

  certificateCards.forEach((card, index) => {
    if (index >= 6) card.classList.toggle("is-collapsed", isExpanded);
  });

  certificateToggle.setAttribute("aria-expanded", String(!isExpanded));
  certificateToggle.innerHTML = isExpanded
    ? 'Show all certificates <i class="fas fa-chevron-down ml-2"></i>'
    : 'Show fewer certificates <i class="fas fa-chevron-up ml-2"></i>';
});

if ("IntersectionObserver" in window) {
  const certificateObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  certificateCards.forEach((card) => certificateObserver.observe(card));
} else {
  certificateCards.forEach((card) => card.classList.add("is-visible"));
}

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main[id], section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-28% 0px -62% 0px", threshold: 0 }
  );

  sections.forEach((section) => navigationObserver.observe(section));
}

// Filter projects without sending visitors away from the page.
const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll("#projects .grid > a[data-category]");

projectFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selectedFilter = filter.dataset.filter;

    projectFilters.forEach((button) => button.classList.toggle("is-active", button === filter));
    projectCards.forEach((card) => {
      const matchesFilter = selectedFilter === "all" || card.dataset.category.includes(selectedFilter);
      card.classList.toggle("is-filtered-out", !matchesFilter);
    });
  });
});
