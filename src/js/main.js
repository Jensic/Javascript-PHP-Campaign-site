/****************************************
            MAIN JAVASCRIPT CODE
*****************************************/

$(document).ready(function() {
    
    //console.log("It WORKS! YIPPIE!!");
    
/****************************************
                MASONRY
*****************************************/
    
    $('.grid').masonry({
    
        itemSelector: '.image',
        isAnimated: true,
        isFitWidth: false
    
    });
    
/****************************************
            MY-BACKGROUND-VIDEO
*****************************************/
    
    $('.my-background-video').bgVideo({
        fullScreen: false, // Sets the video to be fixed to the full window - your <video> and it's container should be direct descendents of the <body> tag
        fadeIn: 5000, // Milliseconds to fade video in/out (0 for no fade)
        pauseAfter: 31, // Seconds to play before pausing (0 for forever)
        fadeOnPause: false, // For all (including manual) pauses
        fadeOnEnd: true, // When we've reached the pauseAfter time
        showPausePlay: true, // Show pause/play button
        pausePlayXPos: 'right', // left|right|center
        pausePlayYPos: 'top', // top|bottom|center
        pausePlayXOffset: '15px', // pixels or percent from side - ignored if positioned center
        pausePlayYOffset: '15px' // pixels or percent from top/bottom - ignored if positioned center
    });

    $('.my-background-video').bgVideo();
    
/****************************************
                COUNTDOWN
*****************************************/
    
    $('.countdown').countdown({
        date: "Augusti 17, 2017 15:00:00"
    });
    
/****************************************
                SCROLLING NAV
*****************************************/
    
    var toggleAffix = function(affixElement, scrollElement, wrapper) {
  
    var height = affixElement.outerHeight(),
        top = wrapper.offset().top;
    
    if (scrollElement.scrollTop() >= top){
        wrapper.height(height);
        affixElement.addClass("affix");
    }
    else {
        affixElement.removeClass("affix");
        wrapper.height('auto');
    }
      
    };

    $('[data-toggle="affix"]').each(function() {
    var ele = $(this),
        wrapper = $('<div></div>');

    ele.before(wrapper);
    $(window).on('scroll resize', function() {
        toggleAffix(ele, $(this), wrapper);
    });

    // init
    toggleAffix(ele, $(window), wrapper);
    });
    
/****************************************
            VOTE(UNDER DEVELOPMENT)
*****************************************/
    
    $("#container2 div a").click(function() {
    $(this).parent().animate({
       width: '+=100px'
    }, 500);

    $(this).prev().html(parseInt($(this).prev().html()) + 1);
    return false;
    });    

/****************************************
                SPECTRAGRAM
*****************************************/
    
    var Spectra = {
          instaToken: '',
          instaID: '',

          init: function () {
            $.fn.spectragram.accessData = {
              accessToken: this.instaToken,
              clientID: this.instaID
            };

            $('.feed').spectragram('getUserFeed',{
              max: 20,
              query: '',
              wrapEachWith: '<div class="col-md-4">'
            });
          }
    }

    Spectra.init();
    
/****************************************
        GALLERY (UNDER DEVELOPMENT)
*****************************************/
    
    (function() {
   
    
    var carimages = document.querySelector('.carimages');
    
    carimages.addEventListener('click', function(e){
        
        if(e.target.tagName === 'IMG') {
            
            var overlay = document.createElement('div');
            overlay.id = 'overlay';

            // setting some styles
            
            overlay.style.position = 'absolute';
            overlay.style.top = 0;
            overlay.style.background = 'rgba(0,0,0,0.7)';
            overlay.style.cursor = 'pointer';
            
            // set some sizes
            
            overlay.style.width = window.innerWidth + "px";
            overlay.style.height = window.innerHeight + "px";
            overlay.style.top = window.pageYOffset + 'px';
            overlay.style.left = window.pageXOffset   + 'px';
            
            // append overlay to body
            
            document.body.appendChild(overlay);
            
            // get images source
            
            var imagesSrc = e.target.src;
            
            // create image
            
            var popUpImage = document.createElement('img');
            popUpImage.id = 'popimage';
            popUpImage.src = imagesSrc;
            
            // style image
            
            popUpImage.style.display = 'block';
            popUpImage.style.width = '50%';
            popUpImage.style.margin = '0 auto';
            popUpImage.style.marginTop = '10%';
            popUpImage.style.border = '1px solid blue';
            popUpImage.style.padding = '10px';
            popUpImage.style.background = '#cecece';
            popUpImage.style.borderRadius = '20px';
            
            // append image to the overlay
            
            overlay.appendChild(popUpImage);
            
            // set image to follow window scroll
            
            window.addEventListener('scroll', function() {
                
                if(overlay) {
                    
                    overlay.style.top = window.pageYOffset + 'px';
                    overlay.style.left = window.pageXOffset + 'px';
                
                }
                
            });
            
            // set image to follow window rezise
            
            window.addEventListener('resize', function() {
                
                if(overlay) {
                    
                    overlay.style.width = window.innerWidth + "px";
                    overlay.style.height = window.innerHeight + "px";
                    overlay.style.top    = window.pageYOffset + 'px';
                    overlay.style.left   = window.pageXOffset   + 'px';
                
                }
                
            });
            
            // remove the image when click after opening 
            
             popUpImage.addEventListener('click', function(){
                
                if(overlay){
                    
                    overlay.parentElement.removeChild(overlay);
                    
                }
                
                
            });
            
            //console.log(popUpImage);
            
        }// check the image is being clicked
        
//        console.log(e.target.tagName);
        
    }, false); // Event listerner for the div with class of carimages
        
      })(); // load the document first
    
/****************************************
                SEARCH DATABASE
*****************************************/
    
    // update fruits table dispaly with time
    setInterval(function() {
        
        updateInfo();
        
    }, 500);
    
    function updateInfo() {
    
    $.ajax({
        
        url: "php/search/display_info.php",
        type: "POST",
        success: function(show_info) {
            
            if(!show_info.error) {
                
                $("#show-info").html(show_info);
                
            }
            
        }
        
    });
        
    }

    $("#search").keyup(function() {
        
       var search = $("#search").val();
        
    $.ajax({
        
        url: "php/search/search.php",
        data: {search:search},
        type: "POST",
        success: function(data) {
          
            if(!data.error) {
                
                $("#result").html(data);
                
            }
            
        }
        
    });
        
    });
    
    // This code adds info to database table fruits
    
    $("#add-info-form").submit(function(evt) {
        
        evt.preventDefault();
        
        var postData  = $(this).serialize();
        
        var url = $(this).attr("action");
        
        $.post(url, postData, function(php_table_data) {
            
            $("#info-result").html(php_table_data);
            $("#add-info-form")[0].reset();
            $("#result").text("Information tillagd");
            setTimeout(function() {
        
                $("#result").text("");

            }, 3000);
            
        });
        
//        alert(postData);
        
    });// Add info code function ends
    
});// $(DOCUMENT).READY