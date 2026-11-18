import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Expand, Mail, X } from 'lucide-react'
import { caseStudies, type CaseStudy, type Frame } from './data/case-studies'
import './portfolio.css'

const email = '905192391@qq.com'
const phone = '13579496466'
const portrait = 'images/waris-avatar.png'
const scope = globalThis as typeof globalThis & { portfolioImages?: Record<string, string> }
const asset = (file: string) => scope.portfolioImages?.[file] ?? `${import.meta.env.BASE_URL}${file}`
const routeFor = (project: CaseStudy) => `#project/${project.id}`
const currentRoute = () => window.location.hash

function Popup({ title, children, large = false, onClose }: {
  title: string; children: ReactNode; large?: boolean; onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const node = dialog.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    node?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      node?.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog ref={dialog} className={large ? 'popup image-popup' : 'popup contact-popup'} aria-label={title}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="popup-content">
        <button type="button" className="icon-button close-popup" autoFocus onClick={onClose} aria-label="关闭">
          <X size={20} />
        </button>
        {children}
      </div>
    </dialog>
  )
}

function ProjectFacts({ project }: { project: CaseStudy }) {
  return <dl className="project-facts">
    <div><dt>职责</dt><dd>{project.role}</dd></div>
    <div><dt>技术</dt><dd>{project.stack}</dd></div>
    <div><dt>进度</dt><dd>{project.status}</dd></div>
    <div><dt>时间</dt><dd>{project.period}</dd></div>
  </dl>
}

function ProjectLink({ project, feature = false }: { project: CaseStudy; feature?: boolean }) {
  return (
    <article className={feature ? 'feature project-entry' : 'project-entry secondary-project'}>
      <div className="project-entry-copy">
        <p className="project-category">{project.category}</p>
        <h3><a href={routeFor(project)}>{project.title}</a></h3>
        {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
        <p className="project-description">{project.summary}</p>
        {feature ? <ProjectFacts project={project} /> : (
          <p className="project-meta">{project.role} <span> / </span> {project.stack} <span> / </span> {project.status}</p>
        )}
        <span className="entry-action" aria-hidden="true">查看项目 <ArrowUpRight size={17} /></span>
      </div>
      {feature && project.cover && (
        <figure className="feature-media">
          <img src={asset(project.cover.file)} alt={project.cover.title} loading="lazy" />
          <figcaption>庇护所实机画面 · 2026.11.18</figcaption>
        </figure>
      )}
    </article>
  )
}

function Home({ onContact }: { onContact: () => void }) {
  return <main id="main" tabIndex={-1}>
    <section className="shell hero" aria-labelledby="hero-title">
      <h1 id="hero-title">HI, I'M WARIS<span>.</span></h1>
      <div className="hero-stage">
        <img className="portrait" src={asset(portrait)} alt="Waris 的头像" fetchPriority="high" />
        <div className="hero-intro">
          <p className="hero-name">阿卜杜瓦日斯</p>
          <p>游戏客户端开发<br />实时交互与工程实现</p>
          <a className="text-link hero-scroll" href="#projects">浏览项目 <ArrowDown size={16} /></a>
        </div>
        <button type="button" className="contact-button" onClick={onContact} aria-haspopup="dialog">联系我 <Mail size={18} /></button>
      </div>
    </section>
    <section id="projects" className="shell project-directory" aria-labelledby="project-heading">
      <header className="section-head"><h2 id="project-heading">项目</h2><p>游戏客户端 / 实时通信 / 嵌入式</p></header>
      <ProjectLink project={caseStudies[0]} feature />
      <div className="secondary-list">{caseStudies.slice(1).map((project) => <ProjectLink key={project.id} project={project} />)}</div>
    </section>
    <section id="about" className="shell about" aria-labelledby="about-heading">
      <h2 id="about-heading">关于我</h2>
      <div>
        <p className="about-lead">我是阿卜杜瓦日斯，南京大学通信工程本科生。我主要做游戏客户端和玩法系统，也开发实时音视频与嵌入式原型。</p>
        <dl id="skills" className="skills">
          <div><dt>玩法与系统</dt><dd>C#、团结 / Unity、NavMesh、存档、交互界面</dd></div>
          <div><dt>实时通信</dt><dd>Go、WebRTC、H.264、Opus、网络统计</dd></div>
          <div><dt>嵌入式</dt><dd>C/C++、STM32、UART、MQTT、故障注入</dd></div>
        </dl>
      </div>
    </section>
  </main>
}

function Gallery({ frames, onExpand }: { frames: Frame[]; onExpand: (frame: Frame) => void }) {
  return <div className={frames.length === 1 ? 'gallery gallery-single' : 'gallery'}>
    {frames.map((frame) => (
      <figure key={frame.file} className="frame">
        <button type="button" className="frame-button" onClick={() => onExpand(frame)}
          aria-label={`放大${frame.title}`} aria-haspopup="dialog">
          <img src={asset(frame.file)} alt={frame.title} loading="lazy" />
          <span className="expand-mark" aria-hidden="true"><Expand size={17} /></span>
        </button>
        <figcaption><strong>{frame.title}</strong><span>{frame.note}</span></figcaption>
      </figure>
    ))}
  </div>
}

function Detail({ project, onExpand }: { project: CaseStudy; onExpand: (frame: Frame) => void }) {
  const sections = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  useEffect(() => {
    function syncSection() {
      const index = sections.current.findLastIndex((section) => section && section.getBoundingClientRect().top <= 150)
      setActive(Math.max(0, index))
    }
    syncSection()
    window.addEventListener('scroll', syncSection, { passive: true })
    window.addEventListener('resize', syncSection)
    return () => {
      window.removeEventListener('scroll', syncSection)
      window.removeEventListener('resize', syncSection)
    }
  }, [])

  return <main id="main" tabIndex={-1} className="case-page">
    <header className="shell case-header enter">
      <a href="#projects" className="text-link"><ArrowLeft size={17} /> 返回项目</a>
      <h1 tabIndex={-1} id="route-heading">{project.title}</h1>
      {project.subtitle && <p className="case-subtitle">{project.subtitle}</p>}
      <p className="case-summary">{project.summary}</p>
      <ProjectFacts project={project} />
    </header>
    <div className="shell case-layout">
      <nav className="case-nav" aria-label="项目章节">
        <h2>阅读目录</h2>
        <div className="case-nav-items">
          {project.sections.map((section, index) => (
            <button key={section.title} type="button" aria-current={active === index ? 'location' : undefined}
              onClick={() => {
                sections.current[index]?.scrollIntoView()
                sections.current[index]?.querySelector('h2')?.focus({ preventScroll: true })
              }}>{section.title}</button>
          ))}
        </div>
      </nav>
      <article className="case-body">
        {project.sections.map((section, index) => (
          <section className="case-section" key={section.title} ref={(node) => { sections.current[index] = node }}>
            <h2 tabIndex={-1}>{section.title}</h2>
            <p>{section.body}</p>
            {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
            {section.frames && <Gallery frames={section.frames} onExpand={onExpand} />}
          </section>
        ))}
        <a className="text-link case-return" href="#projects">返回所有项目 <ArrowRight size={16} /></a>
      </article>
    </div>
  </main>
}

export default function Portfolio() {
  const [route, setRoute] = useState(currentRoute)
  const [contact, setContact] = useState(false)
  const [frame, setFrame] = useState<Frame | null>(null)
  const project = caseStudies.find((item) => route === routeFor(item))
  const previousProject = useRef(project?.id)

  useEffect(() => {
    const syncRoute = () => { setRoute(currentRoute()); setFrame(null) }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    document.title = project ? `${project.title} · Waris` : 'Waris · 开发作品集'
    if (project) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('route-heading')?.focus({ preventScroll: true })
    } else if (route) {
      const target = document.getElementById(route.slice(1))
      target?.scrollIntoView({ behavior: previousProject.current ? 'instant' : 'auto' })
      if (previousProject.current && target) {
        const heading = target.querySelector('h2')
        heading?.setAttribute('tabindex', '-1')
        heading?.focus({ preventScroll: true })
      }
    } else if (previousProject.current) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    previousProject.current = project?.id
  }, [project, route])

  const openContact = () => setContact(true)
  return <>
    <a className="skip-link" href="#main" onClick={(event) => {
      event.preventDefault()
      const main = document.getElementById('main')
      main?.focus({ preventScroll: true })
      main?.scrollIntoView({ behavior: 'instant' })
    }}>跳转到正文</a>
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href="#" aria-label="Waris 首页">Waris<span>.</span></a>
        <nav aria-label="主导航">
          <a href="#projects">项目</a><a href="#about">关于</a><a href="#skills">能力</a>
          <button type="button" onClick={openContact} aria-haspopup="dialog">联系</button>
        </nav>
      </div>
    </header>
    {project ? <Detail key={project.id} project={project} onExpand={setFrame} /> : <Home onContact={openContact} />}
    <footer className="shell footer">
      <p>阿卜杜瓦日斯 <span>·</span> Waris</p>
      <div><button type="button" className="text-link" onClick={openContact} aria-haspopup="dialog">联系我 <Mail size={16} /></button>
        <a className="text-link" href="https://github.com/waris644" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a></div>
    </footer>
    {contact && <Popup title="联系我" onClose={() => setContact(false)}>
      <h2>联系我</h2>
      <dl><div><dt>邮箱</dt><dd>{email}</dd></div><div><dt>电话</dt><dd>{phone}</dd></div></dl>
    </Popup>}
    {frame && <Popup title={frame.title} large onClose={() => setFrame(null)}>
      <figure><img src={asset(frame.file)} alt={frame.title} /><figcaption>{frame.title} <span>· {frame.note}</span></figcaption></figure>
    </Popup>}
  </>
}
