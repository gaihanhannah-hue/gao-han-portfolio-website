"""Fix Chinese translations in card bodies and bullets that still show English."""
import re

with open('src/main.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Map of English text -> Chinese translation for body and bullet items
# We'll detect English-only zh fields and replace them

translations = {
    # ── Robotics Card 1: Humanoid ──
    "Worked on humanoid robot motion control as a research assistant, focusing on reinforcement learning environments and physics simulation for stable walking and jumping behaviors.":
        "作为科研助理从事人形机器人运动控制研究，聚焦强化学习环境与物理仿真，实现稳定的行走与跳跃行为。",
    "Built and configured reinforcement learning environments on Linux.":
        "在 Linux 上搭建并配置强化学习环境",
    "Completed humanoid robot simulation debugging in Isaac Gym and MuJoCo.":
        "完成 Isaac Gym 与 MuJoCo 中的人形机器人仿真调试",
    "Compiled and tested WPC/MBC control code for walking and jumping control.":
        "编译并测试 WPC/MBC 控制代码，实现行走与跳跃控制",

    # ── Robotics Card 2: Serpentine ──
    "Led the simulation and optimization project for a serpentine mobile robot, connecting SolidWorks mechanical modeling, MuJoCo physics simulation, and reinforcement learning based motion strategy design.":
        "主导蛇形移动机器人的仿真与优化项目，打通 SolidWorks 机械建模、MuJoCo 物理仿真与基于强化学习的运动策略设计。",
    "Built the MuJoCo simulation environment on Ubuntu.":
        "在 Ubuntu 上搭建 MuJoCo 仿真环境",
    "Converted SolidWorks mechanical models into XML simulation assets.":
        "将 SolidWorks 机械模型转换为 XML 仿真资产",
    "Combined PPO, SAC, DDPG, genetic optimization, and Bayesian optimization for motion control.":
        "结合 PPO、SAC、DDPG、遗传优化与贝叶斯优化进行运动控制",

    # ── Robotics Card 3: Agibot ──
    "Worked on dexterous hand simulation and robot control communication, while supporting simulation workflows for humanoid robot scenarios.":
        "从事灵巧手仿真与机器人控制通信，同时支持人形机器人场景的仿真工作流。",
    "Built a dexterous hand simulation model based on Sim-MuJoCo.":
        "基于 Sim-MuJoCo 搭建灵巧手仿真模型",
    "Coordinated ROS 2 communication with an MC controller for command and state feedback.":
        "协调 ROS 2 与 MC 控制器通信，实现命令下发与状态反馈",
    "Optimized communication efficiency and control parameters for stable scenario interaction.":
        "优化通信效率与控制参数，实现稳定的场景交互",

    # ── Agents Card 1: Education Agent ──
    "Built a locally deployed, private RAG-based Education Agent. Users query an ingested knowledge base, upload documents, and receive auto-generated structured PPT presentations. The pipeline integrates LangChain for retrieval and LLM/VLM for content generation, running entirely in a private repository for data-sensitive educational use cases.":
        "搭建了本地化部署的私有 RAG 教育类 Agent。用户可基于已摄入的知识库进行问答，上传文档后自动生成结构化 PPT 演示文稿。管线整合 LangChain 进行检索、LLM/VLM 进行内容生成，整套系统运行在私有化仓库中，面向对数据隐私有要求的教育场景。",
    "LangChain RAG pipeline with local knowledge base ingestion and semantic retrieval":
        "LangChain RAG 管线：本地知识库摄入与语义检索",
    "LLM/VLM-powered document-to-PPT generation as structured output":
        "LLM/VLM 驱动的文档转 PPT 结构化输出",
    "Modular orchestration layer for flexible workflow control":
        "模块化编排层实现灵活的工作流控制",
    "Privately deployed — designed for education scenarios where data privacy matters":
        "私有化部署 — 面向数据隐私敏感的教育场景",

    # ── Agents Card 2: SENGITAL ──
    "Developed industry-specific Agents on poffices.AI, contributing to visual workflow orchestration, modular feature packaging and agile low-code application delivery. Built custom Blocks and configured node-based logic for business scenarios, improving workflow reuse and scenario-specific processing efficiency. Embedded Python scripts for complex business logic, and supported scenario adaptation plus online performance optimization for scalable AI Agent deployment.":
        "在 poffices.AI 平台上开发面向行业的 AI Agent，参与可视化工作流编排、模块化功能封装与敏捷低代码应用交付。构建自定义 Blocks 并配置面向业务场景的节点式逻辑，提升工作流复用性与场景化处理效率。嵌入 Python 脚本实现复杂业务逻辑，支持场景适配与线上性能优化，实现可扩展的 AI Agent 部署。",
    "Developed industry Agents on poffices.AI — visual workflow orchestration & low-code delivery":
        "在 poffices.AI 平台开发行业 Agent — 可视化工作流编排与低代码交付",
    "Built custom Blocks & node-based logic for business scenarios, improving workflow reuse":
        "构建自定义 Blocks 与节点式业务逻辑，提升工作流复用效率",
    "Embedded Python scripts for complex business rules with scenario adaptation":
        "嵌入 Python 脚本处理复杂业务规则，支持场景适配",
    "Online performance optimization for scalable AI Agent deployment":
        "线上性能优化，实现可扩展的 AI Agent 部署",

    # ── Agents Card 3: AIoT ──
    "Built an STM32-based smart bathroom integrating temperature, humidity, PIR, CO2, PM2.5, and water leakage sensors. An LLM decision layer interprets multi-sensor context holistically — reasoning across time-series patterns to trigger coordinated responses like exhaust activation, valve adjustment, or alerts. Users converse with the system in natural language, and the LLM provides contextual answers grounded in real-time sensor data.":
        "基于 STM32 搭建智能浴室系统，集成温湿度、人体红外、CO₂、PM2.5 及漏水检测传感器。LLM 决策层从整体解读多传感器上下文，跨时间序列模式推理，自主触发排风扇、水阀调节或预警通知等协调响应。用户可用自然语言与系统对话，LLM 基于实时传感器数据给出有上下文依据的回答。",
    "STM32 sensor array with cloud backend and real-time web dashboard visualization":
        "STM32 传感器阵列 + 云后端 + 实时 Web 可视化仪表盘",
    "LLM reasoning layer replaces hard-coded rules — understands multi-sensor context":
        "LLM 推理层替代硬编码规则 — 理解多传感器上下文语义",
    "Autonomous coordinated responses: exhaust fans, water valves, alert notifications":
        "自主协调响应：排风扇控制、水阀调节、预警通知",
    "Natural-language interaction: users ask questions, LLM answers from live sensor data":
        "自然语言交互：用户提问，LLM 基于实时传感器数据回答",

    # ── PID Card 1: UAV ──
    "Built a quadrotor UAV simulation in MATLAB/Simulink for search-and-rescue missions. Designed a cascaded PID controller (position to velocity to attitude loops) for stable hover, autonomous takeoff/landing, and waypoint navigation. Integrated Gain Scheduling + PSO adaptive tuning so PID gains auto-adjust based on flight phase and wind conditions. Trained a YOLO pedestrian detector on aerial-view data to identify survivors and trigger loiter-and-report behavior.":
        "在 MATLAB/Simulink 中搭建四旋翼无人机仿真模型，面向搜救任务场景。设计级联 PID 控制器（位置→速度→姿态回路），实现稳定悬停、自主起降和航点导航。集成增益调度 + PSO 自适应调参，PID 增益根据飞行阶段与风扰条件实时自动调整。基于航拍视角数据训练 YOLO 行人检测器，识别幸存者并触发悬停报告行为。",
    "Cascaded PID: position to velocity to attitude loops in MATLAB/Simulink":
        "级联 PID：位置 → 速度 → 姿态回路，在 MATLAB/Simulink 中实现",
    "Gain Scheduling + PSO adaptive tuning — gains adjust in real-time to flight phase and wind":
        "增益调度 + PSO 自适应调参 — 增益根据飞行阶段与风扰实时调整",
    "Integrated radar, IMU, barometer, GPS sensor models for state estimation":
        "集成雷达、IMU、气压计、GPS 传感器模型进行状态估计",
    "YOLO-based pedestrian detection on custom aerial dataset for mission planner feedback":
        "基于自定义航拍数据集训练 YOLO 行人检测器，反馈至任务规划器",

    # ── PID Card 2: Industrial ──
    "Hands-on PID control on physical water tank and boiler systems with real sensors and actuators. Performed system identification via step-response testing, applied Ziegler-Nichols tuning rules, and refined gains through iterative closed-loop testing. Compared P, PI, and PID modes on steady-state error, overshoot, settling time, and disturbance rejection.":
        "在真实水箱液位和锅炉温度系统上操作 PID 控制器，使用真实传感器和执行器。通过阶跃响应测试进行系统辨识，应用 Ziegler-Nichols 整定法则获取初始 PID 参数，再通过迭代闭环测试优化增益。对比 P、PI、PID 三种控制模式的稳态误差、超调量、调节时间和抗扰性能。",
    "Physical water tank and boiler systems with real sensors and actuators":
        "真实水箱与锅炉系统，使用真实传感器和执行器",
    "System identification via step-response to plant transfer functions":
        "通过阶跃响应进行系统辨识，推导被控对象传递函数",
    "Ziegler-Nichols tuning + iterative closed-loop gain refinement":
        "Ziegler-Nichols 整定 + 迭代闭环增益优化",
    "Compared P / PI / PID: steady-state error, overshoot, settling time, disturbance rejection":
        "对比 P / PI / PID：稳态误差、超调量、调节时间、抗扰性能",

    # ── PID Card 3: MATLAB ──
    "Systematic controller design in MATLAB. Modeled dynamic systems (first-order, second-order, time-delay) using transfer functions and state-space. Performed open-loop analysis (root locus, Bode, Nyquist) for stability margins, then designed PID compensators to meet target specs. Compared Ziegler-Nichols, Cohen-Coon, and optimization-based tuning, visualizing each gain term's effect on response.":
        "在 MATLAB 中进行系统化控制器设计与分析。使用传递函数和状态空间对各种动态系统（一阶、二阶、时滞）建模。进行开环分析（根轨迹、Bode 图、Nyquist 图）评估稳定裕度，然后设计 PID 补偿器以满足目标性能指标。比较 Ziegler-Nichols、Cohen-Coon 和基于优化的整定方法，可视化每个增益项对响应的影响。",
    "Transfer function and state-space modeling for 1st/2nd-order + time-delay systems":
        "传递函数与状态空间建模：一阶/二阶 + 时滞系统",
    "Open-loop analysis: root locus, Bode plots, Nyquist diagrams for stability margins":
        "开环分析：根轨迹、Bode 图、Nyquist 图评估稳定裕度",
    "PID compensator design comparing Ziegler-Nichols, Cohen-Coon, optimization-based tuning":
        "PID 补偿器设计，比较 Ziegler-Nichols、Cohen-Coon 及优化整定法",
    "Visualized Kp/Ki/Kd effects on rise time, overshoot, steady-state error, oscillation damping":
        "可视化 Kp/Ki/Kd 对上升时间、超调量、稳态误差和振荡阻尼的影响",

    # ── Coding Card 1: WeChat ──
    "Built a WeChat Mini Program as the remote control interface for an Arduino smart car, bridging mobile frontend, cloud backend, and embedded hardware into one integrated system. The mini program sends real-time motion commands via MQTT protocol and displays historical sensor data.":
        "开发微信小程序作为 Arduino 智能小车的远程控制界面，将移动前端、云后端与嵌入式硬件打通为一体化系统。小程序通过 MQTT 协议发送实时运动指令并展示历史传感器数据。",
    "WeChat Mini Program frontend with WXML/WXSS for mobile remote control UI":
        "微信小程序前端：WXML/WXSS 移动端远程控制界面",
    "Cloud backend with MQTT protocol bridging mobile commands to embedded hardware":
        "云后端 MQTT 协议：桥接移动指令与嵌入式硬件",
    "Real-time bidirectional communication: commands down, sensor telemetry up":
        "实时双向通信：指令下发，传感器数据上传",
    "Cloud data logging with in-app historical visualization":
        "云端数据记录：应用内历史可视化展示",

    # ── Coding Card 2: Supermarket ──
    "Developed a full-featured desktop management application in C with a visual GUI, supporting user auth, product catalog browsing, shopping cart operations, and checkout. Modular data structures with file-based persistence for cross-session reliability.":
        "用 C 语言开发了功能完善的超市管理桌面应用，带有可视化图形界面。系统支持用户注册与登录、按分类浏览商品、购物车增删改、结算并计算总价。设计了模块化数据结构，通过文件持久化保存会话间数据。",
    "C language with visual GUI framework for desktop application development":
        "C 语言 + 可视化 GUI 框架，桌面应用开发",
    "Modular data architecture: user, product, order data structures":
        "模块化数据架构：用户、商品、订单数据结构",
    "Shopping cart with full CRUD operations and checkout flow":
        "购物车完整 CRUD 操作与结算流程",
    "File-based data persistence for session-to-session continuity":
        "文件持久化存储，跨会话数据连续性",
}

# Find zh: fields that match the English text and replace them
count = 0
for en_text, zh_text in translations.items():
    # Pattern: zh: "ENGLISH TEXT"  -> zh: "CHINESE TEXT"
    # But we need to find where zh contains the English text (meaning it wasn't translated)
    old = f'zh: "{en_text}"'
    new = f'zh: "{zh_text}"'
    if old in content:
        content = content.replace(old, new)
        count += 1
    else:
        # Try with escaped quotes
        old2 = f'zh: "{en_text}"'
        if old2 in content:
            content = content.replace(old2, new)
            count += 1
        else:
            # The text might have been stored differently
            pass

print(f"Fixed {count} translations")

# Now handle the hobby cards — their zh fields might already have some Chinese from the first script
# Check if they have English duplicated
# Let me search for specific patterns

# Count remaining English in zh fields
en_in_zh = re.findall(r'zh: "(?:[A-Z][a-z].{20,})"', content)
print(f"Remaining long English in zh fields: {len(en_in_zh)}")

with open('src/main.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
