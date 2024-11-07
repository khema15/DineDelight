document.addEventListener("DOMContentLoaded", function () {
    const learnMoreButton = document.getElementById("learnMoreBtn");
    const extraInfo = document.getElementById("extraInfo");

    // Initially hide the extra info
    extraInfo.style.display = "none";

    // Toggle extra info visibility with smooth transitions
    learnMoreButton.addEventListener("click", function () {
        if (extraInfo.style.display === "none") {
            extraInfo.style.display = "block";
            extraInfo.style.opacity = "0";
            setTimeout(() => {
                extraInfo.style.opacity = "1";
                learnMoreButton.textContent = "Show Less";
            }, 10);
        } else {
            extraInfo.style.opacity = "0";
            setTimeout(() => {
                extraInfo.style.display = "none";
                learnMoreButton.textContent = "Learn More";
            }, 300);
        }
    });
});
