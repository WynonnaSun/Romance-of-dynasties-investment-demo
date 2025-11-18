// 加载导航栏
fetch("components/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("nav-placeholder").innerHTML = html;

    // 绑定 Logo 点击事件
    const logo = document.getElementById("logoBtn");
    if (logo) {
        logo.addEventListener("click", () => {
            window.location.href = "index.html";
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
