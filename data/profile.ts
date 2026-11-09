// ALL portfolio content lives here.
// Source: Mohammed's LinkedIn profile (scraped 2026-11-09). Items marked TODO still need real input.

export type Color = "yellow" | "coral" | "blue" | "green";

// `id` doubles as the key into lib/techLogos.tsx, so "linkedin" | "github" | "leetcode" get their brand logo.
export type Social = { id: string; label: string; handle: string; href: string };
export type Job = {
  role: string;
  company: string;
  period: string;
  plain: string; // plain-language summary for the recruiter view
  points: string[];
};
export type Metric = { value: number; prefix?: string; suffix?: string; label: string };
export type Project = {
  title: string;
  blurb: string;
  impact: string;
  tags: string[];
  href?: string; // omit for private / employer work: the "View project" button is hidden
  color: Color;
  role: string;
  problem: string;
  approach: string;
  architecture: string[]; // left-to-right flow of components
  metrics: Metric[];
};
export type SkillGroup = {
  id: "frontend" | "backend" | "genai" | "data" | "cloud";
  title: string;
  plain: string;
  items: string[];
  built: string; // "in practice" sentence shown when a node is selected
  color: Color;
};
export type Recommendation = { quote: string; name: string; title: string; date: string };

export const profile = {
  name: "Mohammed Saif",
  initials: "MS",
  photo: "/mohammed-saif.jpg",
  role: "Senior Software Engineer",
  subtitle: "Full-stack · GenAI",
  rotatingRoles: ["Full-stack engineer", "GenAI builder", "D365 Commerce engineer", "Team mentor"],
  location: "Bengaluru, India · Open to remote",
  since: "2021", // first engineering work (TCS iON internship, Oct 2021); full-time roles start Jul 2022
  recommendationsUrl: "https://www.linkedin.com/in/mohammedsaif001/details/recommendations/",
  tagline: "A senior engineer who turns complex systems into clear products, and makes AI genuinely useful inside them.",
  bio: "Senior software engineer working across full-stack development and AI integration, building enterprise solutions on Microsoft D365 Commerce. I design how AI fits into the platform (intent parsing, RAG, MCP connections) and build the React experiences people actually use.",
  availability: "Open to remote full-stack and GenAI engineering roles",
  resumeHref: "", // TODO: add public/resume.pdf, then set this to "/resume.pdf". Empty hides every Resume button.
  email: "imohdsaif.ai@gmail.com",
  socials: [
    { id: "linkedin", label: "LinkedIn", handle: "/in/mohammedsaif001", href: "https://www.linkedin.com/in/mohammedsaif001" },
    { id: "github", label: "GitHub", handle: "@mohammedsaif001", href: "https://github.com/mohammedsaif001" },
    { id: "leetcode", label: "LeetCode", handle: "@mohammedsaif001", href: "https://leetcode.com/u/mohammedsaif001/" },
  ] satisfies Social[],
  // "About me" frame: deliberately short and scannable.
  about: {
    summary: "I build the interfaces and AI features of enterprise commerce software. Right now that means designing how LLMs plug into Microsoft D365 Commerce.",
    strengths: [
      { icon: "ai", title: "AI in real products", text: "Agents, RAG and MCP wired into live platforms" },
      { icon: "frontend", title: "Front ends that scale", text: "React and Next.js, from components to full storefront modules" },
      { icon: "lead", title: "Leads and mentors", text: "Sprint planning, code reviews, growing developers" },
    ],
  },
  experience: [
    {
      role: "Senior Software Engineer",
      company: "BASOFA (Microsoft Certified Partner)",
      period: "Nov 2024 to Present",
      plain: "Designs how AI fits into Microsoft D365 Commerce, and builds the storefront experiences on top of it.",
      points: [
        "Designing how LLMs plug into D365 Commerce: intent parsing, RAG and MCP connections",
        "Built a dual-agent chat assistant (tables and charts) on Azure OpenAI with real-time updates",
        "Extended the D365 Commerce React SDK with 6 custom storefront modules",
        "Lead sprint planning, code reviews and mentoring",
      ],
    },
    {
      role: "Software Engineer",
      company: "Aarabhya Systems Pvt Ltd.",
      period: "Apr 2023 to Nov 2024",
      plain: "Built the user interface for real-time gaming platforms.",
      points: ["Built real-time gaming UIs with Next.js, Tailwind and GSAP", "Shipped JWT auth flows and led a responsive UI redesign"],
    },
    {
      role: "Software Engineer",
      company: "Nviera Technologies",
      period: "Jul 2022 to Feb 2023",
      plain: "First engineering role: building reusable front-end components in an agile team.",
      points: ["Built reusable React and Redux components in an agile team"],
    },
  ] satisfies Job[],
  // TODO: LinkedIn has no Projects section, so these cards are drawn from the experience
  // descriptions above. Tags, architecture flows and the problem/approach wording are
  // drafts: please review them. Add repo or demo links via `href` where public.
  projects: [
    {
      title: "D365 AI Chat Assistant",
      blurb: "A chat assistant inside D365 Commerce that guides users through multi-step actions.",
      impact: "Dual-agent answers: tables and charts, live",
      tags: ["Azure OpenAI", "Agents", "SignalR", "React"],
      color: "yellow",
      role: "Designed the agent setup and built the real-time experience",
      problem: "Commerce users had to dig through screens to get answers and complete multi-step actions on their own.",
      approach: "Split the work between two agents, one for tabular answers and one for charts, on Azure OpenAI. Streamed results to the UI in real time with SignalR and Pub/Sub, keeping every user's conversation isolated.",
      architecture: ["React chat UI", "SignalR", "Pub/Sub", "Table + chart agents", "Azure OpenAI"],
      metrics: [{ value: 2, label: "specialised agents: tables and charts" }],
    },
    {
      title: "D365 Commerce Storefront Modules",
      blurb: "Custom modules that let ISV solutions run natively inside D365 storefronts.",
      impact: "6 modules running inside D365 Commerce",
      tags: ["React", "TypeScript", "D365 Commerce SDK"],
      color: "blue",
      role: "Front-end engineer · extended the D365 Commerce React SDK",
      problem: "ISV solutions need to feel like part of the storefront, not a separate app bolted on.",
      approach: "Extended the D365 Commerce React SDK with custom modules: Bulk Order Upload, CPQ Products, Warranty Management, Quotations, Smart Discounts and a B2B Dashboard.",
      architecture: ["D365 storefront", "React SDK", "Custom modules", "ISV back end"],
      metrics: [{ value: 6, label: "custom storefront modules" }],
    },
    {
      title: "Financial Reconciliation Platform",
      blurb: "Matching financial records with a mix of manual review and automation.",
      impact: "Hybrid manual + automated matching",
      tags: ["API design", "Full-stack", "Azure"],
      color: "coral",
      role: "Designed the API contracts with the back-end team",
      problem: "Reconciling financial records by hand is slow, but fully automatic matching is hard to trust.",
      approach: "Designed the API contracts with the back-end teams for a platform that combines automated matching with manual review for the cases that need a person.",
      architecture: ["Records in", "Auto-match", "Manual review", "Reconciled"],
      metrics: [{ value: 2, label: "matching modes: manual and automated" }],
    },
  ] satisfies Project[],
  skills: [
    { id: "frontend", title: "Frontend", plain: "What people see and touch", items: ["HTML5", "CSS3", "React", "Next.js", "Redux", "Tailwind", "Material UI", "shadcn/ui"], built: "Extended the D365 Commerce React SDK with custom modules and built a real-time chat experience for an AI assistant.", color: "yellow" },
    { id: "backend", title: "Backend", plain: "The engine behind the screens", items: ["JavaScript", "TypeScript", "Node.js", "Express"], built: "Worked with back-end teams on the API contracts behind AI and reconciliation features.", color: "blue" },
    { id: "genai", title: "GenAI", plain: "Making AI useful in products", items: ["OpenAI API", "Azure OpenAI", "Claude", "MCP", "RAG", "Vector Search", "AI Agents", "Inngest"], built: "RAG systems with vector search, durable agent workflows with Inngest, and MCP servers that connect LLMs to real tools.", color: "coral" },
    { id: "data", title: "Data", plain: "Where everything is remembered", items: ["MongoDB", "PostgreSQL", "Redis", "SQL"], built: "Postgres and MongoDB on the back end, vector search for retrieval, and Cosmos DB for an internal full-stack app.", color: "green" },
    { id: "cloud", title: "Cloud & DevOps", plain: "Keeping it fast and reliable", items: ["Microsoft Azure", "Azure DevOps", "Docker", "GitHub"], built: "Azure OpenAI services, containerised services with Docker, and sprint delivery through Azure DevOps.", color: "yellow" },
  ] satisfies SkillGroup[],
  // Verbatim public LinkedIn recommendations (9 of 10; the informal note from a college friend is left out).
  recommendations: [
    { quote: "I had the opportunity to work with Mohammed on a project, and I was genuinely impressed by his work as a engineer. He has strong technical knowledge, a good eye for detail, and the ability to translate requirements into clean, user-friendly interfaces.\n\nMohammed is reliable, proactive, and easy to collaborate with. He consistently delivered quality work, handled feedback well, and contributed positively to the overall project delivery. I would gladly work with him again and highly recommend him for any development role.", name: "Nagarjuna P", title: "D365FO SCM Functional Consultant", date: "Oct 2026" },
    { quote: "I had the pleasure of working with Mohammad Saif, who reported to me as a Frontend Developer. He consistently delivered high-quality UI features with great attention to detail. He is strong in React.js, JavaScript, and modern UI development, and always maintained clean, scalable code. He is reliable, proactive, and a great team player. I highly recommend him for any frontend development role.", name: "Manjunatha V M", title: "Senior Software Engineer, former lead", date: "Jan 2026" },
    { quote: "Saif is a highly skilled and dedicated professional developer who consistently brings clarity, calmness, and excellence to his work. He has a strong eye for high-quality designs and always asks the right questions during architecture and design discussions, ensuring well-thought-out solutions. Saif’s professionalism, technical expertise, and collaborative approach make him a valuable asset to the team.", name: "Siva Ganesamurthi", title: "D365 & Azure Integration Architect, 365Connect", date: "Sep 2025" },
    { quote: "I had the pleasure of working with Mohammed saif, and I can confidently say he is one of the best frontend developers I have worked with. his technical skills are outstanding, and he has strong ability to explain complex concepts clearly, making collaboration very smooth. he is not only highly skilled in frontend development but also proactive, detail-oriented, and always willing to help others.  I truly enjoyed working with him and would highly recommend him for any team looking for a talented and reliable frontend developer.", name: "Chandrashekhara N V", title: "Software Engineer", date: "Sep 2025" },
    { quote: "I had the pleasure of working with Mohammed Saif on several projects, where he built clean, user-friendly frontend solutions that made collaboration seamless. Knowledge-sharing, collaborative, and reliable — he consistently delivered high-quality results and will be an asset to any team.", name: "Chandan Beeresh", title: "Software Developer", date: "Sep 2025" },
    { quote: "I have had the pleasure of working with Mohammed Saif for the past year as a Software Engineer. He has been an exceptional team member, consistently delivering high-quality work as a ReactJS developer.\nHe is highly knowledgeable in the ReactJS framework and brings a creative approach to solving complex technical challenges. His attention to detail and ability to learn new technologies has been an asset to the team. He consistently delivered high-quality work and was proactive in ensuring projects were completed on time.\nMohammed is a team player and a pleasure to work with. He is approachable and always willing to help, making him a great collaborator. His strong communication skills made it easy to work with him, even in a short period of time.\nI would highly recommend Mohammed Saif for any future opportunities as a ReactJS developer. He is a talented individual who will bring value to any team. I am confident he will continue to excel in his career and be successful in any role.", name: "Gagan Indukala Krishna Murthy", title: "Senior Software Engineer, GenAI", date: "Feb 2023" },
    { quote: "During my tenure at Nviera Technologies, Saif and I  were a part of the same team. Having worked with him for a long period, I have observed a few things about him. He is extremely eager and enthusiastic to learn and be productive. He is a good listener and actively listens to the instruction or tasks given to him. Being a fresher, His skills in React, Redux, ES6 have amazed me. His ability to understand the task at hand and get a creative solution for each task assigned makes him a very critical and exceptionally significant resource for any team he works with. I wish him all the best in all his future endeavors .", name: "Viniket Tawade", title: "Senior Associate Consultant, Infosys (former teammate)", date: "Feb 2023" },
    { quote: "I had the pleasure of working with Mohammed Saif as a QA Engineer and I can confidently say that he is a highly skilled and dedicated React JS developer. Throughout our collaboration, Mohammed consistently demonstrated his exceptional abilities in resolving complex bugs and issues that I raised. He approached each challenge with determination and a strong attention to detail, ensuring that the final outcome was of the highest quality.\n\nIn addition to his technical expertise, Mohammed is also a friendly and approachable individual. He is always open to discussions and is willing to go the extra mile to ensure a successful outcome. He has excellent communication skills and is able to articulate technical concepts in a way that is easy for others to understand. This made working with him a truly enjoyable experience.\n\nMohammed Saif has my highest endorsement for any upcoming opportunities as a ReactJS developer. He is an accomplished individual who will enhance any squad. I have no doubt that he will be successful in anything he sets out to do and that he will advance professionally.", name: "Mirza Aqeel Raza", title: "QA Engineer, Aarabhya Systems", date: "Feb 2023" },
    { quote: "Having observed Mohammed's work personally, it is remarkable how he efficiently handled the fundraising campaign. By implementing a continuous improvement strategy, he has made his work an example for his colleagues. His work ethic and performance are both exemplary and uplifting for the team he works with.", name: "Himanshu Goenka", title: "President & Founder, Muskurahat Foundation", date: "Apr 2022" },
  ] satisfies Recommendation[],
};

export const sections = [
  { id: "intro", label: "Hello" },
  { id: "about", label: "About me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "recs", label: "Kind words" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
