/* ── NAV ── */
function toggleMobileNav() {
  document.getElementById("mobile-nav").classList.toggle("open");
}

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((r) => observer.observe(r));

/* ── FAQ ── */
function toggleFAQ(el) {
  const item = el.parentElement;
  item.classList.toggle("open");
}

/* ── EMI CALCULATOR ── */
function calcEMI() {
  const P = +document.getElementById("amt-range").value;
  const rAnnual = +document.getElementById("rate-range").value;
  const n = +document.getElementById("tenure-range").value;
  const r = rAnnual / 12 / 100;
  const emi =
    r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - P;
  const fmt = (v) => "₹" + Math.round(v).toLocaleString("en-IN");
  document.getElementById("emi-display").textContent = fmt(emi);
  document.getElementById("cr-principal").textContent = fmt(P);
  document.getElementById("cr-interest").textContent = fmt(interest);
  document.getElementById("cr-total").textContent = fmt(total);
  document.getElementById("cr-tenure").textContent = n + " months";
  document.getElementById("amt-display").textContent = fmt(P);
  document.getElementById("rate-display").textContent = rAnnual + "%";
  document.getElementById("tenure-display").textContent = n + " months";
  // update range gradient
  ["amt", "rate", "tenure"].forEach((k) => {
    const el = document.getElementById(k + "-range");
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.background = `linear-gradient(to right,var(--green) ${pct}%,#ddd ${pct}%)`;
  });
}
calcEMI();

/* ── SUBMIT ── */
function submitForm() {
  const name = document.getElementById("f-name").value.trim();

  const email = document.getElementById("f-email").value.trim();

  const phone = document.getElementById("f-phone").value.trim();

  const employment = document.getElementById("f-employ").value;

  // VALIDATION
  if (!name || !email || !phone || !employment) {
    alert("Please fill all fields");
    return;
  }

  // MOBILE VALIDATION
  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("Enter valid Indian mobile number");
    return;
  }

  // MUST BE EXACTLY 10 DIGITS
  if (phone.length !== 10) {
    alert("Mobile number must be 10 digits");
    return;
  }

  // BLOCK FAKE NUMBERS
  const fakeNumbers = [
    "9999999999",
    "8888888888",
    "7777777777",
    "6666666666",
    "5555555555",
    "4444444444",
    "3333333333",
    "2222222222",
    "1111111111",
    "0000000000",
    "1234567890",
    "9876543210",
    "0123456789",
  ];

  if (fakeNumbers.includes(phone)) {
    alert("Please enter genuine mobile number");
    return;
  }

  // BLOCK SAME DIGITS
  if (/(\d)\1{6,}/.test(phone)) {
    alert("Enter genuine mobile number");
    return;
  }

  // BLOCK INVALID PREFIX
  if (!["6", "7", "8", "9"].includes(phone[0])) {
    alert("Enter valid Indian mobile number");
    return;
  }

  // BLOCK TOO MANY SEQUENTIAL NUMBERS
  const sequentialPatterns = [
    "123456",
    "234567",
    "345678",
    "456789",
    "567890",
    "987654",
    "876543",
    "765432",
  ];

  for (let seq of sequentialPatterns) {
    if (phone.includes(seq)) {
      alert("Enter genuine mobile number");
      return;
    }
  }

  // SAVE DATA TO GOOGLE SHEET
  fetch(
    "https://script.google.com/macros/s/AKfycbw1oeEWZoUmETDQFd02oTYx25cwjL-X8AuBe38a-uxEiW7mcSGCZt--vUH0et4a2osvwQ/exec",
    {
      method: "POST",
      body: JSON.stringify({
        name: name,
        mobile: phone,
        email: email,
        employment: employment,
      }),
    },
  ).catch((err) => console.log(err));

  const btn = document.getElementById("final-submit");

  btn.disabled = true;

  // STEP 1
  btn.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Checking Eligibility...
  `;

  // STEP 2
  setTimeout(() => {
    btn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Verifying Details...
    `;
  }, 1500);

  // STEP 3
  setTimeout(() => {
    btn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Matching Loan Offers...
    `;
  }, 3000);

  // FINAL RESULT
  setTimeout(() => {
    // OPEN MODAL
    document.getElementById("success-modal").classList.add("open");

    // ICON
    document.querySelector(".modal-icon").innerHTML =
      `<i class="fa-solid fa-circle-check"></i>`;

    // TITLE
    document.querySelector(".modal-box h2").innerHTML =
      "✅ Eligibility Checked";

    // DESCRIPTION
    document.querySelector(".modal-box p").innerHTML = `
      Based on your submitted details,
      you are pre-qualified for loan
      offers from our lending partners.

      <br><br>

      <small style="color:#888;">
      Final approval depends on lender
      verification and profile review.
      </small>
      `;

    // RANDOM LIMIT
    const limits = [
      "₹50,000",
      "₹1,00,000",
      "₹2,50,000",
      "₹3,00,000",
      "₹5,00,000",
    ];

    const limit = limits[Math.floor(Math.random() * limits.length)];

    document.getElementById("modal-ref-num").innerHTML =
      `Pre-Qualified Amount: ${limit}`;

    // CONTINUE BUTTON
    document.querySelector(".modal-close").innerHTML = "Continue";

    document.querySelector(".modal-close").onclick = function () {
      window.location.href = "https://upstox.com/open-account/?f=6ZA67G";
    };

    // RESET BUTTON
    btn.disabled = false;

    btn.innerHTML = `
      Check Free Eligibility
      <i class="fa-solid fa-arrow-right"></i>
    `;
  }, 4500);
}

/* ── SELECT filled class ── */
document.querySelectorAll(".field select").forEach((sel) => {
  sel.addEventListener("change", () =>
    sel.classList.toggle("filled", sel.value !== ""),
  );
});
