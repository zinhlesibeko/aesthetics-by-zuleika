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
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validate()) {
    status.textContent = "Please correct the errors in the form.";
    status.style.color = "red";
    return;
  }

  status.textContent = "Sending your enquiry...";
  status.style.color = "#b76e79";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      status.textContent = "Thank you! Your enquiry has been sent. Zuleika will be in touch soon.";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "Something went wrong. Please try again or WhatsApp us.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "Network error. Please check your connection and try again.";
    status.style.color = "red";
  }
}
        )
;
