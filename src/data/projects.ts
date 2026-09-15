export type ProjectStatus = {
  label: string
  kind: 'active' | 'complete' | 'planned'
}

export type Project = {
  index: string
  title: string
  category: string
  description: string
  tags: string[]
  period: string
  action: string
  status: ProjectStatus
}

export const projects: Project[] = [
  {
    index: '01',
    title: '从零开始的避难所生活',
    category: 'UNITY GAMEPLAY SYSTEMS',
    description: '搜刮、背包、合成与守塔组成的系统型垂直切片。重点验证数据驱动配置、敌人状态机、对象池、存档与 WebGL 交付。',
    tags: ['Unity', 'C#', 'FSM', 'Object Pool', 'WebGL'],
    period: '2026.07 — 进行中',
    action: '首版目标 08.02',
    status: { label: '冲刺中', kind: 'active' },
  },
  {
    index: '02',
    title: '智能宠物照护系统',
    category: 'EMBEDDED RELIABILITY',
    description: '在 STM32H563ZI 多传感器喂养原型上补充可靠 UART 帧、ACK 重试、幂等控制、非阻塞 MQTT 重连与有界离线队列，并用故障注入验证异常路径。',
    tags: ['STM32H563ZI', 'ESP8266', 'CRC16', 'MQTT', 'Fault Injection'],
    period: '2026.02 — 可靠性升级中',
    action: '查看验证证据',
    status: { label: '待硬件回归', kind: 'active' },
  },
  {
    index: '03',
    title: '可穿戴心率监测系统',
    category: 'REAL-TIME SIGNAL',
    description: '围绕 MAX30100 完成实时采样、滑动平均滤波、蓝牙同步、波形显示和异常阈值报警。',
    tags: ['STM32', 'MAX30100', 'Bluetooth', 'Signal Filter'],
    period: '2025.09 — 2026.01',
    action: '独立完成',
    status: { label: '已完成', kind: 'complete' },
  },
  {
    index: '04',
    title: '可靠 UDP 与游戏同步实验平台',
    category: 'GAME NETWORKING / C++',
    description: '面向游戏网络的可靠传输、延迟与丢包模拟、状态同步和指标可视化实验平台。',
    tags: ['C++', 'UDP', 'Reliability', 'Game Networking'],
    period: 'NEXT BUILD',
    action: '通信 × 游戏',
    status: { label: '计划中', kind: 'planned' },
  },
  {
    index: '05',
    title: 'OFDM 链路仿真与可视化',
    category: 'COMMUNICATION SYSTEMS',
    description: 'QAM/OFDM 调制、噪声与衰落信道、信道估计、误码率曲线和交互式实验界面。',
    tags: ['OFDM', 'QAM', 'Channel', 'BER'],
    period: 'BACKLOG',
    action: '专业能力扩展',
    status: { label: '候选', kind: 'planned' },
  },
  {
    index: '06',
    title: '待定义：游戏开发工具',
    category: 'TOOLS / PIPELINE',
    description: '预留给编辑器工具、配置验证、关卡调试或性能分析方向，确保后续项目与已有案例形成差异。',
    tags: ['Editor Tool', 'Pipeline', 'Validation'],
    period: 'RESERVED',
    action: '项目槽位',
    status: { label: '预留', kind: 'planned' },
  },
]
