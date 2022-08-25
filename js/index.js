window.onload = function() {
  let dropdown = document.querySelector("#dropdown");
  let share = document.querySelector("#share");
  dropdown.addEventListener(
    "click",
    e => {
      showMenu("dropdownRow");
    },
    false
  );
  share.addEventListener(
    "click",
    e => {
      showMenu("dropdownShare");
    },
    false
  );

  let main1Photo = document.querySelector("#main1-photo");
  let lgImg = document.querySelector("#lg-img");
  let SImgUp = document.querySelector("#s-img-up");
  let SImgDown = document.querySelector("#s-img-down");
  main1Photo.addEventListener(
    "click",
    e => {
      showPhotoModel("main1-photo");
    },
    false
  );
  lgImg.addEventListener(
    "click",
    e => {
      showPhotoModel("lg-img");
    },
    false
  );
  SImgUp.addEventListener(
    "click",
    e => {
      showPhotoModel("s-img-up");
    },
    false
  );
  SImgDown.addEventListener(
    "click",
    e => {
      showPhotoModel("s-img-down");
    },
    false
  );

  let goTop = document.querySelector("#go-top");
  goTop.addEventListener(
    "click",
    e => {
      topFunction();
    },
    false
  );

  let videoBtn = document.querySelector("#videoBtn");
  videoBtn.addEventListener(
    "click",
    e => {
      playVideo();
    },
    false
  );

  document.getElementById("dropdownShare").classList.remove("dropdown-close");

  var main_4 = document.getElementsByClassName("main-inner-4")[0];
  var listRow = main_4.getElementsByClassName("row");
  for (i = 0; i < listRow.length; i++) {
    var dayElement = listRow[i].getElementsByClassName("day")[0];
    var day = dayElement.innerHTML;
    if (day === "SAT" || day === "SUN") {
      dayElement.style.backgroundColor = "#173d91";
    }
  }
};

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    document.getElementById("go-top").style.display = "block";
  } else {
    document.getElementById("go-top").style.display = "none";
  }
}

window.onresize = function() {
  var clinetWidth = document.body.scrollWidth;
  //瀏覽器顯示寬度與 scrollWidth 誤差17
  if (clinetWidth + 17 >= 768) {
    document.getElementById("dropdownShare").style.display = "block";
    document.getElementById("dropdownShare").classList.remove("dropdown-close");
    document.getElementById("dropdownShare").classList.add("dropdown-open");
  } else {
    document.getElementById("dropdownShare").style.display = "none";
    document.getElementById("dropdownShare").classList.remove("dropdown-open");
    document.getElementById("dropdownShare").classList.add("dropdown-close");
  }
};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function showMenu(targetId) {
  console.log(targetId);
  //if (document.getElementById("dropdownRow").style.display === "block") {
  if (document.getElementById(targetId).classList.contains("dropdown-open")) {
    document.getElementById(targetId).classList.remove("dropdown-open");
    document.getElementById(targetId).classList.add("dropdown-close");

    setTimeout(function() {
      document.getElementById(targetId).style.display = "none";
    }, 500);
  } else {
    document.getElementById(targetId).classList.remove("dropdown-close");
    document.getElementById(targetId).classList.add("dropdown-open");

    document.getElementById(targetId).style.display = "block";
  }
}

function playVideo() {
  var video = document.getElementById("myVideo");
  var btn = document.getElementById("videoBtn");

  if (video.paused) {
    video.play();
    btn.innerHTML = "<i class='fas fa-pause'>&nbsp;&nbsp;Pause";
  } else {
    video.pause();
    btn.innerHTML = '<i class="fas fa-play"></i>&nbsp;&nbsp;Play';
  }
}

function showPhotoModel(targetId) {
  // Get the modal
  var modal = document.getElementById("photoModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById(targetId);
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  // Get the modal
  var modal = document.getElementById("photoModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
