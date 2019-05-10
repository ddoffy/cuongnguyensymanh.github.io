// dl-menu options
$(function() {
    $("#dl-menu").dlmenu({
        animationClasses: {
            classin: "dl-animate-in",
            classout: "dl-animate-out"
        }
    });
});
// Need this to show animation when go back in browser
window.onunload = function() {};

// Add lightbox class to all image links
$(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']"
).addClass("image-popup");

// FitVids options
$(function() {
    $(".content").fitVids();
});

// All others
$(document).ready(function() {
    // zoom in/zoom out animations
    if ($(".container").hasClass("fadeOut")) {
        $(".container")
            .removeClass("fadeOut")
            .addClass("fadeIn");
    }
    if ($(".wrapper").hasClass("fadeOut")) {
        $(".wrapper")
            .removeClass("fadeOut")
            .addClass("fadeIn");
    }
    $(".zoombtn").click(function() {
        $(".container")
            .removeClass("fadeIn")
            .addClass("fadeOut");
        $(".wrapper")
            .removeClass("fadeIn")
            .addClass("fadeOut");
    });
    // go up button
    $.goup({
        trigger: 500,
        bottomOffset: 10,
        locationOffset: 20,
        containerRadius: 0,
        containerColor: "#fff",
        arrowColor: "#000",
        goupSpeed: "normal"
    });
    $(".image-popup").magnificPopup({
        type: "image",
        tLoading: "Loading image #%curr%...",
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
        },
        removalDelay: 300, // Delay in milliseconds before popup is removed
        // Class that is added to body when popup is open.
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: "mfp-fade"
    });
  // access device location and tracking location 
    getLocation();
    // send information to server and save to database 
    tracking();
});

// global varriables for device location 
var position;

function tracking() {
  // get information location 
    var latitude = 0,
        longitude = 0;
    if (position) {
        latitude = position.Latitude;
        longitude = position.Longitude;
    }
    
    // send information to server
    $.post(
        "https://cuongnsm.azurewebsites.net/api/tracking?latitude=" + latitude + "&longitude=" + longitude,
        function() {
            console.log("success");
        }
    );
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Can't have permission access location ");
    }
}

function showPosition(position) {
    position =  {
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude
    };
    // retry send tracking again with location 
    tracking();
}
