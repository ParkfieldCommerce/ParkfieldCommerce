class Theme {
  constructor() {

  }

  init() {
    this.initMobileNavigation();
    this.initCaseStudySlider();
    this.initReviewsSlider();
    this.initBrandDropdown();
  }

  initBrandDropdown() {

    // isMobile Catch
    var isMobile = {
      Android: function() { return navigator.userAgent.match(/Android/i); },
      BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
      iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
      Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
      Windows:  function() { return navigator.userAgent.match(/IEMobile/i); },
      any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
    };

    // ===========================================================
    // Hover effects - see global/brand-dropdown.scss for more
    // ===========================================================
    var $brands_overlay = $('.BrandDropdown'),
      $brands_wrap = $brands_overlay.children('.BrandsWrapper');

    $brands_wrap
      .on('mouseenter', '.brand', function() {
        var bgImage = $(this).data('target'),
          $target = $('.BrandImage[data-hover="' + bgImage + '"]');
        if ($target)
          $target.addClass('visible');
      })
      .on('mouseleave', '.brand', function() {
        var $this = $(this),
          bgImage = $this.data('target'),
          $target = $('.BrandImage[data-hover="' + bgImage + '"]');
        if ($target && !$this.hasClass('active'))
          $target.removeClass('visible');
      });
      // .on('click', '.brand', function() {
      //   var $this = $(this);
      //
      //   $this.addClass('active');
      //   $this.siblings().addClass('no-hover');
      //   $brands_overlay.addClass('hide');
      // });
    // ===========================================================

    // ===========================================================
    // Category Filter
    // ===========================================================

    // Get Category list and create an Array
    var getCategoryList = function() {
      var category = $('.BrandsWrapper .brand').map(function() {
        return $(this).data('category')
      });
      return category.toArray();
    };
    // Remove duplicates from the Array
    function removeDuplicates(arr) {
      let unique_array = []
      for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
          unique_array.push(arr[i])
        }
      }
      return unique_array
    }
    var newArraylist = removeDuplicates(getCategoryList());
    // Build UL/LI
    function makeUL(array) {
      var list = document.createElement('ul');
      for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        item.setAttribute('data-category', array[i]);
        item.classList.add('FilterBtn');
        list.appendChild(item);
      }
      return list;
    }
    // Build Select/Option
    function makeSelect(array) {
      var list = document.createElement('select');
      for (var i = 0; i < array.length; i++) {
        var item = document.createElement('option');
        item.appendChild(document.createTextNode(array[i]));
        item.setAttribute('data-category', array[i]);
        list.appendChild(item);
      }
      return list;
    }

    if (isMobile.any()) {
      $('#FilteredList').append(makeSelect(newArraylist));
      $('#FilteredList select').prepend('<option disabled selected>Filter By</option>');
      // Mobile Filter Functions
      $('#FilteredList select').on('change', function() {
          var filterData = $(this).val();
          if (filterData == 'All') {
            $('.brand').velocity({opacity: 0}, {display: 'none'}, {duration: 1000});
            $('.brand').not('.category-all').velocity({opacity: 0.5}, {display: 'block'}, {duration: 1000});
          } else {
            $('.brand').velocity({opacity: 0}, {display: 'none'}, {duration: 1000});
            $('.brand[data-category="' + filterData + '"]').velocity({opacity: 0.5}, {display: 'block'}, {duration: 1000});
          }
      });
    } else {
      $('#FilteredList').append(makeUL(newArraylist));
      // Filter Functions
      $('.FilterBtn').on('click touch', function() {
        var category = $(this).data('category');

        if (category == 'All') {
          $('.brand').velocity({opacity: 0}, {display: 'none'}, {duration: 1000});
          $('.brand').not('.category-all').velocity({opacity: 0.5}, {display: 'block'}, {duration: 1000});
        } else {
          $('.brand').velocity({opacity: 0}, {display: 'none'}, {duration: 1000});
          $('.brand[data-category="' + category + '"]').velocity({opacity: 0.5}, {display: 'block'}, {duration: 1000});
        }
      });
    }
    // ===========================================================
  }

  initCaseStudySlider() {
    $('.CaseStudy__challenge__slider__container--2').slick({
      slidesToShow: 1,
      centerPadding: ($('.CaseStudy__challenge__slider__container--2').find('.test').outerWidth() / 2) + 'px',
      variableWidth: true,
      nextArrow: '.CaseStudy__challenge__right-arrow',
      prevArrow: '.CaseStudy__challenge__left-arrow',
      responsive: [
      {
        breakpoint:768,
        settings:{
          centerMode: true,
        }
      }]
    });
  }
  initMobileNavigation() {
    let mobileTrigger = document.querySelector('#MobileNavTrigger');
    let header = document.querySelector('.MainHeader');
    mobileTrigger.addEventListener('click', (e) => {
      if (mobileTrigger.classList.contains('is-open')) {
        mobileTrigger.classList.remove('is-open');
        mobileTrigger.classList.add('is-closed');
        header.classList.remove('nav-is-open');
      } else {
        mobileTrigger.classList.remove('is-closed');
        mobileTrigger.classList.add('is-open');
        header.classList.add('nav-is-open');
      }
    });
  }

  initReviewsSlider() {
    const ReviewsSlider = $('.js-ReviewsSlider');
    const slideTime = 6000; //10 seconds
    const incrementInterval = 10 //1 second change bar value
    const changePercentage = (incrementInterval / slideTime) * 100;

    if ($(window).width() < 1000) {
      var buttonSet = $('.js-ReviewsSlider__button');;
    } else {
      var buttonSet = $('.js-ReviewsSliderController__button');;
    }

    function changeReviewBackground(url) {
      const reviewBackground = $('.js-ReviewBlogContainerBackground');
      const reviewBackgroundAlt = $('.js-ReviewBlogContainerBackgroundAlt');
      if (reviewBackground.data('turn') < reviewBackgroundAlt.data('turn')) {
        reviewBackground.css('background-image', `url("${url}")`);
        reviewBackgroundAlt.css('opacity', 0);
        reviewBackground.data('turn', 1);
        reviewBackgroundAlt.data('turn', 0);
      } else {
        reviewBackgroundAlt.css('background-image', `url("${url}")`);
        reviewBackgroundAlt.css('opacity', 1);
        reviewBackground.data('turn', 0);
        reviewBackgroundAlt.data('turn', 1);
      }
    }

    function reverseWidthTimer(currentSlide) {
      //Reset All Button Widths to 0
      $(buttonSet).each((index, button) => {
        $(button).find('.js-ReviewsSlider__timer').width(0);
      });

      let currentButton = buttonSet[currentSlide];
      const currentButtonTimer = $(currentButton).find('.js-ReviewsSlider__timer');
      let timer = setInterval(() => {
        var currentPercentage = currentButtonTimer.width() / currentButtonTimer.parent().width() * 100;
        currentButtonTimer.width((currentPercentage + changePercentage) + '%');
      }, incrementInterval);

      setTimeout(() => {
        currentButtonTimer.width(0);
        clearInterval(timer);
      }, slideTime + 1000);
    }

    if (ReviewsSlider.length > 0) { //If slider exists initialize
      ReviewsSlider.on('init', function(slick) {
        let currentButton = buttonSet[0];
        changeReviewBackground($(currentButton).data('bg'));
        reverseWidthTimer(0);
      });

      ReviewsSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
        reverseWidthTimer(currentSlide);
      });

      ReviewsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        let nextButton = buttonSet[nextSlide];
        changeReviewBackground($(nextButton).data('bg'));
      });

      ReviewsSlider.slick({
        arrows: false,
        fade: true,
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: slideTime + 1000,
        responsive: [{
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
            centerMode: false
          }
        }]
      });

      buttonSet.each(function(i, button) {
        $(this).on('click', () => {
          ReviewsSlider.slick('slickGoTo', i);
        });
      });
    }
  }
}

const Parkfield = new Theme();
Parkfield.init();
