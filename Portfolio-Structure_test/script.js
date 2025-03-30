document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const title = document.querySelector("h1");
    const subtitle = document.querySelector("h2");

    // Apply fade-in effect
    title.style.opacity = "0";
    title.style.transform = "translateY(-50px)";
    subtitle.style.opacity = "0";
    subtitle.style.transform = "translateY(50px)";

    setTimeout(() => {
        title.style.transition = "opacity 1s ease, transform 1s ease";
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
    }, 100);

    setTimeout(() => {
        subtitle.style.transition = "opacity 1s ease, transform 1s ease";
        subtitle.style.opacity = "1";
        subtitle.style.transform = "translateY(0)";
    }, 600); // Delayed effect for subtitle
});

