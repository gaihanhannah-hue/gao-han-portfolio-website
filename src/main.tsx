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
  roboticsSections?: Array<{
    period: string;
    role: string;
    title: string;
    body: string;
    bullets: string[];
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  codingSections?: Array<{
    period: string;
    role: string;
    title: string;
    body: string;
    bullets: string[];
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  agentsSections?: Array<{
    period: string;
    role: string;
    title: string;
    body: string;
    bullets: string[];
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  pidSections?: Array<{
    period: string;
    role: string;
    title: string;
    body: string;
    bullets: string[];
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  photos?: string[];
  awards?: Array<{
    category: Record<Lang, string>;
    icon: string;
    items: Record<Lang, string[]>;
  }>;
  detailedSkills?: Array<{
    category: Record<Lang, string>;
    icon: string;
    desc: Record<Lang, string>;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    major: string;
    logo: string;
    url?: string;
    period: string;
    research: string;
    courses: string[];
    gpa: string;
  }>;
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
      en: "I am Hanna Gao, an automation and AI systems builder working across robotics control, physics simulation, and multimodal Agent workflows. My background bridges control theory, mechanical automation, and full-stack software engineering — a combination that lets me turn abstract models into systems that can move, reason, and be deployed with clarity.\n\nToday, I build across the full stack of intelligent systems: from MuJoCo simulation models and ROS 2 control nodes, to LangChain RAG pipelines and multimodal generation Agents. I've configured humanoid robots in Isaac Gym, tuned dexterous hand controllers in Sim-MuJoCo, and led architecture work on Agent systems that generate images, presentations, and structured content. What drives me is the conviction that good engineering is legible engineering — the system should tell a clear story: what it intends to do, how it measures error, and why it chose this action.",
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
    photos: [
      "/assets/stickers/grad-cutouts/grad-1.png",
      "/assets/stickers/grad-cutouts/grad-2.png",
      "/assets/stickers/grad-cutouts/grad-3.png",
      "/assets/stickers/grad-cutouts/grad-4.png",
      "/assets/stickers/grad-cutouts/grad-5.png",
      "/assets/stickers/grad-cutouts/grad-6.png",
      "/assets/stickers/grad-cutouts/grad-7.png",
      "/assets/stickers/grad-cutouts/grad-8.png",
    ],
    education: [
      {
        school: "The Chinese University of Hong Kong",
        degree: "Master",
        major: "Mechanical and Automation Engineering",
        logo: "/assets/self-introduction/cuhk-logo.png",
        url: "https://www.cuhk.edu.hk",
        period: "2025.09 - 2026.06",
        research: "AI Agent R&D for image generation and PPT generation under an AI Agent field supervisor.",
        courses: [
          "Computer Vision",
          "Control and Industrial Automation",
          "Computer-Aided Design and Manufacturing",
          "Advanced Robotics",
        ],
        gpa: "GPA: In progress",
      },
      {
        school: "Beijing University of Chemical Technology",
        degree: "Bachelor",
        major: "Automation",
        logo: "/assets/self-introduction/buct-logo.png",
        url: "https://www.buct.edu.cn",
        period: "2021.09 - 2025.06",
        research: "Automation, robot control, AI applications, and intelligent mobile robot systems.",
        courses: [
          "Automatic Control Theory",
          "Artificial Intelligence Application",
          "Robotics Engineering",
          "Circuit Theory",
          "Python/C Programming",
        ],
        gpa: "GPA: 86/100",
      },
    ],
  },
  {
    slug: "honors",
    label: { en: "Education Notes", zh: "教育笔记" },
    short: {
      en: "Awards, honors, and technical skill set.",
      zh: "获奖荣誉与技术能力。",
    },
    title: { en: "Honors & Skills", zh: "获奖荣誉与技能" },
    subtitle: { en: "", zh: "" },
    intro: {
      en: "",
      zh: "",
    },
    timeline: [],
    skills: [],
    diagram: { en: [], zh: [] },
    media: [],
    accent: "cyan",
    awards: [
      {
        category: { en: "City-Level Awards", zh: "市级奖项" },
        icon: "🏆",
        items: {
          en: [
            "2024-2025 Beijing Mechanical Innovation Competition — First Prize",
            "2023-2024 Beijing AI & Robotics Competition — Third Prize",
          ],
          zh: [
            "2024-2025 北京市机械创新大赛 一等奖",
            "2023-2024 北京市人工智能机器人大赛 三等奖",
          ],
        },
      },
      {
        category: { en: "University-Level Awards", zh: "校级奖项" },
        icon: "🎖️",
        items: {
          en: [
            '2021-2022 BUCT "Bud Cup" Science & Technology Competition — Second Prize',
            '2021-2022 ACM-ICPC Programming Contest — Honorable Mention',
            '2021-2022 BUCT "Internet+" Innovation & Entrepreneurship Competition — Third Prize',
          ],
          zh: [
            "2021-2022 北京化工大学「萌芽杯」科技竞赛 二等奖",
            "2021-2022 ACM-ICPC 程序设计竞赛 优秀奖",
            "2021-2022 北京化工大学「互联网+」大学生创新创业大赛 三等奖",
          ],
        },
      },
      {
        category: { en: "Other Honors", zh: "其他荣誉" },
        icon: "🌟",
        items: {
          en: [
            "Choir Competition — First Prize",
            "Outstanding Officer, College Youth League Volunteer Group",
            'Team Leader, "My BUCT My Voice" Beijing Practice Team',
          ],
          zh: [
            "合唱比赛 一等奖",
            "学院团委组织志愿者团 优秀干事",
            "「我的北化我代言」北京市实践团 团长",
          ],
        },
      },
    ],
    detailedSkills: [
      {
        category: { en: "Programming & Algorithms", zh: "编程与算法开发" },
        icon: "💻",
        desc: {
          en: "Proficient in C and Python; skilled in MATLAB for system simulation. Experienced with PPO/SAC/DDPG reinforcement learning algorithms and genetic/Bayesian optimization methods. Capable of robot control code development and algorithm tuning.",
          zh: "精通C、Python编程语言，熟练运用MATLAB进行系统仿真；掌握PPO/SAC/DDPG等强化学习算法，熟悉遗传、贝叶斯等优化方法，具备机器人控制代码编写与算法调优能力。",
        },
      },
      {
        category: { en: "Simulation & Engineering", zh: "仿真与工程引擎" },
        icon: "🔧",
        desc: {
          en: "Proficient with MuJoCo, Isaac Gym, and Sim-MuJoCo physics simulation engines. Skilled in ROS 2 for hardware-software communication and coordination, with experience in simulation environment setup, model debugging, and validation.",
          zh: "精通MuJoCo、Isaac Gym/Sim-MuJoCo仿真物理引擎，熟练运用ROS 2机器人操作系统实现软硬件通信协同，具备仿真环境搭建、模型调试与验证能力。",
        },
      },
      {
        category: { en: "Design & Modeling", zh: "设计与建模软件" },
        icon: "🎨",
        desc: {
          en: "Skilled in CAD and SolidWorks for mechanical structure design and modeling, including model format conversion and system integration. Familiar with 3D printing lightweight structure workflows.",
          zh: "熟练使用CAD、SolidWorks进行机械结构设计与建模，可完成模型格式转换与系统集成，掌握3D打印轻量化结构实现相关流程。",
        },
      },
      {
        category: { en: "OS & Tools", zh: "操作系统与工具" },
        icon: "🖥️",
        desc: {
          en: "Familiar with Linux/Ubuntu system operations and environment configuration. Proficient in Office (Excel/Word/PPT). Experienced with WeChat Mini Program development, MQTT protocol communication, and OpenCV visual recognition.",
          zh: "熟悉Linux/Ubuntu系统操作与环境配置，精通Office办公软件。掌握微信小程序开发、MQTT协议通信与OpenCV视觉识别技术。",
        },
      },
      {
        category: { en: "Languages", zh: "语言能力" },
        icon: "🗣️",
        desc: {
          en: "Passed CET-4 and CET-6; IELTS 6.5. Strong English reading, writing, and communication skills.",
          zh: "通过大学英语四、六级考试；雅思6.5，具备良好的英文读写与交流能力。",
        },
      },
    ],
  },
  {
    slug: "robotics",
    label: { en: "Robotics", zh: "机器人控制" },
    short: {
      en: "Serpentine robot, dexterous hand simulation, and ROS 2 real-time feedback loops.",
      zh: "蛇形机器人、灵巧手仿真与 ROS 2 实时反馈闭环。",
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
      en: "My robotics work centers on serpentine robot motion control — from SolidWorks mechanical modeling and MuJoCo physics simulation to PPO/SAC/DDPG reinforcement learning optimization, bridging the full loop from model to controller to real-time state feedback.",
      zh: "我的机器人经历聚焦蛇形机器人运动控制——从 SolidWorks 机械建模、MuJoCo 物理仿真，到 PPO/SAC/DDPG 强化学习算法调优，打通模型、控制器与状态反馈的完整闭环。",
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
      { en: "Serpentine robot motion demo video", zh: "蛇形机器人运动演示视频" },
      { en: "Dexterous hand simulation screenshot", zh: "灵巧手仿真截图" },
      { en: "Lab or robot project photo", zh: "实验室或机器人项目照片" },
    ],
    roboticsSections: [
      {
        period: "2024.04 - 2024.10",
        role: "Chinese Academy of Sciences | Research Assistant",
        title: "Humanoid Robot Control & Simulation",
        body: "Worked on humanoid robot motion control as a research assistant, focusing on reinforcement learning environments and physics simulation for stable walking and jumping behaviors.",
        bullets: [
          "Built and configured reinforcement learning environments on Linux.",
          "Completed humanoid robot simulation debugging in Isaac Gym and MuJoCo.",
          "Compiled and tested WPC/MBC control code for walking and jumping control.",
        ],
        mediaType: "video",
        mediaLabel: "Humanoid walking simulation",
        mediaType2: "video",
        mediaLabel2: "Humanoid jumping control demo",
      },
      {
        period: "2024.11 - 2025.05",
        role: "Graduation Project | Project Lead",
        title: "Serpentine Robot Reinforcement Learning",
        body: "Led the simulation and optimization project for a serpentine mobile robot, connecting SolidWorks mechanical modeling, MuJoCo physics simulation, and reinforcement learning based motion strategy design.",
        bullets: [
          "Built the MuJoCo simulation environment on Ubuntu.",
          "Converted SolidWorks mechanical models into XML simulation assets.",
          "Combined PPO, SAC, DDPG, genetic optimization, and Bayesian optimization for motion control.",
        ],
        mediaType: "video",
        mediaSrc: "/assets/serpentine-robot.mp4",
        mediaLabel: "Serpentine robot simulation demo",
        mediaType2: "image",
        mediaLabel2: "MuJoCo simulation environment",
      },
      {
        period: "2025.09 - 2025.12",
        role: "Agibot | Algorithm Simulation Intern",
        title: "Dexterous Hand Control & Humanoid Simulation Support",
        body: "Worked on dexterous hand simulation and robot control communication, while supporting simulation workflows for humanoid robot scenarios.",
        bullets: [
          "Built a dexterous hand simulation model based on Sim-MuJoCo.",
          "Coordinated ROS 2 communication with an MC controller for command and state feedback.",
          "Optimized communication efficiency and control parameters for stable scenario interaction.",
        ],
        mediaType: "image",
        mediaSrc: "/assets/agibot.png",
        mediaLabel: "Dexterous hand simulation — Agibot",
        mediaType2: "image",
        mediaLabel2: "Humanoid simulation support",
      },
    ],
    accent: "green",
  },
  {
    slug: "agents",
    label: { en: "AI Agents", zh: "AI Agent" },
    short: {
      en: "RAG pipelines, document-to-PPT, web coding with AI tooling.",
      zh: "RAG 管线、文档转 PPT、AI 辅助 Web 开发。",
    },
    title: { en: "AI Agent Projects", zh: "AI Agent 项目实践" },
    subtitle: {
      en: "From RAG pipelines to AI-assisted full-stack development.",
      zh: "从 RAG 检索管线到 AI 辅助全栈开发。",
    },
    intro: {
      en: "My Agent work spans three directions: building multimodal RAG pipelines that turn documents into structured outputs, embedding LLM reasoning into physical IoT systems for autonomous control, and designing composable Agent architectures with MCP (Model Context Protocol) for tool-augmented workflows — connecting LLMs to external APIs, data sources, and real-world actions. This portfolio website is itself a product of AI-assisted development using Claude Code and Cursor under my architectural direction.\n\nBelow are the key projects that define how I think about and build with AI Agents.",
      zh: "我的 Agent 实践分为三个方向：一是构建多模态 RAG 管线，将文档转化为结构化输出；二是将大模型推理嵌入物理 IoT 系统，实现自主环境调控；三是设计可组合的 Agent 架构，通过 MCP（Model Context Protocol）连接 LLM 与外部工具、API 和数据源，实现工具增强工作流。你现在看到的这个作品集网站本身就是在我的架构指导下，使用 Claude Code 和 Cursor 进行 AI 辅助开发的产物。\n\n以下是我在 AI Agent 方向的核心项目与实践经历。",
    },
    timeline: [
      {
        date: { en: "2026.03 - Present", zh: "2026.03 - 至今" },
        title: { en: "Project 1 — Education Agent: RAG + Document-to-PPT Pipeline", zh: "项目一 — 教育类 Agent：RAG + 文档转 PPT 管线" },
        body: {
          en: "Built a locally deployed, private RAG-based Education Agent. Users can ask questions against an ingested knowledge base, upload documents, and receive auto-generated PPT presentations as structured output. The pipeline integrates LangChain for retrieval, LLM/VLM for content generation, and a modular orchestration layer for workflow control. The entire system runs in a private repository environment, designed for educational use cases where data privacy matters.",
          zh: "搭建了本地化部署的私有 RAG 教育类 Agent。用户可以基于已摄入的知识库进行问答，上传文档后自动生成结构化的 PPT 演示文稿。管线整合了 LangChain 进行检索、LLM/VLM 进行内容生成，以及模块化编排层进行工作流控制。整套系统运行在私有化仓库环境中，面向对数据隐私有要求的教育场景。",
        },
      },
      {
        date: { en: "2026.04 - Present", zh: "2026.04 - 至今" },
        title: { en: "Project 2 — Portfolio Website: AI-Assisted Web Coding", zh: "项目二 — 简历作品集网站：AI 辅助 Web 开发" },
        body: {
          en: "Designed and delivered this portfolio website end-to-end using an AI-assisted development workflow. Acting as architect, I defined the visual identity, information hierarchy, interactive sticker-map navigation, and bilingual content strategy. Claude Code and Cursor handled implementation under my direction — I focused on architecture decisions, design refinement, and targeted code-level adjustments where the AI needed guidance. The result is a fully responsive, bilingual React site that reflects both my engineering taste and hands-on proficiency with modern AI development tooling.",
          zh: "使用 AI 辅助开发工作流，从零设计并交付了这份简历作品集网站。我作为架构师，定义了视觉风格、信息层级、贴纸地图交互导航和中英双语内容策略。Claude Code 和 Cursor 在我的指导下完成工程实现——我专注于架构决策、设计调优，以及在 AI 需要引导时进行针对性的代码级调整。最终交付了一个全响应式、双语的 React 网站，既体现了我的工程品味，也展示了我在现代 AI 开发工具上的实操能力。",
        },
      },
      {
        date: { en: "2025.09 - 2025.12", zh: "2025.09 - 2025.12" },
        title: { en: "Project 3 — AIoT Smart Bathroom: LLM-Driven Environmental Control", zh: "项目三 — AIoT 智能浴室：大模型驱动的环境调控" },
        body: {
          en: "Built an AIoT smart bathroom system on the STM32 platform, integrating a sensor array — temperature/humidity, PIR human presence, infrared, CO2, PM2.5, and water leakage sensors — for real-time environmental perception. All sensor data streams to a cloud backend and a custom-built web dashboard for live visualization and historical trend charting.\n\nThe core differentiator: an LLM decision layer that makes this more than a rule engine. Rather than hard-coding if-else thresholds, the LLM interprets multi-sensor context holistically — it understands that 'high temperature + high humidity + human present' means a different action than 'high temperature + empty room'. It can reason across time-series patterns ('CO2 has been climbing for 20 minutes despite ventilation') and generate natural-language explanations for every automated action.\n\nWhen the LLM detects anomaly patterns — e.g. temperature exceeding a user-adaptive comfort threshold combined with rising humidity — it autonomously triggers coordinated responses: activating exhaust fans, adjusting water valves, or sending alerts. Users can also converse with the system in plain language ('Is the bathroom comfortable right now?' / 'Why did the fan just turn on?'), and the LLM provides contextual answers grounded in real-time sensor data. The model is the reasoning brain — sensors are its senses.",
          zh: "基于 STM32 平台搭建了 AIoT 智能浴室系统，集成传感器阵列——温湿度、人体红外、CO2、PM2.5、漏水检测等——进行实时环境感知。所有传感器数据上传至云后端，并在自建 Web 可视化仪表盘上实时展示和历史趋势绘图。\n\n核心差异化：LLM 决策层让这套系统远不止是一个规则引擎。不同于硬编码的 if-else 阈值判断，大模型从整体上解读多传感器上下文——它理解「高温+高湿+有人」和「高温+空房间」意味着完全不同的应对策略。它能跨时间序列模式进行推理（「尽管开着通风，CO2 已经持续上升了 20 分钟」），并为每一次自动操作生成自然语言解释。\n\n当 LLM 检测到异常模式——例如温度超过用户自适应舒适阈值且湿度同步攀升——它自主触发协调响应：启动排风扇、调节水阀、或发送预警通知。用户也可以用自然语言与系统对话（「现在浴室舒服吗？」/「风扇为什么刚刚开了？」），LLM 基于实时传感器数据给出有上下文依据的回答。模型是推理大脑——传感器是它的感官。",
        },
      },
      {
        date: { en: "2026.05 - 2026.07", zh: "2026.05 - 2026.07" },
        title: { en: "SENGITAL | Industry AI Agent Development Intern", zh: "SENGITAL | 行业 AI Agent 开发实习生" },
        body: {
          en: "Developed industry-specific AI Agents on the poffices.AI platform. Built custom Blocks for modular functionality, configured node-based workflow logic, embedded Python scripts for business rules, and supported online performance optimization and debugging.",
          zh: "在 poffices.AI 平台上开发面向行业的 AI Agent。构建自定义 Blocks 实现模块化功能，配置节点式工作流逻辑，嵌入 Python 脚本处理业务规则，并支持线上性能优化与调试。",
        },
      },
      {
        date: { en: "2025.11 - 2026.06", zh: "2025.11 - 2026.06" },
        title: { en: "CUHK | Multimodal Agent R&D (Supervisor-Led)", zh: "港中文 | 多模态 Agent 研发（导师课题）" },
        body: {
          en: "Led architecture work under faculty supervision on multimodal Agent systems integrating LLM, VLM, YOLO, and OpenCV for perception, LangChain RAG for knowledge retrieval, and Ray for distributed task scheduling. Delivered image generation and PPT generation Agents as composable pipeline modules.",
          zh: "在导师指导下主导多模态 Agent 系统架构研发，整合 LLM、VLM、YOLO、OpenCV 进行感知，LangChain RAG 进行知识检索，Ray 进行分布式任务调度。交付了图像生成和 PPT 生成 Agent，作为可组合的管线模块。",
        },
      },
    ],
    skills: ["MCP", "LangChain", "RAG", "LLM", "VLM", "YOLO", "Ray", "Claude Code", "Cursor", "STM32", "IoT", "MQTT", "Python", "React", "TypeScript"],
    diagram: {
      en: ["Sensors & IoT", "Cloud Data Pipeline", "LLM Reasoning", "Automated Action", "Natural Language UI"],
      zh: ["传感器 & IoT", "云端数据管线", "大模型推理", "自动执行", "自然语言交互"],
    },
    media: [
      { en: "Education Agent — Q&A interface screenshot", zh: "教育 Agent — 问答界面截图" },
      { en: "Smart bathroom — dashboard & sensor data view", zh: "智能浴室 — 仪表盘与传感器数据视图" },
      { en: "Smart bathroom — LLM conversation interface", zh: "智能浴室 — LLM 对话交互界面" },
    ],
    agentsSections: [
      {
        period: "2026.03 - Present",
        role: "AI Agent Developer",
        title: "Education Agent — RAG + Document-to-PPT Pipeline",
        body: "Built a locally deployed, private RAG-based Education Agent. Users query an ingested knowledge base, upload documents, and receive auto-generated structured PPT presentations. The pipeline integrates LangChain for retrieval and LLM/VLM for content generation, running entirely in a private repository for data-sensitive educational use cases.",
        bullets: [
          "LangChain RAG pipeline with local knowledge base ingestion and semantic retrieval",
          "LLM/VLM-powered document-to-PPT generation as structured output",
          "Modular orchestration layer for flexible workflow control",
          "Privately deployed — designed for education scenarios where data privacy matters",
        ],
        mediaType: "image",
        mediaSrc: "/assets/agent-local.png",
        mediaLabel: "RAG knowledge base Q&A interface",
        mediaType2: "image",
        mediaLabel2: "Document-to-PPT generation output",
      },
      {
        period: "2025.11 - Present",
        role: "Agent Architect & Full-Stack Developer",
        title: "AI-Assisted Development & Industry Agent Practice",
        body: "End-to-end AI-assisted development spanning Agent architecture design, full-stack delivery, and industry platform deployment. Built this portfolio website using Claude Code and Cursor under my architectural direction — defining visual identity, sticker-map navigation, and bilingual content strategy while the AI handled implementation. Applied MCP (Model Context Protocol) to build custom servers connecting LLMs to external tools, APIs, and data sources for tool-augmented workflows. On the industry side, developed AI Agents on the poffices.AI platform — building custom Blocks, configuring node-based workflow logic, and embedding Python scripts for business rules with online optimization.",
        bullets: [
          "MCP (Model Context Protocol) — custom MCP servers connecting LLMs to external tools & APIs",
          "AI-assisted full-stack delivery: Claude Code + Cursor → React/TypeScript production apps",
          "poffices.AI platform: custom Blocks, node-based workflows, Python business logic scripts",
          "Composable Agent skills: tool-use pipelines, image generation, PPT generation, web deployment",
          "Architecture ownership: design decisions, component structure, code-level refinement across projects",
        ],
        mediaType: "image",
        mediaSrc: "/assets/stickers/agents.png",
        mediaLabel: "Agent architecture — MCP + tool-use workflow",
        mediaType2: "image",
        mediaSrc2: "/assets/agent-poffices.png",
        mediaLabel2: "poffices.AI — Agent Blocks & workflow",
      },
      {
        period: "2025.09 - 2025.12",
        role: "AIoT System Developer",
        title: "AIoT Smart Bathroom — LLM-Driven Environmental Control",
        body: "Built an STM32-based smart bathroom integrating temperature, humidity, PIR, CO₂, PM2.5, and water leakage sensors. An LLM decision layer interprets multi-sensor context holistically — reasoning across time-series patterns to trigger coordinated responses like exhaust activation, valve adjustment, or alerts. Users converse with the system in natural language, and the LLM provides contextual answers grounded in real-time sensor data.",
        bullets: [
          "STM32 sensor array with cloud backend and real-time web dashboard visualization",
          "LLM reasoning layer replaces hard-coded rules — understands multi-sensor context",
          "Autonomous coordinated responses: exhaust fans, water valves, alert notifications",
          "Natural-language interaction: users ask questions, LLM answers from live sensor data",
        ],
        mediaType: "image",
        mediaLabel: "Sensor data — real-time dashboard",
        mediaType2: "image",
        mediaLabel2: "LLM natural-language conversation UI",
      },
      {
        period: "2025.11 - 2026.06",
        role: "R&D Lead (Supervisor-Led)",
        title: "CUHK — Multimodal Agent R&D",
        body: "Led architecture work on multimodal Agent systems under faculty supervision. Integrated LLM, VLM, YOLO, and OpenCV for perception, LangChain RAG for knowledge retrieval, and Ray for distributed task scheduling. Delivered image generation and PPT generation Agents as composable pipeline modules.",
        bullets: [
          "Integrated LLM + VLM + YOLO + OpenCV for multimodal perception pipeline",
          "LangChain RAG + Ray distributed scheduling for scalable Agent task execution",
          "Composable Agent modules: image generation, PPT generation as pipeline components",
        ],
        mediaType: "image",
        mediaLabel: "Multimodal perception pipeline",
        mediaType2: "image",
        mediaLabel2: "Agent module composition diagram",
      },
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
      en: "From UAV search-and-rescue to industrial process control.",
      zh: "从无人机搜救到工业过程控制。",
    },
    intro: {
      en: "Control theory is where abstract math meets physical motion. My PID work spans simulation-based UAV flight control with dynamic parameter tuning, real industrial hardware regulation, and systematic MATLAB-based controller analysis. Each project below connects the classic PID framework — error, gain, and feedback — with modern tools like YOLO perception, optimization-based auto-tuning, and hardware-in-the-loop validation.",
      zh: "控制理论是抽象数学与物理运动交汇的地方。我的 PID 实践涵盖仿真无人机飞行控制与动态调参、真实工业硬件调控、以及基于 MATLAB 的系统化控制器分析。以下每个项目都将经典 PID 框架——误差、增益和反馈——与 YOLO 感知、优化算法自动调参、硬件在环验证等现代工具相结合。",
    },
    timeline: [
      {
        date: { en: "2025.10 - 2025.12", zh: "2025.10 - 2025.12" },
        title: { en: "Project 1 — UAV Search & Rescue: Adaptive PID + YOLO Detection", zh: "项目一 — 无人机搜救：自适应 PID + YOLO 行人检测" },
        body: {
          en: "Master's group project. Built a quadrotor UAV simulation model in MATLAB/Simulink for search-and-rescue missions. Designed a cascaded PID controller (position → velocity → attitude loops) for stable hover, autonomous takeoff, landing, and waypoint navigation. Integrated radar, IMU, barometer, and GPS sensor models for state estimation. Implemented a Gain Scheduling + PSO (Particle Swarm Optimization) adaptive tuning scheme: PID gains auto-adjust in real-time based on flight phase and wind disturbance conditions — avoiding hard-coded parameters. Additionally, trained a YOLO-based pedestrian detector on a custom aerial-view dataset to identify survivors in the search zone, with detection confidence fed back into the mission planner to trigger loiter-and-report behavior.",
          zh: "硕士课程小组项目。在 MATLAB/Simulink 中搭建了四旋翼无人机仿真模型，面向搜救任务场景。设计了级联 PID 控制器（位置→速度→姿态回路），实现稳定悬停、自主起飞降落和航点导航。集成雷达、IMU、气压计和 GPS 传感器模型进行状态估计。实现了增益调度 + PSO（粒子群优化）自适应调参方案：PID 增益根据飞行阶段和风扰条件实时自动调整——而非硬编码参数。此外，基于自定义航拍视角数据集训练了 YOLO 行人检测器，识别搜救区域中的幸存者，检测置信度反馈至任务规划器以触发悬停报告行为。",
        },
      },
      {
        date: { en: "2025.03 - 2025.06", zh: "2025.03 - 2025.06" },
        title: { en: "Project 2 — Industrial Process Control: Water Tank & Boiler Regulation", zh: "项目二 — 工业过程控制：水箱液位与锅炉温度调控" },
        body: {
          en: "Hands-on industrial control lab. Operated PID controllers on physical water tank and boiler systems with real sensors and actuators. Conducted system identification via step-response testing to derive plant transfer functions. Applied Ziegler-Nichols tuning rules to obtain initial PID parameters, then refined gains through iterative closed-loop testing. Compared P, PI, and PID control modes, analyzing steady-state error, overshoot, settling time, and disturbance rejection performance. Documented the full control engineering workflow from modeling to validation.",
          zh: "工业控制实验室实操。在真实水箱液位和锅炉温度系统上操作 PID 控制器，使用真实传感器和执行器。通过阶跃响应测试进行系统辨识，推导被控对象传递函数。应用 Ziegler-Nichols 整定法则获取初始 PID 参数，再通过迭代闭环测试优化增益。对比 P、PI、PID 三种控制模式的稳态误差、超调量、调节时间和抗扰性能。完整记录了从建模到验证的控制工程流程。",
        },
      },
      {
        date: { en: "2024.09 - 2025.01", zh: "2024.09 - 2025.01" },
        title: { en: "Project 3 — MATLAB PID Simulation & Transfer Function Analysis", zh: "项目三 — MATLAB PID 仿真与传递函数分析" },
        body: {
          en: "Systematic controller design and analysis in MATLAB. Modeled various dynamic systems (first-order, second-order, time-delay) using transfer functions and state-space representations. Performed open-loop analysis (root locus, Bode plots, Nyquist diagrams) to assess stability margins, then designed PID compensators to meet target specifications. Conducted closed-loop step-response simulations, comparing Ziegler-Nichols, Cohen-Coon, and optimization-based tuning methods. Visualized the effect of each gain term (Kp, Ki, Kd) on rise time, overshoot, steady-state error, and oscillation damping.",
          zh: "在 MATLAB 中进行系统化控制器设计与分析。使用传递函数和状态空间表示对各种动态系统（一阶、二阶、时滞）建模。进行开环分析（根轨迹、Bode 图、Nyquist 图）评估稳定裕度，然后设计 PID 补偿器以满足目标性能指标。进行闭环阶跃响应仿真，比较 Ziegler-Nichols、Cohen-Coon 和基于优化的整定方法。可视化每个增益项（Kp、Ki、Kd）对上升时间、超调量、稳态误差和振荡阻尼的影响。",
        },
      },
    ],
    skills: ["PID Control", "MATLAB/Simulink", "YOLO", "PSO Optimization", "Gain Scheduling", "System Identification", "Ziegler-Nichols", "Transfer Functions"],
    diagram: {
      en: ["Reference Trajectory", "PID Controller", "Actuator / Plant", "Sensor Feedback", "Adaptive Tuning Layer"],
      zh: ["参考轨迹", "PID 控制器", "执行器 / 被控对象", "传感器反馈", "自适应调参层"],
    },
    media: [
      { en: "UAV search-and-rescue simulation screenshot", zh: "无人机搜救仿真截图" },
      { en: "Water tank / boiler control lab photo", zh: "水箱锅炉控制实验照片" },
      { en: "MATLAB PID analysis — Bode / step response", zh: "MATLAB PID 分析 — Bode 图/阶跃响应" },
    ],
    pidSections: [
      {
        period: "2025.10 - 2025.12",
        role: "Master's Group Project",
        title: "UAV Search & Rescue — Adaptive PID + YOLO Detection",
        body: "Built a quadrotor UAV simulation in MATLAB/Simulink for search-and-rescue missions. Designed a cascaded PID controller (position → velocity → attitude loops) for stable hover, autonomous takeoff/landing, and waypoint navigation. Integrated Gain Scheduling + PSO adaptive tuning so PID gains auto-adjust based on flight phase and wind conditions. Trained a YOLO pedestrian detector on aerial-view data to identify survivors and trigger loiter-and-report behavior.",
        bullets: [
          "Cascaded PID: position → velocity → attitude loops in MATLAB/Simulink",
          "Gain Scheduling + PSO adaptive tuning — gains adjust in real-time to flight phase & wind",
          "Integrated radar, IMU, barometer, GPS sensor models for state estimation",
          "YOLO-based pedestrian detection on custom aerial dataset → mission planner feedback",
        ],
        mediaType: "video",
        mediaSrc: "/assets/drone-pid.mp4",
        mediaLabel: "UAV flight control — Simulink simulation",
        mediaType2: "video",
        mediaSrc2: "/assets/drone-pid.mp4",
        mediaLabel2: "YOLO pedestrian detection — aerial view",
      },
      {
        period: "2025.03 - 2025.06",
        role: "Industrial Control Lab",
        title: "Industrial Process Control — Water Tank & Boiler Regulation",
        body: "Hands-on PID control on physical water tank and boiler systems with real sensors and actuators. Performed system identification via step-response testing, applied Ziegler-Nichols tuning rules, and refined gains through iterative closed-loop testing. Compared P, PI, and PID modes on steady-state error, overshoot, settling time, and disturbance rejection.",
        bullets: [
          "Physical water tank & boiler systems with real sensors and actuators",
          "System identification via step-response → plant transfer functions",
          "Ziegler-Nichols tuning + iterative closed-loop gain refinement",
          "Compared P / PI / PID: steady-state error, overshoot, settling time, disturbance rejection",
        ],
        mediaType: "image",
        mediaSrc: "/assets/pid-watertank.png",
        mediaLabel: "Water tank / boiler PID control setup",
      },
      {
        period: "2024.09 - 2025.01",
        role: "Course Project",
        title: "MATLAB PID Simulation & Transfer Function Analysis",
        body: "Systematic controller design in MATLAB. Modeled dynamic systems (first-order, second-order, time-delay) using transfer functions and state-space. Performed open-loop analysis (root locus, Bode, Nyquist) for stability margins, then designed PID compensators to meet target specs. Compared Ziegler-Nichols, Cohen-Coon, and optimization-based tuning, visualizing each gain term's effect on response.",
        bullets: [
          "Transfer function & state-space modeling for 1st/2nd-order + time-delay systems",
          "Open-loop analysis: root locus, Bode plots, Nyquist diagrams for stability margins",
          "PID compensator design comparing Ziegler-Nichols, Cohen-Coon, optimization-based tuning",
          "Visualized Kp/Ki/Kd effects on rise time, overshoot, steady-state error, oscillation damping",
        ],
        mediaType: "image",
        mediaSrc: "/assets/pid-matlab.png",
        mediaLabel: "MATLAB PID — Bode & step response analysis",
      },
    ],
    accent: "coral",
  },
  {
    slug: "coding",
    label: { en: "Coding", zh: "编程开发" },
    short: {
      en: "Web full-stack, C, Python, Arduino, WeChat Mini Programs.",
      zh: "Web 全栈、C、Python、Arduino、微信小程序。",
    },
    title: { en: "Coding & Web Development", zh: "编程与 Web 开发" },
    subtitle: {
      en: "From frontend UI to backend logic — full-stack projects powered by AI-assisted development.",
      zh: "从前端界面到后端逻辑——AI 辅助开发驱动的全栈项目实践。",
    },
    intro: {
      en: "I build things that work end-to-end, from browser to server. My coding experience spans modern web full-stack development (React, TypeScript, Node.js), C-language desktop applications, Python automation, Arduino embedded control, and WeChat Mini Program development. This portfolio website you are browsing right now is a web coding project — designed, architected, and shipped with AI-assisted tooling as a fully responsive bilingual React application.\n\nEach project below is a complete vertical slice: interface → logic → data → deployment.",
      zh: "我构建从浏览器到服务端的端到端应用。编程经历覆盖现代 Web 全栈开发（React、TypeScript、Node.js）、C 语言桌面应用、Python 自动化、Arduino 嵌入式控制以及微信小程序开发。你正在浏览的这个作品集网站本身就是一个 Web 编码项目——以 AI 辅助工具设计、架构并交付的全响应式双语 React 应用。\n\n以下每个项目都是完整的垂直切片：界面 → 逻辑 → 数据 → 部署。",
    },
    timeline: [
      {
        date: { en: "Credential", zh: "资质认证" },
        title: { en: "National Computer Rank Examination — Python Level 2", zh: "全国计算机等级考试 — Python 二级" },
        body: {
          en: "Certified Python proficiency through China's national computer ranking examination, covering fundamental syntax, data structures, file I/O, and standard library usage.",
          zh: "通过全国计算机等级考试 Python 二级认证，覆盖基础语法、数据结构、文件操作与标准库应用。",
        },
      },
      {
        date: { en: "2023", zh: "2023" },
        title: { en: "Project 1 — Supermarket Management System (C Language)", zh: "项目一 — 小超市管理系统（C 语言）" },
        body: {
          en: "Built a full-featured supermarket management desktop application in C with a visual GUI. The system supports user registration and login, product browsing by category, shopping cart add/remove/modify, checkout with total calculation, and purchase history tracking. Designed modular data structures for users, products, and orders, with file-based persistence between sessions.",
          zh: "用 C 语言开发了功能完善的超市管理桌面应用，带有可视化图形界面。系统支持用户注册与登录、按分类浏览商品、购物车增删改、结算并计算总价、以及购买历史查询。设计了用户、商品和订单的模块化数据结构，通过文件持久化保存会话间数据。",
        },
      },
      {
        date: { en: "2023 - 2024", zh: "2023 - 2024" },
        title: { en: "Project 2 — Arduino Smart Car System", zh: "项目二 — Arduino 智能小车系统" },
        body: {
          en: "Developed an embedded smart car platform using Arduino as the main controller. Integrated ultrasonic sensors for obstacle avoidance, infrared sensors for line tracking, and DC motor drivers for differential steering control. Wrote low-level control code in C for sensor polling, motor PWM regulation, and real-time decision logic. The modular hardware-software architecture allows plug-and-play sensor swapping for different navigation modes.",
          zh: "以 Arduino 为主控开发了嵌入式智能小车平台。集成超声波传感器进行避障、红外传感器进行循迹、直流电机驱动实现差速转向控制。用 C 编写底层控制代码，实现传感器轮询、电机 PWM 调速和实时决策逻辑。模块化的软硬件架构支持即插即用式传感器替换，适配不同导航模式。",
        },
      },
      {
        date: { en: "2024", zh: "2024" },
        title: { en: "Project 3 — WeChat Mini Program + Smart Car Cloud Control", zh: "项目三 — 微信小程序 + 智能小车云端控制" },
        body: {
          en: "Built a WeChat Mini Program as the remote control interface for the Arduino smart car. The mini program connects to a cloud backend via MQTT protocol, sending motion commands (forward, backward, left, right, stop) that are relayed to the car in real time. Also supports cloud data logging — sensor readings and command history are stored and displayed in-app. This project bridged embedded hardware, IoT communication, and mobile frontend development into one integrated system.",
          zh: "开发了微信小程序作为 Arduino 智能小车的远程控制界面。小程序通过 MQTT 协议连接云后端，下发运动指令（前进、后退、左转、右转、停止）并实时中继到小车。同时支持云端数据记录——传感器读数和指令历史在应用内存储与展示。这个项目将嵌入式硬件、物联网通信和移动前端开发打通为一体化系统。",
        },
      },
    ],
    skills: ["React", "TypeScript", "Node.js", "C", "Python", "Arduino", "WeChat Mini Program", "MQTT", "IoT", "Full-Stack"],
    diagram: {
      en: ["Frontend UI", "API / Backend", "Database / State", "Hardware / Sensors", "Deploy & Ship"],
      zh: ["前端界面", "API / 后端", "数据库 / 状态", "硬件 / 传感器", "部署上线"],
    },
    media: [
      { en: "Portfolio website screenshot", zh: "作品集网站截图" },
      { en: "Smart car hardware photo", zh: "智能小车硬件照片" },
      { en: "Mini program remote control screenshot", zh: "小程序远程控制截图" },
    ],
    codingSections: [
      {
        period: "2026.04 - Present",
        role: "Full-Stack Developer & Architect",
        title: "Portfolio Website — AI-Assisted Web Coding",
        body: "Designed, architected, and shipped this fully responsive bilingual portfolio site using React, TypeScript, and CSS. The site features an interactive sticker-map navigation system, dynamic language switching, and a paper-texture tactile design language. Built with AI-assisted development tooling (Claude Code, Cursor) under my architectural direction — I focused on design decisions, component structure, and code-level refinement.",
        bullets: [
          "React + TypeScript single-page application with client-side routing",
          "Fully bilingual (EN/ZH) content system with dynamic language switching",
          "Responsive CSS layout adapting from desktop to mobile with sticker-map interaction",
          "Paper-grain tactile visual identity with custom CSS variable-driven theming",
          "AI-assisted development workflow: architecture design → AI implementation → manual refinement",
        ],
        mediaType: "image",
        mediaSrc: "/assets/stickers/coding.png",
        mediaLabel: "Portfolio website — sticker map",
      },
      {
        period: "2025 - 2026",
        role: "Full-Stack Developer",
        title: "Full-Stack Web Applications — Frontend + Backend Projects",
        body: "Built multiple full-stack web applications spanning React/TypeScript frontends, Node.js backend APIs, and database integrations. Projects include data visualization dashboards, content management systems, and real-time monitoring interfaces — each designed and delivered end-to-end from UI to deployment.",
        bullets: [
          "React + TypeScript frontend with component-driven architecture and responsive design",
          "Node.js RESTful API backends with Express, handling auth, data validation, and business logic",
          "Real-time data dashboards with WebSocket connections and chart visualizations",
          "Database design and integration (MySQL, file-based storage) for persistent data layers",
          "Independent project ownership from requirements to deployment",
        ],
        mediaType: "image",
        mediaSrc: "/assets/stickers/withai.png",
        mediaLabel: "AI-assisted full-stack development",
      },
      {
        period: "2024",
        role: "Full-Stack + IoT Developer",
        title: "WeChat Mini Program + Smart Car Cloud Control",
        body: "Built a WeChat Mini Program as the remote control interface for an Arduino smart car, bridging mobile frontend, cloud backend, and embedded hardware into one integrated system. The mini program sends real-time motion commands via MQTT protocol and displays historical sensor data.",
        bullets: [
          "WeChat Mini Program frontend with WXML/WXSS for mobile remote control UI",
          "Cloud backend with MQTT protocol bridging mobile commands to embedded hardware",
          "Real-time bidirectional communication: commands down, sensor telemetry up",
          "Cloud data logging with in-app historical visualization",
        ],
        mediaType: "image",
        mediaLabel: "Mini program remote control interface screenshot",
      },
      {
        period: "2023",
        role: "Desktop Application Developer",
        title: "Supermarket Management System — C Language GUI App",
        body: "Developed a full-featured desktop management application in C with a visual GUI, supporting user auth, product catalog browsing, shopping cart operations, and checkout. Modular data structures with file-based persistence for cross-session reliability.",
        bullets: [
          "C language with visual GUI framework for desktop application development",
          "Modular data architecture: user, product, order data structures",
          "Shopping cart with full CRUD operations and checkout flow",
          "File-based data persistence for session-to-session continuity",
        ],
        mediaType: "image",
        mediaLabel: "Supermarket system GUI screenshot",
      },
    ],
    accent: "lavender",
  },
  {
    slug: "life-hobbies",
    label: { en: "Life & Hobbies", zh: "生活与兴趣" },
    short: {
      en: "Guitar, bass, travel, photography, badminton & tennis.",
      zh: "吉他、贝斯、旅行、摄影、羽毛球和网球。",
    },
    title: { en: "Life & Hobbies", zh: "生活与兴趣" },
    subtitle: {
      en: "The things that keep me curious outside the lab.",
      zh: "实验室之外，让我保持好奇心的那些事。",
    },
    intro: {
      en: "Engineering takes focus — but the best ideas often come when you step away from the screen. Music, travel, and sports give me rhythm, perspective, and a reset button. Here is a glimpse of what I do when I am not building robots or debugging Agent pipelines.",
      zh: "工程需要专注——但最好的灵感往往来自离开屏幕的时刻。音乐、旅行和运动给了我节奏感、视野和重置的按钮。以下是我不在搭机器人或调试 Agent 管线时的一些生活碎片。",
    },
    timeline: [
      {
        date: { en: "4 Years & Counting", zh: "四年多" },
        title: { en: "Guitar & Bass — Playing Music", zh: "吉他 & 贝斯 — 弹琴玩音乐" },
        body: {
          en: "I have been playing guitar for about four years, and picked up bass along the way. I enjoy fingerstyle guitar, strumming through pop and folk songs, and occasionally singing along. Music is my go-to way to unwind — whether it is learning a new piece or just jamming with friends.",
          zh: "弹了四年左右的吉他，中途也摸了贝斯。喜欢指弹、弹唱流行和民谣，偶尔自弹自唱。音乐是我放空的方式——不管是练一首新曲子还是跟朋友即兴合奏。",
        },
      },
      {
        date: { en: "Ongoing", zh: "持续进行" },
        title: { en: "Travel & Photography — Chasing Landscapes", zh: "旅行 & 摄影 — 追逐风景" },
        body: {
          en: "I love traveling to places where nature does the talking — mountains, coastlines, open skies. I bring a camera with me whenever I can, capturing landscapes, street scenes, and the little moments that make a place feel real. Photography trains my eye for composition and detail, which quietly feeds back into how I think about design.",
          zh: "喜欢去大自然说话的地方旅行——山川、海岸、开阔的天空。只要有机会就带着相机，拍风景、街景和那些让一个地方变得真实的细小瞬间。摄影训练了我对构图和细节的敏感，也潜移默化地影响着我对设计的感知。",
        },
      },
      {
        date: { en: "Weekly", zh: "每周" },
        title: { en: "Badminton & Tennis — Staying Active", zh: "羽毛球 & 网球 — 保持运动" },
        body: {
          en: "Badminton and tennis are my go-to sports. I play regularly — badminton for the fast-paced reflexes and footwork, tennis for the rhythm of rallying under the sun. Both keep me active and clear-headed, and they are a great excuse to get outside with friends.",
          zh: "羽毛球和网球是我最常玩的运动。羽毛球练反应和步伐，网球享受在阳光下对拉的节奏感。两者都让我保持活力和头脑清醒，也是约朋友出门的好理由。",
        },
      },
    ],
    skills: ["Guitar", "Bass", "Photography", "Travel", "Badminton", "Tennis", "Music"],
    diagram: {
      en: ["Music", "Travel", "Photography", "Sports", "Create"],
      zh: ["音乐", "旅行", "摄影", "运动", "创造"],
    },
    media: [
      { en: "Guitar / bass playing video", zh: "吉他/贝斯弹奏视频" },
      { en: "Travel & landscape photography", zh: "旅行风景摄影" },
      { en: "Badminton / tennis moment", zh: "羽毛球/网球瞬间" },
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
  { slug: "reading", to: "honors", image: "reading.png", label: { en: "Education Notes", zh: "教育笔记" } },
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

  const isSelfIntro = page.slug === "self-introduction";
  const isHonors = page.slug === "honors";
  const isRobotics = page.slug === "robotics";
  const isCoding = page.slug === "coding";
  const isAgents = page.slug === "agents";
  const isPid = page.slug === "pid-control";

  return (
    <main
      className={`detail-page paper-grain accent-${page.accent} ${page.slug}-page ${isSelfIntro ? "self-intro-page" : ""} ${
        isRobotics ? "robotics-page" : ""
      } ${isAgents ? "agents-page" : ""} ${isHonors ? "honors-page" : ""} ${isCoding ? "coding-page" : ""} ${isPid ? "pid-control-page" : ""}`}
    >
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

        {isSelfIntro ? (
          <SelfIntroGallery photos={page.photos ?? []} />
        ) : !isHonors && !isRobotics && !isCoding && !isAgents && !isPid ? (
          <MediaShowcase page={page} lang={lang} />
        ) : null}
      </section>

      {isHonors ? (
        <AwardsSkillsSection awards={page.awards} skills={page.detailedSkills} lang={lang} />
      ) : isSelfIntro ? (
        <EducationSection education={page.education ?? []} lang={lang} />
      ) : isRobotics ? (
        <RoboticsExperienceSection sections={page.roboticsSections ?? []} />
      ) : isCoding ? (
        <CodingExperienceSection sections={page.codingSections ?? []} />
      ) : isPid ? (
        <PidExperienceSection sections={page.pidSections ?? []} />
      ) : isAgents ? (
        <AgentExperienceSection sections={page.agentsSections ?? []} />
      ) : (
        <section className="detail-grid">
          <Timeline page={page} lang={lang} />
          <Diagram page={page} lang={lang} />
        </section>
      )}
    </main>
  );
}

function SelfIntroGallery({ photos }: { photos: string[] }) {
  return (
    <aside className="self-sticker-gallery" aria-label="Graduation sticker collage">
      {photos.map((photo, index) => (
        <figure className="self-sticker-card" key={photo}>
          <img src={photo} alt={`Graduation sticker ${index + 1}`} />
        </figure>
      ))}
    </aside>
  );
}

function EducationSection({ education, lang }: { education: NonNullable<DetailPage["education"]>; lang: Lang }) {
  const labels: Record<Lang, { research: string; courses: string; record: string }> = {
    en: { research: "Research Field", courses: "Core Courses", record: "Academic Record" },
    zh: { research: "研究方向", courses: "核心课程", record: "学业成绩" },
  };
  const t = labels[lang];

  return (
    <section className="education-section" aria-label="Education background">
      {education.map((item) => (
        <article className="education-card" key={item.school}>
          <div className="edu-logo-badge">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" title={`Visit ${item.school} official website`}>
                <img src={item.logo} alt={`${item.school} logo`} />
              </a>
            ) : (
              <img src={item.logo} alt={`${item.school} logo`} />
            )}
          </div>
          <div className="education-heading">
            <p>{item.period}</p>
            <h2>{item.school}</h2>
            <h3>
              {item.degree} · {item.major}
            </h3>
          </div>
          <dl>
            <div>
              <dt>{t.research}</dt>
              <dd>{item.research}</dd>
            </div>
            <div>
              <dt>{t.courses}</dt>
              <dd>{item.courses.join(" / ")}</dd>
            </div>
            <div>
              <dt>{t.record}</dt>
              <dd>{item.gpa}</dd>
            </div>
          </dl>
        </article>
      ))}
    </section>
  );
}

function RoboticsExperienceSection({ sections }: { sections: NonNullable<DetailPage["roboticsSections"]> }) {
  return (
    <section className="robotics-experience-section" aria-label="Robotics experience">
      {sections.map((item, index) => (
        <article className="robotics-experience-card" key={`${item.period}-${item.title}`}>
          <div className="robotics-experience-copy">
            <p className="robotics-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title}</h2>
            <h3>{item.role}</h3>
            <p>{item.body}</p>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          {item.mediaType2 ? (
            <div className="robotics-media-grid">
              <MediaSlot prefix="robotics" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
              <MediaSlot prefix="robotics" mediaType={item.mediaType2 ?? "image"} mediaSrc={item.mediaSrc2} mediaLabel={item.mediaLabel2 ?? ""} />
            </div>
          ) : (
            <MediaSlot prefix="robotics" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
          )}
        </article>
      ))}
    </section>
  );
}

function MediaSlot({
  prefix,
  mediaType,
  mediaSrc,
  mediaLabel,
}: {
  prefix: string;
  mediaType: "video" | "image";
  mediaSrc?: string;
  mediaLabel: string;
}) {
  return (
    <div className={`${prefix}-media-slot ${prefix}-media-${mediaType}`}>
      {mediaSrc ? (
        mediaType === "video" ? (
          <video src={mediaSrc} controls muted loop playsInline preload="metadata" />
        ) : (
          <img src={mediaSrc} alt={mediaLabel} />
        )
      ) : (
        <>
          {mediaType === "video" && <div className={`${prefix}-play-mark`} aria-hidden="true" />}
          <span>{mediaLabel}</span>
        </>
      )}
    </div>
  );
}

function AgentExperienceSection({ sections }: { sections: NonNullable<DetailPage["agentsSections"]> }) {
  return (
    <section className="agents-experience-section" aria-label="AI Agent projects">
      {sections.map((item, index) => (
        <article className="agents-experience-card" key={`${item.period}-${item.title}`}>
          <div className="agents-experience-copy">
            <p className="agents-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title}</h2>
            <h3>{item.role}</h3>
            <p>{item.body}</p>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          {item.mediaType2 ? (
            <div className="agents-media-grid">
              <MediaSlot prefix="agents" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
              <MediaSlot prefix="agents" mediaType={item.mediaType2 ?? "image"} mediaSrc={item.mediaSrc2} mediaLabel={item.mediaLabel2 ?? ""} />
            </div>
          ) : (
            <MediaSlot prefix="agents" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
          )}
        </article>
      ))}
    </section>
  );
}

function PidExperienceSection({ sections }: { sections: NonNullable<DetailPage["pidSections"]> }) {
  return (
    <section className="pid-experience-section" aria-label="PID control projects">
      {sections.map((item, index) => (
        <article className="pid-experience-card" key={`${item.period}-${item.title}`}>
          <div className="pid-experience-copy">
            <p className="pid-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title}</h2>
            <h3>{item.role}</h3>
            <p>{item.body}</p>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          {item.mediaType2 ? (
            <div className="pid-media-grid">
              <MediaSlot prefix="pid" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
              <MediaSlot prefix="pid" mediaType={item.mediaType2 ?? "image"} mediaSrc={item.mediaSrc2} mediaLabel={item.mediaLabel2 ?? ""} />
            </div>
          ) : (
            <MediaSlot prefix="pid" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
          )}
        </article>
      ))}
    </section>
  );
}

function CodingExperienceSection({ sections }: { sections: NonNullable<DetailPage["codingSections"]> }) {
  return (
    <section className="coding-experience-section" aria-label="Coding projects">
      {sections.map((item, index) => (
        <article className="coding-experience-card" key={`${item.period}-${item.title}`}>
          <div className="coding-experience-copy">
            <p className="coding-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title}</h2>
            <h3>{item.role}</h3>
            <p>{item.body}</p>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          {item.mediaType2 ? (
            <div className="coding-media-grid">
              <MediaSlot prefix="coding" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
              <MediaSlot prefix="coding" mediaType={item.mediaType2 ?? "image"} mediaSrc={item.mediaSrc2} mediaLabel={item.mediaLabel2 ?? ""} />
            </div>
          ) : (
            <MediaSlot prefix="coding" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
          )}
        </article>
      ))}
    </section>
  );
}

function AwardsSkillsSection({
  awards,
  skills,
  lang,
}: {
  awards?: DetailPage["awards"];
  skills?: DetailPage["detailedSkills"];
  lang: Lang;
}) {
  const sectionTitles: Record<Lang, { awards: string; skills: string }> = {
    en: { awards: "Honors & Awards", skills: "Technical Skills" },
    zh: { awards: "获奖荣誉", skills: "相关技能" },
  };
  const t = sectionTitles[lang];

  return (
    <section className="awards-skills-section" aria-label="Awards and skills">
      <div className="education-notes-hero">
        <div>
          <p>Education Notes</p>
          <h2>Awards, honors, and technical toolkit</h2>
        </div>
        <img src="/assets/stickers/reading.png" alt="" />
      </div>

      {awards && awards.length > 0 && (
        <div className="awards-block">
          <h2 className="as-section-title">{t.awards}</h2>
          <div className="awards-grid">
            {awards.map((group) => (
              <article className="award-card" key={group.category.en}>
                <span className="award-icon">{group.icon}</span>
                <h3>{group.category[lang]}</h3>
                <ul>
                  {group.items[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="skills-block">
          <h2 className="as-section-title">{t.skills}</h2>
          <div className="skills-grid">
            {skills.map((sk) => (
              <div className="skill-card" key={sk.category.en}>
                <span className="skill-icon">{sk.icon}</span>
                <h3>{sk.category[lang]}</h3>
                <p>{sk.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
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
