 // Lazy load images
 document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    if ("IntersectionObserver" in window) {
        let lazyloadObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    lazyloadObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function (image) {
            lazyloadObserver.observe(image);
        });
    } else {
        // Fallback for older browsers
        let lazyloadThrottleTimeout;
        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                let scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});

// Back to Top Button functionality
const backToTopButton = document.getElementById("backToTop");
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    if (window.scrollY > header.offsetHeight) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}