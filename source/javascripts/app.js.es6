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
    const desktopButtons = $('.ReviewsSliderController__button');
    const mobileButtons = $('.ReviewsSlider__button');

    const slideTime = 6000; //10 seconds
    const incrementInterval = 10 //1 second change bar value
    const changePercentage = (incrementInterval/slideTime) * 100;

    function startWidthTimer(currentSlide){
      const currentButton = desktopButtons[currentSlide];
      const currentButtonTimer = $(currentButton).find('.ReviewsSliderController__timer');
      let timer = setInterval(()=>{ 
        var currentPercentage = currentButtonTimer.width() / currentButtonTimer.parent().width() * 100;
        currentButtonTimer.css('opacity',1);
        currentButtonTimer.width((currentPercentage + changePercentage) + '%');
      }, incrementInterval);

      setTimeout(()=>{
        currentButtonTimer.css('opacity',0);
        currentButtonTimer.width(0);
        clearInterval(timer);
      }, slideTime);
    }

    function reverseWidthTimer(currentSlide){
      const currentButton = desktopButtons[currentSlide];
      const currentButtonTimer = $(currentButton).find('.ReviewsSliderController__timer');
      currentButtonTimer.width('100%');
      let timer = setInterval(()=>{ 
        var currentPercentage = currentButtonTimer.width() / currentButtonTimer.parent().width() * 100;
        currentButtonTimer.width((currentPercentage - changePercentage) + '%');
      }, incrementInterval);

      setTimeout(()=>{
        currentButtonTimer.width(0);
        clearInterval(timer);
      }, slideTime);
    }

    if(ReviewsSlider.length > 0){//If slider exists initialize
      ReviewsSlider.on('init', function(slick){
        startWidthTimer(0);
      });

      ReviewsSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
        reverseWidthTimer(currentSlide);
      });

      ReviewsSlider.slick({
        arrows:false,
        fade: true,
        autoplay: true,
        autoplaySpeed: slideTime
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