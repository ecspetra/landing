$(document).ready(function () {
  PopUpHide();
  calculateDimensionsAndDrawMap();

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

  $(".accept-btn").click(function () {
    $("#ll-loginform-popup-wrapper").show();
    $("body").addClass("disabled-scroll");
  });
  $(".reg-popup__close").click(function () {
    $("#ll-loginform-popup-wrapper").hide();
    $("body").removeClass("disabled-scroll");
  });
});
function PopUpHide() {
  $("#ll-loginform-popup-wrapper").hide();
  $("body").removeClass("disabled-scroll");
}
$(document).mouseup(function (e) {
  var container = $("#ll-loginform-popup-wrapper");
  if (container.has(e.target).length === 0) {
    container.hide();
    $("body").removeClass("disabled-scroll");
  }
});

$(window).resize(function () {
  calculateDimensionsAndDrawMap();
});

function calculateDimensionsAndDrawMap() {
  let viewportWidth = document.documentElement.clientWidth;

  if (viewportWidth <= 768) {
    mapWidth = viewportWidth * 1.2;
    mapHeight = viewportWidth * 1.2;
  } else if (viewportWidth <= 1024) {
    mapWidth = viewportWidth * 0.6;
    mapHeight = viewportWidth * 0.4;
  } else if (viewportWidth <= 1400) {
    mapWidth = viewportWidth * 0.9;
    mapHeight = viewportWidth * 0.5;
  } else {
    mapWidth = 1335;
    mapHeight = 714;
  }

  drawMap(mapWidth, mapHeight);
}

function drawMap(width = 1335, height = 714) {
  fetch("russian-map-master/with-regions.json").then(function (response) {
    response.json().then(function (data) {
      $("#russian-map").empty();

      var map_tooltip;
      new RussianMap(
        {
          viewPort: data.viewPort,
          mapId: "russian-map",
          width: width,
          height: height,
          // дефолтовые атрибуты для контуров регионов
          defaultAttr: {
            fill: "#E6F7FF", // цвет которым закрашивать
            stroke: "#ffffff", // цвет границы
            "stroke-width": 1, // ширина границы
            "stroke-linejoin": "round", // скруглять углы
          },
          mouseMoveAttr: {
            fill: "#3E99ED",
          },
          onMouseMove: function (event) {
            map_tooltip = document.createElement("div");
            map_tooltip.innerHTML = this.region.name;

            document.getElementById("map-tooltip").appendChild(map_tooltip);

            console.log(
              "mouse on " +
                this.region.name +
                " (ident: " +
                this.region.ident +
                ")"
            );
          },
          onMouseOut: function (event) {
            map_tooltip.remove();

            console.log(
              "out on " +
                this.region.name +
                " (ident: " +
                this.region.ident +
                ")"
            );
          },
          onMouseClick: function (event) {
            console.log("clicked on " + this.region.name);
          },
        },
        data.regions
      );

      if (document.documentElement.clientWidth <= 768) {
        var panZoomTiger = svgPanZoom("#russian-map svg", {
          panEnabled: false,
          zoomEnabled: true,
          fit: true,
          center: true,
          dblClickZoomEnabled: false,
          preventMouseEventsDefault: false,
        });
      }
    });
  });
}
