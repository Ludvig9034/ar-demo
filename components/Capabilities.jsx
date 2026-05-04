/** @jsx React.createElement */
const capabilities = [
  { k: 'Interaktive oplevelser', v: 'Fang opmærksomheden og gør dit brand levende.' },
  { k: 'Forlænget engagement', v: 'Hold på forbrugeren længere end nogen anden platform.' },
  { k: 'Data og indsigt', v: 'Forstå, hvordan brugerne interagerer med dit brand i realtid.' },
  { k: 'Produkt i 3D', v: 'Gør det muligt at se, prøve og opleve produktet virtuelt.' },
  { k: 'Kontrol over rejsen', v: 'Guid kunden gennem dit brandunivers, trin for trin.' },
  { k: 'Højere brandloyalitet', v: 'Skab følelser, ikke bare visninger, og bliv husket.' },
  { k: 'Interaktiv emballage', v: 'Gør jeres produkt til nøglen, der aktiverer oplevelsen, og skab en hype, der driver salg.' },
  { k: 'Storytelling i bevægelse', v: 'Fortæl din historie med dybde, lag og wow-effekt.' },
  { k: 'Event activation', v: 'Giv publikum en oplevelse, de deler og husker.' },
];

const Capabilities = () => {
  const isMobile = useWindowWidth() < 768;
  const swipe = useSwipeCarousel(capabilities.length);

  return (
    <section style={{ padding: isMobile ? '80px 0 60px' : '160px 32px 140px', background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: isMobile ? '0 20px' : 0 }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 80, marginBottom: isMobile ? 32 : 80, alignItems: 'end' }}>
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 14,
            }} className="reveal">
              <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
              <span style={{ color: '#3370FF' }}>04</span> · ANVENDELSE
            </div>
            <h2 style={{
              margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
              fontSize: 'clamp(48px, 7vw, 120px)', lineHeight: 0.92,
              letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff',
            }}>
              <div className="mask-line"><span>Hvad kan du</span></div>
              <div className="mask-line"><span style={{ transitionDelay: '120ms' }}>bruge AR til?</span></div>
            </h2>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.68)', margin: 0, maxWidth: '52ch',
          }} className="reveal reveal-delay-2">
            Uanset om du vil aktivere kunder, lancere produkter eller skabe buzz, så forvandler AR din markedsføring til en interaktiv oplevelse.
          </p>
        </div>
      </div>

      {isMobile ? (
        /* ── MOBIL: touch-swipe carousel ── */
        <div style={{ padding: '0 20px' }}>
          {/* Counter + hint */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Swipe for at se alle
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#fff', letterSpacing: '0.08em' }}>
              {String(swipe.index + 1).padStart(2, '0')} / {String(capabilities.length).padStart(2, '0')}
            </div>
          </div>

          {/* Track container — breaks out of padding to allow peek */}
          <div style={{ overflow: 'hidden', margin: '0 -20px' }}>
            <div
              onTouchStart={swipe.onTouchStart}
              onTouchMove={swipe.onTouchMove}
              onTouchEnd={swipe.onTouchEnd}
              style={{
                display: 'flex',
                gap: 8,
                paddingLeft: 20,
                /* Each card = viewport - 48px (20px left + 28px peek on right) */
                transform: `translateX(calc(-${swipe.index} * (100vw - 40px) + ${swipe.dragX}px))`,
                transition: swipe.dragX === 0 ? 'transform 420ms cubic-bezier(0.22,1,0.36,1)' : 'none',
                willChange: 'transform',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}>
              {capabilities.map((c, i) => (
                <div key={c.k} style={{ flex: '0 0 calc(100vw - 48px)', width: 'calc(100vw - 48px)' }}>
                  <CapCell cap={c} index={i} isMobile />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators — pill style */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
            {capabilities.map((_, i) => (
              <div key={i}
                onClick={() => swipe.goTo(i)}
                style={{
                  height: 4,
                  width: i === swipe.index ? 24 : 4,
                  borderRadius: 2,
                  background: i === swipe.index ? '#fff' : 'rgba(255,255,255,0.2)',
                  transition: 'all 350ms cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── DESKTOP: 3-kolonne grid ── */
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1, background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            {capabilities.map((c, i) => (
              <CapCell key={c.k} cap={c} index={i}/>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const CapCell = ({ cap, index, isMobile }) => {
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef(null);
  const p = useCursorInside(ref);
  return (
    <div ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`reveal reveal-delay-${(index % 3) + 1} hot`} data-hot
      style={{
        position: 'relative', background: hover ? '#0c0c0c' : '#000',
        padding: isMobile ? '32px 24px 28px' : '40px 28px 32px',
        minHeight: isMobile ? 280 : 260,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        cursor: 'pointer', transition: 'background 400ms cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
        border: isMobile ? '1px solid rgba(255,255,255,0.12)' : 'none',
      }}>
      {/* Hover spotlight */}
      <div style={{
        position: 'absolute',
        width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        left: `calc(${(p.x + 0.5) * 100}% - 140px)`,
        top: `calc(${(p.y + 0.5) * 100}% - 140px)`,
        opacity: hover ? 1 : 0,
        transition: 'opacity 300ms',
        pointerEvents: 'none',
      }}/>

      <div style={{
        fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span style={{
          display: 'inline-block', width: 18, height: 18,
          position: 'relative',
          transform: hover ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
        }}>
          <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.7)' }}/>
          <span style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.7)' }}/>
        </span>
      </div>

      <div>
        <div style={{
          fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 24, lineHeight: 1, letterSpacing: '-0.01em',
          textTransform: 'uppercase', color: '#fff', marginBottom: 14,
          transform: hover ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
        }}>
          {cap.k}
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.65)',
        }}>
          {cap.v}
        </div>
      </div>

      {/* Bottom progress line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 1,
        background: '#3370FF', width: hover ? '100%' : '0%',
        boxShadow: hover ? '0 0 8px rgba(51,112,255,0.6)' : 'none',
        transition: 'width 600ms cubic-bezier(0.22,1,0.36,1)',
      }}/>
    </div>
  );
};

window.Capabilities = Capabilities;
