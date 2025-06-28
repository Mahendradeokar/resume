import { ResumeData } from "~/types/resume";

export const mahendraResumeData: ResumeData = {
  personal: {
    name: "Mahendra Devkar",
    email: "Deokarmahendra424@gmail.com",
    github: "https://github.com/mahendradevkar",
    linkedin: "https://linkedin.com/in/mahendradevkar",
    summary: "Experienced JavaScript Developer skilled in React, Zustand, JavaScript, TypeScript, and Next.js."
  },
  experience: [
    {
      company: "Dhiwise (Rocket.new)",
      position: "Software Development Engineer - I",
      duration: "June 2024 - June 2025",
      description: [
        "Took ownership of the Dhiwise.com web application within two months of joining, overseeing bug fixes, new feature implementations, and React Native integrations",
        "Developed React Native preview functionality and integrated React Native support into the existing web app, managing the workflow from app creation to live preview.",
        "Worked on the Streaming module for Rocket.new, managing SSE connections on the frontend, including resume handling and stream restart functionality to maintain seamless real-time updates.",
        "Developed the Figma integration for Rocket.new, enabling Figma file import, multi-step validations, multiple frame handling with screen selection, and a dynamic decision tree for step progression based on user input. Real-time app creation updates were delivered via SSE connections, with the integration now supporting over 5,000 app creations per day from Figma files."
      ],
      techStack: "React, JavaScript, TypeScript"
    },
    {
      company: "Empiric Infotech LLP",
      position: "ReactJs/NextJs Developer", 
      duration: "Mar 2023 - June 2024",
      description: [
        "Developed end-to-end automation for a Shopify-like e-commerce platform using Next.js for both frontend and backend. Utilized Firebase, Google Cloud, and Vercel APIs to create a custom API-driven store creation pipeline.",
        "Designed and implemented reusable authentication components, custom hooks, and utility functions for managing Firebase authentication and CRUD operations in React, which were later adopted across organization",
        "Managed the full-cycle development of a B2C web application with Next.js and Firebase, enabling users to browse and book various services, apply coupons, schedule appointments, and access other customer-oriented functionalities.",
        "Played a role in enhancing an Ed tech web application by focusing on user authentication, card features, and resolving bugs."
      ],
      techStack: "Next.js, React, Firebase, Google Cloud, Vercel APIs"
    },
    {
      company: "Soft Web Pos",
      position: "JavaScript/ReactJs Developer",
      duration: "Sep 2022 - Feb 2023", 
      description: [
        "Implemented order and product management features in a POS application to improve inventory handling and sales.",
        "Created a drag-and-drop dashboard using JavaScript to enhance usability and customization.",
        "Developed a customizable invoice design tool in the admin panel, allowing users to adjust branding and layout."
      ],
      techStack: "JavaScript, React, POS Systems"
    }
  ],
  projects: [
    {
      name: "Aum Chat",
      liveUrl: "https://aumchat.live",
      githubUrl: "https://github.com/mahendradevkar/aum-chat",
      description: "AI assistant with multiple model support",
      purpose: "AI-powered chat interface that enables users to interact with multiple AI models in a single, clean interface with dynamic model switching support and context-aware conversation handling.",
      techStack: {
        frontend: "Next.js, TypeScript, JavaScript, Tailwind CSS, Shadcn, Convex",
        backend: "Convex (serverless backend) with Convex Auth for authentication and real-time data management"
      }
    },
    {
      name: "Form Builder", 
      liveUrl: "https://formbuilder.live",
      githubUrl: "https://github.com/mahendradevkar/form-builder",
      description: "Interactive drag-and-drop form builder",
      purpose: "A dynamic form builder that allows users to design, configure, and preview custom forms with real-time preview support.",
      techStack: {
        frontend: "Next.js, TypeScript, JavaScript, Shadcn, React Hook Form, Zustand",
        backend: "Next.js API routes with MongoDB"
      }
    },
    {
      name: "Aum Soft",
      liveUrl: "https://aumsoft.live", 
      githubUrl: "https://github.com/mahendradevkar/aum-soft",
      description: "E-commerce Profit Analysis Tool",
      purpose: "Streamlines profit and loss calculations for e-commerce sellers by analyzing uploaded order reports.",
      techStack: {
        frontend: "Next.js, TypeScript, Shadcn, Zod, React Hook Form, React Table",
        backend: "Node.js, Express, MongoDB, TypeScript (backend developed by teammate)"
      }
    }
  ],
  education: [
    {
      institution: "Naresh IT technology",
      degree: "MERN Stack Developer Course",
      duration: "Apr 2022 – Oct 2022",
      location: "Ameerpet, HYD"
    },
    {
      institution: "Dr.S.&S.S.Gandhi College Of Engineering & Tech",
      degree: "Diploma in Engineering", 
      duration: "Aug 2017 – Sep 2020",
      location: "Surat, GJ"
    }
  ]
};