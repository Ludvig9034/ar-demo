/** @jsx React.createElement */
// Sticky scroll narrative with phone mock + tabs — reused for KiMs + Harboe

const CaseStudyBlock = ({ section, label, headline, intro, scrollText, content, scenes, accentMeta, isFirst, cover }) => {
  const ref = React.useRef(null);
  const isMobile = useWindowWidth() < 768;
  // Custom: progress while the sticky pane is pinned (parent's top from 0 to -(parentHeight - vh))
  const [stickyP, setStickyP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const on = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const pinRange = r.height - vh; // distance over which sticky is pinned
      if (pinRange <= 0) { setStickyP(0); return; }
      // -r.top goes from 0 (entry) to pinRange (exit)
      const raw = (-r.top) / pinRange;
      setStickyP(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    on();
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  const tabs = ['Målet', 'AR oplevelsen', 'Resultatet'];
  const activeTab = stickyP < 0.34 ? 0 : stickyP < 0.67 ? 1 : 2;
  const c = content[activeTab];

  return (
    <section ref={ref} style={{
      position: 'relative', background: '#000',
      borderTop: isFirst ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.18)',
    }}>
      <div style={{ position: 'relative', height: isMobile ? '300vh' : '380vh' }}>
        {/* Sticky wrapper fills full viewport width */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <div style={{
          height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isMobile ? '60px 20px 20px' : '80px 32px 40px',
          maxWidth: 1600, margin: '0 auto',
          boxSizing: 'border-box',
        }}>
          {/* Compact section header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 12 : 64, alignItems: 'end',
            paddingBottom: isMobile ? 16 : 28,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            marginBottom: isMobile ? 20 : 32,
          }}>
            <div>
              <div style={{
                fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
                <span style={{ color: '#3370FF' }}>{section}</span> · CASE STUDY
              </div>
              <h2 style={{
                margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
                fontSize: isMobile ? 'clamp(32px, 8vw, 56px)' : 'clamp(40px, 5.2vw, 84px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#fff',
                display: 'flex', flexWrap: 'wrap', gap: '0 0.3em',
              }}>
                {headline.map((line, i) => <span key={i}>{line}</span>)}
              </h2>
            </div>
            {!isMobile && (
              <div style={{ paddingBottom: 6 }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 12 }}>
                  {label}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: '46ch' }}>
                  {scrollText}
                </p>
              </div>
            )}
          </div>

          {/* Phone + tab content */}
          <div style={{
            flex: 1, display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            alignItems: 'center', gap: isMobile ? 20 : 64, minHeight: 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
              <PhoneMock activeTab={activeTab} scenes={scenes} isMobile={isMobile}/>
            </div>

            <div>
              <div style={{ display: 'flex', gap: 2, marginBottom: isMobile ? 20 : 36, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                {tabs.map((t, i) => (
                  <div key={t} style={{
                    flex: 1, padding: isMobile ? '10px 4px' : '14px 8px', textAlign: 'left',
                    fontFamily: 'Space Mono, monospace', fontSize: isMobile ? 9 : 11, letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: activeTab === i ? '#fff' : 'rgba(255,255,255,0.35)',
                    position: 'relative', transition: 'color 400ms',
                  }}>
                    <span style={{ opacity: 0.5, marginRight: 4 }}>0{i+1}</span>
                    {t}
                    {activeTab === i && (
                      <span style={{ position: 'absolute', bottom: -1, left: 0, height: 1, width: '100%', background: '#fff' }}/>
                    )}
                  </div>
                ))}
              </div>

              <div key={activeTab} style={{ animation: 'fadeSlide 600ms cubic-bezier(0.22,1,0.36,1)' }}>
                <h3 style={{
                  margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
                  fontSize: isMobile ? 'clamp(22px, 5vw, 36px)' : 'clamp(28px, 3.4vw, 52px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff',
                }}>
                  {c.head}
                </h3>
                <p style={{
                  marginTop: isMobile ? 12 : 22, fontFamily: 'Inter, sans-serif',
                  fontSize: isMobile ? 13 : 15, lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.72)', maxWidth: '52ch',
                }}>
                  {c.body}
                </p>

                <div style={{ marginTop: isMobile ? 16 : 28, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  {c.meta.map(([k, v]) => (
                    <div key={k} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.15)',
                      fontFamily: 'Space Mono, monospace', fontSize: isMobile ? 10 : 11,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{k}</span>
                      <span style={{ color: '#fff' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: isMobile ? 16 : 32, display: 'flex', gap: 4 }}>
                {tabs.map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 2,
                    background: i <= activeTab ? '#3370FF' : 'rgba(255,255,255,0.2)',
                    boxShadow: i <= activeTab ? '0 0 6px rgba(51,112,255,0.6)' : 'none',
                    transition: 'background 400ms',
                  }}/>
                ))}
              </div>
            </div>
          </div>
        </div>{/* inner centering div */}
        </div>{/* sticky wrapper */}
      </div>{/* scroll container */}

      <style>{`
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
};

const CaseStudy = () => (
  <>
    <CaseStudyBlock isFirst section="05"
      cover="assets/KiMs x Martin Jensen_Cover.png"
      label="Remix kampagne"
      headline={['KIMs×','Martin','Jensen']}
      scrollText="Scroll for at se forløbet. Fra ambition til resultater."
      content={[
        { head: 'Danmarks mest innovative brand',
          body: 'Hos KiMs handler innovation ikke kun om smag, men også om oplevelser. Som de første i den danske FMCG-branche lancerede KiMs en nyskabende Augmented Reality-kampagne i samarbejde med DJ og producer Martin Jensen.',
          meta: [['MÅL', 'FMCG-aktivering'], ['PERIODE', '2024'], ['MEDIE', 'Emballage + Web']] },
        { head: 'Ekstraordinær kundeoplevelse',
          body: 'Ved at scanne Remix-chipsposerne åbner forbrugerne en interaktiv AR-oplevelse direkte på mobilen, uden at hente en app. Her dykker de ned i en virtuel Remix-verden og bliver en del af festen.',
          meta: [['OPSTART', '< 30 SEK.'], ['ADGANG', 'DIREKTE'], ['PLATFORM', 'WebAR']] },
        { head: 'Kampagnen der fastholdt',
          body: 'Vores interaktive AR-kampagne skabte stærk brugerinteraktion på tværs af landet. 38.000 scanninger, 1,2 minutters gennemsnitlig engagementtid. Forbrugerne udforskede aktivt og festede med til hits.',
          meta: [['SCANNINGER', '38.000'], ['GNS. VISNINGSTID', '1,2 MIN'], ['RÆKKEVIDDE', 'Landsdækkende']] },
      ]}
      scenes={[
        { kind: 'image', src: 'assets/KiMs_Remix_tlf_1.png', alt: 'KiMs Remix AR-kampagne — oplevelsen på mobil i browseren' },
        { kind: 'video', src: 'assets/KiMs_AR_Loop_video.mp4' },
        { kind: 'video', src: 'assets/KiMs_AR_Loop_video.mp4' },
      ]}
    />
    <CaseStudyBlock section="05B"
      cover="assets/Harboe_Cover.png"
      label="Folkets sodavand"
      headline={['Harboes','Bryggeri']}
      scrollText="Scroll for at se forløbet. Fra ambition til resultater."
      content={[
        { head: 'Folkets sodavand og sømænds',
          body: 'Harboe søsætter nyt reklameunivers, i bogstavelig forstand. Med et konkret mål: Få så mange som muligt til at se og huske filmen. Derfor blev reklamen integreret direkte på flasken gennem en AR-kampagne, præcis dér, hvor forbrugeren allerede har produktet i hånden.',
          meta: [['MÅL', 'FMCG-aktivering'], ['PERIODE', '2026'], ['MEDIE', 'Emballage + Web']] },
        { head: 'Reklamen lever i flasken',
          body: 'Oplevelsen trækker forbrugeren direkte ind i kampagnens univers. Når flasken scannes, åbner den sig, og elementer fra 1800-tallets søfart vælter ud. Midt i det hele træder en gylden ramme frem, hvor filmen begynder at afspille.',
          meta: [['OPSTART', '< 30 SEK.'], ['ADGANG', 'DIREKTE'], ['PLATFORM', 'WebAR']] },
        { head: 'Resultatet',
          body: 'Kampagnen er friskt søsat, vi opdaterer tallene, så snart de første scanninger ruller ind.',
          meta: [['SCANNINGER', '—'], ['GNS. VISNINGSTID', '—'], ['RÆKKEVIDDE', '—']] },
      ]}
      scenes={[
        { kind: 'image', src: 'assets/Harboe_tlf_1.png', alt: 'Harboe Bryggeri WebAR — flasken scanner direkte i browseren' },
        { kind: 'video', src: 'assets/Harboe_AR_Loop_video.mp4' },
        { kind: 'video', src: 'assets/Harboe_AR_Loop_video.mp4' },
      ]}
    />
  </>
);

const PhoneMock = ({ activeTab, scenes, isMobile }) => (
  <div style={{
    width: isMobile ? '100%' : 360,
    maxWidth: isMobile ? 280 : 360,
    height: isMobile ? 240 : 640,
    position: 'relative', background: '#000', overflow: 'hidden',
    borderRadius: isMobile ? 12 : 20,
  }}>
    {scenes.map((scene, i) => (
      <div key={i} style={{
        position: 'absolute', inset: 0,
        opacity: activeTab === i ? 1 : 0,
        transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: activeTab === i ? 'auto' : 'none',
      }}>
        {scene.kind === 'map' ? (
          <SceneStats mapSrc={scene.src}/>
        ) : scene.kind === 'image' ? (
          <img src={scene.src} alt={scene.alt || ''}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}/>
        ) : (
          <video src={scene.src} autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#000' }}/>
        )}
      </div>
    ))}
  </div>
);

const SceneStats = ({ mapSrc }) => (
  <div style={{
    width: '100%', height: '100%', background: '#0a0a0a', padding: 32,
    display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.12)',
  }}>
    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
      LIVE · DASHBOARD
    </div>
    <div style={{
      marginTop: 8, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
      fontSize: 88, lineHeight: 0.9, color: '#fff', letterSpacing: '-0.03em',
    }}>38K</div>
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
      Scanninger på landsplan
    </div>

    <div style={{ flex: 1, position: 'relative', marginTop: 18, marginBottom: 8 }}>
      <img src={mapSrc} alt="Danmarkskort"
        style={{
          width: '100%', height: '100%', objectFit: 'contain',
          filter: 'invert(1) brightness(1.05) contrast(1.1)',
          opacity: 0.85,
        }}/>
      {/* Scanner pings */}
      {[
        { top: '46%', left: '62%' }, // Sjælland
        { top: '32%', left: '28%' }, // Jylland
        { top: '64%', left: '48%' }, // Fyn
      ].map((p, i) => (
        <div key={i} style={{
          position: 'absolute', ...p, width: 10, height: 10,
          background: '#3370FF', borderRadius: '50%',
          boxShadow: '0 0 0 3px rgba(51,112,255,0.25)',
          animation: `ping ${1.6 + i * 0.4}s infinite ease-out`,
        }}/>
      ))}
    </div>

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 12 }}>
      {[['SJÆLLAND', '19K'], ['JYLLAND', '11K'], ['FYN', '8K']].map(([k,v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>{k}</span>
          <span style={{ color: '#fff' }}>{v}</span>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes ping {
        0% { transform: scale(0.8); opacity: 1; }
        80%, 100% { transform: scale(2.4); opacity: 0; box-shadow: 0 0 0 8px rgba(51,112,255,0); }
      }
    `}</style>
  </div>
);

window.CaseStudy = CaseStudy;
