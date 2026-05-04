/** @jsx React.createElement */
const WhatIsAR = () => {
  const ref = React.useRef(null);
  const p = useScrollProgress(ref);
  const isMobile = useWindowWidth() < 768;
  return (
    <section id="what" ref={ref} style={{
      padding: isMobile ? '80px 20px 60px' : '160px 32px 140px', background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative',
    }}>
      {/* Section label */}
      <div style={{ ...labelRow, margin: isMobile ? '0 auto 40px' : '0 auto 64px' }}>
        <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
        <span><span style={{ color: '#3370FF' }}>01</span> · TEKNOLOGI</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
        gap: isMobile ? 40 : 80, maxWidth: 1600, margin: '0 auto',
        alignItems: 'start',
      }}>
        <div>
          <h2 style={{
            margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
            fontSize: 'clamp(48px, 7vw, 120px)', lineHeight: 0.92,
            letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff',
          }}>
            <div className="mask-line"><span>Hvad er</span></div>
            <div className="mask-line"><span style={{ transitionDelay: '120ms' }}>augmented</span></div>
            <div className="mask-line"><span style={{ transitionDelay: '240ms', color: 'rgba(255,255,255,0.45)' }}>reality?</span></div>
          </h2>
          <p style={{
            marginTop: 48, maxWidth: '52ch',
            fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.72)',
          }} className="reveal reveal-delay-2">
            Augmented Reality kombinerer den virkelige verden med digitale elementer. Med kameraet på din telefon ser du produkter, oplevelser eller kampagner blive levende - lige foran dig.
          </p>
          <p style={{
            marginTop: 20, maxWidth: '52ch',
            fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.5)', fontStyle: 'italic',
          }} className="reveal reveal-delay-3">
            Se teknologien i aktion, prøv demoen og oplev potentialet selv.
          </p>

          {/* Spec rows */}
          <div style={{ marginTop: 56, borderTop: '1px solid rgba(255,255,255,0.15)' }} className="reveal reveal-delay-4">
            {[
              ['APP', 'INGEN browser-baseret'],
              ['KOMPATIBILITET', 'iOS · Android'],
              ['OPSTART', '< 3 sek. fra scan til oplevelse'],
              ['PLATFORM', 'WebAR'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.15)',
                fontFamily: 'Space Mono, monospace', fontSize: 11,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{k}</span>
                <span style={{ color: '#fff' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* QR Demo Card */}
        <QRCard isMobile={isMobile}/>
      </div>
    </section>
  );
};

const QRCard = ({ isMobile }) => {
  const [hover, setHover] = React.useState(false);
  const cardRef = React.useRef(null);
  const p = useCursorInside(cardRef);
  return (
    <div ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 'auto' : 120,
        aspectRatio: '3 / 4', width: '100%',
        maxWidth: isMobile ? '100%' : 420,
        marginLeft: isMobile ? '0' : 'auto',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.15)',
        padding: 28, display: 'flex', flexDirection: 'column',
        transform: isMobile ? 'none' : `perspective(900px) rotateX(${p.y * -4}deg) rotateY(${p.x * 6}deg)`,
        transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), border-color 300ms',
        borderColor: hover ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
      }} className="reveal reveal-delay-2 hot" data-hot>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>
        <span>SCAN · TO · LAUNCH</span>
      </div>
      <div style={{
        flex: 1, marginTop: 24, marginBottom: 24,
        background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <img src="assets/ARDemo_QR.jpg" alt="QR-kode til AR-demo"
          style={{ width: '78%', height: 'auto', display: 'block' }}/>
        {/* Scanning line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #000, transparent)',
          animation: 'scanline 2.2s linear infinite',
        }}/>
        {/* Corner brackets */}
        {['tl','tr','bl','br'].map(c => <Bracket key={c} corner={c}/>)}
      </div>
      <div>
        <div style={{ fontFamily: 'Oswald, Impact, sans-serif', fontSize: 28, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
          Oplev AR
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
          Peg din telefon mod QR-koden, oplevelsen åbner direkte i browseren.
        </div>
        <a
          href="https://loudcolors.8thwall.app/loud-colors-ar-game/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 20, width: '100%', display: 'block', textAlign: 'center',
            background: '#fff', color: '#000', textDecoration: 'none', border: 0,
            padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontSize: 12,
            letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600,
            cursor: 'pointer', transition: 'all 200ms', boxSizing: 'border-box',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          ÅBN DEMO →
        </a>
      </div>
      <style>{`
        @keyframes scanline { 0% { top: 0; } 100% { top: 100%; } }
      `}</style>
    </div>
  );
};

const Bracket = ({ corner }) => {
  const style = { position: 'absolute', width: 16, height: 16, borderColor: '#000' };
  const pos = {
    tl: { top: 8, left: 8, borderTop: '2px solid', borderLeft: '2px solid' },
    tr: { top: 8, right: 8, borderTop: '2px solid', borderRight: '2px solid' },
    bl: { bottom: 8, left: 8, borderBottom: '2px solid', borderLeft: '2px solid' },
    br: { bottom: 8, right: 8, borderBottom: '2px solid', borderRight: '2px solid' },
  };
  return <div style={{ ...style, ...pos[corner] }}/>;
};

const labelRow = {
  display: 'flex', alignItems: 'center', gap: 14,
  fontFamily: 'Space Mono, monospace', fontSize: 10,
  letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
  marginBottom: 64, maxWidth: 1600, margin: '0 auto 64px',
};

window.WhatIsAR = WhatIsAR;
