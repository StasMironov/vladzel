jQuery.fn.exists = function () {
    return $(this).length;
}

gsap.registerPlugin(ScrollTrigger);


const projectFunc = {
    showElem: function (element) {
        setTimeout(() => {
            element.classList.add('mf-show');
        }, 500);
    },
    getScrollbarWidth: function () {
        let div, width = projectFunc.getScrollbarWidth.width;
        if (width === undefined) {
            div = document.createElement('div');
            div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
            div = div.firstChild;
            document.body.appendChild(div);

            width = projectFunc.getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        }
        return width;
    }
};


document.addEventListener("DOMContentLoaded", () => {
    if ($('.js-btn-header').exists()) {
        $(window).on('resize load', function () {
            const btnText = document.querySelector('.js-btn-header span'),
                btn = document.querySelector('.js-btn-header');

            if ($(this).width() <= 1100) {
                btnText.textContent = 'Рассчитать';
                projectFunc.showElem(btn);
            } else {
                btnText.textContent = 'Рассчитать заказ';
            }
        });
    }

    // var getScrollbarWidth = function () {
    //     let div, width = getScrollbarWidth.width;
    //     if (width === undefined) {
    //         div = document.createElement('div');
    //         div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
    //         div = div.firstChild;
    //         document.body.appendChild(div);

    //         width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
    //         document.body.removeChild(div);
    //     }
    //     return width;
    // };

    window.addEventListener('load', () => {
        let locked = document.querySelector('html');
        locked.style.setProperty('--wScroll', projectFunc.getScrollbarWidth() + 'px');
    });
});


if ($('#ds_form').exists()) {
    try {
        let ds = '';
        ds = document.getElementById('ds_form');

        ds.onchange = () => {
            let json = JSON.stringify(Array.from(new FormData(ds)));
            localStorage.setItem(ds.id, json);
        };

        document.addEventListener("DOMContentLoaded", () => {
            let values = JSON.parse(localStorage.getItem(ds.id));

            for (let i = 0; i < values.length; ++i) {
                let el = ds[values[i][0]];
                if (el.type === "checkbox")
                    el.setAttribute("checked", "checked");
                else
                    el.value = values[i][1];
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

$(function () {
    // constructor(init, name, view, space, column, ratio, pagination = false, arrow = false, effect = '', custom = false, loop = true, direction = 'horizontal') {
    if ($('.js-slider-comment').exists()) {
        try {
            let commentSlider = new Slider(true, '.js-slider-comment', 'auto', 0, true, true, true);
            commentSlider.createSlider();
            commentSlider.updateSlider('center', true);
            commentSlider.updateSlider('initialSlide', 2);
            commentSlider.updateSlider('slideActiveClass', 'swiper-slide-active');
            commentSlider.updateSlider('autoHeight', true);

        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-slider-thumbs').exists()) {
        try {

            var galleryTop = new Swiper('.js-slider-card', {
                spaceBetween: 10,
                loop: true,
                loopedSlides: 3,
                speed: 400,
                pagination: {
                    el: '.pagination',
                    clickable: true,
                },
            });


            var galleryThumbs = new Swiper('.js-slider-thumbs', {
                spaceBetween: 10,
                slidesPerView: 3,
                touchRatio: 0.2,
                slideToClickedSlide: true,
                loop: true,
                loopedSlides: 3,
                speed: 400,
                direction: 'vertical',
                navigation: {
                    nextEl: '.arrow__link--next',
                    prevEl: '.arrow__link--prev',
                }
            });

            galleryTop.controller.control = galleryThumbs;
            galleryThumbs.controller.control = galleryTop;

            setTimeout(() => {
                $('.js-slider-thumbs').css('opacity', 1);
            }, 600);
            setTimeout(() => {
                $('.js-slider-card').css('opacity', 1);
            }, 600);



        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-lg-view').exists()) {
        try {
            $('.js-lg-view').lightGallery();
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-slider-examples').exists()) {
        try {
            let examplesSlider = new Slider(true, '.js-slider-examples', 4, 50, 1, true, true, true, 'auto', false, false, 'horizontal');
            examplesSlider.createSlider();
            examplesSlider.updateSlider('group', 4);

            $(window).on('resize load', function () {
                if ($(this).width() <= 1235 && $(this).width() > 1024) {
                    examplesSlider.updateSlider('space', 20);
                    examplesSlider.updateSlider('view', 4);
                }
                else if ($(this).width() <= 1024 && $(this).width() > 500) {
                    examplesSlider.updateSlider('view', 3);
                    examplesSlider.updateSlider('space', 20);
                    examplesSlider.updateSlider('group', 3);
                }
                else if ($(this).width() <= 500 && $(this).width() > 300) {
                    examplesSlider.updateSlider('view', 2);
                    examplesSlider.updateSlider('space', 15);
                    examplesSlider.updateSlider('group', 2);
                }
                else {
                    examplesSlider.updateSlider('view', 4);
                    examplesSlider.updateSlider('space', 50);
                    examplesSlider.updateSlider('group', 4);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    //===========Accordion=============
    if ($('.accordion__panel').exists()) {
        try {
            const accordions = document.getElementsByClassName("accordion__panel");

            for (var i = 0; i < accordions.length; i++) {
                accordions[i].onclick = function () {
                    this.classList.toggle('is-open');
                    $(this).find('.accordion__pic').toggleClass('accordion__pic--active');

                    const content = this.nextElementSibling;

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('#map').exists()) {
        try {

            ymaps.ready(init);

            function init() {
                // Создание карты.
                var myMap = new ymaps.Map("map", {
                    // Координаты центра карты.
                    // Порядок по умолчанию: «широта, долгота».
                    center: [53.430367, 59.081055],
                    zoom: 16,
                    controls: []
                });

                ymaps.geocode([53.430367, 59.081055]).then(function (res) {
                    var coord = res.geoObjects.get(0).geometry.getCoordinates();
                    var myPlacemark = new ymaps.Placemark(coord, {
                        balloonContentHeader: '',
                        balloonContentBody: '<div class="balloon">' +
                            '<div class="balloon__bloc"><div class="balloon__header">Адрес</div><div class="balloon__text">г. Магнитогорск, ул. Электросети, д. 38 </div></div>' +
                            '<div class="balloon__bloc"><div class="balloon__header">Телефон</div><a href="tel:8(800)562-58-58" class="balloon__text">8 (800) 562-58-58</a></div>' +
                            '<div class="balloon__bloc"><div class="balloon__header">График работы</div><div class="balloon__text">Пн - Пт | 9:00 - 19:00, Сб - Вс | 10:00 - 18:00</div></div>' +
                            '<div>',
                        balloonContentFooter: "",
                        // balloonOffset: [-15, -44],
                        preset: 'islands#blackStretchyIcon',

                        minWidth: 455
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '/image/icon/marker.svg',
                        iconImageSize: [62, 80],
                        // iconImageOffset: [-15, -44],
                        hideIcon: false,
                        hideIconOnBalloonOpen: false,
                        //hintPane: 'floats',
                        zIndex: 5000,
                        zIndexActive: 5000
                    });

                    myMap.behaviors.disable('scrollZoom');
                    myMap.geoObjects.add(myPlacemark);
                    myMap.setCenter(coord, 16);
                });
            }
        }
        catch (err) {
            console.log(err);
        }


    }

    if ($('#input-file').exists()) {
        try {
            let inputFile = document.querySelector('#input-file');
            let file = document.querySelector('#file');

            inputFile.addEventListener('click', function () {
                $(file).click();
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-grace').exists()) {
        try {
            const btn = document.querySelector('.js-grace');
            const overlay = document.querySelector('.overlay');

            btn.addEventListener('click', function () {
                overlay.classList.add('overlay__show');
                $('html').css('overflow', 'hidden');
                $('html, body').animate({
                    scrollTop: 0
                }, 1000, () => {
                    const popupModal = document.querySelector('.popup-grace');
                    popupModal.classList.add('popup-show');
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }



    if ($('.popup-grace__close').exists()) {
        try {
            $('.popup-grace__close').on('click', function () {
                const popupModal = document.querySelector('.popup-grace');
                popupModal.classList.remove('popup-show');

                $('.overlay').removeClass('overlay__show');
                $('html').css('overflow', 'auto');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-modal-close').exists()) {
        try {
            $('.js-modal-close').on('click', function () {
                const popupModal = document.querySelector('.popup-grace');
                popupModal.classList.remove('popup-show');
                $('.overlay').removeClass('overlay__show');
                $('html').css('overflow', 'auto');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    function disableScroll() {
        // Get the current page scroll position 
        scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft,

            // if any scroll is attempted, 
            // set this to the previous value 
            window.onscroll = function () {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }

    function enableScroll() {
        window.onscroll = function () { };
    }

    if ($('.js-modal-order').exists()) {
        try {
            const btn = document.querySelectorAll('.js-modal-order');
            const overlay = document.querySelector('.overlay');

            for (let i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', function () {
                    overlay.classList.add('overlay__show');
                    const popupModal = document.querySelector('.popup-order');
                    popupModal.classList.add('popup-show');
                    $('html').css('overflow', 'hidden');
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.popup-order__close').exists()) {
        try {
            $('.popup-order__close').on('click', function () {
                const popupModal = document.querySelector('.popup-order');
                popupModal.classList.remove('popup-show');
                $('.overlay').removeClass('overlay__show');
                $('html').css('overflow', 'auto');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.overlay').exists()) {
        try {
            $('.overlay').click(function (e) {
                if (e.target.className.indexOf('overlay') != -1) {
                    const popupModal = document.querySelector('.popup-grace');
                    const popupOrder = document.querySelector('.popup-order');
                    popupModal.classList.remove('popup-show');
                    popupOrder.classList.remove('popup-show');

                    $(this).removeClass('overlay__show');
                    enableScroll();
                    $('html').css('overflow', 'auto');
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.header__inner').exists) {
        try {
            let $window = $(window),
                $target = $(".header__inner"),
                $h = $target.offset().top;
            $window.on('scroll', function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > $h) {
                    $target.addClass("mf-scroll");
                    return;
                } else {
                    $target.removeClass("mf-scroll");
                    $target.removeClass('locked');
                }
                return;
            });
        } catch (err) {
            console.log(err);
        }
    }

    $(window).on('resize load', function () {
        if ($(this).width() <= 1024 && $(this).width() > 500) {
            if ($('.advantage__cover').exists()) {
                try {
                    Scrollbar.init(document.querySelector('#inner-scrollbar'), {
                        damping: 0.3,
                        alwaysShowTracks: false
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        else if ($(this).width() <= 500) {
            Scrollbar.destroy(document.querySelector('#inner-scrollbar'));
        }
    });

    //===========Truncate text=============

    function truncateText(bloc, qty) {
        if (bloc.length > 0) {
            let txtBloc = document.querySelectorAll(bloc);
            for (let i = 0; i < txtBloc.length; i++) {
                trc(txtBloc[i], qty);
            }
        }
    }

    function trc(txt, qty) {
        let text = txt.textContent;
        var sliced = text.slice(0, qty);
        if (sliced.length < text.length) {
            sliced += '...';
        }
        txt.textContent = sliced;
    }



    truncateText('.popup-order__text', 40);

    $(window).on('resize load', function () {
        //   changeHeightPage();
        if ($(this).width() <= 620) {
            truncateText('.portfolio__txt', 50);
        } else {
            truncateText('.portfolio__txt', 300);
        }
    });

    $(window).on('load', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    $(window).on('load resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    if ($('.js-burger').exists()) {
        try {
            const btn = document.querySelector('.js-burger'),
                menu = document.querySelector('.header__bottom');

            btn.onclick = function () {
                this.classList.toggle('burger--active');
                menu.classList.toggle('menu-show');

                if (document.querySelector('.burger').classList.contains('burger--active')) {
                    $("html").css("overflow", "hidden");
                }
                else {
                    $("html").css("overflow", "auto");
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-category').exists()) {
        try {
            const btnCategory = document.querySelector('.js-btn-category');
            const menuPanel = document.querySelector('.category__left');

            btnCategory.onclick = function () {
                menuPanel.classList.toggle('active');
            }

            const el = document.querySelector('.category__form');

            document.addEventListener('click', outsideEvtListener);

            function outsideEvtListener(evt) {
                if (evt.target === el || el.contains(evt.target) || evt.target === btnCategory) {
                    return;
                }
                menuPanel.classList.remove('active');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-mask-phone').exists()) {
        try {
            $('.js-mask-phone').each(function () {
                $(this).mask("+7(999) 999-9999");
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('#ourwork').exists()) {
        try {

            $('a[href^="#"]').each(function () {
                $(this).on('click', function () {
                    var el = $(this);
                    var dest = el.attr('href'); // получаем направление

                    if (dest !== undefined && dest !== '') {
                        // проверяем существование
                        $('html').animate({
                            scrollTop: $(dest).offset().top - 130 // прокручиваем страницу к требуемому элементу

                        }, {
                            duration: 1000,   // по умолчанию «400» 
                            easing: "linear" // по умолчанию «swing» 
                        }
                        );
                    }

                    return false;
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.category__info').exists()) {
        try {
            truncateText('.category__info', 102);
        }
        catch (err) {
            console.log(err);
        }

    }

});





