/* ==========================================================
   CRITLOG
   FULL SCRIPT.JS
========================================================== */



/* ==========================================================
   01. LOGIN STATE
========================================================== */

function isLoggedIn() {

  return localStorage.getItem("loggedIn") === "true";

}



/* ==========================================================
   02. CURRENT PAGE
========================================================== */

function getCurrentPage() {

  let page =
    window.location.pathname
      .split("/")
      .pop();


  if (page === "") {

    page = "index.html";

  }


  return page;

}



/* ==========================================================
   03. PROTECT PAGES
========================================================== */

function protectPages() {

  const currentPage =
    getCurrentPage();


  const protectedPages = [

    "critique.html",
    "my-projects.html"

  ];


  if (
    protectedPages.includes(currentPage)
    &&
    !isLoggedIn()
  ) {

    window.location.href =
      "index.html";

  }

}


protectPages();



/* ==========================================================
   04. LOGIN MODAL ELEMENTS
========================================================== */

const navRight =
  document.getElementById("navRight");


const loginModal =
  document.getElementById("loginModal");


const closeLoginModalButton =
  document.getElementById("closeLoginModal");


const loginForm =
  document.getElementById("loginForm");


const startCritiqueBtn =
  document.getElementById("startCritiqueBtn");



/* ==========================================================
   05. UPDATE NAVIGATION
========================================================== */

function updateNavigation() {

  if (!navRight) {

    return;

  }


  /* ======================================================
     LOGGED IN
  ====================================================== */

  if (isLoggedIn()) {

    navRight.innerHTML = `

      <a href="my-projects.html">
        My Projects
      </a>

      <button
        class="logout"
        onclick="logout()"
      >
        Log out
      </button>

    `;

  }


  /* ======================================================
     LOGGED OUT
  ====================================================== */

  else {

    navRight.innerHTML = `

      <button
        class="nav-login-button"
        onclick="openLogin()"
      >
        Log in
      </button>

      <button
        class="button-small"
        onclick="openLogin()"
      >
        Sign up
      </button>

    `;

  }

}



/* ==========================================================
   06. OPEN LOGIN MODAL
========================================================== */

function openLogin() {

  if (!loginModal) {

    return;

  }


  loginModal.classList.add(
    "active"
  );


  document.body.classList.add(
    "modal-open"
  );


  /* Focus email */

  setTimeout(
    function() {

      const emailInput =
        document.getElementById("email");


      if (emailInput) {

        emailInput.focus();

      }

    },
    200
  );

}



/* ==========================================================
   07. CLOSE LOGIN MODAL
========================================================== */

function closeLogin() {

  if (!loginModal) {

    return;

  }


  loginModal.classList.remove(
    "active"
  );


  document.body.classList.remove(
    "modal-open"
  );

}



/* ==========================================================
   08. LOGIN MODAL CLOSE BUTTON
========================================================== */

if (closeLoginModalButton) {

  closeLoginModalButton.addEventListener(
    "click",
    function() {

      closeLogin();

    }
  );

}



/* ==========================================================
   09. CLICK OUTSIDE MODAL
========================================================== */

if (loginModal) {

  loginModal.addEventListener(
    "click",
    function(event) {

      if (event.target === loginModal) {

        closeLogin();

      }

    }
  );

}



/* ==========================================================
   10. ESC CLOSE MODAL
========================================================== */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeLogin();

    }

  }
);



/* ==========================================================
   11. LOGIN
========================================================== */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const emailInput =
        document.getElementById("email");


      const passwordInput =
        document.getElementById("password");


      if (
        !emailInput ||
        !passwordInput
      ) {

        return;

      }


      const email =
        emailInput.value.trim();


      const password =
        passwordInput.value.trim();



      /* EMAIL EMPTY */

      if (email === "") {

        emailInput.focus();

        return;

      }



      /* PASSWORD EMPTY */

      if (password === "") {

        passwordInput.focus();

        return;

      }



      /* ==================================================
         MOCK LOGIN
      ================================================== */

      localStorage.setItem(
        "loggedIn",
        "true"
      );


      localStorage.setItem(
        "userEmail",
        email
      );



      /* CLOSE MODAL */

      closeLogin();



      /* UPDATE NAV */

      updateNavigation();



      /* CLEAR FORM */

      loginForm.reset();

    }
  );

}



/* ==========================================================
   12. LOGOUT
========================================================== */

function logout() {

  localStorage.removeItem(
    "loggedIn"
  );


  localStorage.removeItem(
    "userEmail"
  );


  updateNavigation();



  const currentPage =
    getCurrentPage();


  if (
    currentPage === "critique.html"
    ||
    currentPage === "my-projects.html"
  ) {

    window.location.href =
      "index.html";

  }

}



/* ==========================================================
   13. START CRITIQUE BUTTON
========================================================== */

if (startCritiqueBtn) {

  startCritiqueBtn.addEventListener(
    "click",
    function(event) {

      event.preventDefault();



      /* LOGGED IN */

      if (isLoggedIn()) {

        window.location.href =
          "critique.html";

      }


      /* LOGGED OUT */

      else {

        openLogin();

      }

    }
  );

}



/* ==========================================================
   14. CRITIQUE RECORDING
========================================================== */

let recording = false;

let seconds = 0;

let timerInterval = null;



function startMockRecording() {

  const recordButton =
    document.getElementById(
      "recordButton"
    );


  const recordStatus =
    document.getElementById(
      "recordStatus"
    );


  const timer =
    document.getElementById(
      "timer"
    );


  const recordCircle =
    document.getElementById(
      "recordCircle"
    );



  if (
    !recordButton ||
    !recordStatus ||
    !timer
  ) {

    return;

  }



  /* ======================================================
     START RECORDING
  ====================================================== */

  if (!recording) {

    recording = true;

    seconds = 0;



    recordButton.innerText =
      "Finish Critique";


    recordStatus.innerText =
      "Recording critique...";


    timer.innerText =
      "00:00";



    if (recordCircle) {

      recordCircle.classList.add(
        "recording"
      );

    }



    timerInterval =
      setInterval(
        function() {

          seconds++;

          updateTimer(timer);

        },
        1000
      );

  }



  /* ======================================================
     FINISH RECORDING
  ====================================================== */

  else {

    recording = false;



    if (timerInterval) {

      clearInterval(
        timerInterval
      );

      timerInterval = null;

    }



    if (recordCircle) {

      recordCircle.classList.remove(
        "recording"
      );

    }



    recordStatus.innerText =
      "Analyzing critique...";


    recordButton.disabled =
      true;


    recordButton.innerText =
      "Processing...";



    /* MOCK AI ANALYSIS */

    setTimeout(
      function() {

        window.location.href =
          "summary.html";

      },
      2500
    );

  }

}



/* ==========================================================
   15. TIMER
========================================================== */

function updateTimer(timerElement) {

  const minutes =
    Math.floor(
      seconds / 60
    );


  const remainingSeconds =
    seconds % 60;



  const formattedMinutes =
    String(minutes)
      .padStart(
        2,
        "0"
      );


  const formattedSeconds =
    String(remainingSeconds)
      .padStart(
        2,
        "0"
      );


  timerElement.innerText =
    formattedMinutes
    +
    ":"
    +
    formattedSeconds;

}



/* ==========================================================
   16. SAVE CRITIQUE INFORMATION
========================================================== */

const departmentSelect =
  document.getElementById(
    "department"
  );


const courseNameInput =
  document.getElementById(
    "courseName"
  );


const critiqueTitleInput =
  document.getElementById(
    "critiqueTitle"
  );


const critiqueTypeSelect =
  document.getElementById(
    "critiqueType"
  );



/* ==========================================================
   DEPARTMENT
========================================================== */

if (departmentSelect) {

  departmentSelect.addEventListener(
    "change",
    function() {

      localStorage.setItem(
        "critiqueDepartment",
        departmentSelect.value
      );

    }
  );

}



/* ==========================================================
   COURSE
========================================================== */

if (courseNameInput) {

  courseNameInput.addEventListener(
    "input",
    function() {

      localStorage.setItem(
        "critiqueCourse",
        courseNameInput.value
      );

    }
  );

}



/* ==========================================================
   CRITIQUE TITLE
========================================================== */

if (critiqueTitleInput) {

  critiqueTitleInput.addEventListener(
    "input",
    function() {

      localStorage.setItem(
        "critiqueTitle",
        critiqueTitleInput.value
      );

    }
  );

}



/* ==========================================================
   CRITIQUE TYPE
========================================================== */

if (critiqueTypeSelect) {

  critiqueTypeSelect.addEventListener(
    "change",
    function() {

      localStorage.setItem(
        "critiqueType",
        critiqueTypeSelect.value
      );

    }
  );

}



/* ==========================================================
   17. SAVE CRITIQUE
========================================================== */

function saveCritique() {

  localStorage.setItem(
    "lastCritiqueSaved",
    "true"
  );


  localStorage.setItem(
    "lastCritiqueDate",
    new Date().toISOString()
  );


  window.location.href =
    "my-projects.html";

}



/* ==========================================================
   18. VIEW DEVELOPMENT
========================================================== */

function viewDevelopment() {

  window.location.href =
    "project.html";

}



/* ==========================================================
   19. EXPLORE PROJECT FILTER
========================================================== */

function initializeExplorePage() {


  /* ======================================================
     ELEMENTS
  ====================================================== */

  const searchInput =
    document.getElementById(
      "projectSearch"
    );


  const schoolSelect =
    document.getElementById(
      "schoolFilter"
    );


  const exploreDepartmentSelect =
    document.getElementById(
      "departmentFilter"
    );


  const projectCards =
    document.querySelectorAll(
      ".explore-project"
    );


  const noResultsMessage =
    document.getElementById(
      "noResults"
    );


  const viewMoreButton =
    document.getElementById(
      "viewMoreBtn"
    );


  const viewMoreContainer =
    document.getElementById(
      "viewMoreContainer"
    );



  /* NOT EXPLORE PAGE */

  if (projectCards.length === 0) {

    return;

  }



  /* ======================================================
     VIEW MORE STATE
  ====================================================== */

  let showAllProjects = false;



  /* ======================================================
     FILTER FUNCTION
  ====================================================== */

  function filterProjects() {


    /* SEARCH */

    const searchText =
      searchInput
        ? searchInput.value
            .trim()
            .toLowerCase()
        : "";



    /* SCHOOL */

    const selectedSchool =
      schoolSelect
        ? schoolSelect.value
        : "all";



    /* DEPARTMENT */

    const selectedDepartment =
      exploreDepartmentSelect
        ? exploreDepartmentSelect.value
        : "all";



    /* IS FILTER ACTIVE */

    const filterIsActive =
      searchText !== ""
      ||
      selectedSchool !== "all"
      ||
      selectedDepartment !== "all";



    let matchingCount = 0;



    /* ==================================================
       CHECK PROJECTS
    ================================================== */

    projectCards.forEach(
      function(card, index) {


        const cardSchool =
          card.getAttribute(
            "data-school"
          );


        const cardDepartment =
          card.getAttribute(
            "data-department"
          );


        const cardText =
          card.textContent
            .trim()
            .toLowerCase();



        /* SEARCH */

        const matchesSearch =
          searchText === ""
          ||
          cardText.includes(
            searchText
          );



        /* SCHOOL */

        const matchesSchool =
          selectedSchool === "all"
          ||
          cardSchool ===
          selectedSchool;



        /* DEPARTMENT */

        const matchesDepartment =
          selectedDepartment === "all"
          ||
          cardDepartment ===
          selectedDepartment;



        /* ALL CONDITIONS */

        const matches =
          matchesSearch
          &&
          matchesSchool
          &&
          matchesDepartment;



        /* ==================================================
           DOES NOT MATCH
        ================================================== */

        if (!matches) {

          card.style.display =
            "none";

          return;

        }



        matchingCount++;



        /* ==================================================
           FILTER ACTIVE

           Show ALL matching projects
        ================================================== */

        if (filterIsActive) {

          card.style.display =
            "block";

          return;

        }



        /* ==================================================
           DEFAULT

           First 12 only
        ================================================== */

        if (
          index < 12
          ||
          showAllProjects
        ) {

          card.style.display =
            "block";

        }

        else {

          card.style.display =
            "none";

        }

      }
    );



    /* ==================================================
       NO RESULTS
    ================================================== */

    if (noResultsMessage) {

      if (matchingCount === 0) {

        noResultsMessage.style.display =
          "block";

      }

      else {

        noResultsMessage.style.display =
          "none";

      }

    }



    /* ==================================================
       VIEW MORE BUTTON
    ================================================== */

    if (viewMoreContainer) {


      if (
        filterIsActive
        ||
        showAllProjects
      ) {

        viewMoreContainer.style.display =
          "none";

      }

      else {

        viewMoreContainer.style.display =
          "flex";

      }

    }

  }



  /* ======================================================
     SEARCH EVENT
  ====================================================== */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      function() {

        filterProjects();

      }
    );

  }



  /* ======================================================
     SCHOOL FILTER EVENT
  ====================================================== */

  if (schoolSelect) {

    schoolSelect.addEventListener(
      "change",
      function() {

        filterProjects();

      }
    );

  }



  /* ======================================================
     DEPARTMENT FILTER EVENT
  ====================================================== */

  if (exploreDepartmentSelect) {

    exploreDepartmentSelect.addEventListener(
      "change",
      function() {

        filterProjects();

      }
    );

  }



  /* ======================================================
     VIEW MORE
  ====================================================== */

  if (viewMoreButton) {

    viewMoreButton.addEventListener(
      "click",
      function() {

        showAllProjects = true;

        filterProjects();

      }
    );

  }



  /* ======================================================
     INITIAL FILTER
  ====================================================== */

  filterProjects();

}



/* ==========================================================
   20. RESTORE CRITIQUE FORM
========================================================== */

function restoreCritiqueForm() {


  /* DEPARTMENT */

  const savedDepartment =
    localStorage.getItem(
      "critiqueDepartment"
    );


  if (
    departmentSelect &&
    savedDepartment
  ) {

    departmentSelect.value =
      savedDepartment;

  }



  /* COURSE */

  const savedCourse =
    localStorage.getItem(
      "critiqueCourse"
    );


  if (
    courseNameInput &&
    savedCourse
  ) {

    courseNameInput.value =
      savedCourse;

  }



  /* CRITIQUE TITLE */

  const savedTitle =
    localStorage.getItem(
      "critiqueTitle"
    );


  if (
    critiqueTitleInput &&
    savedTitle
  ) {

    critiqueTitleInput.value =
      savedTitle;

  }



  /* CRITIQUE TYPE */

  const savedType =
    localStorage.getItem(
      "critiqueType"
    );


  if (
    critiqueTypeSelect &&
    savedType
  ) {

    critiqueTypeSelect.value =
      savedType;

  }

}



/* ==========================================================
   21. PAGE LOAD
========================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {


    /* NAV */

    updateNavigation();



    /* EXPLORE */

    initializeExplorePage();



    /* CRITIQUE FORM */

    restoreCritiqueForm();


  }
);



/* ==========================================================
   22. CLEAN TIMER BEFORE LEAVING PAGE
========================================================== */

window.addEventListener(
  "beforeunload",
  function() {

    if (timerInterval) {

      clearInterval(
        timerInterval
      );

    }

  }
);