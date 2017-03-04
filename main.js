//document wide variables
var $win = $(window),
  $wrapper = $(".dumb-mobile-wrappper");

//header variables
var $splash = $(".splash-img"),
  $splashLockup = $(".splash-lockup"),
  $title = $(".title-lockup"),
  $bio = $(".bio"),
  $skills = $(".skills"),
  $projects = $(".projects"),
  $contact = $(".contact .card");

//save values to load in items to save resources
var fromTop = 0,
  skillsOffset,
  projectsOffset,
  contactOffset;
//change values if the screen is resized
function findElelments() {
  skillsOffset = $skills.offset().top - $win.height() * 0.85 + $wrapper.scrollTop();
  projectsOffset = $projects.offset().top - $win.height() * 0.85 + $wrapper.scrollTop();
  contactOffset = $contact.offset().top - $win.height() * 0.85 + $wrapper.scrollTop();
}

//things that need to have animations added
$([$skills[0], $projects[0], $contact[0]]).addClass("out-view");

//things that need properties set with js
$bio.css("margin-bottom", "-" + $bio.height()*1.01 + "px");
findElelments();

//things that need to be disabled in edge
if (document.documentMode || /Edge/.test(navigator.userAgent)) {
  //disable parallax
  $splash.css({
    "z-index": "-100",
    "height": "100vh",
    "transform": "translateZ(0)"
  });
  $title.css({
    "margin-top": ($win.height() / 100) * 30 + "px",
    "transform": "translateY(0) translateZ(0) scale(1)"
  });
  //disable fixed attatchment
  $(".contact").css("background-attachment", "scroll");
  //add a new animate in for the title card
  setTimeout(function() {
    $title.addClass("in-view");
  }, 600);
}
//animate in
setTimeout(function() {
  //make sure the user isnt using edge
  if (document.documentMode || !/Edge/.test(navigator.userAgent)) {
    $title.css({
      "margin-top": ($win.height() / 100) * 30 + "px",
      "opacity": 1,
      "transform": "translateY(0) translateZ(-50px) scale(1.5)"
    });
  }
}, 300);


$win.resize(function() {
  $bio.css("margin-bottom", "-" + $bio.height()*1.01 + "px");
  findElelments();
});



$wrapper.scroll(function() {
  fromTop = $wrapper.scrollTop();
  //fade in and out the bio card
  if (fromTop === 0) {
    $bio.removeClass("fade-in").addClass("fade-out");
    $([$skills[0], $projects[0], $contact[0]]).removeClass("in-view");
  } else {
    $bio.addClass("fade-in").removeClass("fade-out");
  }
  //tiered load in animations to save resources
  if(fromTop > skillsOffset) {
    $skills.addClass("in-view");
    if (fromTop > projectsOffset) {
      $projects.addClass("in-view");
      if (fromTop > contactOffset) {
        $contact.addClass("in-view");
      }
    }
  }
});
var $sendTrigger = $(".trigger-send"),
  $form = $(".form");
var $name = $("#name"),
  $email = $("#email"),
  $subject = $("#subject"),
  $message = $("#message"),
  $gotcha = $("#gotcha");
var name, email, subject, message;

//email send function
$sendTrigger.click(function() {
  //on click start animation by adding class
  $form.addClass("animate-send");
  //after the animation finishes, remove class so animation can play again
  setTimeout(function() {
    $form.removeClass("animate-send");
  }, 2000);
  //send a json request to send email
  $.ajax({
      url: "https://formspree.io/matthewzwartswhite@gmail.com",
      method: "POST",
      data: {
        name: $name.val(),
        email: $email.val(),
        _subject: $subject.val(),
        message: $message.val(),
        _gotcha: $gotcha.val()
      },
      dataType: "json"
  });
  //while email is hidden, remove info from it
  setTimeout(function() {
    $([$name[0], $email[0], $subject[0], $message[0]]).val("");
  }, 1500);
});
