$(document).ready(function () {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  $("#link-to-bottom").on("click", function (event) {
    if (this.hash === "") {
      return;
    }

    event.preventDefault();

    var hash = this.hash;

    window.scroll({
      top: $(hash).offset().top,
      left: 0,
      behavior: "smooth",
    });

    window.location.hash = hash;
  });
});
