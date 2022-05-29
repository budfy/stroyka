const rem = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));
const scenesSlider = new Swiper(".screens__slider.swiper", {
  slidesPerView: 1,
  spaceBetween: rem,
});


function menu() {
  const menuBtn = document.querySelectorAll('.js-chatbot-menu-btn');
  const goBackBtn = document.querySelectorAll('.js-goback-btn');

  function showMenu(e) {
    const parent = e.currentTarget.closest('.chatbot')
    const chatbotMenu = parent.querySelector('.js-chatbot-menu');
    const mainScene = parent.querySelector('.screens__main');
    const sliderScene = parent.querySelector('.screens__slider');
    const thisBtn = parent.querySelector('.js-chatbot-menu-btn');

    let height = chatbotMenu.scrollHeight;

    chatbotMenu.style.overflow = "visible";
    chatbotMenu.style.height = height + "px";

    mainScene.style.overflow = 'hidden';
    mainScene.style.transition = "all 0.24s";
    mainScene.style.height = 0;

    thisBtn.classList.add('--is-hidden');

    setTimeout(() => {
      let h = sliderScene.parentNode.offsetHeight;
      sliderScene.style.height = h + "px";
    }, 120);

    setTimeout(() => {
      chatbotMenu.style.transform = "translateY(0)"
      chatbotMenu.classList.add("--is-visible");
      thisBtn.style.height = 0;
      thisBtn.style.padding = 0;
      scenesSlider.update();
    }, 250);
  }

  function hideMenu(e) {
    const parent = e.currentTarget.closest('.chatbot')
    const chatbotMenu = parent.querySelector('.js-chatbot-menu');
    const mainScene = parent.querySelector('.screens__main');
    const sliderScene = parent.querySelector('.screens__slider');
    const thisBtn = parent.querySelector('.js-chatbot-menu-btn');

    let h = mainScene.scrollHeight + "px";

    chatbotMenu.style.transform = "translateY(250%)"
    chatbotMenu.classList.remove("--is-visible");
    chatbotMenu.style.overflow = "hidden";
    chatbotMenu.style.height = 0;

    mainScene.style.overflow = 'auto';
    mainScene.style.transition = "all 0.24s";

    thisBtn.removeAttribute("style");

    setTimeout(() => {
      sliderScene.style.height = 0;
    }, 120);

    setTimeout((e) => {
      mainScene.style.height = h;
      mainScene.removeAttribute("style");
      thisBtn.classList.remove('--is-hidden');
      scenesSlider.update();
    }, 250);
  }

  menuBtn.forEach(el => {
    el.addEventListener("click", showMenu)
  });
  goBackBtn.forEach(el => {
    el.addEventListener("click", hideMenu)
  });
}

menu();