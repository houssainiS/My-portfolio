//all of this for  the cercle in top right :
const sliderCercle = document.getElementById('sliderCercle');
const slidesCercle = document.querySelectorAll('.slide-cercle');
const dotsCercleContainer = document.getElementById('dotsCercleContainer');

let currentSlide = 0;
let interval;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let autoSlideInterval = 3000; // 3 seconds

// Create dots based on the number of slides
slidesCercle.forEach((slide, i) => {
  const dotCercle = document.createElement('div');
  dotCercle.classList.add('dot-cercle');
  dotCercle.addEventListener('click', () => goToSlide(i));
  dotsCercleContainer.appendChild(dotCercle);
});

// Set active dot
function setActiveDot(index) {
  document.querySelectorAll('.dot-cercle').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Show the current slide
function showSlide(index) {
  sliderCercle.style.transform = `translateX(${index * -100}%)`;
  setActiveDot(index);
}

// Go to a specific slide
function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
  resetAutoSlide(); // Reset the automatic sliding when user interacts
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slidesCercle.length;
  showSlide(currentSlide);
}

// Auto slide with interval
function startAutoSlide() {
  interval = setInterval(nextSlide, autoSlideInterval);
}

// Stop the auto slide when user drags or interacts
function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Touch/Mouse events for dragging
sliderCercle.addEventListener('touchstart', dragStart);
sliderCercle.addEventListener('touchmove', dragMove);
sliderCercle.addEventListener('touchend', dragEnd);

sliderCercle.addEventListener('mousedown', dragStart);
sliderCercle.addEventListener('mousemove', dragMove);
sliderCercle.addEventListener('mouseup', dragEnd);
sliderCercle.addEventListener('mouseleave', dragEnd);

function dragStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  cancelAnimationFrame(animationID);
  sliderCercle.style.transition = 'none'; // Disable transition while dragging
}

function dragMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    sliderCercle.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function dragEnd() {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentSlide < slidesCercle.length - 1) currentSlide++;
  if (movedBy > 100 && currentSlide > 0) currentSlide--;
  showSlide(currentSlide);
  sliderCercle.style.transition = 'transform 0.5s ease-in-out'; // Restore smooth transition
  prevTranslate = currentTranslate = currentSlide * -sliderCercle.clientWidth;
  resetAutoSlide(); // Restart auto sliding after dragging
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Initialize
showSlide(currentSlide);
startAutoSlide();


//all of this for the slider under the cercle :

let currentIndex = 0;
            
            function moveSlide(direction) {
              const sliderWrapper = document.querySelector('.slider-wrapper');
              const totalSlides = document.querySelectorAll('.card').length;
            
              currentIndex += direction;
            
              if (currentIndex < 0) {
                currentIndex = totalSlides - 1; // go to last slide
              } else if (currentIndex >= totalSlides) {
                currentIndex = 0; // go to first slide
              }
            
              const slideWidth = sliderWrapper.querySelector('.card').offsetWidth;
              sliderWrapper.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
            }