import re, json

with open('src/main.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

cards = {
    "Humanoid Robot Control & Simulation": {
        "role_en": "CAS | Research Assistant", "role_zh": "中国科学院 | 科研助理",
        "title_en": "Humanoid Robot Control & Simulation", "title_zh": "人形机器人控制与仿真",
        "body_en": "Worked on humanoid robot motion control as a research assistant, focusing on reinforcement learning environments and physics simulation for stable walking and jumping behaviors.",
        "body_zh": "作为科研助理从事人形机器人运动控制研究，聚焦强化学习环境与物理仿真，实现稳定的行走与跳跃行为。",
        "bullets_en": ["Built and configured reinforcement learning environments on Linux.","Completed humanoid robot simulation debugging in Isaac Gym and MuJoCo.","Compiled and tested WPC/MBC control code for walking and jumping control."],
        "bullets_zh": ["在 Linux 上搭建并配置强化学习环境","完成 Isaac Gym 与 MuJoCo 中的人形机器人仿真调试","编译并测试 WPC/MBC 控制代码，实现行走与跳跃控制"],
    },
    "Serpentine Robot Reinforcement Learning": {
        "role_en": "Graduation Project | Project Lead", "role_zh": "毕业设计 | 项目负责人",
        "title_en": "Serpentine Robot Reinforcement Learning", "title_zh": "蛇形机器人强化学习",
        "body_en": "Led the simulation and optimization project for a serpentine mobile robot, connecting SolidWorks mechanical modeling, MuJoCo physics simulation, and reinforcement learning based motion strategy design.",
        "body_zh": "主导蛇形移动机器人的仿真与优化项目，打通 SolidWorks 机械建模、MuJoCo 物理仿真与基于强化学习的运动策略设计。",
        "bullets_en": ["Built the MuJoCo simulation environment on Ubuntu.","Converted SolidWorks mechanical models into XML simulation assets.","Combined PPO, SAC, DDPG, genetic optimization, and Bayesian optimization for motion control."],
        "bullets_zh": ["在 Ubuntu 上搭建 MuJoCo 仿真环境","将 SolidWorks 机械模型转换为 XML 仿真资产","结合 PPO、SAC、DDPG、遗传优化与贝叶斯优化进行运动控制"],
    },
    "Dexterous Hand Control & Humanoid Simulation Support": {
        "role_en": "Agibot | Algorithm Simulation Intern", "role_zh": "智元机器人 | 算法仿真实习生",
        "title_en": "Dexterous Hand Control & Humanoid Simulation Support", "title_zh": "灵巧手控制与人形机器人仿真",
        "body_en": "Worked on dexterous hand simulation and robot control communication, while supporting simulation workflows for humanoid robot scenarios.",
        "body_zh": "从事灵巧手仿真与机器人控制通信，同时支持人形机器人场景的仿真工作流。",
        "bullets_en": ["Built a dexterous hand simulation model based on Sim-MuJoCo.","Coordinated ROS 2 communication with an MC controller for command and state feedback.","Optimized communication efficiency and control parameters for stable scenario interaction."],
        "bullets_zh": ["基于 Sim-MuJoCo 搭建灵巧手仿真模型","协调 ROS 2 与 MC 控制器通信，实现命令下发与状态反馈","优化通信效率与控制参数，实现稳定的场景交互"],
    },
    "Education Agent — RAG + Document-to-PPT Pipeline": {
        "role_en": "AI Agent Developer", "role_zh": "AI Agent 开发工程师",
        "title_en": "Education Agent — RAG + Document-to-PPT Pipeline", "title_zh": "教育类 Agent — RAG + 文档转 PPT 管线",
        "body_en": "Built a locally deployed, private RAG-based Education Agent. Users query an ingested knowledge base, upload documents, and receive auto-generated structured PPT presentations. The pipeline integrates LangChain for retrieval and LLM/VLM for content generation, running entirely in a private repository for data-sensitive educational use cases.",
        "body_zh": "搭建了本地化部署的私有 RAG 教育类 Agent。用户可基于已摄入的知识库进行问答，上传文档后自动生成结构化 PPT 演示文稿。管线整合 LangChain 进行检索、LLM/VLM 进行内容生成，整套系统运行在私有化仓库中，面向对数据隐私有要求的教育场景。",
        "bullets_en": ["LangChain RAG pipeline with local knowledge base ingestion and semantic retrieval","LLM/VLM-powered document-to-PPT generation as structured output","Modular orchestration layer for flexible workflow control","Privately deployed — designed for education scenarios where data privacy matters"],
        "bullets_zh": ["LangChain RAG 管线：本地知识库摄入与语义检索","LLM/VLM 驱动的文档转 PPT 结构化输出","模块化编排层实现灵活的工作流控制","私有化部署 — 面向数据隐私敏感的教育场景"],
    },
    "SENGITAL — Industry AI Agent Development Intern": {
        "role_en": "Industry AI Agent Developer", "role_zh": "行业 AI Agent 开发工程师",
        "title_en": "SENGITAL — Industry AI Agent Development Intern", "title_zh": "SENGITAL — 行业 AI Agent 开发实习",
        "body_en": "Developed industry-specific Agents on poffices.AI, contributing to visual workflow orchestration, modular feature packaging and agile low-code application delivery. Built custom Blocks and configured node-based logic for business scenarios, improving workflow reuse and scenario-specific processing efficiency. Embedded Python scripts for complex business logic, and supported scenario adaptation plus online performance optimization for scalable AI Agent deployment.",
        "body_zh": "在 poffices.AI 平台上开发面向行业的 AI Agent，参与可视化工作流编排、模块化功能封装与敏捷低代码应用交付。构建自定义 Blocks 并配置面向业务场景的节点式逻辑，提升工作流复用性与场景化处理效率。嵌入 Python 脚本实现复杂业务逻辑，支持场景适配与线上性能优化。",
        "bullets_en": ["Developed industry Agents on poffices.AI — visual workflow orchestration & low-code delivery","Built custom Blocks & node-based logic for business scenarios, improving workflow reuse","Embedded Python scripts for complex business rules with scenario adaptation","Online performance optimization for scalable AI Agent deployment"],
        "bullets_zh": ["在 poffices.AI 平台开发行业 Agent — 可视化工作流编排与低代码交付","构建自定义 Blocks 与节点式业务逻辑，提升工作流复用效率","嵌入 Python 脚本处理复杂业务规则，支持场景适配","线上性能优化，实现可扩展的 AI Agent 部署"],
    },
    "AIoT Smart Bathroom — LLM-Driven Environmental Control": {
        "role_en": "AIoT System Developer", "role_zh": "AIoT 系统开发者",
        "title_en": "AIoT Smart Bathroom — LLM-Driven Environmental Control", "title_zh": "AIoT 智能浴室 — 大模型驱动环境调控",
        "body_en": "Built an STM32-based smart bathroom integrating temperature, humidity, PIR, CO2, PM2.5, and water leakage sensors. An LLM decision layer interprets multi-sensor context holistically — reasoning across time-series patterns to trigger coordinated responses like exhaust activation, valve adjustment, or alerts. Users converse with the system in natural language, and the LLM provides contextual answers grounded in real-time sensor data.",
        "body_zh": "基于 STM32 搭建智能浴室系统，集成温湿度、人体红外、CO2、PM2.5 及漏水检测传感器。LLM 决策层从整体解读多传感器上下文，跨时间序列模式推理，自主触发排风扇、水阀调节或预警通知等协调响应。用户可用自然语言与系统对话，LLM 基于实时传感器数据给出有上下文依据的回答。",
        "bullets_en": ["STM32 sensor array with cloud backend and real-time web dashboard visualization","LLM reasoning layer replaces hard-coded rules — understands multi-sensor context","Autonomous coordinated responses: exhaust fans, water valves, alert notifications","Natural-language interaction: users ask questions, LLM answers from live sensor data"],
        "bullets_zh": ["STM32 传感器阵列 + 云后端 + 实时 Web 可视化仪表盘","LLM 推理层替代硬编码规则 — 理解多传感器上下文语义","自主协调响应：排风扇控制、水阀调节、预警通知","自然语言交互：用户提问，LLM 基于实时传感器数据回答"],
    },
    "UAV Search & Rescue — Adaptive PID + YOLO Detection": {
        "role_en": "Master's Group Project", "role_zh": "硕士课程小组项目",
        "title_en": "UAV Search & Rescue — Adaptive PID + YOLO Detection", "title_zh": "无人机搜救 — 自适应 PID + YOLO 行人检测",
        "body_en": "Built a quadrotor UAV simulation in MATLAB/Simulink for search-and-rescue missions. Designed a cascaded PID controller (position to velocity to attitude loops) for stable hover, autonomous takeoff/landing, and waypoint navigation. Integrated Gain Scheduling + PSO adaptive tuning so PID gains auto-adjust based on flight phase and wind conditions. Trained a YOLO pedestrian detector on aerial-view data to identify survivors and trigger loiter-and-report behavior.",
        "body_zh": "在 MATLAB/Simulink 中搭建四旋翼无人机仿真模型，面向搜救任务场景。设计级联 PID 控制器（位置→速度→姿态回路），实现稳定悬停、自主起降和航点导航。集成增益调度 + PSO 自适应调参，PID 增益根据飞行阶段与风扰条件实时自动调整。基于航拍视角数据训练 YOLO 行人检测器，识别幸存者并触发悬停报告行为。",
        "bullets_en": ["Cascaded PID: position to velocity to attitude loops in MATLAB/Simulink","Gain Scheduling + PSO adaptive tuning — gains adjust in real-time to flight phase and wind","Integrated radar, IMU, barometer, GPS sensor models for state estimation","YOLO-based pedestrian detection on custom aerial dataset for mission planner feedback"],
        "bullets_zh": ["级联 PID：位置 → 速度 → 姿态回路，在 MATLAB/Simulink 中实现","增益调度 + PSO 自适应调参 — 增益根据飞行阶段与风扰实时调整","集成雷达、IMU、气压计、GPS 传感器模型进行状态估计","基于自定义航拍数据集训练 YOLO 行人检测器 → 任务规划器反馈"],
    },
    "Industrial Process Control — Water Tank & Boiler Regulation": {
        "role_en": "Industrial Control Lab", "role_zh": "工业控制实验室",
        "title_en": "Industrial Process Control — Water Tank & Boiler Regulation", "title_zh": "工业过程控制 — 水箱液位与锅炉温度调控",
        "body_en": "Hands-on PID control on physical water tank and boiler systems with real sensors and actuators. Performed system identification via step-response testing, applied Ziegler-Nichols tuning rules, and refined gains through iterative closed-loop testing. Compared P, PI, and PID modes on steady-state error, overshoot, settling time, and disturbance rejection.",
        "body_zh": "在真实水箱液位和锅炉温度系统上操作 PID 控制器，使用真实传感器和执行器。通过阶跃响应测试进行系统辨识，应用 Ziegler-Nichols 整定法则获取初始 PID 参数，再通过迭代闭环测试优化增益。对比 P、PI、PID 三种控制模式的稳态误差、超调量、调节时间和抗扰性能。",
        "bullets_en": ["Physical water tank and boiler systems with real sensors and actuators","System identification via step-response to plant transfer functions","Ziegler-Nichols tuning + iterative closed-loop gain refinement","Compared P / PI / PID: steady-state error, overshoot, settling time, disturbance rejection"],
        "bullets_zh": ["真实水箱与锅炉系统，使用真实传感器和执行器","通过阶跃响应进行系统辨识 → 被控对象传递函数","Ziegler-Nichols 整定 + 迭代闭环增益优化","对比 P / PI / PID：稳态误差、超调量、调节时间、抗扰性能"],
    },
    "MATLAB PID Simulation & Transfer Function Analysis": {
        "role_en": "Course Project", "role_zh": "课程项目",
        "title_en": "MATLAB PID Simulation & Transfer Function Analysis", "title_zh": "MATLAB PID 仿真与传递函数分析",
        "body_en": "Systematic controller design in MATLAB. Modeled dynamic systems (first-order, second-order, time-delay) using transfer functions and state-space. Performed open-loop analysis (root locus, Bode, Nyquist) for stability margins, then designed PID compensators to meet target specs. Compared Ziegler-Nichols, Cohen-Coon, and optimization-based tuning, visualizing each gain term's effect on response.",
        "body_zh": "在 MATLAB 中进行系统化控制器设计与分析。使用传递函数和状态空间对各种动态系统（一阶、二阶、时滞）建模。进行开环分析（根轨迹、Bode 图、Nyquist 图）评估稳定裕度，然后设计 PID 补偿器以满足目标性能指标。比较 Ziegler-Nichols、Cohen-Coon 和基于优化的整定方法，可视化每个增益项对响应的影响。",
        "bullets_en": ["Transfer function and state-space modeling for 1st/2nd-order + time-delay systems","Open-loop analysis: root locus, Bode plots, Nyquist diagrams for stability margins","PID compensator design comparing Ziegler-Nichols, Cohen-Coon, optimization-based tuning","Visualized Kp/Ki/Kd effects on rise time, overshoot, steady-state error, oscillation damping"],
        "bullets_zh": ["传递函数与状态空间建模：一阶/二阶 + 时滞系统","开环分析：根轨迹、Bode 图、Nyquist 图评估稳定裕度","PID 补偿器设计，比较 Ziegler-Nichols、Cohen-Coon 及优化整定法","可视化 Kp/Ki/Kd 对上升时间、超调量、稳态误差和振荡阻尼的影响"],
    },
}

# Convert each card
for eng_title, c in cards.items():
    # title
    old = f'title: "{eng_title}"'
    new = f'title: {{ en: "{c["title_en"]}", zh: "{c["title_zh"]}" }}'
    if old in content:
        content = content.replace(old, new)
    else:
        print(f"NOT FOUND title: {eng_title[:60]}")

    # role
    old = f'role: "{c["role_en"]}"'
    new = f'role: {{ en: "{c["role_en"]}", zh: "{c["role_zh"]}" }}'
    if old in content:
        content = content.replace(old, new)
    else:
        print(f"NOT FOUND role: {c['role_en'][:60]}")

    # body
    old = f'body: "{c["body_en"]}"'
    new = f'body: {{ en: "{c["body_en"]}", zh: "{c["body_zh"]}" }}'
    if old in content:
        content = content.replace(old, new)
    else:
        print(f"NOT FOUND body for: {eng_title[:60]}")

    # bullets
    en_lines = '",\n          "'.join(c["bullets_en"])
    old_bullets = f'bullets: [\n          "{en_lines}"\n        ]'
    en_l = '",\n          "'.join(c["bullets_en"])
    zh_l = '",\n          "'.join(c["bullets_zh"])
    new_bullets = f'bullets: {{\n          en: ["{en_l}"],\n          zh: ["{zh_l}"]\n        }}'
    if old_bullets in content:
        content = content.replace(old_bullets, new_bullets)
    else:
        # Try with different indentation
        en_lines2 = '",\n        "'.join(c["bullets_en"])
        old2 = f'bullets: [\n        "{en_lines2}"\n      ]'
        if old2 in content:
            content = content.replace(old2, new_bullets)
        else:
            print(f"NOT FOUND bullets for: {eng_title[:60]}")

# Hobby cards
hobby_cards = [
    {
        "old_role": '"Musician"',
        "old_title": '"Guitar & Bass — Playing Music"',
        "old_body": '"I have been playing guitar for about four years, and picked up bass along the way. I enjoy fingerstyle guitar, strumming through pop and folk songs, and occasionally singing along. Music is my go-to way to unwind — whether learning a new piece or just jamming with friends."',
        "en": {
            "role": "Musician", "title": "Guitar & Bass — Playing Music",
            "body": "I have been playing guitar for about four years, and picked up bass along the way. I enjoy fingerstyle guitar, strumming through pop and folk songs, and occasionally singing along. Music is my go-to way to unwind — whether learning a new piece or just jamming with friends.",
            "bullets": ["Fingerstyle guitar — pop, folk, and original arrangements","Bass guitar — rhythm section and groove fundamentals","Regular practice: technique, repertoire, and improvisation"],
        },
        "zh": {
            "role": "音乐爱好者", "title": "吉他 & 贝斯 — 弹琴玩音乐",
            "body": "弹了四年左右的吉他，中途也摸了贝斯。喜欢指弹、弹唱流行和民谣，偶尔自弹自唱。音乐是我放空的方式——不管是练一首新曲子还是跟朋友即兴合奏。",
            "bullets": ["指弹吉他 — 流行、民谣与原创编曲","贝斯 — 节奏律动与 groove 基础","日常练习：技巧、曲目积累与即兴演奏"],
        },
    },
    {
        "old_role": '"Sports Enthusiast"',
        "old_title": '"Hiking, Badminton & Tennis — Staying Active"',
        "old_body": '"I stay active through a mix of outdoor and court sports. Hiking is my escape into nature — trails, peaks, and fresh air clear my mind. Badminton sharpens my reflexes and footwork, while tennis gives me the rhythm of rallying under the sun. Together, they keep me balanced and energized."',
        "en": {
            "role": "Sports Enthusiast", "title": "Hiking, Badminton & Tennis — Staying Active",
            "body": "I stay active through a mix of outdoor and court sports. Hiking is my escape into nature — trails, peaks, and fresh air clear my mind. Badminton sharpens my reflexes and footwork, while tennis gives me the rhythm of rallying under the sun. Together, they keep me balanced and energized.",
            "bullets": ["Hiking — regular trail hikes, nature exploration & peak bagging","Badminton — fast-paced reflexes, footwork & doubles strategy","Tennis — outdoor rally rhythm, baseline strokes & volley practice"],
        },
        "zh": {
            "role": "运动爱好者", "title": "登山、羽毛球 & 网球 — 保持运动",
            "body": "通过户外与球场运动的结合保持活力。登山是我融入自然的方式——山径、峰顶和新鲜空气让我头脑清醒。羽毛球锻炼反应速度与步法，网球则享受阳光下对拉的节奏感。两者让我保持平衡与精力充沛。",
            "bullets": ["登山 — 定期徒步、自然探索与登顶","羽毛球 — 快速反应、步法训练与双打策略","网球 — 户外对拉节奏、底线击球与截击练习"],
        },
    },
    {
        "old_role": '"Photographer"',
        "old_title": '"Photography — Capturing Light & Moments"',
        "old_body": '"I bring a camera wherever I go. Photography trains my eye for composition, light, and detail — whether it is landscapes, street scenes, or the small candid moments that make a place feel real. This section is a growing gallery of my favorite captures."',
        "en": {
            "role": "Photographer", "title": "Photography — Capturing Light & Moments",
            "body": "I bring a camera wherever I go. Photography trains my eye for composition, light, and detail — whether it is landscapes, street scenes, or the small candid moments that make a place feel real. This section is a growing gallery of my favorite captures.",
            "bullets": ["Landscape & nature photography — mountains, coastlines, open skies","Street & travel photography — urban textures, local life, cultural moments","Composition & light awareness feeding back into design sensibility"],
        },
        "zh": {
            "role": "摄影爱好者", "title": "摄影 — 捕捉光影与瞬间",
            "body": "走到哪里都带着相机。摄影训练了我对构图、光线和细节的敏感——无论是风景、街景还是那些让一个地方变得真实的细小瞬间。这个板块是我最喜欢的摄影作品的持续更新画廊。",
            "bullets": ["风景与自然摄影 — 山川、海岸、开阔天空","街拍与旅行摄影 — 城市肌理、当地生活、人文瞬间","构图与光线的敏感度，潜移默化影响设计审美"],
        },
    },
]

for hc in hobby_cards:
    for field in ["role", "title", "body"]:
        old = f'{field}: {hc["old_"+field]}'
        new = f'{field}: {{ en: "{hc["en"][field]}", zh: "{hc["zh"][field]}" }}'
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"NOT FOUND hobby {field}: {hc['old_'+field][:50]}")

    en_bl = '",\n          "'.join(hc["en"]["bullets"])
    old_bl = f'bullets: [\n          "{en_bl}"\n        ]'
    en_l = '",\n          "'.join(hc["en"]["bullets"])
    zh_l = '",\n          "'.join(hc["zh"]["bullets"])
    new_bl = f'bullets: {{\n          en: ["{en_l}"],\n          zh: ["{zh_l}"]\n        }}'
    if old_bl in content:
        content = content.replace(old_bl, new_bl)
    else:
        print(f"NOT FOUND hobby bullets")

# Coding cards
code_cards = [
    {
        "old_role": '"Full-Stack + IoT Developer"',
        "old_title": '"WeChat Mini Program + Smart Car Cloud Control"',
        "old_body": '"Built a WeChat Mini Program as the remote control interface for an Arduino smart car, bridging mobile frontend, cloud backend, and embedded hardware into one integrated system. The mini program sends real-time motion commands via MQTT protocol and displays historical sensor data."',
        "en": {
            "role": "Full-Stack + IoT Developer", "title": "WeChat Mini Program + Smart Car Cloud Control",
            "body": "Built a WeChat Mini Program as the remote control interface for an Arduino smart car, bridging mobile frontend, cloud backend, and embedded hardware into one integrated system. The mini program sends real-time motion commands via MQTT protocol and displays historical sensor data.",
            "bullets": ["WeChat Mini Program frontend with WXML/WXSS for mobile remote control UI","Cloud backend with MQTT protocol bridging mobile commands to embedded hardware","Real-time bidirectional communication: commands down, sensor telemetry up","Cloud data logging with in-app historical visualization"],
        },
        "zh": {
            "role": "全栈 + IoT 开发者", "title": "微信小程序 + 智能小车云端控制",
            "body": "开发微信小程序作为 Arduino 智能小车的远程控制界面，将移动前端、云后端与嵌入式硬件打通为一体化系统。小程序通过 MQTT 协议发送实时运动指令并展示历史传感器数据。",
            "bullets": ["微信小程序前端：WXML/WXSS 移动端远程控制界面","云后端 MQTT 协议：桥接移动指令与嵌入式硬件","实时双向通信：指令下发，传感器数据上传","云端数据记录：应用内历史可视化展示"],
        },
    },
    {
        "old_role": '"Desktop Application Developer"',
        "old_title": '"Supermarket Management System — C Language GUI App"',
        "old_body": '"Developed a full-featured desktop management application in C with a visual GUI, supporting user auth, product catalog browsing, shopping cart operations, and checkout. Modular data structures with file-based persistence for cross-session reliability."',
        "en": {
            "role": "Desktop Application Developer", "title": "Supermarket Management System — C Language GUI App",
            "body": "Developed a full-featured desktop management application in C with a visual GUI, supporting user auth, product catalog browsing, shopping cart operations, and checkout. Modular data structures with file-based persistence for cross-session reliability.",
            "bullets": ["C language with visual GUI framework for desktop application development","Modular data architecture: user, product, order data structures","Shopping cart with full CRUD operations and checkout flow","File-based data persistence for session-to-session continuity"],
        },
        "zh": {
            "role": "桌面应用开发者", "title": "超市管理系统 — C 语言 GUI 桌面应用",
            "body": "用 C 语言开发了功能完善的超市管理桌面应用，带有可视化图形界面。系统支持用户注册与登录、按分类浏览商品、购物车增删改、结算并计算总价。设计了模块化数据结构，通过文件持久化保存会话间数据。",
            "bullets": ["C 语言 + 可视化 GUI 框架，桌面应用开发","模块化数据架构：用户、商品、订单数据结构","购物车完整 CRUD 操作与结算流程","文件持久化存储，跨会话数据连续性"],
        },
    },
]

for cc in code_cards:
    for field in ["role", "title", "body"]:
        old = f'{field}: {cc["old_"+field]}'
        new = f'{field}: {{ en: "{cc["en"][field]}", zh: "{cc["zh"][field]}" }}'
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"NOT FOUND code {field}: {cc['old_'+field][:50]}")

    en_bl = '",\n          "'.join(cc["en"]["bullets"])
    old_bl = f'bullets: [\n          "{en_bl}"\n        ]'
    en_l = '",\n          "'.join(cc["en"]["bullets"])
    zh_l = '",\n          "'.join(cc["zh"]["bullets"])
    new_bl = f'bullets: {{\n          en: ["{en_l}"],\n          zh: ["{zh_l}"]\n        }}'
    if old_bl in content:
        content = content.replace(old_bl, new_bl)
    else:
        print(f"NOT FOUND code bullets")

with open('src/main.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
