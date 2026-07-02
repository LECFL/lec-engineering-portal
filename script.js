const projects = [
  {
    name: "LEC Engineering Ecosystem",
    repo: "Cross-repo overview",
    status: "Featured",
    category: "Operations",
    audience: ["Administration", "IT"],
    summary: "Canonical overview of LEC's internal software ecosystem: legacy SIS, Google Workspace/GAM, Firebase/GCP apps, Stripe fundraising, LEConnect messaging, short links, tracing, and AI ops tooling."
  },
  {
    name: "LEC DB Knowledge",
    repo: "lec-db-knowledge",
    status: "Featured",
    category: "Documentation",
    audience: ["Administration", "IT"],
    summary: "Documentation-only knowledge base for the legacy LEC SIS schema and business rules, consumed by internal AI agents such as Bina and Golem."
  },
  {
    name: "Fundraising Campaign Platform",
    repo: "lec-fundraising",
    status: "Featured",
    category: "Fundraising",
    audience: ["Administration", "Fundraising"],
    summary: "Public Stripe-based fundraising platform where admins create campaigns, donation pages, honor walls, progress bars, and live dashboards."
  },
  {
    name: "LEC App Dashboard",
    repo: "lec-app-dashbaord",
    status: "Featured",
    category: "Dashboard",
    audience: ["Administration", "IT"],
    summary: "Internal staff and IT dashboard for LEConnect ecosystem usage, Firebase user management, cloud/on-prem server inventory, and Nylas scheduler tools."
  },
  {
    name: "GAM Management Frontend",
    repo: "gam-managment-front",
    status: "Featured",
    category: "Google Workspace",
    audience: ["Administration", "Teachers", "IT"],
    summary: "Next.js administrative console for managing Google Workspace users, devices, departments, classes, policies, and Gmail/security decisions."
  },
  {
    name: "GAM Backend",
    repo: "gam",
    status: "Featured",
    category: "Google Workspace",
    audience: ["IT"],
    summary: "Core Google Workspace backend wrapping GAMADV-XTD3, Google Admin SDK, Classroom APIs, Calendar, Drive, Celery/Redis jobs, and Firestore process logs."
  },
  {
    name: "Teacher Workflows",
    repo: "teacher-workflows",
    status: "Active",
    category: "Student Tools",
    audience: ["Teachers", "Students"],
    summary: "Teacher-facing certificate generator that reads class and student data from the legacy SIS and renders printable customized PDFs."
  },
  {
    name: "LEConnect Messaging Dashboard",
    repo: "leconnect-dashboard",
    status: "Active",
    category: "Communications",
    audience: ["Administration", "Office Staff", "IT"],
    summary: "Monitoring and control dashboard for LEConnect mass communication batches, delivery status, webhook logs, recipient search, resend, cancel, and sync actions."
  },
  {
    name: "Attendance Notification Docs",
    repo: "attendance-notification-docs",
    status: "Active",
    category: "Documentation",
    audience: ["Administration", "Office Staff", "IT"],
    summary: "Documentation for the SQL Server attendance and absence-notification pipeline, including SendGrid transport and webhook tracking."
  },
  {
    name: "LEC Short URL",
    repo: "lec-short-url",
    status: "Active",
    category: "Operations",
    audience: ["Administration", "IT", "Office Staff"],
    summary: "Internal short-link and QR-code microservice with click tracking, batch templated links, destination checks, and webhook relay into Connect."
  },
  {
    name: "LEC Tracing",
    repo: "lec-tracing",
    status: "Needs Review",
    category: "Dashboard",
    audience: ["IT"],
    summary: "Internal observability dashboard for searching API and webhook traces, replaying requests, and minting scoped temporary trace links."
  },
  {
    name: "Golem AI Ops Agent",
    repo: "lec-full-stack-golem",
    status: "Featured",
    category: "Automation",
    audience: ["IT"],
    summary: "Internal AI ops/support agent with Claude Agent SDK, persistent memory, skills, scheduled jobs, GitHub context, Firebase, Mongo trace queries, and Redis workers."
  },
  {
    name: "LEC Postman",
    repo: "lec-postman",
    status: "Active",
    category: "Operations",
    audience: ["IT"],
    summary: "Self-hosted internal Postman clone for creating, saving, and executing HTTP requests against LEC services with token-authenticated developer APIs."
  },
  {
    name: "Gradebook Wizard Integration",
    repo: "gradebookwizard-integration",
    status: "Needs Review",
    category: "Student Tools",
    audience: ["Administration", "Teachers", "IT"],
    summary: "Planned SIS-to-Gradebook Wizard automation for year-start class/roster setup and ongoing enrollment add/drop synchronization."
  },
  {
    name: "G Suite Management Dashboard",
    repo: "gsuite-management-dashboard",
    status: "Needs Review",
    category: "Google Workspace",
    audience: ["IT"],
    summary: "Google Workspace management project surfaced from GitHub; should be reviewed against the GAM frontend/backend stack."
  },
  {
    name: "Tablet Enrollment",
    repo: "tablet-enroll",
    status: "Needs Review",
    category: "Google Workspace",
    audience: ["IT", "Students"],
    summary: "Device-enrollment project candidate; needs README-derived details or GitHub metadata to clarify current purpose and deployment status."
  }
];

const grid = document.querySelector("#projectGrid");
const search = document.querySelector("#search");
const filter = document.querySelector("#filter");

function statusClass(status) {
  if (status === "Active") return "active";
  if (status === "Needs Review") return "review";
  return "";
}

function projectMatches(project, query, category) {
  const haystack = [project.name, project.repo, project.status, project.category, project.summary, ...project.audience].join(" ").toLowerCase();
  const queryMatch = !query || haystack.includes(query.toLowerCase());
  const categoryMatch = category === "all" || project.category === category;
  return queryMatch && categoryMatch;
}

function renderProjects() {
  const query = search.value.trim();
  const category = filter.value;
  const visible = projects.filter((project) => projectMatches(project, query, category));

  grid.innerHTML = visible.map((project) => `
    <article class="project-card">
      <div>
        <div class="card-top">
          <h3>${project.name}</h3>
          <span class="badge ${statusClass(project.status)}">${project.status}</span>
        </div>
        <p>${project.summary}</p>
      </div>
      <div>
        <div class="meta">
          <span>${project.category}</span>
          <span>${project.repo}</span>
          ${project.audience.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");

  if (!visible.length) {
    grid.innerHTML = `<article class="project-card"><h3>No matching projects</h3><p>Try a different search term or category.</p></article>`;
  }
}

search.addEventListener("input", renderProjects);
filter.addEventListener("change", renderProjects);
renderProjects();
