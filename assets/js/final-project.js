document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    const handleResize = () => {
        if (window.innerWidth >= 1280) {
            mobileMenu.classList.add("hidden");
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
});
