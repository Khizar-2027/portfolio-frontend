export const projects = [
  {
    id: 1,
    title: "Bloomyst",
    slug: "bloomyst",
    short_description:
      "A multi-tenant project management SaaS inspired by Linear and Trello, built with FastAPI and React.",

    full_description:
      "Bloomyst is a full-stack project management SaaS that allows teams to collaborate through workspaces, Kanban boards, task management, file attachments, and email-based workspace invitations. It features JWT authentication, role-based authorization, drag-and-drop task management, asynchronous email delivery using FastAPI BackgroundTasks, secure file uploads, and a comprehensive REST API. The backend is built with FastAPI, SQLAlchemy, Alembic, and PostgreSQL, while the frontend uses React and Tailwind CSS. The project demonstrates scalable backend architecture, API design, authentication, database relationships, and modern deployment workflows.",

    thumbnail: null,
    live_url: "https://bloomyst.vercel.app",
    github_url: "https://github.com/Khizar-2027/Bloomyst",
    is_featured: true,
    order: 1,

    skills: [
      { id: 14, name: "FastAPI" },
      { id: 15, name: "SQLAlchemy" },
      { id: 4, name: "PostgreSQL" },
      { id: 7, name: "React" },
      { id: 16, name: "Tailwind CSS" },
    ],
  },

  {
    id: 2,
    title: "Chess App",
    slug: "chess-app",

    short_description:
      "A full-stack multiplayer chess platform built with Django and React.",

    full_description:
      "A full-stack multiplayer chess application featuring secure user authentication, REST APIs, PostgreSQL integration, and a React frontend. The project focuses on backend architecture, API development, real-time game management, and building a complete production-style web application using Django and React.",

    thumbnail: null,
    live_url: "https://khizar-chess.vercel.app",
    github_url: "https://github.com/Khizar-2027/chess-backend",
    is_featured: true,
    order: 2,

    skills: [
      { id: 1, name: "Python" },
      { id: 2, name: "Django" },
      { id: 3, name: "Django REST Framework" },
      { id: 4, name: "PostgreSQL" },
      { id: 7, name: "React" },
    ],
  },

  {
    id: 3,
    title: "FocusGuard",
    slug: "focusguard",

    short_description:
      "A productivity application for managing focus sessions and reducing distractions.",

    full_description:
      "FocusGuard is a productivity application designed to help users stay focused through structured work sessions, task organization, and progress tracking. The project demonstrates full-stack web development using Django, Django REST Framework, React, and PostgreSQL while emphasizing clean API design and user-focused application architecture.",

    thumbnail: null,
    live_url: "",
    github_url: "https://github.com/Khizar-2027/focusguard",
    is_featured: true,
    order: 3,

    skills: [
      { id: 1, name: "Python" },
      { id: 2, name: "Django" },
      { id: 3, name: "Django REST Framework" },
      { id: 4, name: "PostgreSQL" },
      { id: 7, name: "React" },
    ],
  },
];