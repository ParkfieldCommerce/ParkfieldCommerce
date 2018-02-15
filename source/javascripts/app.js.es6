class Theme{
  constructor(){

  }

  init(){
    this.initMobileNavigation();
    this.initReviewsSlider();
  }

  initMobileNavigation(){
    let mobileTrigger = document.querySelector('#MobileNavTrigger');
    let header = document.querySelector('.MainHeader');
    mobileTrigger.addEventListener('click',(e)=>{
      if(mobileTrigger.classList.contains('is-open')){
        mobileTrigger.classList.remove('is-open');
        mobileTrigger.classList.add('is-closed');
        header.classList.remove('nav-is-open');
      }else{
        mobileTrigger.classList.remove('is-closed');
        mobileTrigger.classList.add('is-open');
        header.classList.add('nav-is-open');
      }
    });
  }

  initReviewsSlider(){
    const ReviewsSlider = $('.js-ReviewsSlider');
    const desktopButtons = $('.js-ReviewsSliderController__button');
    const mobileButtons = $('.js-ReviewsSlider__button');

    const slideTime = 6000; //10 seconds
    const incrementInterval = 10 //1 second change bar value
    const changePercentage = (incrementInterval/slideTime) * 100;
    function changeReviewBackground(url){
      const reviewBackground = $('.js-ReviewBlogContainerBackground');
      const reviewBackgroundAlt = $('.js-ReviewBlogContainerBackgroundAlt');
      if(reviewBackground.data('turn') < reviewBackgroundAlt.data('turn')){
        reviewBackground.css('background-image',`url("${url}")`);
        reviewBackgroundAlt.css('opacity', 0);
        reviewBackground.data('turn', 1);
        reviewBackgroundAlt.data('turn', 0);
      }else{
        reviewBackgroundAlt.css('background-image',`url("${url}")`);
        reviewBackgroundAlt.css('opacity', 1);
        reviewBackground.data('turn', 0);
        reviewBackgroundAlt.data('turn', 1);
      }
    }

    function reverseWidthTimer(currentSlide){
      if($(window).width() < 1000){        
        var buttonSet = mobileButtons;
      }else{
        var buttonSet = desktopButtons;
      }
      //Reset All Button Widths to 0
      $(buttonSet).each((index, button)=>{
        $(button).find('.js-ReviewsSlider__timer').width(0);
      });

      let currentButton = buttonSet[currentSlide];
      changeReviewBackground($(currentButton).data('bg'));
      const currentButtonTimer = $(currentButton).find('.js-ReviewsSlider__timer');
      currentButtonTimer.width('100%');
      let timer = setInterval(()=>{ 
        var currentPercentage = currentButtonTimer.width() / currentButtonTimer.parent().width() * 100;
        currentButtonTimer.width((currentPercentage - changePercentage) + '%');
      }, incrementInterval);

      setTimeout(()=>{
        currentButtonTimer.width(0);
        clearInterval(timer);
      }, slideTime + 1000);
    }

    if(ReviewsSlider.length > 0){//If slider exists initialize
      ReviewsSlider.on('init', function(slick){
        reverseWidthTimer(0);
      });

      ReviewsSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
        reverseWidthTimer(currentSlide);
      });

      ReviewsSlider.slick({
        arrows:false,
        fade: false,
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: slideTime + 1000,
        responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
            centerMode: false
          }
        }]
      });

      desktopButtons.each(function(i, button){
        $(this).on('click', ()=>{
          ReviewsSlider.slick('slickGoTo', i);
        });
      });
    }
  }
}

const Parkfield = new Theme();
Parkfield.init();