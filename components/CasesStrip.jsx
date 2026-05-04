/** @jsx React.createElement */
const CasesStrip = () => {
  const isMobile = useWindowWidth() < 640;
  const swipe = useSwipeCarousel(2);
  const cases = [
    { id: 'kims', client: 'KIMS × MARTIN JENSEN', title: 'Remix Kampagne', tag: 'FMCG · PACKAGING AR',
      vimeoId: '1187351558',
      grad: 'linear-gradient(135deg, #8a1a1a 0%, #2a0606 60%, #000 100%)',
      accent: 'radial-gradient(circle at 30% 40%, rgba(255,80,40,0.55), transparent 55%)' },
    { id: 'harboe', client: 'HARBOES BRYGGERI', title: 'Folkets sodavand', tag: 'FMCG · PACKAGING AR',
      vimeoId: '1180254884',
      grad: 'linear-gradient(135deg, #0a3a5a 0%, #061a2a 60%, #000 100%)',
      accent: 'radial-gradient(circle at 70% 50%, rgba(30,160,255,0.5), transparent 55%)' },
  ];
  return (
    <section id="cases" style={{ padding: isMobile ? '80px 20px' : '120px 32px', background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 20, display: 'flex', gap: 14, alignItems: 'center' }} className="reveal">
              <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
              <span style={{ color: '#3370FF' }}>02</span> · I BRUG
            </div>
            <h2 style={{
              margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
              fontSize: 'clamp(40px, 5.5vw, 88px)', lineHeight: 0.95,
              letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff',
            }}>
              <div className="mask-line"><span>Brands der allerede</span></div>
              <div className="mask-line"><span style={{ transitionDelay: '120ms' }}>bruger AR</span></div>
            </h2>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', maxWidth: '36ch', lineHeight: 1.55 }} className="reveal reveal-delay-2">
            Få inspiration og se et udvalg af kampagner, vi allerede har lanceret.
          </div>
        </div>

        {isMobile ? (
          /* ── MOBIL: vertikal stak — begge cases altid synlige ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cases.map((c, i) => <CaseTile key={c.id} {...c} index={i}/>)}
          </div>
        ) : (
          /* ── DESKTOP: 2-kolonne grid ── */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {cases.map((c, i) => <CaseTile key={c.id} {...c} index={i}/>)}
          </div>
        )}
      </div>
    </section>
  );
};

const CaseTile = ({ client, title, tag, grad, accent, vimeoId, index }) => {
  const [hover, setHover] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => vimeoId && setPlaying(true)}
      style={{
        position: 'relative', aspectRatio: '4/3', overflow: 'hidden',
        textDecoration: 'none', color: '#fff', display: 'block', cursor: 'pointer',
      }}
      className={`reveal reveal-delay-${index + 1} hot`} data-hot>
      {playing && vimeoId ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
      {/* Poster */}
      <div style={{
        position: 'absolute', inset: 0, background: grad,
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1)',
      }}/>
      <div style={{
        position: 'absolute', inset: 0, background: accent,
        transform: hover ? 'scale(1.1)' : 'scale(1)',
        opacity: hover ? 1 : 0.7,
        transition: 'all 900ms cubic-bezier(0.22,1,0.36,1)',
      }}/>
      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.12, mixBlendMode: 'overlay',
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22220%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
      }}/>
      {/* Bottom gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 55%)' }}/>

      {/* Corner tag */}
      <div style={{
        position: 'absolute', top: 20, left: 20, fontFamily: 'Space Mono, monospace',
        fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }}/>
          {tag}
        </div>
      </div>

      {/* Play affordance */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%,-50%) scale(${hover ? 1 : 0.8})`,
        width: 88, height: 88, border: '1px solid rgba(255,255,255,0.8)', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hover ? 1 : 0, transition: 'all 500ms cubic-bezier(0.22,1,0.36,1)',
        backdropFilter: 'blur(2px)',
      }}>
        <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #fff', marginLeft: 3 }}/>
      </div>

      {/* Meta */}
      <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28 }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>
          {client}
        </div>
        <h3 style={{
          fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 0.95,
          textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0, color: '#fff',
        }}>
          {title}
        </h3>
        <div style={{
          marginTop: 16, fontFamily: 'Inter, sans-serif', fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 8,
          transform: hover ? 'translateX(6px)' : 'translateX(0)',
          transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
        }}>
          SE CASE <span style={{ display: 'inline-block', width: 28, height: 1, background: '#fff' }}/> →
        </div>
      </div>
        </>
      )}
    </div>
  );
};
window.CasesStrip = CasesStrip;
