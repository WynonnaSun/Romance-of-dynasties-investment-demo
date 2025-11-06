// 简单控制板块开关
const sectionConfig = {
  about: true,
  news: true,
  works: true,
  products: true,
  contact: true
};

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(sectionConfig).forEach(id => {
    if (!sectionConfig[id]) {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    }
  });
});



// 展示banner

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slidesContainer = document.querySelector('.slides');
let currentIndex = 0;
let autoPlayTimer;

// 显示指定幻灯片
function showSlide(index) {
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentIndex = index;

  const offset = -index * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// 上一张、下一张
function nextSlide() { showSlide(currentIndex + 1); }
function prevSlide() { showSlide(currentIndex - 1); }

// 点击事件
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
dots.forEach(dot => {
  dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)));
});

// 自动播放
function startAutoPlay() {
  autoPlayTimer = setInterval(nextSlide, 2500);
}
function stopAutoPlay() {
  clearInterval(autoPlayTimer);
}

// 鼠标悬停时暂停
const carousel = document.querySelector('.hero-carousel');
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// 初始化
showSlide(0);
startAutoPlay();


// 可选：添加轻微的鼠标移动光影效果
const cards = document.querySelectorAll('.ip-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.transform = `translateY(-5px) rotateX(${(y - rect.height/2) / 20}deg) rotateY(${-(x - rect.width/2) / 20}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

