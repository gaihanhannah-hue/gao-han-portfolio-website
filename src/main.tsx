import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import "./styles.css";

type Lang = "en" | "zh";

type DetailPage = {
  slug: string;
  label: Record<Lang, string>;
  short: Record<Lang, string>;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  intro: Record<Lang, string>;
  timeline: Array<{
    date: Record<Lang, string>;
    title: Record<Lang, string>;
    body: Record<Lang, string>;
  }>;
  skills: string[];
  diagram: Record<Lang, string[]>;
  media: Array<Record<Lang, string>>;
  accent: string;
};

const pages: DetailPage[] = [
  {
    slug: "self-introduction",
    label: { en: "Self Introduction", zh: "自我介绍" },
    short: {
      en: "Education, identity, and the through-line behind my portfolio.",
      zh: "教育背景、身份认同，以及贯穿我作品集的主线。",
    },
    title: { en: "Self Introduction", zh: "自我介绍" },
    subtitle: {
      en: "",
      zh: "",
    },
    intro: {
      en: "I am a cross-disciplinary technologist with a background in automation and artificial intelligence. My systematic training through undergraduate and master's programs has equipped me with an interdisciplinary knowledge framework spanning mechanical engineering, automatic control, and software architecture. I specialize in integrating complex low-level control logic with cutting-edge AI Agent technologies in robotic system development, with full-stack capability covering simulation environment setup, algorithm optimization, and system engineering deployment.\n\nIn terms of core competencies, I possess deep theoretical foundations in control algorithms and robotic simulation, can proficiently architect multimodal AI Agent systems, and excel at applying Python/C programming skills to complex real-world business scenarios. My rigorous engineering mindset enables me to efficiently resolve communication efficiency and system stability challenges in hardware-software co-design.\n\nBeyond hands-on internship experience at renowned research institutions and leading tech companies, I maintain a keen insight into frontier AI technologies. Through sustained technical practice, I have developed rapid technology transfer and environmental adaptation capabilities, allowing me to quickly dive into new domains and deliver high-quality code implementations. I value not only theoretical depth, but also scalability and deployment efficacy in engineering practice. I look forward to contributing solid professional expertise, a rigorous engineering attitude, and a continuous passion for learning to drive R&D innovation within the team.",
      zh: "我是一名自动化与人工智能背景的复合型技术开发者。本科与硕士阶段的系统化培养，使我构建了「机械工程+自动控制+软件架构」的跨学科知识图谱。我擅长在机器人系统开发中，将复杂的底层控制逻辑与前沿的AI Agent技术进行有机融合，具备从仿真环境搭建、算法策略调优到系统工程部署的全栈式技术能力。\n\n在核心能力方面，我具备深厚的控制算法与机器人仿真理论功底，能够熟练驾驭多模态AI Agent的架构设计，并擅长将Python/C编程技能应用于复杂的业务场景落地。我的工程思维严谨，能够高效解决软硬件协同过程中的通信效率与系统稳定性问题。\n\n我不仅拥有在知名科研机构与头部科技企业工作的深度实习经验，更保持着对前沿AI技术的敏锐洞察。通过长期的技术实践，我养成了极快的技术迁移与环境适应能力，能够迅速切入新领域并输出高质量的代码实现。我不仅追求技术的理论深度，更看重技术在工程实践中的可扩展性与落地效能。我期待能以扎实的专业功底、严谨的工程态度及持续进取的学习热情，为团队的研发创新贡献价值。",
    },
    timeline: [
      {
        date: { en: "Education", zh: "教育背景" },
        title: { en: "B.Eng. + M.Sc. in Automation & Robotics", zh: "本科+硕士：自动化与机器人" },
        body: {
          en: "Systematic training across mechanical engineering, automatic control, and software architecture, building a cross-disciplinary knowledge framework for intelligent systems.",
          zh: "机械工程、自动控制与软件架构的系统化培养，构建面向智能系统的跨学科知识体系。",
        },
      },
      {
        date: { en: "Core Focus", zh: "核心方向" },
        title: { en: "Control × AI Agents × Full-Stack Delivery", zh: "控制 × AI Agent × 全栈交付" },
        body: {
          en: "Bridging low-level robot control with multimodal AI Agent workflows — from simulation and algorithm tuning to system engineering deployment.",
          zh: "打通底层机器人控制与多模态AI Agent工作流——从仿真、算法调优到系统工程部署。",
        },
      },
    ],
    skills: ["Automation", "Robotics", "Control Theory", "AI Agents", "Simulation", "Python/C", "Full-Stack Development"],
    diagram: {
      en: ["Mechanical Engineering", "Automatic Control", "Software Architecture", "AI Agents", "System Deployment"],
      zh: ["机械工程", "自动控制", "软件架构", "AI Agent", "系统部署"],
    },
    media: [
      { en: "Graduation photo 1", zh: "毕业照 1" },
      { en: "Graduation photo 2", zh: "毕业照 2" },
      { en: "Graduation photo 3", zh: "毕业照 3" },
    ],
    accent: "cyan",
  },
  {
    slug: "robotics",
    label: { en: "Robotics", zh: "机器人控制" },
    short: {
      en: "Dexterous hands, humanoid simulation, ROS 2 feedback loops.",
      zh: "灵巧手、人形机器人仿真与 ROS 2 实时反馈闭环。",
    },
    title: {
      en: "Robotics Control & Simulation",
      zh: "机器人控制与仿真",
    },
    subtitle: {
      en: "From simulation models to stable robot motion.",
      zh: "从仿真建模到稳定机器人运动控制。",
    },
    intro: {
      en: "My robotics work connects mechanical modeling, reinforcement learning environments, and controller feedback. I like building systems where a model, a controller, and a robot state loop can actually talk to each other.",
      zh: "我的机器人经历主要连接机械建模、强化学习环境和控制器反馈。我喜欢把模型、控制器和机器人状态反馈真正打通，做成可验证的运动系统。",
    },
    timeline: [
      {
        date: { en: "2025.09 - 2025.12", zh: "2025.09 - 2025.12" },
        title: { en: "Agibot | Algorithm Simulation Intern", zh: "智元机器人 | 算法仿真实习生" },
        body: {
          en: "Built a dexterous hand simulation model with Sim-MuJoCo, coordinated ROS 2 communication with an MC controller, and optimized command/state feedback for real-time interaction.",
          zh: "基于 Sim-MuJoCo 搭建灵巧手仿真模型，协调 ROS 2 与 MC 控制器通信，并优化命令下发与状态反馈的实时交互。",
        },
      },
      {
        date: { en: "2024.04 - 2024.10", zh: "2024.04 - 2024.10" },
        title: { en: "Chinese Academy of Sciences | Research Assistant", zh: "中国科学院 | 科研助理" },
        body: {
          en: "Configured reinforcement learning environments on Linux and completed humanoid robot simulation debugging in Isaac Gym and MuJoCo for walking and jumping control.",
          zh: "在 Linux 上配置强化学习环境，并基于 Isaac Gym 与 MuJoCo 完成人形机器人行走、跳跃控制的仿真调试。",
        },
      },
    ],
    skills: ["ROS 2", "MuJoCo", "Isaac Gym", "Sim-MuJoCo", "PPO", "SAC", "DDPG", "WPC", "MBC"],
    diagram: {
      en: ["Simulation Model", "Controller", "ROS 2 Bridge", "Robot State Feedback"],
      zh: ["仿真模型", "控制器", "ROS 2 通信", "机器人状态反馈"],
    },
    media: [
      { en: "Humanoid walking demo video", zh: "人形机器人行走视频" },
      { en: "Dexterous hand simulation screenshot", zh: "灵巧手仿真截图" },
      { en: "Lab or robot project photo", zh: "实验室或机器人项目照片" },
    ],
    accent: "green",
  },
  {
    slug: "agents",
    label: { en: "AI Agents", zh: "AI Agent" },
    short: {
      en: "Workflow orchestration, Blocks, multimodal content generation.",
      zh: "工作流编排、Blocks、以及多模态内容生成 Agent。",
    },
    title: { en: "Multimodal AI Agent Systems", zh: "多模态 AI Agent 系统" },
    subtitle: {
      en: "Turning model capabilities into reusable workflows.",
      zh: "把模型能力变成可复用的工作流。",
    },
    intro: {
      en: "My Agent work focuses on visual workflow orchestration, modular feature packaging, Python-based business logic, and AI systems that generate images, slides, and structured content.",
      zh: "我的 Agent 经历聚焦于可视化工作流编排、模块化功能封装、Python 业务逻辑，以及图像、PPT 和结构化内容生成系统。",
    },
    timeline: [
      {
        date: { en: "2026.05 - 2026.07", zh: "2026.05 - 2026.07" },
        title: { en: "SENGITAL | Industry AI Agent Development Intern", zh: "SENGITAL | 行业 AI Agent 开发实习生" },
        body: {
          en: "Developed industry-specific Agents on poffices.AI, built custom Blocks, configured node-based logic, embedded Python scripts, and supported online optimization.",
          zh: "在 poffices.AI 上开发行业 Agent，构建自定义 Blocks，配置节点逻辑，嵌入 Python 脚本，并支持线上性能优化。",
        },
      },
      {
        date: { en: "2025.11 - 2026.06", zh: "2025.11 - 2026.06" },
        title: { en: "Multimodal AI Agent System R&D", zh: "多模态 AI Agent 系统研发" },
        body: {
          en: "Led architecture work with LLM, VLM, YOLO, OpenCV, LangChain RAG pipelines, Ray scheduling, and image/PPT generation Agents.",
          zh: "主导多模态 Agent 架构研发，使用 LLM、VLM、YOLO、OpenCV、LangChain RAG、Ray 调度以及图像/PPT 生成 Agent。",
        },
      },
    ],
    skills: ["LLM", "VLM", "LangChain", "RAG", "Ray", "YOLO", "OpenCV", "Prompt Engineering", "Python"],
    diagram: {
      en: ["User Intent", "Planner", "Tools", "Memory / RAG", "Generated Output"],
      zh: ["用户意图", "规划器", "工具调用", "记忆 / RAG", "生成结果"],
    },
    media: [
      { en: "Agent workflow screenshot", zh: "Agent 工作流截图" },
      { en: "Image generation Agent demo", zh: "图像生成 Agent 演示" },
      { en: "PPT generation Agent demo", zh: "PPT 生成 Agent 演示" },
    ],
    accent: "cyan",
  },
  {
    slug: "pid-control",
    label: { en: "PID Control", zh: "PID 控制" },
    short: {
      en: "Control loops, Kp/Ki/Kd reasoning, robot motion tuning.",
      zh: "控制回路、Kp/Ki/Kd 推导与机器人运动调参。",
    },
    title: { en: "PID Control & Algorithm Thinking", zh: "PID 控制与算法思维" },
    subtitle: {
      en: "The math layer behind reliable motion.",
      zh: "可靠运动背后的数学层。",
    },
    intro: {
      en: "Control theory is the bridge between a robot's desired behavior and its real-world motion. I use PID concepts, error signals, and tuning logic as a practical language for stabilizing systems.",
      zh: "控制理论是机器人期望行为和真实运动之间的桥。我用 PID、误差信号和调参逻辑来理解并稳定系统。",
    },
    timeline: [
      {
        date: { en: "2021 - 2026", zh: "2021 - 2026" },
        title: { en: "Automation and Control Coursework", zh: "自动化与控制课程体系" },
        body: {
          en: "Studied Automatic Control Theory, Control and Industrial Automation, Robotics Engineering, and Advanced Robotics across undergraduate and master programs.",
          zh: "在本科和硕士阶段学习自动控制理论、控制与工业自动化、机器人工程和高级机器人等课程。",
        },
      },
      {
        date: { en: "Applied Projects", zh: "应用项目" },
        title: { en: "Control tuning in simulation", zh: "仿真中的控制调参" },
        body: {
          en: "Applied controller reasoning to dexterous hand, humanoid robot, and serpentine robot simulation workflows.",
          zh: "将控制器思维应用到灵巧手、人形机器人和蛇形机器人仿真流程中。",
        },
      },
    ],
    skills: ["PID", "Kp / Ki / Kd", "e(t)", "u(t)", "Control Loop", "Optimization", "Robot Motion"],
    diagram: {
      en: ["Setpoint", "Error e(t)", "PID Controller", "Plant", "Measured Output"],
      zh: ["目标值", "误差 e(t)", "PID 控制器", "被控对象", "测量输出"],
    },
    media: [
      { en: "PID derivation notes", zh: "PID 推导笔记" },
      { en: "Control loop diagram", zh: "控制回路图" },
      { en: "Motion tuning result", zh: "运动调参结果" },
    ],
    accent: "coral",
  },
  {
    slug: "coding",
    label: { en: "Coding", zh: "编程开发" },
    short: {
      en: "Python, C, MATLAB, front-end/back-end development and deployment.",
      zh: "Python、C、MATLAB、前后端开发与工程部署。",
    },
    title: { en: "Coding & Engineering Delivery", zh: "编程与工程交付" },
    subtitle: {
      en: "Building the software layer around robots and Agents.",
      zh: "为机器人和 Agent 搭建软件层。",
    },
    intro: {
      en: "I use programming as the practical layer that connects algorithms, simulations, interfaces, and deployment. My work spans robot control code, data pipelines, mini-programs, and AI service systems.",
      zh: "我把编程看作连接算法、仿真、界面与部署的实践层，经历覆盖机器人控制代码、数据管线、小程序和 AI 服务系统。",
    },
    timeline: [
      {
        date: { en: "Core Stack", zh: "核心技术栈" },
        title: { en: "Programming and algorithms", zh: "编程与算法" },
        body: {
          en: "Proficient in C, Python, and MATLAB; experienced with PPO/SAC/DDPG, genetic optimization, Bayesian optimization, and robot control code tuning.",
          zh: "熟悉 C、Python 和 MATLAB，具备 PPO/SAC/DDPG、遗传优化、贝叶斯优化和机器人控制代码调参经验。",
        },
      },
      {
        date: { en: "Product Work", zh: "产品交付" },
        title: { en: "Full-stack AI system delivery", zh: "全栈 AI 系统交付" },
        body: {
          en: "Completed front-end and back-end development with Cursor and Claude Code, supporting local deployment and platform engineering deployment.",
          zh: "通过 Cursor 和 Claude Code 完成前后端开发，支持本地部署与平台级工程部署。",
        },
      },
    ],
    skills: ["Python", "C", "MATLAB", "React", "LangChain", "OpenCV", "MQTT", "Linux", "Deployment"],
    diagram: {
      en: ["Algorithm", "Simulation", "Interface", "API", "Deployment"],
      zh: ["算法", "仿真", "界面", "接口", "部署"],
    },
    media: [
      { en: "Code editor screenshot", zh: "代码编辑器截图" },
      { en: "Workflow terminal demo", zh: "终端工作流演示" },
      { en: "System deployment view", zh: "系统部署视图" },
    ],
    accent: "lavender",
  },
  {
    slug: "life-hobbies",
    label: { en: "Life & Hobbies", zh: "生活与兴趣" },
    short: {
      en: "Guitar, reading, sketching ideas, and staying curious.",
      zh: "吉他、读书、画想法，以及持续保持好奇。",
    },
    title: { en: "Life, Hobbies & Creative Energy", zh: "生活、兴趣与创造力" },
    subtitle: {
      en: "The softer side that keeps technical work alive.",
      zh: "让技术工作保持生命力的柔软一面。",
    },
    intro: {
      en: "Outside engineering work, I like guitar, reading, and sketching ideas. These habits keep me close to rhythm, narrative, and visual thinking, which also shape how I design systems.",
      zh: "工程之外，我喜欢吉他、读书和画想法。这些习惯让我保持节奏感、叙事感和视觉思维，也影响我设计系统的方式。",
    },
    timeline: [
      {
        date: { en: "Creative Practice", zh: "创造性实践" },
        title: { en: "Music and reading", zh: "音乐与阅读" },
        body: {
          en: "Guitar and books are quiet ways to reset attention, build taste, and keep learning personal.",
          zh: "吉他和读书是我重置注意力、积累审美和保持个人化学习的方式。",
        },
      },
      {
        date: { en: "Design Thinking", zh: "设计思维" },
        title: { en: "Sketching before building", zh: "先画再做" },
        body: {
          en: "I often turn abstract ideas into sketches, diagrams, and workflows before implementing them.",
          zh: "我常把抽象想法先画成草图、图解和流程，再进入实现。",
        },
      },
    ],
    skills: ["Guitar", "Reading", "Sketching", "Storytelling", "Visual Thinking", "Curiosity"],
    diagram: {
      en: ["Observe", "Sketch", "Build", "Reflect", "Iterate"],
      zh: ["观察", "草图", "构建", "反思", "迭代"],
    },
    media: [
      { en: "Guitar moment", zh: "吉他瞬间" },
      { en: "Reading shelf or notes", zh: "阅读书架或笔记" },
      { en: "Idea sketch", zh: "想法草图" },
    ],
    accent: "green",
  },
];

const homeCopy = {
  en: {
    nav: ["Work", "Projects", "Skills", "Contact"],
    welcome: "✨ Welcome to Hannah's Portfolio & Resume",
    name: "GAO HAN",
    aka: "Hannah Gao",
    tags: ["Robotics Control", "Digital Simulation", "Multimodal AI Agents"],
    contact: [
      { icon: "📍", label: "Location", value: "Hong Kong / Beijing" },
      { icon: "🎓", label: "Master Degree", value: "Automation, CUHK" },
      { icon: "📩", label: "Email", value: "gaihan.hannah@gmail.com" },
      { icon: "📞", label: "Phone", value: "+852 70396030" },
    ],
    explore: "Choose a sticker to explore",
  },
  zh: {
    nav: ["经历", "项目", "技能", "联系"],
    welcome: "✨ 欢迎来到我的个人简历&作品集",
    name: "高涵",
    aka: "Hannah Gao",
    tags: ["机器人控制", "数字仿真", "多模态智能体"],
    contact: [
      { icon: "📍", label: "所在地", value: "香港 / 北京" },
      { icon: "🎓", label: "硕士", value: "自动化, 香港中文大学" },
      { icon: "📩", label: "邮箱", value: "2743736159@qq.com" },
      { icon: "📞", label: "电话", value: "+86 13581903757" },
    ],
    explore: "点击一个贴纸入口",
  },
};

const hotspots = [
  { slug: "robotics", x: 48, y: 47, w: 20, h: 32, shape: "robotics" },
  { slug: "pid-control", x: 28, y: 79, w: 22, h: 31, shape: "pid" },
  { slug: "coding", x: 76, y: 43, w: 22, h: 34, shape: "coding" },
  { slug: "agents", x: 61, y: 74, w: 27, h: 25, shape: "agents" },
  { slug: "agents", x: 88, y: 71, w: 18, h: 28, shape: "thinking" },
  { slug: "life-hobbies", x: 87, y: 20, w: 18, h: 22, shape: "hobbies" },
  { slug: "life-hobbies", x: 52, y: 18, w: 16, h: 22, shape: "reading" },
];

const stickerLayers = [
  { slug: "reading", to: "self-introduction", image: "reading.png", label: { en: "Education Notes", zh: "教育笔记" } },
  { slug: "self-introduction", to: "self-introduction", image: "self-introduction.png", label: { en: "Self Introduction", zh: "自我介绍" } },
  { slug: "guitar", to: "life-hobbies", image: "guitar.png", label: { en: "Life & Hobbies", zh: "生活与兴趣" } },
  { slug: "robotics", to: "robotics", image: "robotics.png", label: { en: "Robotics Control", zh: "机器人控制" } },
  { slug: "pid", to: "pid-control", image: "pid.png", label: { en: "PID Control", zh: "PID 控制" } },
  { slug: "coding", to: "coding", image: "coding.png", label: { en: "Coding", zh: "编程开发" } },
  { slug: "agents", to: "agents", image: "agents.png", label: { en: "AI Agents", zh: "AI Agent" } },
];

function useLanguage() {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = window.localStorage.getItem("portfolio-lang");
    return (saved === "zh" ? "zh" : "en") as Lang;
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem("portfolio-lang", nextLang);
  };

  return { lang, setLang };
}

function App() {
  const { lang, setLang } = useLanguage();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
        <Route path="/work/:slug" element={<Detail lang={lang} setLang={setLang} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const copy = homeCopy[lang];

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Back to home">
        GAO HAN
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        {copy.nav.map((item) => (
          <a key={item} href={item === copy.nav[3] ? "mailto:2743736159@qq.com" : "/#map"}>
            {item}
          </a>
        ))}
      </nav>
      <LanguageToggle lang={lang} setLang={setLang} />
    </header>
  );
}

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="language-toggle" aria-label="Language selector">
      <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
        EN
      </button>
      <button type="button" className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>
        中文
      </button>
    </div>
  );
}

function Home({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const copy = homeCopy[lang];

  return (
    <main className="home-page composed-home">
      <section className="composed-stage" aria-label="GAO HAN interactive portfolio map">
        <div className="image-language composed-language" aria-label="Language selector">
          <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
            EN
          </button>
          <button type="button" className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>
            中文
          </button>
        </div>

        <section className="composed-intro">
          <p className="welcome-line">{copy.welcome}</p>
          <h1>{copy.name}</h1>
          <p className="aka">{copy.aka}</p>
          <p className="composed-subtitle">
            {copy.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && " · "}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </p>
          <div className="contact-grid">
            {copy.contact.map((item) => (
              <div className="contact-item" key={item.value}>
                <span className="contact-icon">{item.icon}</span>
                <span className="contact-text">
                  {item.label ? <strong>{item.label}: </strong> : null}
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="composed-decor decor-chart" aria-hidden="true" />
        <div className="composed-decor decor-code" aria-hidden="true" />
        <div className="composed-decor decor-agent-note" aria-hidden="true" />
        <div className="composed-decor decor-notes" aria-hidden="true" />
        <VibeCodingSticker lang={lang} />

        {stickerLayers.map((item) => (
          <Link
            key={item.slug}
            className={`sticker-layer sticker-${item.slug}`}
            to={`/work/${item.to}`}
            aria-label={item.label[lang]}
          >
            <img src={`/assets/stickers/${item.image}`} alt="" />
            <span>{item.label[lang]}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

function VibeCodingSticker({ lang }: { lang: Lang }) {
  const label =
    lang === "en"
      ? "Made by Hannah + Claude Code + Codex"
      : "Hannah + Claude Code + Codex 一起做的";

  return (
    <figure className="vibe-coding-sticker" aria-label={label}>
      <img className="vibe-coding-image" src="/assets/stickers/withai.png" alt="" />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function Detail({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const { slug } = useParams();
  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={`detail-page paper-grain accent-${page.accent}`}>
      <Header lang={lang} setLang={setLang} />
      <section className="detail-hero">
        <div className="detail-copy">
          <Link className="back-link" to="/">
            {lang === "en" ? "Back to sticker map" : "返回贴纸地图"}
          </Link>
          <h1>{page.title[lang]}</h1>
          <p className="detail-subtitle">{page.subtitle[lang]}</p>
          <p className="detail-intro">{page.intro[lang]}</p>
          <div className="skill-cloud" aria-label="Skills">
            {page.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <MediaShowcase page={page} lang={lang} />
      </section>

      <section className="detail-grid">
        <Timeline page={page} lang={lang} />
        <Diagram page={page} lang={lang} />
      </section>
    </main>
  );
}

function MediaShowcase({ page, lang }: { page: DetailPage; lang: Lang }) {
  return (
    <aside className="media-showcase" aria-label="Media placeholders">
      <div className="video-placeholder">
        <div className="play-mark" aria-hidden="true" />
        <span>{page.media[0][lang]}</span>
      </div>
      <div className="media-pair">
        {page.media.slice(1).map((item) => (
          <div className="mini-placeholder" key={item[lang]}>
            <span>{item[lang]}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Timeline({ page, lang }: { page: DetailPage; lang: Lang }) {
  return (
    <section className="timeline-card">
      <h2>{lang === "en" ? "Experience Notes" : "经历笔记"}</h2>
      {page.timeline.map((item) => (
        <article className="timeline-item" key={`${item.date.en}-${item.title.en}`}>
          <time>{item.date[lang]}</time>
          <h3>{item.title[lang]}</h3>
          <p>{item.body[lang]}</p>
        </article>
      ))}
    </section>
  );
}

function Diagram({ page, lang }: { page: DetailPage; lang: Lang }) {
  return (
    <section className="diagram-card">
      <h2>{lang === "en" ? "How I think about it" : "我的思考方式"}</h2>
      <div className="flow-row">
        {page.diagram[lang].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flow-node">{step}</div>
            {index < page.diagram[lang].length - 1 && <div className="flow-arrow" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
