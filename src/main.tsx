import React, { useEffect, useMemo, useRef, useState } from "react";
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

const appBase = import.meta.env.BASE_URL;
const routerBasename = appBase === "/" ? undefined : appBase.replace(/\/$/, "");

function publicAsset(path?: string) {
  if (!path) {
    return undefined;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${appBase}${path.replace(/^\/+/, "")}`;
}

const selfIntroAudioSrc: Record<Lang, string> = {
  en: new URL("../photo_video/英文自我介绍.m4a", import.meta.url).href,
  zh: new URL("../photo_video/中文自我介绍.m4a", import.meta.url).href,
};

const hobbyHeroPhotos = [
  "/assets/stickers/life-cutouts/life-1.png",
  "/assets/stickers/life-cutouts/life-19.png",
  "/assets/stickers/life-cutouts/life-13.png",
  "/assets/stickers/life-cutouts/life-16.png",
];

const hobbyFairySrc = "/assets/stickers/infj-cutout.png";

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
    role: Record<Lang, string>;
    title: Record<Lang, string>;
    body: Record<Lang, string>;
    bullets: Record<Lang, string[]>;
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  codingSections?: Array<{
    period: string;
    role: Record<Lang, string>;
    title: Record<Lang, string>;
    body: Record<Lang, string>;
    bullets: Record<Lang, string[]>;
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  agentsSections?: Array<{
    period: string;
    role: Record<Lang, string>;
    title: Record<Lang, string>;
    body: Record<Lang, string>;
    bullets: Record<Lang, string[]>;
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  pidSections?: Array<{
    period: string;
    role: Record<Lang, string>;
    title: Record<Lang, string>;
    body: Record<Lang, string>;
    bullets: Record<Lang, string[]>;
    mediaType: "video" | "image";
    mediaSrc?: string;
    mediaLabel: string;
    mediaType2?: "video" | "image";
    mediaSrc2?: string;
    mediaLabel2?: string;
  }>;
  hobbySections?: Array<{
    period: string;
    role: Record<Lang, string>;
    title: Record<Lang, string>;
    body: Record<Lang, string>;
    bullets: Record<Lang, string[]>;
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
    items: Record<Lang, string[]>;
  }>;
  education?: Array<{
    school: Record<Lang, string>;
    degree: Record<Lang, string>;
    major: Record<Lang, string>;
    logo: string;
    url?: string;
    period: string;
    research: Record<Lang, string>;
    courses: Record<Lang, string[]>;
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
      "/assets/stickers/grad-cutouts/grad-3.png",
      "/assets/stickers/grad-cutouts/grad-4.png",
      "/assets/stickers/grad-cutouts/grad-5.png",
    ],
    education: [
      {
        school: { en: "The Chinese University of Hong Kong", zh: "香港中文大学" },
        degree: { en: "Master", zh: "硕士" },
        major: { en: "Mechanical and Automation Engineering", zh: "机械与自动化工程" },
        logo: "/assets/self-introduction/cuhk-logo.png",
        url: "https://www.cuhk.edu.hk",
        period: "2025.09 - 2026.10",
        research: {
          en: "AI Agent R&D for image generation and PPT generation under an AI Agent field supervisor.",
          zh: "在 AI Agent 领域导师指导下，从事图像生成与 PPT 生成的 AI Agent 研发。",
        },
        courses: {
          en: ["Computer Vision", "Control and Industrial Automation", "Computer-Aided Design and Manufacturing", "Advanced Robotics"],
          zh: ["计算机视觉", "控制与工业自动化", "计算机辅助设计与制造", "高级机器人学"],
        },
        gpa: "GPA: In progress",
      },
      {
        school: { en: "Beijing University of Chemical Technology", zh: "北京化工大学" },
        degree: { en: "Bachelor", zh: "学士" },
        major: { en: "Automation", zh: "自动化" },
        logo: "/assets/self-introduction/buct-logo.png",
        url: "https://www.buct.edu.cn",
        period: "2021.09 - 2025.06",
        research: {
          en: "Automation, robot control, AI applications, and intelligent mobile robot systems.",
          zh: "自动化、机器人控制、人工智能应用与智能移动机器人系统。",
        },
        courses: {
          en: ["Automatic Control Theory", "Artificial Intelligence Application", "Robotics Engineering", "Circuit Theory", "Python/C Programming"],
          zh: ["自动控制原理", "人工智能应用", "机器人工程学", "电路原理", "Python/C 程序设计"],
        },
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
        category: { en: "AI-Assisted Web Coding", zh: "AI 辅助 Web 开发" },
        icon: "🤖",
        items: {
          en: [
            "AI coding agents: Claude Code, Cursor, Codex, Hermes Agent",
            "Prompt engineering for precise, reliable LLM-guided code generation",
            "Rapid prototyping & architecture design with AI-assisted workflows",
            "Quick adaptation to emerging Agent tooling & integration into dev pipelines",
          ],
          zh: [
            "AI 编码 Agent：Claude Code、Cursor、Codex、Hermes Agent",
            "Prompt Engineering：精准引导大模型生成可靠代码",
            "AI 辅助工作流：快速原型设计与架构规划",
            "快速适应最新 Agent 工具并整合到开发管线",
          ],
        },
      },
      {
        category: { en: "Programming & Algorithms", zh: "编程与算法开发" },
        icon: "💻",
        items: {
          en: [
            "C & Python: proficient in algorithm development and system programming",
            "MATLAB: system simulation, modeling, and data analysis",
            "Reinforcement learning: PPO, SAC, DDPG algorithm implementation & tuning",
            "Optimization: genetic algorithms, Bayesian methods for parameter search",
          ],
          zh: [
            "C 与 Python：精通算法开发与系统编程",
            "MATLAB：系统仿真、建模与数据分析",
            "强化学习：PPO、SAC、DDPG 算法实现与调优",
            "优化方法：遗传算法、贝叶斯优化用于参数搜索",
          ],
        },
      },
      {
        category: { en: "Simulation & Engineering", zh: "仿真与工程引擎" },
        icon: "🔧",
        items: {
          en: [
            "MuJoCo, Isaac Gym, Sim-MuJoCo: physics simulation & environment setup",
            "ROS 2: hardware-software communication, node coordination",
            "Simulation debugging, model validation & performance tuning",
          ],
          zh: [
            "MuJoCo、Isaac Gym、Sim-MuJoCo：物理仿真引擎与环境搭建",
            "ROS 2：机器人操作系统软硬件通信与节点协调",
            "仿真调试、模型验证与性能调优",
          ],
        },
      },
      {
        category: { en: "Design & Modeling", zh: "设计与建模软件" },
        icon: "🎨",
        items: {
          en: [
            "CAD & SolidWorks: mechanical structure design & 3D modeling",
            "Model format conversion & cross-platform system integration",
            "3D printing: lightweight structure design & fabrication workflows",
          ],
          zh: [
            "CAD 与 SolidWorks：机械结构设计与三维建模",
            "模型格式转换与跨平台系统集成",
            "3D 打印：轻量化结构设计与制造流程",
          ],
        },
      },
      {
        category: { en: "OS & Tools", zh: "操作系统与工具" },
        icon: "🖥️",
        items: {
          en: [
            "Linux/Ubuntu: system operations, environment configuration & shell scripting",
            "WeChat Mini Program: WXML/WXSS frontend + cloud backend development",
            "MQTT protocol: IoT communication & real-time data streaming",
            "OpenCV: computer vision, image processing & object detection",
          ],
          zh: [
            "Linux/Ubuntu：系统操作、环境配置与 Shell 脚本",
            "微信小程序：WXML/WXSS 前端 + 云后端开发",
            "MQTT 协议：物联网通信与实时数据传输",
            "OpenCV：计算机视觉、图像处理与目标检测",
          ],
        },
      },
      {
        category: { en: "Languages", zh: "语言能力" },
        icon: "🗣️",
        items: {
          en: [
            "CET-4 & CET-6: certified English proficiency",
            "IELTS 6.5: academic English — reading, writing, listening & speaking",
            "Technical English: fluent in reading papers, writing documentation & communication",
          ],
          zh: [
            "大学英语四、六级：英语能力认证",
            "雅思 6.5：学术英语——听说读写",
            "技术英语：流畅阅读论文、撰写文档与交流",
          ],
        },
      },
    ],
  },
  {
    slug: "robotics",
    label: { en: "Robotics", zh: "机器人控制" },
    short: {
      en: "Humanoid model replacement, serpentine PPO gait optimization, dexterous hand ROS integration.",
      zh: "人形模型替换与MPC/WBC适配、蛇形机器人PPO步态优化、灵巧手ROS接口打通。",
    },
    title: {
      en: "Robotics Control & Simulation",
      zh: "机器人控制与仿真",
    },
    subtitle: {
      en: "Hierarchical control, reinforcement learning, and coordinated whole-body motion.",
      zh: "分层控制、强化学习与整机运动协调。",
    },
    intro: {
      en: "My robotics work centers on physics simulation and control adaptation: replacing humanoid models in MuJoCo/OpenLoong, training serpentine robot gait parameters with PPO, and integrating a 12-DoF dexterous hand into an existing RC-MC-MuJoCo ROS simulation stack.",
      zh: "我的机器人项目集中在物理仿真与控制适配：基于 OpenLoong 完成人形机器人 MuJoCo 模型替换与 MPC/WBC 参数整定，基于 PPO 优化蛇形机器人非结构化地形步态，并将灵犀 12 自由度灵巧手接入公司存量 RC-MC-MuJoCo 三层 ROS 仿真链路。",
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
    skills: ["ROS", "MuJoCo", "Isaac Gym", "Isaac Lab", "PPO", "AMP", "MPC", "WBC", "OpenLoong"],
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
        role: { en: "CAS | Research Assistant", zh: "中国科学院 | 科研助理" },
        title: { en: "OpenLoong Humanoid Model Replacement — MPC + WBC", zh: "OpenLoong 双足人形机器人模型替换与控制适配" },
        body: { en: "Reproduced the OpenLoong humanoid control project on Linux and used its MuJoCo walking demo as the baseline. Configured the CMake build directory, generated project build files, compiled the control demo, and launched the MuJoCo walking example to verify that the MPC+WBC closed-loop pipeline ran end-to-end. Replaced the original Qinglong model with a lab-developed biped by importing SolidWorks-derived mass, inertia, geometry, joint torque limits, collision, friction, and damping parameters. Updated the kinematic Jacobian and joint mappings for the new structure, then retuned MPC/ZMP balance weights, torso reference pose, WBC task priorities, joint stiffness, damping, and contact parameters to compensate for the shifted center of mass and recover stable closed-loop walking.", zh: "基于 Linux 与 MuJoCo 复现上海 OpenLoong 青龙双足开源工程，通过 CMake 配置 build 目录、生成工程构建文件、编译控制 demo，并启动 MuJoCo 行走示例，跑通原生 MPC 上层轨迹规划 + WBC 底层全身力矩分配的稳定闭环行走基线。随后将青龙模型替换为实验室自研双足机型，依据 SolidWorks 导出的尺寸、质量、惯性矩阵、关节力矩上限等参数更新 MuJoCo XML，并同步适配新机型雅克比矩阵与关节映射。针对新旧模型重心偏移，微调 MPC 的 ZMP 稳定项、躯干参考姿态，以及 WBC 任务优先级、关节刚度/阻尼和足底接触参数，最终实现自研机型在仿真中稳定闭环行走。" },
        bullets: {
          en: ["Local reproduction: used CMake to configure/build OpenLoong demos on Linux, then ran the MuJoCo MPC+WBC walking baseline", "Model replacement: updated XML dynamics, collision geometry, friction, damping, joint limits, and Jacobian mappings", "Control adaptation: retuned MPC ZMP weights/reference pose and WBC balance priority, stiffness, damping, and contact settings", "Real-time simulation tuning: aligned MuJoCo step size with MPC solve period and separated simulation/control process priorities"],
          zh: ["本地复现：在 Linux 通过 CMake 配置 build、编译 OpenLoong demo，并跑通 MuJoCo 中 MPC+WBC 行走基线", "模型替换：更新 XML 动力学、碰撞几何、摩擦/阻尼、关节约束与新机型雅克比映射", "控制适配：调整 MPC 的 ZMP 权重/躯干参考姿态，以及 WBC 平衡任务优先级、刚度和阻尼", "仿真调参：对齐 MuJoCo 动力学步长与 MPC 求解周期，区分仿真进程和控制进程调度优先级"],
        },
        mediaType: "image",
        mediaSrc: "/assets/cas-openloong-original.png",
        mediaLabel: "Fig. 1 — Original OpenLoong humanoid robot model in Isaac Gym simulation",
        mediaType2: "image",
        mediaSrc2: "/assets/cas-model-replaced.png",
        mediaLabel2: "Fig. 2 — Custom model replacement for MPC/WBC walking control",
      },
      {
        period: "2024.11 - 2025.05",
        role: { en: "Graduation Project | Project Lead", zh: "毕业设计 | 项目负责人" },
        title: { en: "Serpentine Robot — MuJoCo + PPO Adaptive Gait Optimization", zh: "蛇形机器人非结构化地形自适应步态优化（MuJoCo + PPO）" },
        body: { en: "Built a MuJoCo training environment for a SolidWorks-designed serpentine robot, including XML dynamics, inertia, friction, collision constraints, transmission damping, and three unstructured terrains: rolling hills, obstacle forests, and rocky uneven ground. Used a low-dimensional 3D continuous action space for sinusoidal gait parameters — amplitude, angular frequency, and inter-joint phase difference — and mapped each PPO action to all joint targets through a traveling-wave gait equation. Added collision-force and ray-casting virtual ultrasonic sensing, then trained with Stable Baselines3 PPO using rewards for forward speed, stability, and collision avoidance.", zh: "基于 SolidWorks 完成蛇形机器人建模并转换为 MuJoCo XML，配置串联关节惯性、摩擦、碰撞约束与传动阻尼；独立搭建山地起伏、森林障碍、碎石凹凸三类非结构化地形。训练侧采用参数化步态降维，PPO 只输出正弦行波步态的 3 个连续变量：振幅 A、角频率 ω、相邻关节相位差 φ，再映射生成全身关节目标角。感知侧实现头部接触力阈值惩罚与 mj_ray 虚拟超声波测距两套方案，结合前进速度、姿态稳定和碰撞惩罚奖励函数，在 Stable Baselines3 中训练出适配复杂地形的稳定爬行步态。" },
        bullets: {
          en: ["Simulation setup: SolidWorks-to-MuJoCo XML model plus hills, obstacle forest, and rocky terrain scenes", "Perception options: head contact-force threshold via data.cfrc_ext and multi-direction mj_ray virtual ultrasonic sensing", "Action design: 3D continuous gait parameters A, omega, and phase difference mapped to all joints", "Training system: Stable Baselines3 PPO with comparisons against A2C, DDPG, and TD3 plus reward/speed/loss monitoring"],
          zh: ["仿真搭建：SolidWorks 模型转 MuJoCo XML，并构建山地、森林障碍、碎石地面场景", "感知方案：基于 data.cfrc_ext 的头部接触力阈值，以及 mj_ray 多向虚拟超声波测距", "动作设计：3 维连续步态参数 A、ω、φ，经正弦行波公式映射到全部关节", "训练体系：基于 Stable Baselines3 训练 PPO，并横向对比 A2C、DDPG、TD3，监控奖励/速度/loss 曲线"],
        },
        mediaType: "video",
        mediaSrc: "/assets/serpentine-crawl.mp4",
        mediaLabel: "Fig. 1 — Serpentine robot crawling at fixed 1.5× wavelength on structured ground",
        mediaType2: "video",
        mediaSrc2: "/assets/serpentine-obstacle.mp4",
        mediaLabel2: "Fig. 2 — Autonomous obstacle avoidance on unstructured terrain",
      },
      {
        period: "2025.09 - 2025.12",
        role: { en: "Agibot | Algorithm Simulation Intern", zh: "智元机器人 | 算法仿真实习生" },
        title: { en: "Agibot Lingxi 12-DoF Dexterous Hand — ROS Interface Integration", zh: "智元灵犀 12 自由度灵巧手仿真接口接入与维护" },
        body: { en: "Extended Agibot's existing RC-MC-MuJoCo Linux simulation stack to support the Lingxi dexterous hand. Added bidirectional ROS Pub/Sub logic across RC-MC and MC-MuJoCo links, including Xbox gesture mappings, 12-dimensional hand joint target arrays, joint-state/force feedback, collision states, and safety checks for grasp limits and penetration. Adapted the MuJoCo XML dynamics model with one actively driven palm-root control joint and coupled passive finger joints; all active/passive joints are counted in the single-hand 12-DoF model. Also reproduced a humanoid soccer goalkeeper paper based on AMP, replaced the baseline humanoid with Lingxi XR, and supported Isaac Gym to Isaac Lab migration analysis.", zh: "在公司已有 RC 外设采集、MC 运动控制中间件、MuJoCo 仿真引擎三层 Linux 进程架构上，完成灵犀单只 12 自由度灵巧手接入。扩展 RC↔MC、MC↔MuJoCo 两组双向 ROS Pub/Sub 逻辑：手柄组合按键映射手势，MC 下发机身+手部一体化控制消息，新增 12 维手指关节目标位移数组，并回传手指接触力、碰撞状态和关节反馈；同时对齐消息结构、物理单位、发布频率、queue_size、时间戳与异常保护逻辑。MuJoCo 侧完成灵巧手 XML 动力学适配：手掌根部总控关节主动驱动，其余手指关节从动耦合但同样计入自由度，单手合计 12 自由度，并调试握拳、松开、比耶、比心等拟人手势与整机行走/踢球联动。同步复现港大人形足球守门论文的 AMP 训练流程，替换为灵犀 XR 整机，并参与 Isaac Gym 向 Isaac Lab 的迁移接口梳理。" },
        bullets: {
          en: ["ROS interface alignment: message schema, joint ordering, radians/Newtons units, timestamps, queue sizes, and exception handling", "12-DoF hand dynamics: active palm-root control plus linearly coupled passive finger joints counted as independent DoFs", "Communication debugging: downsampled/filtered joystick input, enlarged queues, isolated CPU cores, and dropped stale commands to reduce packet loss", "Humanoid soccer work: reproduced AMP baseline, replaced the full robot model with Lingxi XR, and mapped observations/actions for Isaac Gym to Isaac Lab migration"],
          zh: ["ROS 接口对齐：统一消息结构、关节顺序、弧度/牛顿单位、时间戳、队列缓存与异常保护规则", "12 自由度动力学：主动手掌根关节 + 线性耦合从动手指关节，主动/从动关节均计入自由度", "通信优化：手柄信号降采样滤波、扩容队列、CPU 核心隔离、过滤过期指令，降低高频丢包和卡顿", "足球仿真迁移：复现 AMP 基线，替换为灵犀 XR 整机，梳理 Isaac Gym 到 Isaac Lab 的观测/动作接口差异"],
        },
        mediaType: "image",
        mediaSrc: "/assets/agibot-motion-control.jpg",
        mediaLabel: "Fig. 1 — Agibot humanoid robot motion control simulation",
        mediaType2: "image",
        mediaSrc2: "/assets/agibot-dexterous-hand.png",
        mediaLabel2: "Fig. 2 — Dexterous hand simulation model in Sim-MuJoCo",
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
      en: "My Agent work spans four directions: building multimodal RAG pipelines that turn documents into structured outputs, embedding LLM reasoning into physical IoT systems for autonomous control, designing composable Agent architectures with MCP (Model Context Protocol) for tool-augmented workflows — connecting LLMs to external APIs, data sources, and real-world actions, and AI-Agent evaluation & test engineering — sample governance, confusion-matrix model evaluation, and automated testing that safeguard delivery quality. This portfolio website is itself a product of AI-assisted development using Claude Code and Cursor under my architectural direction.\n\nBelow are the key projects and experiences that define how I think about and build with AI Agents — including a playful Electron desktop pet of my own cat.",
      zh: "我的 Agent 实践分为四个方向：一是构建多模态 RAG 管线，将文档转化为结构化输出；二是将大模型推理嵌入物理 IoT 系统，实现自主环境调控；三是设计可组合的 Agent 架构，通过 MCP（Model Context Protocol）连接 LLM 与外部工具、API 和数据源，实现工具增强工作流；四是 AI-Agent 评测与测试工程——样本治理、混淆矩阵模型评测与自动化测试，保障版本交付质量。你现在看到的这个作品集网站本身就是在我的架构指导下，使用 Claude Code 和 Cursor 进行 AI 辅助开发的产物。\n\n以下是我在 AI Agent 方向的核心项目与实践经历——包括一只用 Electron 从零打造的自家小猫桌宠。",
    },
    timeline: [
      {
        date: { en: "2025.11 - 2025.12", zh: "2025.11 - 2025.12" },
        title: { en: "Project 1 — Transformer-Based Tiny GPT", zh: "项目一 — 基于 Transformer 搭建的小型 GPT" },
        body: {
          en: "Built a small GPT project from scratch to understand the full path from data preparation to training and deployment. The project uses Hugging Face Datasets to prepare a training corpus, implements a BPE tokenizer, and trains a PyTorch decoder-only TinyGPT for next-token prediction. The training workflow includes loss tracking, checkpoint saving, and resume training. A FastAPI backend and Web Demo connect the trained model to an interactive browser interface for prompt input, generation controls, model information, loss curves, and simple short-term memory.",
          zh: "从零实现了一个小型 GPT 项目，用来理解模型从数据准备、训练到部署演示的完整流程。项目接入 Hugging Face Datasets 处理语料，实现 BPE tokenizer，并用 PyTorch 手写 decoder-only TinyGPT 完成 next-token prediction。训练流程包含 loss 记录、checkpoint 保存和断点续训。最后通过 FastAPI 后端和 Web Demo 将训练好的模型接入浏览器界面，支持 prompt 输入、生成参数调节、模型信息查看、loss 曲线展示和简单短期记忆。",
        },
      },
      {
        date: { en: "2025.11 - 2026.06", zh: "2025.11 - 2026.06" },
        title: { en: "Project 2 — Education Agent: RAG + Document-to-PPT Pipeline", zh: "项目二 — 教育类 Agent：RAG + 文档转 PPT 管线" },
        body: {
          en: "Built a locally deployed, private RAG-based Education Agent. Users can ask questions against an ingested knowledge base, upload documents, and receive auto-generated PPT presentations as structured output. The pipeline integrates LangChain for retrieval, LLM/VLM for content generation, and a modular orchestration layer for workflow control. The entire system runs in a private repository environment, designed for educational use cases where data privacy matters.",
          zh: "搭建了本地化部署的私有 RAG 教育类 Agent。用户可以基于已摄入的知识库进行问答，上传文档后自动生成结构化的 PPT 演示文稿。管线整合了 LangChain 进行检索、LLM/VLM 进行内容生成，以及模块化编排层进行工作流控制。整套系统运行在私有化仓库环境中，面向对数据隐私有要求的教育场景。",
        },
      },
      {
        date: { en: "2026.05 - 2026.06", zh: "2026.05 - 2026.06" },
        title: { en: "Project 3 — Portfolio Website: AI-Assisted Web Coding", zh: "项目三 — 简历作品集网站：AI 辅助 Web 开发" },
        body: {
          en: "Designed and delivered this portfolio website end-to-end using an AI-assisted development workflow. Acting as architect, I defined the visual identity, information hierarchy, interactive sticker-map navigation, and bilingual content strategy. Claude Code and Cursor handled implementation under my direction — I focused on architecture decisions, design refinement, and targeted code-level adjustments where the AI needed guidance. The result is a fully responsive, bilingual React site that reflects both my engineering taste and hands-on proficiency with modern AI development tooling.",
          zh: "使用 AI 辅助开发工作流，从零设计并交付了这份简历作品集网站。我作为架构师，定义了视觉风格、信息层级、贴纸地图交互导航和中英双语内容策略。Claude Code 和 Cursor 在我的指导下完成工程实现——我专注于架构决策、设计调优，以及在 AI 需要引导时进行针对性的代码级调整。最终交付了一个全响应式、双语的 React 网站，既体现了我的工程品味，也展示了我在现代 AI 开发工具上的实操能力。",
        },
      },
      {
        date: { en: "2026.02 - 2026.04", zh: "2026.02 - 2026.04" },
        title: { en: "Project 4 — AIoT Smart Bathroom: LLM-Driven Environmental Control", zh: "项目四 — AIoT 智能浴室：大模型驱动的环境调控" },
        body: {
          en: "Built an AIoT smart bathroom system on the ESP32 platform, integrating a sensor array — temperature/humidity, PIR human presence, infrared, CO2, PM2.5, and water leakage sensors — for real-time environmental perception. All sensor data streams to a cloud backend and a custom-built web dashboard for live visualization and historical trend charting.\n\nThe core differentiator: an LLM decision layer that makes this more than a rule engine. Rather than hard-coding if-else thresholds, the LLM interprets multi-sensor context holistically — it understands that 'high temperature + high humidity + human present' means a different action than 'high temperature + empty room'. It can reason across time-series patterns ('CO2 has been climbing for 20 minutes despite ventilation') and generate natural-language explanations for every automated action.\n\nWhen the LLM detects anomaly patterns — e.g. temperature exceeding a user-adaptive comfort threshold combined with rising humidity — it autonomously triggers coordinated responses: activating exhaust fans, adjusting water valves, or sending alerts. Users can also converse with the system in plain language ('Is the bathroom comfortable right now?' / 'Why did the fan just turn on?'), and the LLM provides contextual answers grounded in real-time sensor data. The model is the reasoning brain — sensors are its senses.",
          zh: "基于 ESP32 平台搭建了 AIoT 智能浴室系统，集成传感器阵列——温湿度、人体红外、CO2、PM2.5、漏水检测等——进行实时环境感知。所有传感器数据上传至云后端，并在自建 Web 可视化仪表盘上实时展示和历史趋势绘图。\n\n核心差异化：LLM 决策层让这套系统远不止是一个规则引擎。不同于硬编码的 if-else 阈值判断，大模型从整体上解读多传感器上下文——它理解「高温+高湿+有人」和「高温+空房间」意味着完全不同的应对策略。它能跨时间序列模式进行推理（「尽管开着通风，CO2 已经持续上升了 20 分钟」），并为每一次自动操作生成自然语言解释。\n\n当 LLM 检测到异常模式——例如温度超过用户自适应舒适阈值且湿度同步攀升——它自主触发协调响应：启动排风扇、调节水阀、或发送预警通知。用户也可以用自然语言与系统对话（「现在浴室舒服吗？」/「风扇为什么刚刚开了？」），LLM 基于实时传感器数据给出有上下文依据的回答。模型是推理大脑——传感器是它的感官。",
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
    skills: ["MCP", "LangChain", "RAG", "LLM", "VLM", "YOLO", "Ray", "Transformer", "TinyGPT", "BPE Tokenizer", "Self-Attention", "PyTorch", "Hugging Face", "FastAPI", "AI Evaluation", "Confusion Matrix", "Test Automation", "Claude Code", "Cursor", "ESP32", "IoT", "MQTT", "Python", "React", "TypeScript", "Electron", "Node.js"],
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
        period: "2026.05 - 2026.07",
        role: { en: "Industry AI Agent Developer", zh: "行业 AI Agent 开发工程师" },
        title: { en: "SENGITAL — Industry AI Agent Development Intern", zh: "SENGITAL — 行业 AI Agent 开发实习" },
        body: { en: "Developed industry-specific Agents on poffices.AI, contributing to visual workflow orchestration, modular feature packaging and agile low-code application delivery. Built custom Blocks and configured node-based logic for business scenarios, improving workflow reuse and scenario-specific processing efficiency. Embedded Python scripts for complex business logic, and supported scenario adaptation plus online performance optimization for scalable AI Agent deployment.", zh: "在 poffices.AI 平台上开发面向行业的 AI Agent，参与可视化工作流编排、模块化功能封装与敏捷低代码应用交付。构建自定义 Blocks 并配置面向业务场景的节点式逻辑，提升工作流复用性与场景化处理效率。嵌入 Python 脚本实现复杂业务逻辑，支持场景适配与线上性能优化。" },
        bullets: {
          en: ["Developed industry Agents on poffices.AI — visual workflow orchestration & low-code delivery", "Built custom Blocks & node-based logic for business scenarios, improving workflow reuse", "Embedded Python scripts for complex business rules with scenario adaptation", "Online performance optimization for scalable AI Agent deployment"],
          zh: ["在 poffices.AI 平台开发行业 Agent — 可视化工作流编排与低代码交付", "构建自定义 Blocks 与节点式业务逻辑，提升工作流复用效率", "嵌入 Python 脚本处理复杂业务规则，支持场景适配", "线上性能优化，实现可扩展的 AI Agent 部署"],
        },
        mediaType: "image",
        mediaSrc: "/assets/agent-poffices-workflow.png",
        mediaLabel: "Fig. 1 — poffices.AI visual workflow orchestration: Agent pipeline design",
        mediaType2: "image",
        mediaSrc2: "/assets/agent-poffices-deploy.png",
        mediaLabel2: "Fig. 2 — Agent deployment interface: modular Blocks & node-based logic",
      },
      {
        period: "2025.11 - 2026.06",
        role: { en: "AI Agent Developer", zh: "AI Agent 开发工程师" },
        title: { en: "Education Agent — RAG + Document-to-PPT Pipeline", zh: "教育类 Agent — RAG + 文档转 PPT 管线" },
        body: { en: "Built a locally deployed, private RAG-based Education Agent. Users query an ingested knowledge base, upload documents, and receive auto-generated structured PPT presentations. The pipeline integrates LangChain for retrieval and LLM/VLM for content generation, running entirely in a private repository for data-sensitive educational use cases.", zh: "搭建了本地化部署的私有 RAG 教育类 Agent。用户可基于已摄入的知识库进行问答，上传文档后自动生成结构化 PPT 演示文稿。管线整合 LangChain 进行检索、LLM/VLM 进行内容生成，整套系统运行在私有化仓库中，面向对数据隐私有要求的教育场景。" },
        bullets: {
          en: ["LangChain RAG pipeline with local knowledge base ingestion and semantic retrieval", "LLM/VLM-powered document-to-PPT generation as structured output", "Modular orchestration layer for flexible workflow control", "Privately deployed — designed for education scenarios where data privacy matters"],
          zh: ["LangChain RAG 管线：本地知识库摄入与语义检索", "LLM/VLM 驱动的文档转 PPT 结构化输出", "模块化编排层实现灵活工作流控制", "私有化部署 — 面向数据隐私敏感的教育场景"],
        },
        mediaType: "image",
        mediaSrc: "/assets/agent-qa-local.png",
        mediaLabel: "Fig. 1 — Local RAG-based knowledge base Q&A: LangChain retrieval + LLM/VLM generation",
        mediaType2: "image",
        mediaSrc2: "/assets/agent-ppt-local.png",
        mediaLabel2: "Fig. 2 — Auto-generated structured PPT from uploaded documents via LLM/VLM pipeline",
      },
      {
        period: "2026.08 - 2026.10",
        role: { en: "Yuanbao Shuke | AI Evaluation Engineer (Test Development)", zh: "元保数科 | AI 评测工程师（测试开发方向）" },
        title: { en: "Insurance Customer-Service AI-Agent — Evaluation & Test Engineering", zh: "保险客服 AI-Agent — 评测与测试工程" },
        body: { en: "Served as an AI Evaluation Engineer (test-development track) at Yuanbao Shuke, owning evaluation and quality assurance across the insurance customer-service AI-Agent delivery lifecycle: from business/product alignment, sample governance, and dataset construction, to model performance evaluation, automated interface & regression testing, and internal efficiency tooling — covering the full data-model-inference chain.", zh: "在元保数科担任 AI 评测工程师（测试开发方向），面向保险客服 AI-Agent 的版本交付全流程负责评测与质量保障：从业务/产品对接、样本治理与数据集建设，到模型效果评测、自动化接口与回归测试，再到效能工具开发，覆盖「数据—模型—推理链路」全链路的测试与评估工作。" },
        bullets: {
          en: ["Aligned with business & product teams on insurance customer-service AI-Agent sample governance — owning end-to-end data pipeline control and building high-quality training & evaluation datasets", "Designed model input/output specifications; evaluated model effectiveness via confusion-matrix analysis, delivering evaluation conclusions that drove model iteration", "Wrote automation scripts for interface and regression testing covering both business logic and model inference paths, safeguarding AI-Agent release quality", "Contributed to internal efficiency tooling; implemented full-chain scenario-based AI-Agent testing, boosting overall team productivity"],
          zh: ["对接业务与产品完成保险客服 AI-Agent 样本治理工作，统筹数据全流程管控，构建高质量训练与评测数据集", "设计模型入参出参规范，依托混淆矩阵开展模型效果评估，输出评测结论，驱动模型迭代优化", "编写自动化脚本完成接口及回归测试，覆盖业务与模型推理链路，保障 AI-Agent 版本交付质量", "参与内部效能提效工具开发，落地 AI-Agent 全链路场景化测试，提升团队整体作业效率"],
        },
        mediaType: "image",
        mediaSrc: undefined,
        mediaLabel: "",
      },
      {
        period: "2026.07 - 2026.08",
        role: { en: "Personal Project | Built from Scratch", zh: "个人项目 | 从零搭建" },
        title: { en: "PawPause — Turning My Cat into an Electron Desktop Pet", zh: "PawPause 桌宠 — 把我家小猫做成桌面宠物" },
        body: { en: "Built \"PawPause\" from scratch with Electron — a Windows desktop pet of my own cat. A transparent, frameless, always-on-top kitten lives on the desktop: breathing and blinking when idle, reacting randomly to quick taps (offering a paw or dozing off), meowing on its own every dozen-or-so seconds when bored, and popping a \"Zzz\" bubble when asleep. Hold and drag to carry it anywhere on screen. Also implemented a system tray menu (hide/show, reset to corner, launch at startup, quit), single-instance locking, and portable packaging via electron-builder, iterating versions 0.1.0 → 0.3.3. I even wrote a QA capture harness that drives each state machine through pre-wired test hooks and captures frame-by-frame screenshots for regression verification — applying my day-job test-engineering habits to my own project.", zh: "从零用 Electron 把我家小猫做成了一只 Windows 桌宠「PawPause」。桌面上住着一只透明无边框、永远置顶的小猫：待机时会呼吸、眨眼，被轻点会随机反应（伸出爪子或打盹），无聊时每隔十几秒会自发「喵」一声，睡觉时冒出 Zzz 气泡；按住拖拽可以把它拎到屏幕任意位置。配套实现了系统托盘菜单（隐藏/显示、一键归位右下角、开机自启、退出）、单实例锁和 electron-builder 便携版打包，迭代了 0.1.0 → 0.3.3 多个版本。还专门写了一套 QA 自动捕获脚本，通过预埋测试钩子驱动各状态机并逐帧截图回归验证——把平日测试开发的经验用在了自己的项目上。" },
        bullets: {
          en: ["From-scratch Electron app: transparent frameless always-on-top window, hidden from taskbar, resident via tray menu", "Cat state machine: idle breathing/blinking (webp animation), random quick-tap reactions (paw or doze), spontaneous meows when idle, \"Zzz\" sleep bubble", "Interaction design: press-and-drag movement across the screen (pointer-distance threshold separates tap from drag), right-click menu, single-instance lock", "Engineering: electron-builder portable packaging, iterated v0.1.0 → v0.3.3; pre-wired QA hooks drive states and capture screenshots for regression checks"],
          zh: ["从零搭建 Electron 应用：透明无边框置顶窗口、无任务栏图标，配合托盘菜单常驻后台", "猫咪状态机：待机呼吸/眨眼（webp 动画）、轻点随机反应（伸爪/打盹）、无聊时随机喵叫、睡觉 Zzz 气泡", "交互设计：按住拖拽全屏移动（指针位移阈值区分「点击」与「拖拽」）、右键菜单、单实例锁防重复启动", "工程化：electron-builder 便携版打包，0.1.0 → 0.3.3 版本迭代；预埋 QA 测试钩子自动驱动状态并截图回归验证"],
        },
        mediaType: "image",
        mediaSrc: "/assets/cat-pet-idle.gif",
        mediaLabel: "Fig. 1 — Idle animation: breathing & blinking loop",
        mediaType2: "image",
        mediaSrc2: "/assets/cat-pet-concept.jpg",
        mediaLabel2: "Fig. 2 — PawPause concept render",
      },
      {
        period: "2025.11 - 2025.12",
        role: { en: "Transformer Learning Project", zh: "Transformer 学习型项目" },
        title: { en: "Transformer-Based Tiny GPT", zh: "基于 Transformer 搭建的小型 GPT" },
        body: { en: "Built a small GPT project from scratch to understand the full path from data preparation to training and deployment. The project uses Hugging Face Datasets to prepare a training corpus, implements a BPE tokenizer, and trains a PyTorch decoder-only TinyGPT for next-token prediction. The training workflow includes loss tracking, checkpoint saving, and resume training. A FastAPI backend and Web Demo connect the trained model to an interactive browser interface for prompt input, generation controls, model information, loss curves, and simple short-term memory.", zh: "从零实现了一个小型 GPT 项目，用来理解模型从数据准备、训练到部署演示的完整流程。项目接入 Hugging Face Datasets 处理语料，实现 BPE tokenizer，并用 PyTorch 手写 decoder-only TinyGPT 完成 next-token prediction。训练流程包含 loss 记录、checkpoint 保存和断点续训。最后通过 FastAPI 后端和 Web Demo 将训练好的模型接入浏览器界面，支持 prompt 输入、生成参数调节、模型信息查看、loss 曲线展示和简单短期记忆。" },
        bullets: {
          en: ["Prepared the corpus with Hugging Face Datasets, supporting configurable dataset name, split, text column, basic cleaning, and export to corpus.txt", "Implemented BPE tokenization so training and generation share the same learned token-to-id mapping", "Built TinyGPT in PyTorch with token/position embeddings, causal multi-head self-attention, FFN, LayerNorm, residual connections, and stacked Transformer Blocks", "Packaged training with gradient clipping, learning-rate scheduling, train/val loss logging, loss curves, best/latest checkpoints, resume training, and run-level artifact management", "Deployed FastAPI endpoints and a Web Demo for prompt input, generation controls, model status, loss preview, generated output, and API-layer short-term memory"],
          zh: ["使用 Hugging Face Datasets 准备语料，支持配置数据集名称、split、文本列，完成基础清洗并导出 corpus.txt", "实现 BPE tokenization，让训练和生成共用同一套 token-to-id 映射，保证编码一致", "用 PyTorch 手写 TinyGPT：token/position embedding、causal multi-head self-attention、FFN、LayerNorm、残差连接和多层 Transformer Block", "封装训练流程：gradient clipping、learning-rate schedule、train/val loss 记录、loss 曲线、best/latest checkpoint、断点续训和 run 级产物管理", "部署 FastAPI 接口和 Web Demo，支持 prompt 输入、参数调节、模型状态、loss 预览、生成结果展示和 API 层短期记忆"],
        },
        mediaType: "image",
        mediaSrc: "/assets/tinygpt-demo-api.png",
        mediaLabel: "Fig. 1 — TinyGPT Web Demo: local FastAPI generation interface with checkpoint metadata",
        mediaType2: "image",
        mediaSrc2: "/assets/tinygpt-demo-local.png",
        mediaLabel2: "Fig. 2 — TinyGPT Local Demo: prompt controls, generated output, and training loss preview",
      },
      {
        period: "2026.02 - 2026.04",
        role: { en: "AIoT System Developer", zh: "AIoT 系统开发者" },
        title: { en: "AIoT Smart Bathroom — LLM-Driven Environmental Control", zh: "AIoT 智能浴室 — 大模型驱动环境调控" },
        body: { en: "Built an ESP32-based smart bathroom integrating temperature, humidity, PIR, CO₂, PM2.5, and water leakage sensors. An LLM decision layer interprets multi-sensor context holistically — reasoning across time-series patterns to trigger coordinated responses like exhaust activation, valve adjustment, or alerts. Users converse with the system in natural language, and the LLM provides contextual answers grounded in real-time sensor data.", zh: "基于 ESP32 搭建智能浴室系统，集成温湿度、人体红外、CO₂、PM2.5 及漏水检测传感器。LLM 决策层从整体解读多传感器上下文，跨时间序列模式推理，自主触发排风扇、水阀调节或预警通知等协调响应。用户可用自然语言与系统对话，LLM 基于实时传感器数据给出有上下文依据的回答。" },
        bullets: {
          en: ["基于 ESP32 的传感器阵列 + 云后端 + 实时 Web 可视化仪表盘", "LLM 推理层替代硬编码规则 — 理解多传感器上下文语义", "自主协调响应：排风扇控制、水阀调节、预警通知", "自然语言交互：用户提问，LLM 基于实时传感器数据回答"],
          zh: ["基于 ESP32 的传感器阵列 + 云后端 + 实时 Web 可视化仪表盘", "LLM 推理层替代硬编码规则 — 理解多传感器上下文语义", "自主协调响应：排风扇控制、水阀调节、预警通知", "自然语言交互：用户提问，LLM 基于实时传感器数据回答"],
        },
        mediaType: "image",
        mediaSrc: "/assets/aiot-esp32-wiring.png",
        mediaLabel: "Fig. 1 — ESP32 sensor array wiring diagram: temperature, humidity, PIR, CO₂, PM2.5",
        mediaType2: "image",
        mediaSrc2: "/assets/aiot-dashboard.png",
        mediaLabel2: "Fig. 2 — Real-time AIoT dashboard: sensor visualization & LLM decision interface",
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
        date: { en: "2026.02 - 2026.04", zh: "2026.02 - 2026.04" },
        title: { en: "Project 1 — UAV Search & Rescue: Adaptive PID + YOLO Detection", zh: "项目一 — 无人机搜救：自适应 PID + YOLO 行人检测" },
        body: {
          en: "Master's group project. Built a quadrotor UAV simulation model in MATLAB/Simulink for search-and-rescue missions. Designed a cascaded PID controller (position → velocity → attitude loops) for stable hover, autonomous takeoff, landing, and waypoint navigation. Integrated radar, IMU, barometer, and GPS sensor models for state estimation. Implemented a Gain Scheduling + PSO (Particle Swarm Optimization) adaptive tuning scheme: PID gains auto-adjust in real-time based on flight phase and wind disturbance conditions — avoiding hard-coded parameters. Additionally, trained a YOLO-based pedestrian detector on a custom aerial-view dataset to identify survivors in the search zone, with detection confidence fed back into the mission planner to trigger loiter-and-report behavior.",
          zh: "硕士课程小组项目。在 MATLAB/Simulink 中搭建了四旋翼无人机仿真模型，面向搜救任务场景。设计了级联 PID 控制器（位置→速度→姿态回路），实现稳定悬停、自主起飞降落和航点导航。集成雷达、IMU、气压计和 GPS 传感器模型进行状态估计。实现了增益调度 + PSO（粒子群优化）自适应调参方案：PID 增益根据飞行阶段和风扰条件实时自动调整——而非硬编码参数。此外，基于自定义航拍视角数据集训练了 YOLO 行人检测器，识别搜救区域中的幸存者，检测置信度反馈至任务规划器以触发悬停报告行为。",
        },
      },
      {
        date: { en: "2022.03 - 2022.06", zh: "2022.03 - 2022.06" },
        title: { en: "Project 2 — Industrial Process Control: Water Tank & Boiler Regulation", zh: "项目二 — 工业过程控制：水箱液位与锅炉温度调控" },
        body: {
          en: "Hands-on industrial control lab. Operated PID controllers on physical water tank and boiler systems with real sensors and actuators. Conducted system identification via step-response testing to derive plant transfer functions. Applied Ziegler-Nichols tuning rules to obtain initial PID parameters, then refined gains through iterative closed-loop testing. Compared P, PI, and PID control modes, analyzing steady-state error, overshoot, settling time, and disturbance rejection performance. Documented the full control engineering workflow from modeling to validation.",
          zh: "工业控制实验室实操。在真实水箱液位和锅炉温度系统上操作 PID 控制器，使用真实传感器和执行器。通过阶跃响应测试进行系统辨识，推导被控对象传递函数。应用 Ziegler-Nichols 整定法则获取初始 PID 参数，再通过迭代闭环测试优化增益。对比 P、PI、PID 三种控制模式的稳态误差、超调量、调节时间和抗扰性能。完整记录了从建模到验证的控制工程流程。",
        },
      },
      {
        date: { en: "2023.09 - 2023.12", zh: "2023.09 - 2023.12" },
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
        period: "2026.02 - 2026.04",
        role: { en: "Master's Group Project", zh: "硕士课程小组项目" },
        title: { en: "UAV Search & Rescue — Adaptive PID + YOLO Detection", zh: "无人机搜救 — 自适应 PID + YOLO 行人检测" },
        body: { en: "Built a quadrotor UAV simulation in MuJoCo on Ubuntu for search-and-rescue missions. Designed a cascaded PID controller (position → velocity → attitude loops) for stable hover, autonomous takeoff/landing, and waypoint navigation. Integrated Gain Scheduling + PSO adaptive tuning so PID gains auto-adjust based on flight phase and wind conditions. Trained a YOLO pedestrian detector on aerial-view data to identify survivors and trigger loiter-and-report behavior.", zh: "在 Ubuntu 系统中基于 MuJoCo 搭建四旋翼无人机仿真模型，面向搜救任务。设计级联 PID 控制器（位置→速度→姿态回路），实现稳定悬停、自主起降和航点导航。集成增益调度 + PSO 自适应调参，PID 增益根据飞行阶段与风扰实时自动调整。基于航拍数据训练 YOLO 行人检测器，识别幸存者并触发悬停报告行为。" },
        bullets: {
          en: ["Cascaded PID: position → velocity → attitude loops in MuJoCo on Ubuntu", "Gain Scheduling + PSO adaptive tuning — gains adjust in real-time to flight phase & wind", "Integrated radar, IMU, barometer, GPS sensor models for state estimation", "YOLO-based pedestrian detection on custom aerial dataset → mission planner feedback"],
          zh: ["级联 PID：位置→速度→姿态回路，Ubuntu + MuJoCo 实现", "增益调度 + PSO 自适应调参——增益根据飞行阶段与风扰实时调整", "集成雷达、IMU、气压计、GPS 传感器模型进行状态估计", "基于自定义航拍数据集训练 YOLO 行人检测，反馈至任务规划器"],
        },
        mediaType: "video",
        mediaSrc: "/assets/drone-search-rescue.mp4",
        mediaLabel: "Fig. 1 — UAV autonomous search-and-rescue flight simulation in MATLAB/Simulink",
        mediaType2: "image",
        mediaSrc2: "/assets/drone-path-planning.png",
        mediaLabel2: "Fig. 2 — UAV path planning: waypoint navigation & autonomous trajectory generation",
      },
      {
        period: "2022.03 - 2022.06",
        role: { en: "Industrial Control Lab", zh: "工业控制实验室" },
        title: { en: "Industrial Process Control — Water Tank & Boiler Regulation", zh: "工业过程控制 — 水箱液位与锅炉温度调控" },
        body: { en: "Hands-on PID control on physical water tank and boiler systems with real sensors and actuators. Performed system identification via step-response testing, applied Ziegler-Nichols tuning rules, and refined gains through iterative closed-loop testing. Compared P, PI, and PID modes on steady-state error, overshoot, settling time, and disturbance rejection.", zh: "在真实水箱液位和锅炉温度系统上操作 PID 控制器，使用真实传感器和执行器。通过阶跃响应测试进行系统辨识，应用 Ziegler-Nichols 整定法则获取初始 PID 参数，再通过迭代闭环测试优化增益。对比 P、PI、PID 三种控制模式的稳态误差、超调量、调节时间和抗扰性能。" },
        bullets: {
          en: ["Physical water tank & boiler systems with real sensors and actuators", "System identification via step-response → plant transfer functions", "Ziegler-Nichols tuning + iterative closed-loop gain refinement", "Compared P / PI / PID: steady-state error, overshoot, settling time, disturbance rejection"],
          zh: ["真实水箱与锅炉系统，使用传感器和执行器实物", "通过阶跃响应进行系统辨识，推导被控对象传递函数", "Ziegler-Nichols 整定 + 迭代闭环增益优化", "对比 P/PI/PID：稳态误差、超调量、调节时间、抗扰性能"],
        },
        mediaType: "image",
        mediaSrc: "/assets/pid-liquid-temp.png",
        mediaLabel: "Fig. 1 — PID-controlled liquid level & water temperature simulation",
        mediaType2: "image",
        mediaSrc2: "/assets/pid-oscillation.png",
        mediaLabel2: "Fig. 2 — PID parameter oscillation analysis: system response under gain variation",
      },
      {
        period: "2023.09 - 2023.12",
        role: { en: "Course Project", zh: "课程项目" },
        title: { en: "MATLAB PID Simulation & Transfer Function Analysis", zh: "MATLAB PID 仿真与传递函数分析" },
        body: { en: "Built closed-loop control systems in MATLAB/Simulink by extending PID blocks and custom transfer function modules. Designed single-loop and multi-loop feedback architectures by writing system equations — constructing cascaded control paths, adding feedforward branches, and tuning Kp/Ki/Kd gains through iterative simulation. Analyzed output waveforms (step response, ramp tracking, disturbance rejection) on virtual oscilloscope scopes, observing how each parameter shift affected rise time, overshoot, settling time, and steady-state error. Compared Ziegler-Nichols and Cohen-Coon tuning rules against manual refinement to develop intuition for controller design trade-offs.", zh: "在 MATLAB/Simulink 中通过拓展 PID 模块与自定义传递函数模块搭建闭环控制系统。编写系统方程设计单回路与多回路反馈架构——构建级联控制路径、添加前馈分支，通过迭代仿真调优 Kp/Ki/Kd 增益。在虚拟示波器上分析输出波形（阶跃响应、斜坡跟踪、抗扰性能），观察每个参数变化对上升时间、超调量、调节时间和稳态误差的影响。对比 Ziegler-Nichols 与 Cohen-Coon 整定法则和手动优化，培养对控制器设计权衡的直觉。" },
        bullets: {
          en: ["Extended Simulink PID blocks & custom transfer functions to model dynamic systems", "Designed closed-loop architectures: single-loop, cascaded multi-loop & feedforward paths", "Tuned Kp/Ki/Kd gains iteratively; analyzed step/ramp/disturbance response waveforms", "Compared Ziegler-Nichols, Cohen-Coon tuning rules vs. manual refinement trade-offs"],
          zh: ["拓展 Simulink PID 模块与自定义传递函数，对动态系统建模", "设计闭环架构：单回路、级联多回路与前馈控制路径", "迭代调优 Kp/Ki/Kd 增益；分析阶跃/斜坡/抗扰响应波形", "对比 Ziegler-Nichols、Cohen-Coon 整定法则与手动优化的权衡"],
        },
        mediaType: "image",
        mediaSrc: "/assets/pid-matlab.png",
        mediaLabel: "Fig. 1 — MATLAB PID compensator design: Bode plot, root locus & closed-loop step response",
        mediaType2: "image",
        mediaSrc2: "/assets/pid-matlab2.png",
        mediaLabel2: "Fig. 2 — Ziegler-Nichols tuning comparison: setpoint tracking & disturbance rejection analysis",
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
        date: { en: "2021.11 - 2022.01", zh: "2021.11 - 2022.01" },
        title: { en: "Project 1 — Supermarket Management System (C Language)", zh: "项目一 — 小超市管理系统（C 语言）" },
        body: {
          en: "Built a full-featured supermarket management desktop application in C with a visual GUI. The system supports user registration and login, product browsing by category, shopping cart add/remove/modify, checkout with total calculation, and purchase history tracking. Designed modular data structures for users, products, and orders, with file-based persistence between sessions.",
          zh: "用 C 语言开发了功能完善的超市管理桌面应用，带有可视化图形界面。系统支持用户注册与登录、按分类浏览商品、购物车增删改、结算并计算总价、以及购买历史查询。设计了用户、商品和订单的模块化数据结构，通过文件持久化保存会话间数据。",
        },
      },
      {
        date: { en: "2022.10 - 2023.06", zh: "2022.10 - 2023.06" },
        title: { en: "Project 2 — Arduino Smart Car System", zh: "项目二 — Arduino 智能小车系统" },
        body: {
          en: "Developed an embedded smart car platform using Arduino as the main controller. Integrated ultrasonic sensors for obstacle avoidance, infrared sensors for line tracking, and DC motor drivers for differential steering control. Wrote low-level control code in C for sensor polling, motor PWM regulation, and real-time decision logic. The modular hardware-software architecture allows plug-and-play sensor swapping for different navigation modes.",
          zh: "以 Arduino 为主控开发了嵌入式智能小车平台。集成超声波传感器进行避障、红外传感器进行循迹、直流电机驱动实现差速转向控制。用 C 编写底层控制代码，实现传感器轮询、电机 PWM 调速和实时决策逻辑。模块化的软硬件架构支持即插即用式传感器替换，适配不同导航模式。",
        },
      },
      {
        date: { en: "2023.03 - 2023.09", zh: "2023.03 - 2023.09" },
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
        period: "2023.03 - 2023.09",
        role: { en: "Full-Stack + IoT Developer", zh: "全栈 + IoT 开发者" },
        title: { en: "WeChat Mini Program + Smart Car Cloud Control", zh: "微信小程序 + 智能小车云端控制" },
        body: { en: "Built a WeChat Mini Program as the remote control interface for an Arduino smart car, bridging mobile frontend, cloud backend, and embedded hardware into one integrated system. The mini program sends real-time motion commands via MQTT protocol and displays historical sensor data.", zh: "开发微信小程序作为 Arduino 智能小车的远程控制界面，将移动前端、云后端与嵌入式硬件打通为一体化系统。小程序通过 MQTT 协议发送实时运动指令并展示历史传感器数据。" },
        bullets: {
          en: ["WeChat Mini Program frontend with WXML/WXSS for mobile remote control UI", "Cloud backend with MQTT protocol bridging mobile commands to embedded hardware", "Real-time bidirectional communication: commands down, sensor telemetry up", "Cloud data logging with in-app historical visualization"],
          zh: ["微信小程序前端：WXML/WXSS 移动端远程控制界面", "云后端 MQTT 协议：桥接移动指令与嵌入式硬件", "实时双向通信：指令下发，传感器数据上传", "云端数据记录：应用内历史数据可视化"],
        },
        mediaType: "image",
        mediaSrc: "/assets/coding-wechat-car.png",
        mediaLabel: "Fig. 1 — WeChat Mini Program: MQTT-based remote control for Arduino smart car",
        mediaType2: "image",
        mediaSrc2: "/assets/coding-arduino-car.png",
        mediaLabel2: "Fig. 2 — Arduino embedded smart car: ultrasonic + infrared sensor hardware setup",
      },
      {
        period: "2021.11 - 2022.01",
        role: { en: "Desktop Application Developer", zh: "桌面应用开发者" },
        title: { en: "Supermarket Management System — C Language GUI App", zh: "超市管理系统 — C 语言 GUI 桌面应用" },
        body: { en: "Developed a full-featured desktop management application in C with a visual GUI, supporting user auth, product catalog browsing, shopping cart operations, and checkout. Modular data structures with file-based persistence for cross-session reliability.", zh: "用 C 语言开发了功能完善的超市管理桌面应用，带有可视化图形界面。系统支持用户注册与登录、按分类浏览商品、购物车增删改、结算并计算总价。设计了模块化数据结构，通过文件持久化保存会话间数据。" },
        bullets: {
          en: ["C language with visual GUI framework for desktop application development", "Modular data architecture: user, product, order data structures", "Shopping cart with full CRUD operations and checkout flow", "File-based data persistence for session-to-session continuity"],
          zh: ["C 语言 + 可视化 GUI 框架，桌面应用开发", "模块化数据架构：用户、商品、订单数据结构", "购物车完整 CRUD 操作与结算流程", "文件持久化存储，跨会话数据连续性"],
        },
        mediaType: "image",
        mediaSrc: "/assets/coding-supermarket-login.png",
        mediaLabel: "Fig. 1 — Supermarket system: user login & authentication interface",
        mediaType2: "image",
        mediaSrc2: "/assets/coding-supermarket-shop.png",
        mediaLabel2: "Fig. 2 — Product catalog & shopping cart: browse, select, checkout flow",
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
      { en: "Guitar playing video", zh: "吉他弹奏视频" },
      { en: "Hiking & sports photos", zh: "登山运动照片" },
      { en: "Photography collection", zh: "摄影作品" },
    ],
    hobbySections: [
      {
        period: "4 Years & Counting",
        role: { en: "Musician", zh: "音乐爱好者" },
        title: { en: "Guitar & Bass — Playing Music", zh: "吉他 & 贝斯 — 弹琴玩音乐" },
        body: { en: "I have been playing guitar for about four years, and picked up bass along the way. I enjoy fingerstyle guitar, strumming through pop and folk songs, and occasionally singing along. Music is my go-to way to unwind — whether learning a new piece or just jamming with friends.", zh: "弹了四年左右的吉他，中途也摸了贝斯。喜欢指弹、弹唱流行和民谣，偶尔自弹自唱。音乐是我放空的方式——不管是练一首新曲子还是跟朋友即兴合奏。" },
        bullets: {
          en: ["Fingerstyle guitar — pop, folk, and original arrangements", "Bass guitar — rhythm section and groove fundamentals", "Regular practice: technique, repertoire, and improvisation"],
          zh: ["指弹吉他：流行、民谣与原创编曲", "贝斯：节奏律动与 groove 基础", "日常练习：技巧打磨、曲目积累与即兴演奏"],
        },
        mediaType: "video",
        mediaSrc: "/assets/guitar-playing.mp4",
        mediaLabel: "Fig. 1 — Guitar fingerstyle performance",
        mediaType2: "video",
        mediaSrc2: "/assets/guitar-cover.mp4",
        mediaLabel2: "Fig. 2 — Guitar vocal cover — pop & folk",
      },
      {
        period: "Weekly",
        role: { en: "Sports Enthusiast", zh: "运动爱好者" },
        title: { en: "Hiking, Badminton & Tennis — Staying Active", zh: "登山、羽毛球 & 网球 — 保持运动" },
        body: { en: "I stay active through a mix of outdoor and court sports. Hiking is my escape into nature — trails, peaks, and fresh air clear my mind. Badminton sharpens my reflexes and footwork, while tennis gives me the rhythm of rallying under the sun. Together, they keep me balanced and energized.", zh: "通过户外与球场运动的结合保持活力。登山是我融入自然的方式——山径、峰顶和新鲜空气让我头脑清醒。羽毛球锻炼反应速度与步法，网球则享受阳光下对拉的节奏感。两者让我保持平衡与精力充沛。" },
        bullets: {
          en: ["Hiking — regular trail hikes, nature exploration & peak bagging", "Badminton — fast-paced reflexes, footwork & doubles strategy", "Tennis — outdoor rally rhythm, baseline strokes & volley practice"],
          zh: ["登山：定期徒步、自然探索与登顶", "羽毛球：快速反应、步法训练与双打策略", "网球：户外对拉节奏、底线击球与截击练习"],
        },
        mediaType: "image",
        mediaSrc: "/assets/hiking1.jpg",
        mediaLabel: "Fig. 1 — Hiking trails & mountain landscapes",
        mediaType2: "image",
        mediaSrc2: "/assets/hiking4.jpg",
        mediaLabel2: "Fig. 2 — Summit views & outdoor adventure moments",
      },
      {
        period: "Ongoing",
        role: { en: "Photographer", zh: "摄影爱好者" },
        title: { en: "Photography — Capturing Light & Moments", zh: "摄影 — 捕捉光影与瞬间" },
        body: { en: "I bring a camera wherever I go. Photography trains my eye for composition, light, and detail — whether it is landscapes, street scenes, or the small candid moments that make a place feel real. This section is a growing gallery of my favorite captures.", zh: "走到哪里都带着相机。摄影训练了我对构图、光线和细节的敏感——无论是风景、街景还是那些让一个地方变得真实的细小瞬间。这个板块是我最喜欢的摄影作品的持续更新画廊。" },
        bullets: {
          en: ["Landscape & nature photography — mountains, coastlines, open skies", "Street & travel photography — urban textures, local life, cultural moments", "Composition & light awareness feeding back into design sensibility"],
          zh: ["自然风光摄影：山川、海岸、开阔天空", "街拍与旅行摄影：城市肌理、当地生活、人文瞬间", "构图与光线敏感度，潜移默化影响设计审美"],
        },
        mediaType: "image",
        mediaSrc: "/assets/photo1.jpg",
        mediaLabel: "Fig. 1 — Landscape & nature photography",
        mediaType2: "image",
        mediaSrc2: "/assets/photo2.jpg",
        mediaLabel2: "Fig. 2 — Travel & street photography moments",
      },
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
    <Router basename={routerBasename}>
      <Routes>
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
        <Route path="/work/:slug" element={<Detail lang={lang} setLang={setLang} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const contact = homeCopy[lang].contact;
  const emailLabel = lang === "en" ? "Email" : "邮箱";
  const phoneLabel = lang === "en" ? "Phone" : "电话";
  const email = contact.find((c) => c.label === emailLabel)?.value ?? "";
  const phone = contact.find((c) => c.label === phoneLabel)?.value ?? "";

  return (
    <header className="site-header">
      <div className="header-info">
        <Link className="brand-link" to="/" aria-label="Back to home">
          GAO HAN
        </Link>
        <span className="header-contact">
          <a href={`mailto:${email}`}>{email}</a>
          <span className="header-sep">|</span>
          <span>{phone}</span>
        </span>
      </div>
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
            <img src={publicAsset(`/assets/stickers/${item.image}`)} alt="" />
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
      <img className="vibe-coding-image" src={publicAsset("/assets/stickers/withai.png")} alt="" />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function Detail({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const { slug } = useParams();
  const page = pages.find((item) => item.slug === slug);
  const [fairyFlight, setFairyFlight] = useState({ stopIndex: -1, hopId: 0 });

  const isSelfIntro = page?.slug === "self-introduction";
  const isHonors = page?.slug === "honors";
  const isRobotics = page?.slug === "robotics";
  const isCoding = page?.slug === "coding";
  const isAgents = page?.slug === "agents";
  const isPid = page?.slug === "pid-control";
  const isHobby = page?.slug === "life-hobbies";

  const launchHobbyFairy = () => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".hobby-experience-card"));
    const stopCount = Math.min(cards.length, 3);
    if (!stopCount) {
      return;
    }

    setFairyFlight((current) => {
      const nextStopIndex = (current.stopIndex + 1) % stopCount;
      cards[nextStopIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });

      return {
        stopIndex: nextStopIndex,
        hopId: current.hopId + 1,
      };
    });
  };

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <main
      className={`detail-page paper-grain accent-${page.accent} ${page.slug}-page ${isSelfIntro ? "self-intro-page" : ""} ${
        isRobotics ? "robotics-page" : ""
      } ${isAgents ? "agents-page" : ""} ${isHonors ? "honors-page" : ""} ${isCoding ? "coding-page" : ""} ${isPid ? "pid-control-page" : ""} ${isHobby ? "life-hobbies-page" : ""}`}
    >
      <Header lang={lang} setLang={setLang} />
      <section className="detail-hero">
        <div className="detail-copy">
          <Link className="back-link" to="/">
            {lang === "en" ? "Back to sticker map" : "返回贴纸地图"}
          </Link>
          {isSelfIntro ? (
            <div className="self-title-row">
              <h1>{page.title[lang]}</h1>
              <SelfIntroAudioButton lang={lang} />
            </div>
          ) : (
            <h1>{page.title[lang]}</h1>
          )}
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
        ) : isHobby ? (
          <HobbyHeroStickers
            lang={lang}
            stopIndex={fairyFlight.stopIndex}
            hopId={fairyFlight.hopId}
            onLaunch={launchHobbyFairy}
          />
        ) : !isHonors && !isRobotics && !isCoding && !isAgents && !isPid && !isHobby ? (
          <MediaShowcase page={page} lang={lang} />
        ) : null}
      </section>

      {isHonors ? (
        <AwardsSkillsSection awards={page.awards} skills={page.detailedSkills} lang={lang} />
      ) : isSelfIntro ? (
        <EducationSection education={page.education ?? []} lang={lang} />
      ) : isRobotics ? (
        <RoboticsExperienceSection sections={page.roboticsSections ?? []} lang={lang} />
      ) : isCoding ? (
        <CodingExperienceSection sections={page.codingSections ?? []} lang={lang} />
      ) : isPid ? (
        <PidExperienceSection sections={page.pidSections ?? []} lang={lang} />
      ) : isHobby ? (
        <HobbyExperienceSection sections={page.hobbySections ?? []} lang={lang} activeStopIndex={fairyFlight.stopIndex} />
      ) : isAgents ? (
        <AgentExperienceSection sections={page.agentsSections ?? []} lang={lang} />
      ) : (
        <section className="detail-grid">
          <Timeline page={page} lang={lang} />
          <Diagram page={page} lang={lang} />
        </section>
      )}
    </main>
  );
}

function HobbyHeroStickers({
  lang,
  stopIndex,
  hopId,
  onLaunch,
}: {
  lang: Lang;
  stopIndex: number;
  hopId: number;
  onLaunch: () => void;
}) {
  const label = lang === "en" ? "Fly the INFJ fairy to the next hobby" : "Fly the INFJ fairy to the next hobby";

  return (
    <aside className="hobby-hero-stickers" aria-label="Life photo sticker collage">
      {hobbyHeroPhotos.map((photo, index) => (
        <figure className={`hobby-life-sticker life-sticker-${index + 1}`} key={photo}>
          <img src={publicAsset(photo)} alt="" />
        </figure>
      ))}
      <button
        type="button"
        className={`hobby-fairy-sticker ${stopIndex >= 0 ? "is-flying" : ""} ${stopIndex >= 0 ? `fairy-stop-${stopIndex + 1}` : ""} fairy-hop-${hopId % 2}`}
        onClick={onLaunch}
        aria-label={label}
      >
        <img src={publicAsset(hobbyFairySrc)} alt="" />
      </button>
    </aside>
  );
}

function SelfIntroAudioButton({ lang }: { lang: Lang }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playError, setPlayError] = useState(false);
  const audioSrc = selfIntroAudioSrc[lang];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setPlayError(false);
  }, [audioSrc]);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setPlayError(false);
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setPlayError(true);
    }
  };

  const actionText = lang === "en" ? "Voice intro" : "语音介绍";
  const statusText = playError ? (lang === "en" ? "Audio unavailable" : "音频暂不可用") : actionText;
  const ariaLabel =
    lang === "en"
      ? isPlaying
        ? "Pause English self introduction audio"
        : "Play English self introduction audio"
      : isPlaying
        ? "暂停中文自我介绍音频"
        : "播放中文自我介绍音频";

  return (
    <div className="self-audio-player">
      <button
        type="button"
        className={`self-audio-button ${isPlaying ? "is-playing" : ""}`}
        onClick={toggleAudio}
        aria-label={ariaLabel}
        aria-pressed={isPlaying}
      >
        <span className="speaker-icon" aria-hidden="true">
          <span className="speaker-body" />
          <span className="speaker-wave speaker-wave-one" />
          <span className="speaker-wave speaker-wave-two" />
        </span>
      </button>
      <span className="self-audio-board" aria-hidden="true">
        <span className="self-audio-label">{statusText}</span>
        <span className="voice-bars">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
      </span>
      <audio ref={audioRef} src={audioSrc} preload="none" onEnded={() => setIsPlaying(false)} />
    </div>
  );
}

function SelfIntroGallery({ photos }: { photos: string[] }) {
  const hero = photos[0];
  const accents = photos.slice(1);

  return (
    <aside className="self-sticker-gallery" aria-label="Graduation photo collage">
      {/* Decorative floating stickers */}
      <span className="gallery-decor decor-flower" aria-hidden="true">💐</span>
      <span className="gallery-decor decor-star" aria-hidden="true">⭐</span>
      <span className="gallery-decor decor-heart" aria-hidden="true">🌸</span>
      <span className="gallery-decor decor-sparkle" aria-hidden="true">✨</span>

      {/* Hero photo — large, centered */}
      <figure className="self-sticker-hero" key={hero}>
        <img src={publicAsset(hero)} alt="Graduation photo — main" />
      </figure>

      {/* Accent photos — smaller, positioned around */}
      {accents.map((photo, i) => (
        <figure className={`self-sticker-accent accent-${i + 1}`} key={photo}>
          <img src={publicAsset(photo)} alt={`Graduation photo ${i + 2}`} />
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
        <article className="education-card" key={item.school[lang]}>
          <div className="edu-logo-badge">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" title={`Visit ${item.school.en} official website`}>
                <img src={publicAsset(item.logo)} alt={`${item.school[lang]} logo`} />
              </a>
            ) : (
              <img src={publicAsset(item.logo)} alt={`${item.school[lang]} logo`} />
            )}
          </div>
          <div className="education-heading">
            <p>{item.period}</p>
            <h2>{item.school[lang]}</h2>
            <h3>
              {item.degree[lang]} · {item.major[lang]}
            </h3>
          </div>
          <dl>
            <div>
              <dt>{t.research}</dt>
              <dd>{item.research[lang]}</dd>
            </div>
            <div>
              <dt>{t.courses}</dt>
              <dd>{item.courses[lang].join(" / ")}</dd>
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

function RoboticsExperienceSection({ sections, lang }: { sections: NonNullable<DetailPage["roboticsSections"]>; lang: Lang }) {
  return (
    <section className="robotics-experience-section" aria-label="Robotics experience">
      {sections.map((item, index) => (
        <article className="robotics-experience-card" key={`${item.period}-${item.title}`}>
          <div className="robotics-experience-copy">
            <p className="robotics-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title[lang]}</h2>
            <h3>{item.role[lang]}</h3>
            <p>{item.body[lang]}</p>
            <ul>
              {item.bullets[lang].map((bullet) => (
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
        <>
          <div className={`${prefix}-media-frame`}>
            {mediaType === "video" ? (
              <video src={publicAsset(mediaSrc)} controls muted loop playsInline preload="metadata" />
            ) : (
              <img src={publicAsset(mediaSrc)} alt={mediaLabel} />
            )}
          </div>
          <span className={`${prefix}-media-caption`}>{mediaLabel}</span>
        </>
      ) : (
        <>
          {mediaType === "video" && <div className={`${prefix}-play-mark`} aria-hidden="true" />}
          <span className={`${prefix}-media-caption`}>{mediaLabel}</span>
        </>
      )}
    </div>
  );
}

function AgentExperienceSection({ sections, lang }: { sections: NonNullable<DetailPage["agentsSections"]>; lang: Lang }) {
  return (
    <section className="agents-experience-section" aria-label="AI Agent projects">
      {sections.map((item, index) => (
        <article className="agents-experience-card" key={`${item.period}-${item.title}`}>
          <div className="agents-experience-copy">
            <p className="agents-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title[lang]}</h2>
            <h3>{item.role[lang]}</h3>
            <p>{item.body[lang]}</p>
            <ul>
              {item.bullets[lang].map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          {item.mediaType2 ? (
            <div className="agents-media-grid">
              <MediaSlot prefix="agents" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
              <MediaSlot prefix="agents" mediaType={item.mediaType2 ?? "image"} mediaSrc={item.mediaSrc2} mediaLabel={item.mediaLabel2 ?? ""} />
            </div>
          ) : item.mediaSrc ? (
            <MediaSlot prefix="agents" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
          ) : null}
        </article>
      ))}
    </section>
  );
}

function PidExperienceSection({ sections, lang }: { sections: NonNullable<DetailPage["pidSections"]>; lang: Lang }) {
  return (
    <section className="pid-experience-section" aria-label="PID control projects">
      {sections.map((item, index) => (
        <article className="pid-experience-card" key={`${item.period}-${item.title}`}>
          <div className="pid-experience-copy">
            <p className="pid-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title[lang]}</h2>
            <h3>{item.role[lang]}</h3>
            <p>{item.body[lang]}</p>
            <ul>
              {item.bullets[lang].map((bullet) => (
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

function HobbyExperienceSection({
  sections,
  lang,
  activeStopIndex,
}: {
  sections: NonNullable<DetailPage["hobbySections"]>;
  lang: Lang;
  activeStopIndex?: number;
}) {
  return (
    <section className="hobby-experience-section" aria-label="Life & hobbies">
      {sections.map((item, index) => (
        <article
          className={`hobby-experience-card ${activeStopIndex === index ? "is-fairy-stop" : ""}`}
          key={`${item.period}-${item.title}`}
        >
          <div className="hobby-experience-copy">
            <p className="hobby-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title[lang]}</h2>
            <h3>{item.role[lang]}</h3>
            <p>{item.body[lang]}</p>
            <ul>
              {item.bullets[lang].map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
          {item.mediaType2 ? (
            <div className="hobby-media-grid">
              <MediaSlot prefix="hobby" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
              <MediaSlot prefix="hobby" mediaType={item.mediaType2 ?? "image"} mediaSrc={item.mediaSrc2} mediaLabel={item.mediaLabel2 ?? ""} />
            </div>
          ) : (
            <MediaSlot prefix="hobby" mediaType={item.mediaType} mediaSrc={item.mediaSrc} mediaLabel={item.mediaLabel} />
          )}
        </article>
      ))}
    </section>
  );
}

function CodingExperienceSection({ sections, lang }: { sections: NonNullable<DetailPage["codingSections"]>; lang: Lang }) {
  return (
    <section className="coding-experience-section" aria-label="Coding projects">
      {sections.map((item, index) => (
        <article className="coding-experience-card" key={`${item.period}-${item.title}`}>
          <div className="coding-experience-copy">
            <p className="coding-kicker">
              {String(index + 1).padStart(2, "0")} / {item.period}
            </p>
            <h2>{item.title[lang]}</h2>
            <h3>{item.role[lang]}</h3>
            <p>{item.body[lang]}</p>
            <ul>
              {item.bullets[lang].map((bullet) => (
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
        <img src={publicAsset("/assets/stickers/reading.png")} alt="" />
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
                <ul>
                  {sk.items[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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
