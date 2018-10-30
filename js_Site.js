//----------- Global Variables -------------
var initialHeight = 235;
var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");
var slides,dots;
var i;
var lines = document.getElementsByClassName('line');
var svgLines = document.getElementsByClassName('svgLine');

// var initialWidth = $(window).width();
//----------- Global Variables -------------

$( document ).ready(function() {

});

//----------- Width change -------------
$(window).resize(function(){
  // if($(document).width() < 700){
  // document.getElementById("testScrittura").innerHTML = "larghezza cambiata";
  modifyStoryLine();
  // }
});
//----------- Width change -------------


//----------- Insieme di funzioni per far funzionare il carousel -------------

// Pulisce i dots e le immagini, in modo che poi possa essere visualizzaata l'immagine corretta
// e il dot corretto
function clearSlide(){
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    slides[i].style.display = "none";
  }
}

// Permette di far scorrere le immagini automaticamente
function showSlides() {
  slideIndex++;
  if (slideIndex> slides.length) {slideIndex = 1}
  clearSlide();
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 8 seconds
}
// Fa andare avanti/indietro l'immagine
function plusSlides(position) {
  slideIndex +=position;
  if (slideIndex> slides.length) {slideIndex = 1}
  else if(slideIndex<1){slideIndex = slides.length}
  clearSlide();
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
// cambia immagine in funzione del dot selezionato
function currentSlide(index) {
  if (index> slides.length) {index = 1}
  else if(index<1){index = slides.length}
  clearSlide();
  slides[index-1].style.display = "block";
  dots[index-1].className += " active";
  slideIndex=index;
}

//----------- Fine funzioni per il carousel -------------

//----------- Fixare la nav bar -------------
window.onscroll = changePos;
document.addEventListener("scroll", changePos);

function changePos() {
  // initialHeight = $("#sezioneTutteLePagine").outerHeight(true)+ $("#sezioneAlta").outerHeight(true);
  var header = document.getElementById("nav_bar");
  if (window.pageYOffset > initialHeight) {
    header.style.position = "fixed";
    header.style.top = "0";
  } else {
    header.style.position = "";
    header.style.top = "";
  }
}


//----------- Fine Fixare la nav bar -------------

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("nav_bar");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}




//----------- Toggle triangle la nav bar -------------
function triangleDown(){
  document.getElementById("menu_hover").className = "fa fa-caret-down";
}
function triangleUp(){
  document.getElementById("menu_hover").className = "fa fa-caret-up";
}
//----------- Fine toggle triangle la nav bar -------------


//----------- Mostrare la mappa -------------
function myMap() {
  var toulouse = new google.maps.LatLng(43.604652,1.444209);

  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: toulouse, zoom: 10};
  var map = new google.maps.Map(mapCanvas,mapOptions);

  var myCity = new google.maps.Circle({
    center: toulouse,
    radius: 5000,
    strokeColor: "#878ff4",
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: "#87ddf4",
    fillOpacity: 0.3
  });
  var marker = new google.maps.Marker({position:toulouse});
  marker.setMap(map);
  var infowindow = new google.maps.InfoWindow({
    content: "Here I am :)"
  });
  myCity.setMap(map);

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });
}
//----------- Mostrare la mappa -------------


//----------- Story line -------------

function modifyStoryLine(){
  if ($(window).width()<700){

    for (i = 0; i < lines.length; i++) {
      // document.getElementById("testScrittura").innerHTML = "larghezza cambiata: "+i;
      svgLines[i].setAttribute("width", 2.5);
      svgLines[i].setAttribute("height",50);
      lines[i].setAttribute("x1", 2.5);
      lines[i].setAttribute("x2", 2.5);
      lines[i].setAttribute("y2", 50);
    }

  }else{

    for (i = 0; i < lines.length; i++) {
      // document.getElementById("testScrittura").innerHTML = "larghezza cambiata: "+i;
      svgLines[i].setAttribute("height",5);
      svgLines[i].setAttribute("width",$(window).width()/10)
      lines[i].setAttribute("x2", $(window).width()/10);
      lines[i].setAttribute("y2", 0);
    }

    // document.getElementById('svgLine').setAttribute("width", 10);
    // document.getElementById("testScrittura").innerHTML = "larghezza cambiata: "+$(window).width()/8;
  }
}

//----------- Story line -------------
jQuery(function($) {
  modifyStoryLine();
  var html = $('html');
  var viewport = $(window);
  var viewportHeight = viewport.height();

  var scrollMenu = $('#section-menu');
  var timeout = null;

  function menuFreeze() {
    if (timeout !== null) {
      scrollMenu.removeClass('freeze');
      clearTimeout(timeout);
    }

    timeout = setTimeout(function() {
      scrollMenu.addClass('freeze');
    }, 1500);
  }
  scrollMenu.mouseover(menuFreeze);

  /* ==========================================================================
  Build the Scroll Menu based on Sections .scroll-item
  ========================================================================== */

  var sectionsHeight = {},
  viewportheight, i = 0;
  var scrollItem = $('.scroll-item');
  var bannerHeight;

  function sectionListen() {
    viewportHeight = viewport.height();
    bannerHeight = (viewportHeight);
    $('.section').addClass('resize');
    scrollItem.each(function() {
      sectionsHeight[this.title] = $(this).offset().top;
    });
  }
  sectionListen();
  viewport.resize(sectionListen);
  viewport.bind('orientationchange', function() {
    sectionListen();
  });

  var count = 0;

  scrollItem.each(function() {
    var anchor = $(this).attr('id');
    var title = $(this).attr('title');
    count++;
    $('#section-menu ul').append('<li><a id="nav_' + title + '" href="#' + anchor + '"><span>' + count + '</span> ' + title + '</a></li>');
  });

  function menuListen() {
    var pos = $(this).scrollTop();
    pos = pos + viewportHeight * 0.625;
    for (i in sectionsHeight) {
      if (sectionsHeight[i] < pos) {
        $('#section-menu a').removeClass('active');
        $('#section-menu a#nav_' + i).addClass('active');;
        var newHash = '#' + $('.scroll-item[title="' + i + '"]').attr('id');
        if (history.pushState) {
          history.pushState(null, null, newHash);
        } else {
          location.hash = newHash;
        }
      } else {
        $('#section-menu a#nav_' + i).removeClass('active');
        if (pos < viewportHeight - 72) {
          history.pushState(null, null, ' ');
        }
      }
    }
  }
  scrollMenu.css('margin-top', scrollMenu.height() / 2 * -1);

  /* ==========================================================================
  Smooth Scroll for Anchor Links and URL refresh
  ========================================================================== */

  scrollMenu.find('a').click(function() {
    var href = $.attr(this, 'href');
    $('html').animate({
      scrollTop: $(href).offset().top
    }, 500, function() {
      window.location.hash = href;
    });
    return false;
  });

  /* ==========================================================================
  Fire functions on Scroll Event
  ========================================================================== */

  function scrollHandler() {
    menuListen();
    menuFreeze();
  }
  scrollHandler();
  viewport.on('scroll', function() {
    scrollHandler();
    //			window.requestAnimationFrame(scrollHandler);
  });
});


//------------ Project
