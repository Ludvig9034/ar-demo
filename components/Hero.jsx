/** @jsx React.createElement */
// Hero — cursor-tilted AR wordmark with layered depth
const Hero = () => {
  const wrapRef = React.useRef(null);
  const p = useCursorInside(wrapRef);
  const scrollY = useScrollY();
  const isMobile = useWindowWidth() < 768;

  // Smooth the cursor
  const [s, setS] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    let raf; const tick = () => {
      setS(prev => ({ x: prev.x + (p.x - prev.x) * 0.08, y: prev.y + (p.y - prev.y) * 0.08 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p.x, p.y]);

  const tiltX = s.y * 10;
  const tiltY = -s.x * 14;
  const parallax = scrollY * 0.35;

  return (
    <section id="top" ref={wrapRef} style={{
      position: 'relative', width: '100%', height: '100vh', minHeight: isMobile ? 600 : 780,
      background: '#000', overflow: 'hidden',
      perspective: 1200,
    }}>
      {/* Gradient atmosphere */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(120,60,200,0.22) 0%, rgba(40,20,80,0.1) 35%, #000 70%)',
        transform: `translate(${s.x * 30}px, ${s.y * 30}px)`,
        transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
      }}/>
      {/* Scan line sweep */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)',
        opacity: 0.8,
      }}/>

      {/* Floating depth layers — simulate AR UI (hidden on mobile) */}
      {!isMobile && <>
      <FloatingLayer x={s.x} y={s.y} depth={20} style={{ left: '8%', top: '18%' }}>
        <Crosshair size={120} label="TRACK · 01"/>
      </FloatingLayer>
      <FloatingLayer x={s.x} y={s.y} depth={60} style={{ right: '10%', top: '22%' }}>
        <Crosshair size={64} label="ANCHOR"/>
      </FloatingLayer>
      <FloatingLayer x={s.x} y={s.y} depth={80} style={{ right: '14%', bottom: '24%' }}>
        <div style={{ border: '1px solid rgba(255,255,255,0.35)', padding: '8px 12px', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>FOV 62°</div>
          <div>WORLD · LOCKED</div>
        </div>
      </FloatingLayer>
      <FloatingLayer x={s.x} y={s.y} depth={40} style={{ left: '12%', bottom: '20%' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
            <span style={{ width: 6, height: 6, background: '#3370FF', borderRadius: '50%', animation: 'pulse 1.6s infinite', boxShadow: '0 0 8px #3370FF' }}/>
            LIVE · 4K
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)' }}>60 FPS · WEB AR</div>
        </div>
      </FloatingLayer>
      </>}

      {/* Main wordmark */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${-parallax}px)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 120ms linear',
      }}>
        <div style={{
          fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 14,
        }} className="reveal">
          <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.4)' }}/>
          VELKOMMEN TIL
          <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.4)' }}/>
        </div>

        <h1 aria-label="Augmented Reality" style={{
          margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 'clamp(80px, 18vw, 280px)', lineHeight: 0.82,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          textAlign: 'center', color: '#fff',
          position: 'relative',
        }}>
          <div className="mask-line"><span>AUGMENTED</span></div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span className="mask-line"><span style={{ transitionDelay: '240ms' }}>REALITY</span></span>
            {/* RGB split echo */}
            <span aria-hidden="true" style={{
              position: 'absolute', inset: 0, color: 'rgba(51,112,255,0.45)',
              transform: `translate(${s.x * 6 - 2}px, ${s.y * 4}px)`,
              mixBlendMode: 'screen', pointerEvents: 'none',
            }}>REALITY</span>
            <span aria-hidden="true" style={{
              position: 'absolute', inset: 0, color: 'rgba(51,112,255,0.75)',
              transform: `translate(${-s.x * 6 + 2}px, ${-s.y * 4}px)`,
              mixBlendMode: 'screen', pointerEvents: 'none',
            }}>REALITY</span>
          </div>
        </h1>

        <div style={{ marginTop: 36, maxWidth: 480, textAlign: 'center' }} className="reveal reveal-delay-3">
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.68)', margin: 0,
          }}>
            Vi bygger interaktive brandoplevelser, der sletter grænsen mellem det fysiske og det digitale - direkte i browseren, uden app.
          </p>
        </div>
      </div>

      {/* Corner meta */}
      <div style={cornerStyle('bl')}>
        <span style={{ opacity: 0.6 }}>LC/AR · 25.04</span>
      </div>
      <div style={cornerStyle('br')}>
        <a href="#what" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.4)', padding: '12px 4px 2px', display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 44 }}>
          SCROLL
          <span style={{ display: 'inline-block', animation: 'bounce 1.6s infinite' }}>↓</span>
        </a>
      </div>
      <div style={cornerStyle('tr-meta')}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <span>WEB · AR</span>
          <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.3)' }}/>
          <span>NO · APP</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      `}</style>
    </section>
  );
};

const cornerStyle = (corner) => {
  const base = {
    position: 'absolute', fontFamily: 'Space Mono, monospace', fontSize: 10,
    letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase',
  };
  if (corner === 'bl') return { ...base, left: 32, bottom: 28 };
  if (corner === 'br') return { ...base, right: 32, bottom: 28 };
  if (corner === 'tr-meta') return { ...base, right: 32, top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'right center' };
  return base;
};

const FloatingLayer = ({ x, y, depth, style, children }) => (
  <div style={{
    position: 'absolute', ...style,
    transform: `translate(${x * depth}px, ${y * depth}px)`,
    transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
    opacity: 0.9,
  }}
  className="reveal reveal-delay-4">
    {children}
  </div>
);

const Crosshair = ({ size, label }) => (
  <div style={{ position: 'relative', width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="2 4"/>
      <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.7"/>
      <path d="M50 0 V16 M50 84 V100 M0 50 H16 M84 50 H100" stroke="#fff" strokeWidth="0.8"/>
      <circle cx="50" cy="50" r="1.5" fill="#fff"/>
    </svg>
    <div style={{
      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
      marginTop: 8, fontFamily: 'Space Mono, monospace', fontSize: 9,
      letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>{label}</div>
  </div>
);

window.Hero = Hero;
