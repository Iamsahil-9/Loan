// ===== LIVE USER TEXT =====
const names = ["Rahul", "Amit", "Sneha", "Priya", "Rohit"];
const cities = ["Mumbai", "Delhi", "Pune", "Bangalore"];
const amounts = ["₹50,000", "₹1,20,000", "₹2,00,000", "₹3,50,000"];

setInterval(() => {
  const name = names[Math.floor(Math.random() * names.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];

  const el = document.getElementById("live-text");
  if (el) {
    el.innerText = `🔥 ${name} from ${city} just applied for ${amount}`;
  }
}, 3000);


// ===== FORM SUBMIT =====
function sendToWhatsApp(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let email = document.getElementById("email").value.trim();
  let loan = document.getElementById("loan").value.trim();

  // ===== VALIDATION =====
  if (!name || !mobile || !email || !loan) {
    alert("Please fill all fields");
    return;
  }

  // ✅ ONLY 10 DIGIT MOBILE
  if (!/^\d{10}$/.test(mobile)) {
    alert("Enter valid 10 digit mobile number");
    return;
  }

  // Button loading state
  const btn = document.querySelector(".cta-btn");
  btn.innerText = "Processing...";
  btn.disabled = true;

  fetch("https://script.google.com/macros/s/AKfycbw1oeEWZoUmETDQFd02oTYx25cwjL-X8AuBe38a-uxEiW7mcSGCZt--vUH0et4a2osvwQ/exec", {
    method: "POST",
    body: JSON.stringify({
      name,
      mobile,
      email,
      loan
    })
  })
  .then(() => {
    // Redirect after success
    window.location.href = "thankyou.html";
  })
  .catch(() => {
    alert("Error submitting form");
    btn.innerText = "🚀 Check Eligibility";
    btn.disabled = false;
  });
}