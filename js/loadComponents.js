// 加载导航栏
fetch("components/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("nav-placeholder").innerHTML = html;

    // Logo 点击事件（保持你原来的逻辑）
    const logo = document.getElementById("logoBtn");
    if (logo) {
        logo.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // ⭐ 汉堡菜单逻辑（无遮罩 + 点击空白关闭）
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {

        // 点击汉堡按钮 打开/关闭菜单
        hamburger.addEventListener("click", (event) => {
            event.stopPropagation(); // 避免冒泡到 document
            navMenu.classList.toggle("open");
        });

        // 点击菜单本身不关闭
        navMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // 点击空白处自动关闭菜单
        document.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    }
  });


// 加载页脚
fetch("components/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer-placeholder").innerHTML = html;
  });



// 卡片 hover 时自动轮播 3 张图片
document.querySelectorAll('.card-img-wrapper').forEach(wrapper => {

    const img = wrapper.querySelector('.business-img');
    const images = JSON.parse(wrapper.getAttribute('data-images'));

    let index = 0;
    let interval = null;

    wrapper.addEventListener('mouseenter', () => {
        interval = setInterval(() => {
            index = (index + 1) % images.length;
            img.src = images[index];
        }, 450); // 切换速度，可以调快或放慢
    });

    wrapper.addEventListener('mouseleave', () => {
        clearInterval(interval);
        index = 0;
        img.src = images[0]; // 恢复第一张
    });

});


/* 上方两个小图：瞬间切换下一张（无动画） */
document.querySelectorAll('.slider').forEach(slider => {
    const images = slider.querySelectorAll('.slides img');
    let index = 0;

    // 初始显示
    images[0].classList.add('active');

    function switchInstant() {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    }

    // 每 3 秒切换一次
    setInterval(switchInstant, 3000);
});

/* ===========================================
   下方 Banner：自动轮播 + 手动控制
=========================================== */
let bannerIndex = 0;
const bannerSlides = document.querySelector('.banner-slides');
const bannerImages = bannerSlides.children.length;

function showBanner(i) {
    bannerIndex = (i + bannerImages) % bannerImages;
    bannerSlides.style.transform = `translateX(-${bannerIndex * 100}%)`;
}

// 手动左右切换
document.querySelector('.banner-arrow.left').onclick = () => {
    showBanner(bannerIndex - 1);
};
document.querySelector('.banner-arrow.right').onclick = () => {
    showBanner(bannerIndex + 1);
};

// 自动轮播（4 秒）
setInterval(() => {
    showBanner(bannerIndex + 1);
}, 4000);
