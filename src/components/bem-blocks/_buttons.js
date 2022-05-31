const rem = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));

const scenesSlider = new Swiper(".screens__slider.swiper", {
  slidesPerView: 1,
  spaceBetween: rem,
  autoplay: {
    delay: 3000,
    speed: 1500,
  }
});

function stopSwiper() {
  if (window.matchMedia('(max-width: 991px)').matches) {
    sceneSlider.autoplayStop();
  } else {
    scenesSlider.autoplayStart();
  }
}

function menu() {
  const menuBtn = document.querySelectorAll('.js-chatbot-menu-btn');
  const goBackBtn = document.querySelectorAll('.js-goback-btn');
  const dropdownBtn = document.querySelectorAll('.js-dropdown-btn');

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
      let h = sliderScene.parentNode.offsetHeight - (10 * rem);
      sliderScene.style.height = h + "px";
    }, 120);

    setTimeout(() => {
      chatbotMenu.style.transform = "translateY(0)"
      chatbotMenu.classList.add("--is-visible");
      thisBtn.style.height = 0;
      thisBtn.style.padding = 0;
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
      document.querySelectorAll(".buttons__dropdown-inner").forEach(el => {
        hideDropdown(el);
      });
      document.querySelectorAll('.js-dropdown-btn').forEach(el => {
        el.dataset.current = false;
      });
    }, 250);
  }

  function dropDowns(e) {
    const parent = e.currentTarget.closest('.chatbot');
    const dropdowns = parent.querySelectorAll(".buttons__dropdown-inner");
    const thisDropDown = parent.querySelector(`.buttons__dropdown-inner.${e.currentTarget.dataset.dropdown}`);
    const dropDownStatus = e.currentTarget.dataset.current === "false" || null || undefined || 0 || "" ? false : true;
    if (!dropDownStatus) {
      dropdowns.forEach(el => hideDropdown(el));
      setTimeout(() => {
        showDropdown(thisDropDown);
      }, 300);
    } else {
      hideDropdown(thisDropDown);
    }

    parent.querySelectorAll(`.js-dropdown-btn:not(.${e.currentTarget.dataset.dropdown})`).forEach(el => el.dataset.current = false);
    console.dir(parent.querySelectorAll(`.js-dropdown-btn:not(.${e.currentTarget.dataset.dropdown})`));

    e.currentTarget.dataset.current = !dropDownStatus;
  }

  function showDropdown(dropdown) {
    let padding = 0.5
    dropdown.style.padding = padding + "rem";
    dropdown.style.height = dropdown.scrollHeight + (padding * rem * 2) + "px";
  }

  function hideDropdown(dropdown) {
    dropdown.style.paddingTop = 0;
    dropdown.style.paddingBottom = 0;
    dropdown.style.height = 0;
    setTimeout(() => {
      dropdown.removeAttribute("style");
    }, 250);
  }

  menuBtn.forEach(el => {
    el.addEventListener("click", showMenu)
  });

  goBackBtn.forEach(el => {
    el.addEventListener("click", hideMenu)
  });

  dropdownBtn.forEach(el => {
    el.addEventListener("click", dropDowns)
  });
}

menu();