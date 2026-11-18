export type Frame = { file: string; title: string; note: string }
type Section = { title: string; body: string; points?: string[]; frames?: Frame[] }
export type CaseStudy = {
  id: string
  title: string
  subtitle?: string
  category: string
  period: string
  role: string
  status: string
  stack: string
  summary: string
  cover?: Frame
  sections: Section[]
}

const shelter = (file: string, title: string, note: string): Frame =>
  ({ file: `images/shelter/${file}.${file.startsWith('contest-') ? 'webp' : 'png'}`, title, note })

const shelterCover = shelter('contest-shelter', '庇护所实机画面', '11 月 18 日运行取证。画面包含工作区、休息区、侧口以及当前的任务和地图界面。')
const receiver: Frame = {
  file: 'images/video-call/receiver.png',
  title: 'V2 接收窗口',
  note: '模拟手机接收端的本地验证截图。运动图形与时间码是实验输入。',
}
const pet = (file: string, title: string, note: string): Frame =>
  ({ file: `images/pet-care/${file}.jpg`, title, note })
const petCover = pet('system-overview', '智能宠物照护原型', '系统实物包含主控、传感器及执行机构。')

export const caseStudies: CaseStudy[] = [
  {
    id: 'shelter', title: '守夜人', subtitle: '从零开始的庇护所生活',
    category: '游戏客户端 · 生存防守', period: '2026.07 至今',
    role: '主理 / 玩法与系统程序', status: '参赛 Demo · 持续开发',
    stack: '团结引擎 / Unity · C# · NavMesh',
    summary: '一款斜俯视生存游戏。白天搜集资源、修补庇护所，夜里守住入口。已在正式场景从新档连续验证前三日、三晚防守与第四日清晨的存档接续。',
    cover: shelterCover,
    sections: [
      {
        title: '开始与引导', body: '从标题进入后，玩家先通过纸质卷宗理解值守屋和首日目标，再进入搜索、交互与夜袭准备。',
        frames: [
          shelter('start-menu', '开始界面', '已归档的标题界面。'),
          shelter('contest-intro', '首日开场', '11 月参赛版本的首日叙事卷宗。'),
          shelter('onboarding-2', '引导第二页', '解释基本操作和探索。'),
          shelter('onboarding-3', '引导第三页', '进入首日行动前的目标提示。'),
        ],
      },
      {
        title: '庇护所现状', body: '工作区、医疗设施、睡眠位和出入口集中在同一个可防守空间。最近的实机取证覆盖侧口关门、搜索提示与西区遭遇。',
        frames: [shelterCover, shelter('contest-search', '可搜索容器', '11 月 18 日实机画面。铭牌显示容器当前可搜索。')],
      },
      {
        title: '核心循环', body: '玩家在白天决定路线、制作装备和补修门体，夜里在屋内坚守或主动出击。结算后推进日期，保留屋况和玩家进度。',
        points: ['白天探索街区，搜索材料，制作绷带和护甲。', '返回庇护所后修补正门、准备侧口，根据设施需求恢复供电。', '防守结束后推进日期，后续解锁新的区域、广播与图纸。'],
        frames: [shelter('contest-power', '第二日供电与护甲', '连续流程复核中的第二日完成状态。')],
      },
      {
        title: '系统实现', body: '我负责把日程、关卡目标、资源和战斗串成可以重复验证的正式流程。',
        points: ['数据配置驱动物资、制作配方和设施需求。搜索结果与库存变更进入存档。', '敌人使用 NavMesh 寻路，可根据正门、侧口、玩家和核心状态切换目标。', '任务手记、地图、容器铭牌和施工提示读取同一流程状态。检查点支持失败后重试。'],
      },
      {
        title: '试玩反馈与修复', body: '把试玩中的路线和交互问题变成可重复的检查项。围绕屋内防守、侧口维修、容器识别和返回标题反馈，逐项修复并复核正式场景。',
        points: ['检查门洞被占用时的关闭条件和失败提示。', '区分普通陈设、可搜索、剩余物资和搜空四种状态，降低搜错容器的概率。', '返回标题前提供明确的存档反馈，继续游戏时核对设施、耐久和库存。'],
      },
      {
        title: '验证证据', body: '11 月 17 日的正式场景回归从空库存新档推进至第四日，再返回标题继续。三个夜晚均记录了实际攻门和门体掉耐久。',
        points: ['回归隔离了白天巡逻。首批实际攻门后由脚本加速清怪，作为连续流程和存档证据。', '重新进入后核对供电、护甲、收音机、广播、图纸及材料余额。七程序集静态检查通过。'],
        frames: [shelter('contest-night', '第三夜 · 实际攻门', '正式场景回归中的夜间画面。'), shelter('contest-day-four', '第四日 · 返回标题后继续', '用于复核新日期与存档状态。')],
      },
    ],
  },
  {
    id: 'video', title: '视频通信编解码与终端功耗评估',
    category: '实时音视频', period: '2026.11 至今', role: '核心开发',
    status: '实验进行中', stack: 'Go / Pion · WebRTC · FFmpeg',
    summary: '搭建电脑与手机的双向音视频链路，研究不同视频编码和编码策略在同等条件下对画质、延时与终端功耗的影响。',
    cover: receiver,
    sections: [
      { title: '已实现的链路', body: '在 Windows 上打通电脑与手机的双向画面和语音。H.264 为主链路，保留 VP8 回退，音频走 Opus，结合 TWCC/GCC 做反馈和码率调节。',
        points: ['V1 已归档源码、实测构建、运行工具和哈希清单，作为传统编解码对照。', 'V2 已接入 720p 档与接收统计，记录解码帧数、冻结和抖动缓冲等指标。'],
        frames: [receiver] },
      { title: '怎样比较功耗', body: '对照实验会固定设备、视频源、分辨率、帧率和网络条件。分别测发送端与接收端平均功率、每有效帧能耗，并记录画质和端到端延时。',
        points: ['稳定网络、带宽突降和丢包场景分别记录，避免把不同实验条件混在一起。', '已完成链路和采样验证，功耗与画质的正式对照仍在进行。'] },
    ],
  },
  {
    id: 'pet', title: '智能宠物照护系统',
    category: '嵌入式 · 通信可靠性', period: '2026.02 — 2026.07',
    role: '核心开发', status: '项目已结束', stack: 'STM32H563ZI · ESP8266 · MQTT',
    summary: '多传感器照护原型。负责设备控制与通信可靠性升级，增加校验、超时重试、断线重连和离线排队。',
    cover: petCover,
    sections: [
      { title: '实物与交互', body: '主控负责传感器采样和执行机构控制，ESP8266 负责网络侧交互，小程序用于查看状态和下发控制。',
        frames: [petCover, pet('main-controller', '主控与接线', '原型主控和模块连接。'), pet('miniapp-control', '小程序控制', '设备操作界面。')] },
      { title: '通信可靠性', body: 'UART 帧引入 CRC16、ACK 重试和序号去重，减少误执行。MQTT 重连走非阻塞状态机，并用有界离线队列管理待发数据。',
        points: ['主机测试覆盖半包、粘包、丢 ACK、计时回绕和断线重连。', '验证口径为主机测试与构建，实际硬件长期稳定性仍需跑机验证。'] },
    ],
  },
  {
    id: 'heart', title: '可穿戴心率监测系统',
    category: '嵌入式 · 信号处理', period: '2025.09 — 2026.01',
    role: '独立完成', status: '已完成', stack: 'STM32 · MAX30100 · 蓝牙',
    summary: '从实时采样、滤波到蓝牙同步和波形显示，搭建可穿戴心率监测原型。',
    sections: [
      { title: '实现流程', body: '通过 MAX30100 采集信号，在 STM32 上实时处理，采用滑动平均平滑读数，并通过蓝牙同步到显示端。',
        points: ['显示波形与心率，通过设定阈值提供异常提示。', '工程原型用于演示采集、处理和显示流程。'] },
    ],
  },
]
