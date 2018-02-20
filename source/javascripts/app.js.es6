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
      })
      .on('click', '.brand', function() {
        var $this = $(this);

        $this.addClass('active');
        $this.siblings().addClass('no-hover');
        $brands_overlay.addClass('hide');
      });
    // ===========================================================
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
    // Build HTML
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
    $('#FilteredList').append(makeUL(newArraylist));
    // Filter Functions
    $('.FilterBtn').on('click touch', function() {
      var category = $(this).data('category');
      if (category == 'All') {
        $('.brand').velocity({opacity: 0}, {display: 'none'});
        $('.brand').not('.category-all').velocity({opacity: 0.5}, {display: 'block'});
      } else {
        $('.brand').velocity({opacity: 0}, {display: 'none'});
        $('.brand[data-category="' + category + '"]').velocity({opacity: 0.5}, {display: 'block'});
      }
    });
    // ===========================================================
    // ===========================================================
  }

  initCaseStudySlider() {
    $('.CaseStudy__challenge__slider__container--1').slick({

      centerPadding: ($('.slider').find('>div').outerWidth() / 2) + 'px',
      slidesToShow: 1,
      variableWidth: true
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
