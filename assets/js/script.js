const tabbtn1 = document.getElementById("tabbtn1");
const tabbtn2 = document.getElementById("tabbtn2");
const tabbtn3 = document.getElementById("tabbtn3");
const tabs = document.querySelectorAll(".tab-content");
const tabButtons = document.querySelectorAll(".tabbtn");

function showTab(tabId) {
  tabs.forEach((tab) => {
    tab.style.zIndex = "-1";
    tab.style.opacity = "0";
  });

  const selectedTab = document.getElementById(tabId);
  selectedTab.style.zIndex = "1";
  selectedTab.style.opacity = "1";
  let p = document.querySelectorAll(".tabP");
  console.log(p);
}
tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const tabId = `tab${index + 1}`;
    showTab(tabId);
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

showTab("tab1");

// Start Navbar Responsive
const barmenu = document.getElementById("barmenu");
const navbarmenu = document.getElementById("navbarmenu");
barmenu.addEventListener("click", () => {
  if (navbarmenu.style.display == "none") navbarmenu.style.display = "block";
  else navbarmenu.style.display = "none";
});
//Start Sticky Navbar
const header = document.getElementById("header");
const distanceToSticky = 200;
function stickyNavbar() {
  if (window.pageYOffset > distanceToSticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
window.onscroll = function () {
  stickyNavbar();
};

// Start Slider
const slider = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const slideWidth = slide[0].clientWidth;
let currentIndex = 0;
let startX;
let isDragging = false;
let shiftX;

function goToSlide(index) {
  if (index < 0 || index >= slide.length) return;
  currentIndex = index;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function handleDragStart(e) {
  isDragging = true;
  startX = e.clientX;
  shiftX = slider.offsetLeft;
  slider.style.transition = "none";
  slider.classList.add("grabbing");
}

function handleDragMove(e) {
  if (!isDragging) return;
  const x = e.clientX;
  const diff = x - startX;
  slider.style.transform = `translateX(${shiftX + diff}px)`;
}

function handleDragEnd() {
  isDragging = false;
  const movedBy = slider.offsetLeft - shiftX;
  if (movedBy < -100 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  }
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }
  goToSlide(currentIndex);
  slider.style.transition = "transform 0.5s ease";
  slider.classList.remove("grabbing");
}
function nextSlide() {
  currentIndex = (currentIndex + 1) % slide.length;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
setInterval(nextSlide, 3000);
slider.addEventListener("mousedown", handleDragStart);
slider.addEventListener("mousemove", handleDragMove);
slider.addEventListener("mouseup", handleDragEnd);
slider.addEventListener("mouseleave", handleDragEnd);
