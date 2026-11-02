/* Aesthetics by Zuleika
   WEDE5020w - Part 3 JavaScript
*/

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 1. Footer year ---------- */
    document.querySelectorAll(".current-year").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    /* ---------- 2. Mobile menu toggle ---------- */
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = siteNav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });
    }

    /* ---------- 3. Enquiry form validation ---------- */
    const form = document.getElementById("enquiryForm");
    const message = document.getElementById("formMessage");

    // "from" prices taken from the Services page
    const prices = {
        "soft-glam": 650,
        "full-glam": 850,
        "editorial": 1200,
        "matric-dance": 700,
        "bridal": 1800
    };

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // stop the page reloading

            const name = form.fullName.value.trim();
            const email = form.email.value.trim();
            const phone = form.phone.value.replace(/\s/g, "");
            const eventType = form.eventType.value;
            const date = form.preferredDate.value;

            const errors = [];

            if (name.length < 2) {
                errors.push("Please enter your full name.");
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.push("Please enter a valid email address.");
            }

            // South African numbers: +27XXXXXXXXX or 0XXXXXXXXX
            if (!/^(\+27|0)[0-9]{9}$/.test(phone)) {
                errors.push("Please enter a valid South African phone number.");
            }

            if (!eventType) {
                errors.push("Please select an event type.");
            }

            if (!date) {
                errors.push("Please choose a preferred date.");
            } else if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
                errors.push("Your preferred date cannot be in the past.");
            }

            if (errors.length > 0) {
                message.style.color = "#b00020";
                message.innerHTML = errors.join("<br>");
                return;
            }

            // Everything is valid: show a response with the price
            const price = prices[eventType];
            message.style.color = "#2e7d32";
            message.textContent =
                "Thank you, " + name + "! Your " + eventType.replace("-", " ") +
                " enquiry has been received. Prices start from R" + price +
                ", and I will confirm availability for " + date + " soon.";
            form.reset();
        });
    }
});