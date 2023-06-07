$(document).ready(function(){
    $('#slider').attr('disabled', true)
    $('#slider').hide();

    for (let i = 0; i < 5; i++) {
        $('#img-holder' + i).hide();
    }

    var style = document.createElement("style");
    style.innerHTML = `body::-webkit-scrollbar {display: none;}`;
    document.head.appendChild(style);
});

function closeImageGallery() {
    $('#img-holder1').hide();
    $('#img-holder2').hide();
    $('#img-holder3').hide();
    $('#img-holder4').hide();

    $('#slider').fadeOut('slow', function() {
        $('#slider').attr('disabled', true)
    });            
}

function openImageGallery(index, title) {
    $('#img-holder' + index).show();  
    document.getElementById("image-title").innerHTML = title;

    $('#slider').fadeIn('slow', function() {
        $('#slider').attr('disabled', false)
    });
}

const slider = document.querySelector('.images');
const firstImg = document.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('.arrow');

let firstImageWidth = firstImg.width + 14;
let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider.scrollLeft == slider.scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        slider.scrollLeft += icon.id == "left" ? -firstImageWidth : firstImageWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragStop = () => {
    isDragStart = false;
    slider.classList.remove('dragging');
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    
    slider.classList.add('dragging');
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;

    showHideIcons();
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

slider.addEventListener("mouseup", dragStop);
slider.addEventListener("mouseleave", dragStop);
slider.addEventListener("touchleave", dragStop);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    })
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const barWidth = document.querySelector(".bar div").clientWidth;
const cursors = document.querySelectorAll(".cursor");

cursors[1].style.transform  = "translateX(" + barWidth / 4 + "px)";
cursors[2].style.transform  = "translateX(" + -(barWidth / 4) + "px)";