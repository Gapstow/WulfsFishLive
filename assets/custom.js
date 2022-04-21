$(document).ready(function(){

  $('body').on('click','.custom-mobile-link', function(e){
    if ($(window).width() > 797) {
      console.log('clicked mobile mega parent');
      $(this).closest('label').click();  
    } else {
      e.preventDefault();
      $(this).next(".close-dropdown").trigger("click");
    }
  });

  $('.product-thumbnail__title').matchHeight();
  $('.blog-card__content .title').matchHeight();
  $('#panel-articles .title').matchHeight();
  if ( $('.custom-landing-page-image-grid-section .wulf-overlap-title').length ) {
    $('.custom-landing-page-image-grid-section .wulf-overlap-title').matchHeight();
  }

  
  
  var featuredReviewsSlider = $('#featuredReviewsWrapper');

  $(featuredReviewsSlider).flickity({
    lazyLoad: 2,
    freeScroll: true,
    imagesLoaded: true,
    draggable: true,
    autoPlay: true,
    cellAlign: 'center',
    wrapAround: true,
    pageDots: true,
    contain: true,
    prevNextButtons: true,
    initialIndex: 0,
    on: {
      ready: function ready() {
        // Reset layout to avoid collapsing issues
        setTimeout(function () {
          $(featuredCollectionSlider).flickity('resize');
        }, 500);
      }
    }
  });

  if ( $('#customFieldChefs').length ) {
    $('#customFieldChefs').flickity({
      wrapAround: true,
      imagesLoaded: false,
      initialIndex: 1,
      autoPlay: true,
      pauseAutoPlayOnHover: false,
      pageDots: false,
      on: {
        ready: function ready() {
          // Reset layout to avoid collapsing issues
          setTimeout(function () {
            $(customFieldChefs).flickity('resize');
            $(customFieldChefs).fadeIn().css('opacity','1');
          }, 600);
        }
      }
    });
    $('#chefTestimonialPrev').on('click',function(){
      $('#customFieldChefs').flickity( 'previous' )
    });
    $('#chefTestimonialNext').on('click',function(){
      $('#customFieldChefs').flickity( 'next' )
    });
  }

  if ( $('#articleImageGallery').length ) {
    $('#articleImageGallery').flickity({
      wrapAround: true,
      imagesLoaded: true,
      on: {
        ready: function ready() {
          // Reset layout to avoid collapsing issues
          setTimeout(function () {
            $(articleImageGallery).flickity('resize');
            $(articleImageGallery).fadeIn().css('opacity','1');
          }, 500);
        }
      }
    });
  }

  /*
  var $wrapper = $('#articlesWrapper');

  $wrapper.find('.featured-article').sort(function(a, b) {
    console.log(a.dataset.updated, b.dataset.updated, a.dataset.updated > b.dataset.updated);
    return a.dataset.updated > b.dataset.updated;
  })
  .appendTo($wrapper);
  */


  $("#articlesWrapperx .featured-article").sort(sort_li) // sort elements
                    .appendTo('#articlesWrapper'); // append again to the list

  $("#articlesWrapper").css('opacity',1);
  // sort function callback
  function sort_li(a, b){
    console.log(($(b).data('updated')) < ($(a).data('updated')) ? -1 : 1);
      return ($(b).data('updated')) < ($(a).data('updated')) ? -1 : 1;    
  }

  atcFormIsInView();


  var $cartAccordionHeading = $('#cartShippingMotivator .faq-accordion > dt > button');

  console.log($cartAccordionHeading);
  $('#cartShippingMotivator .faq-accordion > dd').attr('aria-hidden', true);
  $cartAccordionHeading.attr('aria-expanded', false);
  $cartAccordionHeading.on('click activate', function () {
    console.log('accordion click cart');
    var faqTitle = $(this);
    var faqIcons = $(this).find('.icon');
    var state = $(this).attr('aria-expanded') === 'false' ? true : false;
    $(this).attr('aria-expanded', state);
    $(this).parent().next().slideToggle(function () {
      if (faqIcons.hasClass('icon--active')) {
        faqIcons.toggleClass('icon--active');
      }
    });
    $(this).parent().next().attr('aria-hidden', !state);
    if ( $('#panel-articles').length ) {
      var minTitleHeight = 0;
      var minImageHeight = 0;
      $('#panel-articles .image-element__wrap').each(function(){
        console.log($(this).height());
        if ( $(this).height() > minImageHeight ) {
          minImageHeight = $(this).height();
        }
      });
      $('#panel-articles .image-element__wrap').each(function(){
        $(this).height(minImageHeight);
      });
      console.log({minImageHeight});

    }
    return false;
  });

  $('body').on('click','.cart-accordion__button',function(){
    console.log('real cart accordion click');
    var faqIcons = $(this).find('.icon');
    var state = $(this).attr('aria-expanded') === 'false' ? true : false;
    $(this).attr('aria-expanded', state);
    $(this).parent().next().slideToggle(function () {
      if (faqIcons.hasClass('icon--active')) {
        faqIcons.toggleClass('icon--active');
      }
    });
    $(this).parent().next().attr('aria-hidden', !state);
    return false;
  });

  // cart champion popup
  $("#cart_form #checkout").on("click", function(e) {
    var champion_popup = $(".cart-champion-popup");
    if (champion_popup.length > 0 && champion_popup.hasClass("popup-hide")) {
      e.preventDefault();
      champion_popup.removeClass("popup-hide");
      champion_popup.attr("data-flag", "cartPage");
    }
  })

  $('[data-ajax-cart-drawer]').on("click", ".button--add-to-cart", function(e) {
    var champion_popup = $(".cart-champion-popup");
    if (champion_popup.length > 0 && champion_popup.hasClass("popup-hide")) {
      e.preventDefault();
      champion_popup.removeClass("popup-hide");
      champion_popup.attr("data-flag", "drawer");
    }
  })
  $(".shopify-payment-button").on("click", function(e) {
    var champion_popup = $(".cart-champion-popup");
    if (champion_popup.length > 0 && champion_popup.hasClass("popup-hide")) {
      e.preventDefault();
      e.stopPropagation();
      champion_popup.removeClass("popup-hide");
      champion_popup.attr("data-flag", "BuyNow");
    }
  })

  $(".cart-champion-popup .fc-item").on("click", function() {
    var notes = $(this).data("note");

    if ($(".cart-champion-popup").attr("data-flag") == "drawer") {
      var origin_notes = $('.ajax-cart__form textarea[name="note"]').text();
      var index = origin_notes.indexOf("Superbowl");
      console.log(index);
      if (index > 0) {
        origin_notes = origin_notes.substr(0, index);  
      } else {
        origin_notes = '';
      }
      console.log(origin_notes);
      var final_notes = origin_notes + " " + notes;
      $('.ajax-cart__form textarea[name="note"]').text(final_notes);
      $(".ajax-cart__form .button--add-to-cart").trigger("click");
    } else if ($(".cart-champion-popup").attr("data-flag") == "BuyNow") {
      var updateData = {
        'note': notes
      };
      fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
      .then(response => {
        $(".shopify-payment-button").trigger("click");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      var origin_notes = $('#cart_form .cart__notes textarea[name="note"]').text();
      var index = origin_notes.indexOf("Superbowl");
      if (index > 0) {
        origin_notes = origin_notes.substr(0, index);  
      }  else {
        origin_notes = '';
      }
      var final_notes = origin_notes + " " + notes;
      $('#cart_form .cart__notes textarea[name="note"]').text(final_notes);
      $("#cart_form #checkout").trigger("click");
    }
  })


  $('.wholesale-slides').slick({
    dots: true,
    infinite: false,
    arrows: true
  });

  // Wholesale Featured List slider
  $('.wholesale-featured-slides').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    infinite: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 800,
        /*
        settings: unslick
        */
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          infinite: true,
          arrows: false
        }
        
      }
    ]
  }); 

  function initFeaturedSlides() {
    $('.featured-list-slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      infinite: true,
      asNavFor: '.featured-list-slider-nav'
    });
    $('.featured-list-slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical:true,
      infinite: true,
      asNavFor: '.featured-list-slider-for',
      dots: false,
      focusOnSelect: true,
      verticalSwiping:true,
      responsive: [
        {
          breakpoint: 580,
          settings: {
            vertical: false,
          }
        }
      ]
    });
  }

  function destroyFeaturedSlides() {
    $('.featured-list-slider-for').slick('unslick');
    $('.featured-list-slider-nav').slick('unslick');
  }

  initFeaturedSlides();
  
  $('body').on('click', '.wholesale-featured-slide', function() {
    var dataNum = $(this).data('num');
    $('.wholesale-featured-list').removeClass('active');
    $('.wholesale-featured-list[data-num="' + dataNum + '"]').addClass('active');
    destroyFeaturedSlides();
    initFeaturedSlides()
    
  });
  

  
});

$(window).on('scroll', function () {
  atcFormIsInView();
});

function atcFormIsInView() {
  if ( $('.purchase-details__buttons').length ) {
    var   top = $(window).scrollTop(),
          bottom = $(window).scrollTop() + $(window).height(),
          divTop = $('.purchase-details.desktop-hide').offset().top - 30,
          divBottom = $('.purchase-details.desktop-hide').offset().top + $('.purchase-details__buttons').outerHeight() + 30;
    if (divBottom > top && divTop < bottom) {
        $('body').removeClass('add-to-cart-out-of-view');
    } else {
        $('body').addClass('add-to-cart-out-of-view');
    }
  }
}




$("#giftMessage").on('change keyup paste', function() {
  console.log('change');
  console.log($(this));
  console.log($(this).html());
});


/*
$('body').on('change keyup paste', '#giftMessage', function() {
  console.log('change');
  console.log($(this));
  console.log($(this).val());
  var dynamicGiftMessage = $(this).val();
  
  var attributeString = `attributes[Gift wrap]=Yes`;
  $.post('/cart/update.js', );
});
*/
$('body').on('focusout ', '#giftMessage', function() {
  console.log('change');
  console.log($(this));
  var dynamicGiftMessage = $(this).val();
  console.log(dynamicGiftMessage);
  
  var attributeString = `attributes[gift_message]=${dynamicGiftMessage}`;
  console.log(attributeString);
  $.post('/cart/update.js', attributeString);
});
$('body').on('focusout ', '#note', function() {
  console.log('change');
  console.log($(this));
  var dynamicNote = $(this).val();
  console.log(dynamicNote);
  
  //var attributeString = `attributes[gift_message]=${dynamicGiftMessage}`;
  //console.log(attributeString);
  $.post('/cart/update.js', {note: dynamicNote});
});