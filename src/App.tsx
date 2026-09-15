import { useEffect, useRef, useState, type ElementType, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, Github, Mail, X } from 'lucide-react'
import './App.css'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const email = '905192391@qq.com'
const phone = '13579496466'
const github = 'https://github.com/waris644'

const gifNames = ['hero-space-voyage-preview-eECLH3Yc.gif','hero-codenest-preview-Cgppc2qV.gif','hero-vex-ventures-preview-BczMFIiw.gif','hero-stellar-ai-v2-preview-DjvxjG3C.gif','hero-asme-preview-B_nGDnTP.gif','hero-transform-data-preview-Cx5OU29N.gif','hero-vitara-preview-Cjz2QYyU.gif','hero-terra-preview-BFjrCr7T.gif','hero-skyelite-preview-DHaZIgUv.gif','hero-aethera-preview-DknSlcTa.gif','hero-designpro-preview-D8c5_een.gif','hero-stellar-ai-preview-D3HL6bw1.gif','hero-xportfolio-preview-D4A8maiC.gif','hero-orbit-web3-preview-BXt4OttD.gif','hero-nexora-preview-cx5HmUgo.gif','hero-evr-ventures-preview-DZxeVFEX.gif','hero-planet-orbit-preview-DWAP8Z1P.gif','hero-new-era-preview-CocuDUm9.gif','hero-wealth-preview-B70idl_u.gif','hero-luminex-preview-CxOP7ce6.gif','hero-celestia-preview-0yO3jXO8.gif']
const gifs = gifNames.map(name => `https://motionsites.ai/assets/${name}`)

const decor = [
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png','left-[1%] top-[4%] w-[120px] sm:w-[160px] md:left-[4%] md:w-[210px]',-80,.1],
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png','bottom-[8%] left-[3%] w-[100px] sm:w-[140px] md:left-[10%] md:w-[180px]',-80,.25],
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png','right-[1%] top-[4%] w-[120px] sm:w-[160px] md:right-[4%] md:w-[210px]',80,.15],
  ['https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png','bottom-[8%] right-[3%] w-[130px] sm:w-[170px] md:right-[10%] md:w-[220px]',80,.3],
] as const

const remote = (id: string) => `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${id}.png&w=1280&q=85`
const projects = [
  { name:'从零开始的庇护所生活', category:'UNITY / GAMEPLAY', status:'最新进度', images:[asset('images/shelter/start-menu.png'),asset('images/shelter/onboarding-2.png'),asset('images/shelter/shelter-overview.png')] },
  { name:'智能宠物照护系统', category:'STM32 / RELIABILITY', status:'查看证据', images:[asset('images/pet-care/system-overview.jpg'),asset('images/pet-care/miniapp-control.jpg'),asset('images/pet-care/system-wiring.jpg')] },
  { name:'可穿戴心率监测系统', category:'REAL-TIME SIGNAL', status:'已完成', images:[remote('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f'),remote('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b'),remote('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee')] },
]

function FadeIn({ children, delay=0, duration=.7, x=0, y=30, as:Tag='div', className='' }:{ children:ReactNode; delay?:number; duration?:number; x?:number; y?:number; as?:ElementType; className?:string }) {
  const Component=motion.create(Tag)
  return <Component className={className} initial={{opacity:.92,x,y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,margin:'50px',amount:0}} transition={{delay,duration,ease:[.25,.1,.25,1]}}>{children}</Component>
}

function ContactButton({onOpen}:{onOpen:()=>void}){ return <button type="button" onClick={onOpen} aria-haspopup="dialog" className="contact-gradient inline-flex items-center gap-3 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-[.18em] text-white transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base">联系我 <Mail size={18}/></button> }

function ContactDialog({onClose}:{onClose:()=>void}){
  const dialogRef=useRef<HTMLElement>(null)
  const previousFocus=useRef<HTMLElement|null>(null)
  useEffect(()=>{
    const previous=document.body.style.overflow
    previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null
    document.body.style.overflow='hidden'
    dialogRef.current?.focus()
    const handleKey=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){onClose();return}
      if(event.key!=='Tab'||!dialogRef.current)return
      const focusable=Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if(!focusable.length){event.preventDefault();dialogRef.current.focus();return}
      const first=focusable[0];const last=focusable[focusable.length-1]
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
    addEventListener('keydown',handleKey)
    return()=>{document.body.style.overflow=previous;removeEventListener('keydown',handleKey);previousFocus.current?.focus()}
  },[onClose])

  return <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-5" role="presentation" onMouseDown={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}}>
    <motion.section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title" onMouseDown={event=>event.stopPropagation()} className="contact-dialog-copy relative w-full max-w-[430px] rounded-[30px] border-2 border-[#DCCEF1] bg-white px-7 pb-8 pt-9 text-black shadow-[0_24px_70px_rgba(51,30,72,.24)] outline-none sm:px-9 sm:pb-10 sm:pt-11" initial={{y:18,scale:.97}} animate={{y:0,scale:1}} exit={{y:12,scale:.98}} transition={{duration:.28,ease:[.16,1,.3,1]}}>
      <button type="button" onClick={onClose} aria-label="关闭联系方式" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F1EAF9] text-[#4C385C] transition-colors hover:bg-[#E8DDF4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E6FA8]"><X size={18}/></button>
      <p className="mb-2 text-sm text-[#765C8E]">保持联系</p>
      <h2 id="contact-dialog-title" className="text-3xl leading-tight sm:text-4xl">联系我</h2>
      <dl className="mt-7 space-y-4">
        <div className="rounded-2xl bg-[#FAF8FC] px-5 py-4"><dt className="text-sm text-[#765C8E]">邮箱</dt><dd className="mt-1 break-all text-lg text-black sm:text-xl">{email}</dd></div>
        <div className="rounded-2xl bg-[#FAF8FC] px-5 py-4"><dt className="text-sm text-[#765C8E]">电话</dt><dd className="mt-1 text-lg text-black sm:text-xl">{phone}</dd></div>
      </dl>
    </motion.section>
  </motion.div>
}

function Magnet({children}:{children:ReactNode}){
  const ref=useRef<HTMLDivElement>(null); const [pos,setPos]=useState({x:0,y:0})
  const move=(e:MouseEvent)=>{ const r=ref.current?.getBoundingClientRect(); if(r)setPos({x:(e.clientX-r.left-r.width/2)/3,y:(e.clientY-r.top-r.height/2)/3}) }
  return <div ref={ref} onMouseMove={move} onMouseLeave={()=>setPos({x:0,y:0})} style={{transform:`translate3d(${pos.x}px,${pos.y}px,0)`,transition:pos.x||pos.y?'transform .3s ease-out':'transform .6s ease-in-out',willChange:'transform'}}>{children}</div>
}

function Hero({onContact}:{onContact:()=>void}){ return <section className="relative flex h-screen min-h-[680px] flex-col overflow-x-clip px-6 md:px-10">
  <FadeIn as="nav" y={-20} className="z-30 flex justify-between pt-6 text-sm font-medium uppercase tracking-wider md:pt-8 md:text-lg lg:text-[1.4rem]">{[['关于','#about'],['能力','#services'],['项目','#projects']].map(([label,href])=><a key={label} className="transition-opacity hover:opacity-70" href={href}>{label}</a>)}<button type="button" onClick={onContact} aria-haspopup="dialog" className="transition-opacity hover:opacity-70">联系</button></FadeIn>
  <FadeIn delay={.15} y={40} className="z-0 mt-6 overflow-hidden sm:mt-4 md:-mt-3"><h1 className="hero-heading w-full whitespace-nowrap text-[10.4vw] font-black uppercase leading-none tracking-tight sm:text-[12.2vw] md:text-[12.4vw] lg:text-[12.7vw]">Hi, i&apos;m waris</h1></FadeIn>
  <FadeIn delay={.6} y={30} className="avatar-mask absolute bottom-0 left-1/2 z-10 w-[300px] sm:w-[390px] md:w-[470px] lg:w-[540px]"><div className="-translate-x-1/2"><Magnet><img className="avatar-image w-full select-none" src={asset('images/waris-avatar.png')} alt="阿卜杜瓦日斯的Q版3D头像"/></Magnet></div></FadeIn>
  <div className="relative z-20 mt-auto flex items-end justify-between gap-3 pb-7 sm:pb-8 md:pb-10"><FadeIn delay={.35} y={20}><p className="max-w-[155px] text-[clamp(.68rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide sm:max-w-[240px] md:max-w-[290px]">一名专注玩法系统、实时交互与工程实现的游戏程序开发者</p></FadeIn><FadeIn delay={.5} y={20} className="shrink-0"><ContactButton onOpen={onContact}/></FadeIn></div>
  </section> }

function Marquee(){
  const ref=useRef<HTMLElement>(null); const [offset,setOffset]=useState(0)
  useEffect(()=>{const update=()=>setOffset((scrollY-(ref.current?.offsetTop??0)+innerHeight)*.3);update();addEventListener('scroll',update,{passive:true});return()=>removeEventListener('scroll',update)},[])
  const row=(items:string[],dir:1|-1)=><div className="overflow-hidden"><div className="marquee-track flex gap-3" style={{transform:`translate3d(${dir*(offset-200)}px,0,0)`,willChange:'transform'}}>{[...items,...items,...items].map((url,i)=><img key={`${url}-${i}`} src={url} loading="lazy" alt="动态视觉参考" className="h-[190px] w-[295px] flex-none rounded-2xl object-cover sm:h-[230px] sm:w-[355px] md:h-[270px] md:w-[420px]"/>)}</div></div>
  return <section ref={ref} className="relative space-y-3 pb-10 pt-24 sm:pt-32 md:pt-40">{row(gifs.slice(0,11),1)}{row(gifs.slice(11),-1)}</section>
}

function AnimatedText({text}:{text:string}){ const ref=useRef<HTMLParagraphElement>(null); const {scrollYProgress}=useScroll({target:ref,offset:['start .8','end .2']}); return <p ref={ref} className="max-w-[620px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed">{text.split('').map((v,i)=><Char key={i} value={v} index={i} total={text.length} progress={scrollYProgress}/>)}</p> }
function Char({value,index,total,progress}:{value:string;index:number;total:number;progress:MotionValue<number>}){const opacity=useTransform(progress,[index/total,Math.min(1,index/total+.08)],[.2,1]);return <motion.span style={{opacity}}>{value}</motion.span>}

function About({onContact}:{onContact:()=>void}){ return <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10">{decor.map(([url,classes,x,delay])=><FadeIn key={url} x={x} y={0} delay={delay} duration={.9} className={`absolute ${classes}`}><img src={url} alt=""/></FadeIn>)}<div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16"><FadeIn y={40}><h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">关于我</h2></FadeIn><AnimatedText text="我是阿卜杜瓦日斯，南京大学通信工程本科生，正在把嵌入式、实时系统和通信经验迁移到游戏客户端开发。我关注数据驱动玩法、状态机、性能优化与可靠交互，希望让复杂系统最终变成清晰而有趣的玩家体验。"/><div className="pt-6 sm:pt-10 md:pt-12"><ContactButton onOpen={onContact}/></div></div></section> }

const services=[
  ['C / C# 程序基础','能够使用 C 与 C# 完成模块拆分、数据结构设计、状态管理和基础面向对象实现。'],
  ['STM32 与外设开发','使用 CubeMX、HAL 与 Keil 配置 GPIO、ADC、I2C、PWM 和定时任务，完成多传感器采集。'],
  ['软硬件联调','完成称重、温湿度、水位、光电检测、舵机、继电器与水泵的接线、驱动和问题定位。'],
  ['通信与数据交互','具备串口、WiFi 和小程序数据交互经验，并在继续学习游戏网络同步与可靠传输。'],
  ['工程工具与交付','使用 Git、Unity、Keil 与调试工具管理项目，可整理 README、测试记录和 WebGL 演示版本。'],
]
function Services(){return <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"><FadeIn><h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none sm:mb-20 md:mb-28">能力</h2></FadeIn><div className="mx-auto max-w-5xl border-t border-black/15">{services.map(([name,desc],i)=><FadeIn key={name} delay={i*.1} className="grid grid-cols-[90px_1fr] gap-6 border-b border-black/15 py-8 sm:grid-cols-[150px_1fr] sm:py-10 md:grid-cols-[220px_1fr] md:py-12"><span className="text-[clamp(3rem,10vw,8.75rem)] font-black leading-none">0{i+1}</span><div className="self-center"><h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{name}</h3><p className="mt-3 max-w-2xl text-[clamp(.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{desc}</p></div></FadeIn>)}</div></section>}

function ProjectCard({project,index,progress,onOpen}:{project:typeof projects[number];index:number;progress:MotionValue<number>;onOpen:()=>void}){const scale=useTransform(progress,[index/projects.length,1],[1,1-(projects.length-1-index)*.03]);return <div className="relative h-[85vh]"><motion.article style={{scale,top:96+index*28}} className="project-card sticky min-h-[72vh] overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"><div className="mb-6 grid grid-cols-[auto_1fr] items-end gap-4 md:grid-cols-[auto_1fr_auto]"><span className="hero-heading text-[clamp(3rem,9vw,8rem)] font-black leading-none">0{index+1}</span><div><p className="text-xs uppercase tracking-[.18em] text-[#D7E2EA]/55">{project.category}</p><h3 className="text-[clamp(1.3rem,3vw,3.3rem)] font-medium uppercase">{project.name}</h3></div><button type="button" onClick={onOpen} aria-haspopup="dialog" aria-label={`查看${project.name}项目详情`} className="col-span-2 mt-2 inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-7 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10 md:col-span-1 md:mt-0">{project.status}<ArrowUpRight size={16}/></button></div><div className="grid h-[48vh] grid-cols-[40%_60%] gap-3"><div className="grid grid-rows-[42%_58%] gap-3"><img className="h-full w-full rounded-[30px] object-cover sm:rounded-[40px]" src={project.images[0]} alt={`${project.name}项目图一`}/><img className="h-full w-full rounded-[30px] object-cover sm:rounded-[40px]" src={project.images[1]} alt={`${project.name}项目图二`}/></div><img className="h-full w-full rounded-[30px] object-cover sm:rounded-[40px]" src={project.images[2]} alt={`${project.name}项目画面`}/></div></motion.article></div>}

function ProjectDetail({index,onClose}:{index:number;onClose:()=>void}){
  const project=projects[index]
  const dialogRef=useRef<HTMLElement>(null)
  const previousFocus=useRef<HTMLElement|null>(null)
  useEffect(()=>{
    const previous=document.body.style.overflow
    previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null
    document.body.style.overflow='hidden'
    dialogRef.current?.focus()
    const handleKey=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){onClose();return}
      if(event.key!=='Tab'||!dialogRef.current)return
      const focusable=Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if(!focusable.length){event.preventDefault();dialogRef.current.focus();return}
      const first=focusable[0];const last=focusable[focusable.length-1]
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
    addEventListener('keydown',handleKey)
    return()=>{document.body.style.overflow=previous;removeEventListener('keydown',handleKey);previousFocus.current?.focus()}
  },[onClose])

  const isShelter=index===0
  const isPet=index===1
  return <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6" role="presentation" onMouseDown={onClose} initial={{opacity:.85}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.22}}>
    <motion.section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onMouseDown={event=>event.stopPropagation()} className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#F7F7F7] text-[#0C0C0C] outline-none" initial={{y:24,scale:.98}} animate={{y:0,scale:1}} exit={{y:18,scale:.98}} transition={{duration:.3,ease:[.16,1,.3,1]}}>
      <div className="overflow-y-auto">
        <header className="border-b border-black/15 px-6 py-7 sm:px-10 sm:py-9">
          <p className="mb-3 text-sm font-medium text-black/55">{project.category}</p>
          <h2 id="project-detail-title" className="max-w-4xl text-balance text-[clamp(2rem,5vw,4.7rem)] font-semibold leading-[1.04] tracking-[-.035em]">{project.name}</h2>
        </header>
        {isShelter?<ShelterDetail/>:isPet?<PetCareDetail/>:<EmptyProjectDetail name={project.name}/>}
      </div>
      <div className="flex shrink-0 justify-center border-t border-black/15 bg-white px-6 py-4">
        <button type="button" onClick={onClose} aria-label="关闭项目简介" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0C0C0C] text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"><X size={24}/></button>
      </div>
    </motion.section>
  </motion.div>
}

const shelterScreens=[
  {src:'images/shelter/start-menu.png',alt:'从零开始的庇护所生活启动四选项界面',label:'启动界面',caption:'补丁帆布卷宗四入口，保留新游戏、继续游戏、任务说明与游戏设置。'},
  {src:'images/shelter/onboarding-1.png',alt:'开场引导第一页，活下来只是第一步',label:'引导 1 / 3',caption:'交代感染爆发后的外部威胁与庇护所现状。'},
  {src:'images/shelter/onboarding-2.png',alt:'开场引导第二页，把这里变成一个家',label:'引导 2 / 3',caption:'把搜索、制作、外出搜集与守住第一夜串成可理解的目标链。'},
  {src:'images/shelter/onboarding-3.png',alt:'开场引导第三页，基础操作',label:'引导 3 / 3',caption:'集中说明移动、奔跑、交互、开门、背包与应急维修操作。'},
]

function ShelterDetail(){return <div className="px-6 py-8 sm:px-10 sm:py-12">
  <div className="grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
    <div><h3 className="text-2xl font-medium sm:text-3xl">把一间残破住宅，做成可守住第一夜的家</h3><p className="mt-5 max-w-[68ch] text-pretty text-base font-light leading-8 text-black/70">这是一个以 17～22 分钟垂直切片为目标的末日生存 Demo。当前已经把启动、三页引导、搜索、制作、设施修复、施工与夜袭流程接入正式界面，并持续把庇护所从灰盒替换为可验证的半写实场景。</p></div>
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-black/20 pt-5 lg:border-t-0 lg:pt-0"><div><dt className="text-sm text-black/50">引擎</dt><dd className="mt-1 font-medium">团结 1.9.3</dd></div><div><dt className="text-sm text-black/50">技术基线</dt><dd className="mt-1 font-medium">Unity 2022.3 · Built-in</dd></div><div><dt className="text-sm text-black/50">目标流程</dt><dd className="mt-1 font-medium">17～22 分钟</dd></div><div><dt className="text-sm text-black/50">更新日期</dt><dd className="mt-1 font-medium">2026.09.15</dd></div></dl>
  </div>

  <section className="mt-12" aria-labelledby="shelter-onboarding-title">
    <div className="flex flex-col gap-3 border-t border-black/15 pt-7 sm:flex-row sm:items-end sm:justify-between"><div><h3 id="shelter-onboarding-title" className="text-2xl font-medium">玩家进入游戏的第一分钟</h3><p className="mt-2 max-w-2xl font-light leading-7 text-black/60">启动界面与三页引导均来自正式 1920×1080 图形取证。</p></div><span className="text-sm tabular-nums text-black/45">4 个已完成界面</span></div>
    <div className="mt-7 grid gap-5 md:grid-cols-2">{shelterScreens.map(screen=><figure key={screen.src}><img className="aspect-video w-full rounded-xl bg-black object-cover" src={asset(screen.src)} alt={screen.alt}/><figcaption className="mt-3 flex gap-4"><strong className="shrink-0 text-sm font-medium">{screen.label}</strong><span className="text-sm leading-6 text-black/55">{screen.caption}</span></figcaption></figure>)}</div>
  </section>

  <section className="mt-14" aria-labelledby="shelter-progress-title">
    <div className="grid gap-5 border-t border-black/15 pt-7 md:grid-cols-[1fr_auto] md:items-end"><div><h3 id="shelter-progress-title" className="text-2xl font-medium">庇护所最新实装进度</h3><p className="mt-2 max-w-2xl font-light leading-7 text-black/60">以下使用 9 月 14～15 日正式验收图。已排除旧版斜俯视布局与旧功能区排列。</p></div><span className="text-sm tabular-nums text-black/45">最新取证 · 2026.09.15</span></div>
    <figure className="mt-7"><img className="aspect-video w-full rounded-xl bg-black object-cover" src={asset('images/shelter/shelter-overview.png')} alt="2026年9月15日庇护所最新正式透视总览"/><figcaption className="mt-3 text-sm leading-6 text-black/55">最新总览：墙地交界、功能分区与室内通路已按新布局重新验收。</figcaption></figure>
    <div className="mt-5 grid gap-5 md:grid-cols-2">
      <figure><img className="aspect-video w-full rounded-xl bg-black object-cover" src={asset('images/shelter/shelter-work-area.png')} alt="庇护所西北工作区与通路最新画面"/><figcaption className="mt-3 text-sm leading-6 text-black/55">西北工作区：工作台、发电机、储物与行走空间的当前布局。</figcaption></figure>
      <figure><img className="aspect-video w-full rounded-xl bg-black object-cover" src={asset('images/shelter/shelter-generator.png')} alt="庇护所发电机与工作台正式场景近景"/><figcaption className="mt-3 text-sm leading-6 text-black/55">设施近景：发电机与工作台完成半写实实体和材质校准。</figcaption></figure>
    </div>
    <figure className="mt-5"><img className="aspect-video w-full rounded-xl bg-black object-cover" src={asset('images/shelter/shelter-medical.png')} alt="庇护所医疗台正式场景近景"/><figcaption className="mt-3 text-sm leading-6 text-black/55">医疗区近景：医疗台模型、摆位与材质已完成正式验收。</figcaption></figure>
  </section>

  <div className="mt-12 grid gap-8 border-y border-black/15 py-8 md:grid-cols-3"><div><h3 className="text-lg font-medium">已落地流程</h3><p className="mt-3 font-light leading-7 text-black/65">启动与引导、搜索揭示、背包事务、工作台制作、门体施工、设施检视、阶段叙事与结算。</p></div><div><h3 className="text-lg font-medium">工程重点</h3><p className="mt-3 font-light leading-7 text-black/65">数据驱动定义、状态机、输入锁、存档检查点、正式场景自检与多分辨率图形验证。</p></div><div><h3 className="text-lg font-medium">当前阶段</h3><p className="mt-3 font-light leading-7 text-black/65">核心闭环和正式 UI 已建立，正在继续收束环境材质、角色动作与最终体验证据。</p></div></div>
  <p className="mt-6 text-sm leading-6 text-black/50">证据边界：页面只陈述项目目录中已有代码、验收记录和正式截图能够支持的进度；不把效果图当作实机，也不把尚未完成的最终盲测与发布状态写成已完成。</p>
</div>}

function PetCareDetail(){return <div className="px-6 py-8 sm:px-10 sm:py-12">
  <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
    <div><h3 className="text-2xl font-medium sm:text-3xl">从功能原型到可验证的可靠通信</h3><p className="mt-5 max-w-[68ch] text-pretty text-base font-light leading-8 text-black/70">原型以 STM32H563ZI 连接重量、水位、温湿度与靠近检测，通过舵机、继电器和水泵完成自动喂粮、补水。升级版进一步把串口帧、应答重试、幂等控制、非阻塞 MQTT 重连和离线队列拆成可独立测试的模块。</p></div>
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-black/20 pt-5 lg:border-t-0 lg:pt-0"><div><dt className="text-sm text-black/50">主控</dt><dd className="mt-1 font-medium">STM32H563ZI</dd></div><div><dt className="text-sm text-black/50">无线侧</dt><dd className="mt-1 font-medium">ESP8266 / MQTT</dd></div><div><dt className="text-sm text-black/50">离线测试</dt><dd className="mt-1 font-medium">C++17 · 已通过</dd></div><div><dt className="text-sm text-black/50">硬件状态</dt><dd className="mt-1 font-medium">待重接验证</dd></div></dl>
  </div>
  <img className="mt-10 h-[320px] w-full rounded-xl object-cover object-center sm:h-[500px]" src={asset('images/pet-care/system-overview.jpg')} alt="智能宠物照护系统整体实物"/>
  <div className="mt-4 grid gap-4 md:grid-cols-2"><img className="h-[320px] w-full rounded-xl object-cover sm:h-[440px]" src={asset('images/pet-care/system-wiring.jpg')} alt="STM32 与传感器完整接线"/><img className="h-[320px] w-full rounded-xl object-contain bg-[#E9EDF3] sm:h-[440px]" src={asset('images/pet-care/miniapp-control.jpg')} alt="微信小程序远程控制界面"/></div>
  <div className="mt-10 grid gap-8 border-t border-black/15 pt-8 md:grid-cols-2"><div><h3 className="text-xl font-medium">可靠性链路</h3><p className="mt-3 text-pretty font-light leading-7 text-black/65">UART 使用“版本、类型、序号、长度、载荷、CRC16”明确成帧；控制命令通过 ACK、超时重试和重复序号去重避免误执行。网络不可用时，采集循环继续运行，遥测进入有界队列并采用丢弃最旧数据的明确策略。</p></div><div><h3 className="text-xl font-medium">故障覆盖</h3><ul className="mt-3 space-y-2 font-light leading-7 text-black/65"><li>CRC 错误、半包、粘包与噪声恢复</li><li>丢 ACK、重复命令、乱序与重试</li><li>断网重连、队列溢出与重启恢复</li></ul></div></div>
  <dl className="mt-10 grid gap-6 border-y border-black/15 py-7 sm:grid-cols-3"><div><dt className="text-sm text-black/50">主机侧验证</dt><dd className="mt-2 text-lg font-medium">全部测试通过</dd></div><div><dt className="text-sm text-black/50">ESP8266 构建</dt><dd className="mt-2 text-lg font-medium">PlatformIO 通过</dd></div><div><dt className="text-sm text-black/50">资源占用</dt><dd className="mt-2 text-lg font-medium">RAM 34.4% · Flash 25.5%</dd></div></dl>
  <p className="mt-6 text-sm leading-6 text-black/50">证据边界：以上结果来自无凭据的本地可靠性实验室。原项目保持私有；真实硬件端到端、云端服务与小程序回归将在重新接线后单独记录，不以模拟结果替代。</p>
</div>}

function EmptyProjectDetail({name}:{name:string}){return <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center"><span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-black/20"><ArrowUpRight size={25}/></span><h3 className="text-2xl font-medium">详情页结构已建立</h3><p className="mt-3 max-w-md font-light leading-7 text-black/55">{name}的项目说明、开发记录和实机素材将在内容整理完成后补充。</p></div>}

function Projects(){const ref=useRef<HTMLElement>(null);const [active,setActive]=useState<number|null>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});return <><section ref={ref} id="projects" className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-28"><FadeIn><h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none">项目</h2></FadeIn>{projects.map((p,i)=><ProjectCard key={p.name} project={p} index={i} progress={scrollYProgress} onOpen={()=>setActive(i)}/>)}</section><AnimatePresence>{active!==null&&<ProjectDetail index={active} onClose={()=>setActive(null)}/>}</AnimatePresence></>}

function PortfolioCapture(){return <main className="min-h-screen bg-[#0C0C0C] px-4 py-8 text-[#0C0C0C] sm:px-8 md:px-12 md:py-12"><section className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#F7F7F7]"><header className="border-b border-black/15 px-6 py-8 sm:px-10 sm:py-10"><p className="mb-3 text-sm font-medium text-black/55">UNITY / GAMEPLAY · 最新进度</p><h1 className="max-w-4xl text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-.035em]">从零开始的庇护所生活</h1></header><ShelterDetail/><footer className="border-t border-black/15 px-6 py-7 text-sm text-black/50 sm:px-10">WARIS · GAME DEVELOPMENT PORTFOLIO · 2026.09.15</footer></section></main>}

function App(){const capture=new URLSearchParams(window.location.search).get('capture');const [contactOpen,setContactOpen]=useState(false);if(capture==='shelter')return <PortfolioCapture/>;const openContact=()=>setContactOpen(true);return <main className="overflow-x-clip bg-[#0C0C0C]"><Hero onContact={openContact}/><Marquee/><About onContact={openContact}/><Services/><Projects/><footer id="contact" className="flex flex-col items-center gap-6 px-6 py-24 text-center"><p className="text-2xl font-medium uppercase sm:text-4xl">一起构建下一个可玩系统</p><div className="flex gap-5"><button type="button" onClick={openContact} aria-label="查看联系方式" aria-haspopup="dialog"><Mail/></button><a aria-label="GitHub" href={github} target="_blank" rel="noreferrer"><Github/></a></div><small className="text-[#D7E2EA]/45">© 2026 WARIS · GAME DEVELOPMENT PORTFOLIO</small></footer><AnimatePresence>{contactOpen&&<ContactDialog onClose={()=>setContactOpen(false)}/>}</AnimatePresence></main>}
export default App
