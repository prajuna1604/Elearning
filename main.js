    // =============mobile menu starts==============
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    function openMenu() {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
        setTimeout(() => {
            mobileMenu.classList.remove("opacity-0", "scale-95");
            mobileMenu.classList.add("opacity-100", "scale-100");
        }, 10);
        document.body.style.overflow = "hidden";
    }
    function closeMenu() {
        mobileMenu.classList.remove("opacity-100", "scale-100");
        mobileMenu.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
        }, 300);
        document.body.style.overflow = "auto";
    }
    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    // =================active color on click on navlink========================
 const allLinks = document.querySelectorAll(".nav-link");

// normalize current path
let currentPage = window.location.pathname.split("/").pop();
if (!currentPage || currentPage === "") {
  currentPage = "index.html";
}
// remove query params if any
currentPage = currentPage.split("?")[0].split("#")[0];
allLinks.forEach(link => {
  let linkPage = link.getAttribute("href");
  if (!linkPage) return;
  linkPage = linkPage.split("/").pop().split("?")[0].split("#")[0];
  if (linkPage === currentPage) {
    link.classList.add("text-orange-500", "font-semibold");
    link.classList.remove("text-white", "text-white/80", "text-gray-800");
  } else {
    link.classList.remove("text-orange-500", "font-semibold");
  }
});
// =============scroll===============
const navbar = document.getElementById("navbar");
const links = document.querySelectorAll(".nav-link");
const logoText = navbar.querySelector("span");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("bg-white/90", "backdrop-blur-md", "shadow-md");
        navbar.classList.remove("text-white");
       links.forEach(link => {
    if (!link.classList.contains("active")) {
        link.classList.remove("text-white/80", "text-white");
        link.classList.add("text-gray-800");
    }
});
        if (logoText) {
            logoText.classList.remove("text-white");
            logoText.classList.add("text-gray-900");
        }
    } else {
        navbar.classList.remove("bg-white/90", "backdrop-blur-md", "shadow-md");
        navbar.classList.add("text-white");
        links.forEach(link => {
    if (!link.classList.contains("active")) {
        link.classList.remove("text-gray-800");
        link.classList.add("text-white/80");
    }
});
        if (logoText) {
            logoText.classList.remove("text-gray-900");
            logoText.classList.add("text-white");
        }
    }
});

//=============== stats counter starts===============
function animateCounter(id, endValue, duration = 2000) {
    const element = document.getElementById(id);
    let startValue = 0;
    const increment = endValue / (duration / 16); // ~60fps
    function updateCounter() {
        startValue += increment;

        if (startValue >= endValue) {
            element.textContent = endValue;
        } else {
            element.textContent = Math.floor(startValue);
            requestAnimationFrame(updateCounter);
        }
    }
    updateCounter();
}
// Run on page load (refresh)
window.addEventListener("load", () => {
    animateCounter("stat-professors", 12);
    animateCounter("stat-hours", 750);
    animateCounter("stat-material", 100);
    animateCounter("stat-students", 500);
});
// ==============switch tabs============
const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const id = tab.id;
    tabs.forEach((btn) => {
      btn.classList.remove("bg-orange-500", "text-white");
      const label = btn.querySelector(".tab-label");
      label.classList.remove("text-white");
      label.classList.add("text-gray-700");
      const svg = btn.querySelector("svg");
      svg.setAttribute("fill", "#e8622a");
    });

    panels.forEach((panel) => panel.classList.add("hidden"));
    // Show corresponding panel
    const activePanel = document.getElementById(`panel-${id}`);
    activePanel.classList.remove("hidden");
  });
});
//============carousel fetured section==================
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel");
  if (!track) return;
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = track.children;
  let autoSlide;
  // get card width dynamically (important for responsive)
  function getScrollAmount() {
    if (!cards.length) return 300;
    const card = cards[0];
    const styles = window.getComputedStyle(card);
    const gap = 20; // your gap-5 = 20px
    return card.offsetWidth + gap;
  }
  function slide(direction) {
    const amount = getScrollAmount();
    track.scrollBy({
      left: direction * amount,
      behavior: "smooth"
    });
  }
  // buttons
  nextBtn?.addEventListener("click", () => slide(1));
  prevBtn?.addEventListener("click", () => slide(-1));
  // auto slide
  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slide(1);
      }
    }, 3000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }
  // pause on hover 
  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);
  prevBtn?.addEventListener("mouseenter", stopAutoSlide);
  nextBtn?.addEventListener("mouseenter", stopAutoSlide);
  prevBtn?.addEventListener("mouseleave", startAutoSlide);
  nextBtn?.addEventListener("mouseleave", startAutoSlide);
  startAutoSlide();
});
// ==========carousel instructor=============
const carouselIns1=document.getElementById("instructor-carousel");
const prevBtnIns=document.getElementById("prev-btn1");
const nextBtnIns=document.getElementById("next-btn1");
const scrollAmount=250;
nextBtnIns.addEventListener("click",()=>{
    carouselIns1.scrollBy({
        left:scrollAmount,
        behavior:"smooth"
    });
});
prevBtnIns.addEventListener("click",()=>{
    carouselIns1.scrollBy({
        left:-scrollAmount,
        behavior:"smooth"
    });
});
// faq about section
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const button = item.querySelector("button");
  const answer = item.querySelector(".faq-answer");
  const chevron = item.querySelector(".faq-chevron");

  button.addEventListener("click", () => {
    const isOpen = !answer.classList.contains("hidden");
// close all
    faqItems.forEach((el) => {
      el.querySelector(".faq-answer").classList.add("hidden");
      el.querySelector(".faq-chevron").classList.remove("rotate-180");
    });
// if close open
    if (!isOpen) {
      answer.classList.remove("hidden");
      chevron.classList.add("rotate-180");
    }
  });
});
//==================== single course==================

