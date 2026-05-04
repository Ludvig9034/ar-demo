/** @jsx React.createElement */
const CTAFooter = () => {
  const ref = React.useRef(null);
  const p = useCursorInside(ref);
  const isMobile = useWindowWidth() < 640;

  return (
    <footer id="contact" ref={ref} style={{
      background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* CTA */}
      <div style={{ padding: isMobile ? '80px 20px 60px' : '160px 32px 100px', textAlign: 'center', position: 'relative' }}>
        <div style={{
          fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.24em',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 40,
        }} className="reveal">
          — LAD OS BYGGE NOGET SAMMEN —
        </div>
        <h2 style={{
          margin: '0 auto', fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 'clamp(56px, 10vw, 200px)', lineHeight: 0.86,
          letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#fff',
          maxWidth: '14ch',
        }}>
          <div className="mask-line"><span>Ring til os</span></div>
          <div className="mask-line"><span style={{ transitionDelay: '120ms' }}>i dag.</span></div>
        </h2>
        <p style={{
          marginTop: 40, fontFamily: 'Inter, sans-serif', fontSize: 17,
          color: 'rgba(255,255,255,0.65)', maxWidth: '52ch', margin: '40px auto 0',
          lineHeight: 1.85,
        }} className="reveal reveal-delay-2">
          Lad os sammen løfte jeres brand til det næste niveau, fra idé til interaktiv oplevelse.
        </p>

        <div style={{ marginTop: 56, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }} className="reveal reveal-delay-3">
          <a href="mailto:kontakt@loudcolors.dk" style={{
            background: '#fff', color: '#000', textDecoration: 'none', border: 0,
            padding: '20px 28px', fontFamily: 'Inter, sans-serif', fontSize: 13,
            letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.22,1,0.36,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            BOOK ET MØDE <span>→</span>
          </a>
          <a href="tel:+4561779915" style={{
            background: 'transparent', color: '#fff', textDecoration: 'none',
            padding: '20px 28px', fontFamily: 'Inter, sans-serif', fontSize: 13,
            letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'inline-flex', alignItems: 'center', gap: 12,
            transition: 'border-color 300ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            +45 61 77 99 15
          </a>
        </div>
      </div>

      {/* Meta grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? 32 : 32,
        padding: isMobile ? '40px 20px' : '80px 32px 40px',
        maxWidth: 1600, margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <MetaCol h="KONTAKT" rows={[
          { text: 'kontakt@loudcolors.dk', href: 'mailto:kontakt@loudcolors.dk' },
          { text: '+45 61 77 99 15', href: 'tel:+4561779915' },
        ]}/>
        <MetaCol h="STUDIO" rows={[
          { text: 'Frejasvej 23' },
          { text: '8230 Aarhus, DK' },
        ]}/>
        <MetaCol h="SOCIAL" rows={[
          { text: 'Instagram ↗', href: 'https://www.instagram.com/loudcolors.dk/' },
          { text: 'LinkedIn ↗', href: 'https://www.linkedin.com/company/loudcolors/' },
          { text: 'Vimeo ↗', href: 'https://vimeo.com/loudcolors' },
        ]}/>
        <div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
            NYHEDSBREV
          </div>
          <div style={{ position: 'relative' }}>
            <input placeholder="din@email.dk" style={{
              background: 'transparent', border: 0, borderBottom: '1px solid rgba(255,255,255,0.3)',
              padding: '10px 28px 10px 0', color: '#fff', width: '100%',
              fontFamily: 'Inter, sans-serif', fontSize: 16, outline: 'none',
            }}/>
            <span style={{ position: 'absolute', right: 0, top: 10, color: '#fff' }}>→</span>
          </div>
        </div>
      </div>

      {/* BIG wordmark */}
      <div style={{
        padding: '40px 0 0', overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        position: 'relative',
      }}>
        <div style={{
          fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 'clamp(80px, 22vw, 380px)', lineHeight: 0.85,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: '#fff', textAlign: 'center', whiteSpace: 'nowrap',
          mixBlendMode: 'difference',
          transform: `translateX(${p.x * 30}px)`,
          transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
        }}>
          LOUD&nbsp;COLORS<sup style={{ fontSize: '0.22em', verticalAlign: '0.9em' }}>©</sup>
        </div>
      </div>

      {/* Legal — ekstra padding-bottom på mobil = plads til sticky CTA-bar */}
      <div style={{
        padding: isMobile ? '20px 20px 100px' : '20px 32px',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        fontFamily: 'Space Mono, monospace', fontSize: 10,
        color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        <span>©2026 LOUD COLORS APS · CVR 45 54 12 74</span>
        <span>FREJASVEJ 23 · 8230 AARHUS · DK</span>
        <span>MADE IN DENMARK</span>
      </div>
    </footer>
  );
};

const MetaCol = ({ h, rows }) => (
  <div>
    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
      {h}
    </div>
    {rows.map(r => {
      const text = typeof r === 'string' ? r : r.text;
      const href = typeof r === 'string' ? null : r.href;
      const style = { fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff', lineHeight: 2, textDecoration: 'none', display: 'block' };
      return href
        ? <a key={text} href={href} style={style}>{text}</a>
        : <div key={text} style={style}>{text}</div>;
    })}
  </div>
);

window.CTAFooter = CTAFooter;
