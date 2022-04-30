function showPannel() {
  const buttonPannel = document.querySelector('.buttons');
  if (buttonPannel) {
    let prevScrollPos = window.pageYOffset;
    window.addEventListener('scroll', () => {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollPos < currentScrollPos) {
        buttonPannel.style.transform = 'translateY(0)';
      } else {
        buttonPannel.style.transform = 'translateY(100%)';
      }
      prevScrollPos = currentScrollPos;
    })
  }
}

showPannel();

function switchPannels() {
  const buttonPannel = document.querySelector('.buttons');
  const pannels = buttonPannel.querySelectorAll('.buttons__screen');
  const buttons = document.querySelectorAll('.buttons__btn[data-switchto]');
  const links = document.querySelectorAll('a.buttons__btn');

  buttonPannel.addEventListener('mouseenter', showMainPannel, false);
  buttonPannel.addEventListener('mouseleave', hideMainPannel, false);
  buttons.forEach(el => el.addEventListener('click', showSomePannel));
  links.forEach(el => el.addEventListener('click', hideMainPannel));

  function showMainPannel() {
    let pannel1 = document.querySelector('.buttons__screen[data-screen="1"]');
    pannel1.style.height = pannel1.scrollHeight + "px";
    setTimeout(() => {
      pannel1.classList.remove('--invisible');
      pannel1.removeAttribute('style');
    }, 250);
  };

  function hideMainPannel() {
    pannels.forEach(el => {
      el.style.height = 0;
      setTimeout(() => {
        el.classList.add("--invisible");
        el.removeAttribute('style');
      }, 250);
    })
  };

  function showSomePannel(e) {
    let targetPannel = document.querySelector(`.buttons__screen[data-screen="${ e.target.dataset.switchto}"]`);
    hideMainPannel();
    setTimeout(() => {
      targetPannel.style.height = targetPannel.scrollHeight + "px";
      setTimeout(() => {
        targetPannel.classList.remove('--invisible');
        targetPannel.removeAttribute('style');
      }, 250);
    }, 250);
  };
}

switchPannels();