function mobileSize() {
  const mobile = document.querySelector('.mobile-page');
  if (window.matchMedia('(max-width: 991px)').matches && mobile) {
    mobile.style.maxHeight = mobile.offsetWidth * 1.9 + "px";
    mobile.style.height = window.innerHeight - (3 * rem) + "px";
  }
}
mobileSize();