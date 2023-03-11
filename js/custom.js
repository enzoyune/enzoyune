$(function() {

	"use strict";

    var wind = $(window);

    var main_height = $(".main-height").outerHeight();

    $(".sub-height").outerHeight(main_height);


    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',         // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -60            // offste (in px) for fixed top navigation
    });


    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar-default");

        if(bodyScroll > 300){

            navbar.addClass("nav-scroll");

        }else{

            navbar.removeClass("nav-scroll");
        }
    });

    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar-default"),
            logo = $(".navbar .logo> img");

        if(bodyScroll > 300){

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');

        }else{

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });


    // button scroll to top
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            button_top = $(".button-top");


        if(bodyScroll > 700){
            button_top.addClass("button-show");

        }else{
            button_top.removeClass("button-show");
        }
    });


	// stellar
    wind.stellar();


    // typejs
    $('.header .caption h3').typed({
        strings: ["Web Developer", "UI/UX  Designer"],
        loop: true,
        startDelay: 1000,
        backDelay: 1000,
        typeSpeed: 30,
        showCursor: true,
		cursorChar: '|',
		autoInsertCss: true
    });


    // counterUp
    $('.numbers .counter').countUp({
        delay: 10,
        time: 1500
    });


    // Tabs
    $(".tabs-icon").on("click", "li", function(){

        var myID = $(this).attr("id");

        $(this).addClass("active").siblings().removeClass("active");

        $(".tabs .item").hide();

        $("#" + myID + "-content").fadeIn();

    });


   	// progress bar
    wind.on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });


    // owlCarousel
    $('.clients .owl-carousel').owlCarousel({
        items:1,
        loop:true,
        mouseDrag:false,
        autoplay:true,
        smartSpeed:500
    });


    // magnificPopup
    $('.portfolio .link').magnificPopup({
      delegate: 'a',
      type: 'image'
    });

});

$(window).on("load",function (){

    // Preloader
    $(".loading").fadeOut(500);

    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });


    // contact form
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {

        if (!e.isDefaultPrevented()) {

            $('#submit-loader').fadeIn('slow');
            $('[type="submit"]').attr('value','ENVIANDO...');

            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "12500",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            var url = "contact.php";

            // toastr.error("<span class='msg-toastr'>No pude recibir tu consulta, intentá mas tarde o enviame un correo a enzo.yune@gmail.com</span>");
            // $('#contact-form')[0].reset();

            // setTimeout(() => {
            //     $('#submit-loader').fadeOut('slow');
            //     $('[type="submit"]').attr('value','ERROR');
            //     setTimeout(() => {

            //         $('[type="submit"]').attr('value','ENVIAR MENSAJE');
            //     }, 1200);
            // }, 700);
            
            //corregir con el servidor de hosting el envio de correo
            // if(true){

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    
                    data = JSON.parse(data);
                    console.log('data->', data);
                    

                    if(data.success){

                        toastr.success("<span class='msg-toastr'>Recibí tu consulta con éxito, a la brevedad me pondré en contigo</span>");
        
                        console.log('enviado con exito');

                        $('#contact-form')[0].reset();
                    }
                    else{

                        toastr.error("<span class='msg-toastr'>No pude recibir tu consulta, intentá mas tarde o enviame un correo a enzo.yune@gmail.com</span>");

                        console.log('hubo un error');
                    }

                    setTimeout(() => {
                        $('#submit-loader').fadeOut('slow');
                        $('[type="submit"]').attr('value','MENSAJE ENVIADO');
                        setTimeout(() => {

                            $('[type="submit"]').attr('value','ENVIAR MENSAJE');
                        }, 1200);
                    }, 700);

                }
            });
            // }
            return false;
        }
    });

});
