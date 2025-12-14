document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const mobileOverlay = document.getElementById("mobileOverlay");

  // Sidebar toggle
  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    mobileOverlay.classList.toggle("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  mobileOverlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    mobileOverlay.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.replace("fa-times", "fa-bars");
  });

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  // Task bar hover
  document.querySelectorAll(".task-bar").forEach(task => {
    task.addEventListener("mouseenter", () => task.style.zIndex = "10");
    task.addEventListener("mouseleave", () => task.style.zIndex = "1");
  });

  // Progress ring animation
  document.querySelectorAll(".progress-fill").forEach(ring => {
    const circumference = 283;
    const percentage = parseInt(
      ring.closest(".progress-ring")
          .querySelector(".progress-text span").textContent
    );
    ring.style.strokeDashoffset =
      circumference - (percentage * circumference) / 100;
  });

  // Close sidebar on outside click
  document.addEventListener("click", function (e) {
    if (
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      sidebar.classList.remove("active");
      mobileOverlay.classList.remove("active");
      menuToggle.querySelector("i").classList.replace("fa-times", "fa-bars");
    }
  });
});