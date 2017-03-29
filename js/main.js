var ticking = false;
var isFirefox = /Firefox/i.test(navigator.userAgent);
var isIe = /MSIE/i.test(navigator.userAgent) || /Trident.*rv\:11\./i.test(navigator.userAgent);
var scrollSensitivitySetting = 30;
var slideDurationSetting = 800;
var currentSlideNumber = 0;
var totalSlideNumber = $('.background').length;
function parallaxScroll(evt) {
    if (isFirefox) {
        delta = evt.detail * -120;
    } else if (isIe) {
        delta = -evt.deltaY;
    } else {
        delta = evt.wheelDelta;
    }
    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            ticking = true;
            if (currentSlideNumber !== totalSlideNumber - 1) {
                currentSlideNumber++;
                nextItem();
            }
            slideDurationTimeout(slideDurationSetting);
        }
        if (delta >= scrollSensitivitySetting) {
            ticking = true;
            if (currentSlideNumber !== 0) {
                currentSlideNumber--;
            }
            previousItem();
            slideDurationTimeout(slideDurationSetting);
        }
    }
}
function slideDurationTimeout(slideDuration) {
    setTimeout(function () {
        ticking = false;
    }, slideDuration);
}
var mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
function nextItem() {
    var $previousSlide = $('.background').eq(currentSlideNumber - 1);
    $previousSlide.css('transform', 'translate3d(0,-130vh,0)').find('.content-wrapper').css('transform', 'translateY(40vh)');
    currentSlideTransition();
}
function previousItem() {
    var $previousSlide = $('.background').eq(currentSlideNumber + 1);
    $previousSlide.css('transform', 'translate3d(0,30vh,0)').find('.content-wrapper').css('transform', 'translateY(30vh)');
    currentSlideTransition();
}
function currentSlideTransition() {
    var $currentSlide = $('.background').eq(currentSlideNumber);
    $currentSlide.css('transform', 'translate3d(0,0,0)').find('.content-wrapper').css('transform', 'translateY(15vh)');
    ;
}

$(function() {
  $.scrollify({
	section:".section",
    scrollbars:false,
    before:function(i,panels) {
      var ref = panels[i].attr("data-section-name");

      $(".pagination .active").removeClass("active");

      $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
    },
    afterRender:function() {
      var pagination = "<ul class=\"pagination\">";
      var activeClass = "";
      $(".section").each(function(i) {
        activeClass = "";
        if(i===0) {
          activeClass = "active";
        }
        pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
      });

      pagination += "</ul>";

      $(".home").append(pagination);
    }
  });


  /*

  Tip: The two click events below are the same:

  $(".pagination a").on("click",function() {
    $.scrollify.move($(this).attr("href"));
  });

  */
  $(".pagination a").on("click",$.scrollify.move);

});