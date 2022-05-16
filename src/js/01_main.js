function mobileSize() {
  const mobile = document.querySelector('.mobile-page');
  if (window.matchMedia('(max-width: 991px)').matches && mobile) {
    mobile.style.height = mobile.offsetWidth * 1.9 + "px";
  }
}
mobileSize();