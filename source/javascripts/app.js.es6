class Theme{
  constructor(){

  }

  init(){
    this.initMobileNavigation();
    this.initCaseStudySlider();
  }
  initCaseStudySlider(){
    $('.CaseStudy__challenge__slider__container--1').slick({

    centerPadding: ($('.slider').find('>div').outerWidth() / 2) + 'px',
    slidesToShow: 1,
    variableWidth: true    });
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

}

const Parkfield = new Theme();
Parkfield.init();