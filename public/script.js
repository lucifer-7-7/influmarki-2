
document.addEventListener('DOMContentLoaded', (event) => {
    // Set the date we're counting down to
    const countDownDate = new Date("June 30, 2026 23:59:59").getTime();

    // Update the count down every 1 second
    const countdownFunction = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format numbers to have leading zeros if they are single digits
        const formatNumber = (num) => num < 10 ? `0${num}` : num;

        // Output the result in the respective elements
        document.querySelector('.Days').innerText = formatNumber(days);
        document.querySelector('.Hours').innerText = formatNumber(hours);
        document.querySelector('.Minutes').innerText = formatNumber(minutes);
        document.querySelector('.Seconds').innerText = formatNumber(seconds);

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.querySelector('.Days').innerText = "00";
            document.querySelector('.Hours').innerText = "00";
            document.querySelector('.Minutes').innerText = "00";
            document.querySelector('.Seconds').innerText = "00";
        }
    }, 1000);
});

const element = document.getElementById("email-form");

// Create a MutationObserver to track changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const currentDisplay = window.getComputedStyle(element).display;
    
    if (currentDisplay === "none") {
      console.warn("Display changed to 'none' – resetting to 'flex'!");
      element.style.display = "flex"; // Restore display
    }
  });
});

// Observe changes in the `style` attribute
observer.observe(element, { attributes: true, attributeFilter: ["style"] });



document.querySelector('.form-button').addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const message = encodeURIComponent('Waitlist signup email: ' + email);
    const whatsappUrl = 'https://wa.me/918197242025?text=' + message;

    document.querySelectorAll(".submit-text").forEach((el) => {
        el.innerText = "Thanks!";
    });
    document.querySelector('#email').value = "";
    document.querySelector('#email').style.pointerEvents = "none";

    window.open(whatsappUrl, '_blank');
});
