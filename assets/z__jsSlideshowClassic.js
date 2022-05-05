"use strict";

Shopify.theme.jsSlideshowClassic = {
  init: function init($section) {
    console.log('init slideshow classic',$section);
    // Add settings from schema to current object
    Shopify.theme.jsSlideshowClassic = $.extend(this, Shopify.theme.getSectionData($section)); // Selectors

    var $slideshowClassicEl = $section.find('[data-slideshow-classic]').removeClass('is-hidden');
    var slideCount = $slideshowClassicEl.data('slide-count');
    
    var $slideshowClassic = $slideshowClassicEl.flickity({
      wrapAround: true,
      prevNextButtons: this.number_of_slides > 1 ? this.show_arrows : false,
      pageDots: this.show_nav_buttons,
      draggable: true,
      imagesLoaded: true,
      fade: this.image_transition == 'fade' ? true : false,
      autoPlay: this.image_slideshow_speed * 1000,
      arrowShape: arrowShape
    });

    var players = [];

    $('.embed-container iframe').each(function(i){
      var thisIframe = $(this);
      var tempPlayer = new Vimeo.Player(thisIframe);
      tempPlayer.pause();
      tempPlayer.on('ended',function(){
        console.log('video ended');
        $slideshowClassic.flickity('next');
      });
      players.push(tempPlayer);
    });


    $slideshowClassic.on('ready.flickity',function(){
      console.log('flickity loaded');
    });

    players[0].setVolume(0);
    players[0].play();

    $slideshowClassic.on( 'change.flickity', function( event, index ) {
      players.forEach(function(player){
        player.pause();
      })
      var videoWrapper = $('#videoWrapper-' + index);
      console.log({videoWrapper}); 
      if (videoWrapper.length) {
        var videoIframe = videoWrapper.find('iframe');
        videoIframe.addClass('this-one-changed-to');
        var player = new Vimeo.Player(videoIframe);
        player.setCurrentTime(0);
        player.setVolume(0.3);
        player.play();
      } else {
        console.log('this is an image slide');
      }
    });


    setTimeout(function () {
      $slideshowClassicEl.flickity('resize');
    }, 500);

    $('#clickToUnmuteButton').on('click',function(){
      players[0].setVolume(0.5);
      $('#clickToUnMute').fadeOut();
    });

  },
  blockSelect: function blockSelect($section, blockId) {
    var $slider = $section.find('[data-image-slideshow]');
    var $sliderIndex = $('#shopify-section-' + blockId).data('slide-index');
    $slider.flickity('select', $sliderIndex, true, true);
  },
  unload: function unload($section) {}
};