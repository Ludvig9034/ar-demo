/** @jsx React.createElement */
const Nav = () => {
  const [time, setTime] = React.useState('');
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`CPH · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    const os = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', os, { passive: true });
    os();
    return () => { clearInterval(id); window.removeEventListener('scroll', os); };
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '14px 32px' : '22px 32px',
      mixBlendMode: 'difference',
      transition: 'padding 400ms cubic-bezier(0.22,1,0.36,1)',
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
        <img src="assets/logo-wordmark-small-white.svg" style={{ height: 18, display: 'block' }} alt="Loud Colors"/>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', borderLeft: '1px solid rgba(255,255,255,0.25)', paddingLeft: 12 }}>
          /AR
        </span>
      </a>
      <div style={{ display: 'flex', gap: 32 }}>
        {[['YDELSER','#'], ['AR','#top'], ['CASES','#cases'], ['KONTAKT','#contact']].map(([l, href], i) => (
          <a key={l} href={href} style={{
            color: '#fff', textDecoration: 'none', fontSize: 12,
            letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
            fontFamily: 'Inter, sans-serif', position: 'relative',
            padding: '4px 0',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = 0.55; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = 1; }}
          >
            {l === 'AR' && <span style={{ position: 'absolute', left: -10, top: '50%', width: 4, height: 4, background: '#3370FF', borderRadius: '50%', transform: 'translateY(-50%)', boxShadow: '0 0 6px #3370FF' }}/>}
            {l}
          </a>
        ))}
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
        {time}
      </div>
    </nav>
  );
};
window.Nav = Nav;
