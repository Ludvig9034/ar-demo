/** @jsx React.createElement */
const Stats = () => {
  const sjRef = React.useRef(null), jyRef = React.useRef(null), fyRef = React.useRef(null);
  const tRef = React.useRef(null), eRef = React.useRef(null);
  const sj = useCountUp(sjRef, 19000);
  const jy = useCountUp(jyRef, 8000);
  const fy = useCountUp(fyRef, 8000);
  const total = useCountUp(tRef, 38000);
  const engagement = useCountUp(eRef, 72);
  const isMobile = useWindowWidth() < 768;

  const fmt = n => n.toLocaleString('da-DK');

  return (
    <section style={{ padding: isMobile ? '80px 20px 100px' : '140px 32px 160px', background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{
          fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 40,
          display: 'flex', alignItems: 'center', gap: 14,
        }} className="reveal">
          <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
          <span style={{ color: '#3370FF' }}>06</span> · I TAL
        </div>

        <h2 style={{
          margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 'clamp(48px, 7vw, 120px)', lineHeight: 0.92,
          letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff',
        }}>
          <div className="mask-line"><span>Kampagnen</span></div>
          <div className="mask-line"><span style={{ transitionDelay: '120ms', color: 'rgba(255,255,255,0.45)' }}>fastholdt.</span></div>
        </h2>

        {/* Big numbers row */}
        <div style={{
          marginTop: 80, display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap: 1, background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <BigStat refEl={tRef} value={fmt(total)} label="Scanninger totalt" sub="ACROSS · DK"/>
          <BigStat refEl={eRef} value={engagement + 's'} label="Gns. visningstid" sub="GNS. · SESSION" big={false} numeric={`1,2 MIN`}/>
          <BigStat value="100%" label="Browser-native" sub="INGEN · APP"/>
        </div>

        {/* Map + regions */}
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 40 : 64 }} className="reveal">
          <DKMap sj={sj} jy={jy} fy={fy}/>

          <div style={{ paddingTop: 20 }}>
            <div style={{
              fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
              fontSize: 32, lineHeight: 0.95, letterSpacing: '-0.01em',
              textTransform: 'uppercase', marginBottom: 40,
            }}>
              Kampagnen på landsplan
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <Region refEl={sjRef} name="Sjælland" value={fmt(sj)} pct={50}/>
              <Region refEl={jyRef} name="Jylland" value={fmt(jy)} pct={21}/>
              <Region refEl={fyRef} name="Fyn" value={fmt(fy)} pct={21}/>
            </div>
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>
                Scanninger pr. region
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BigStat = ({ refEl, value, label, sub, numeric }) => (
  <div ref={refEl} style={{
    background: '#000', padding: '40px 32px',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 260,
  }} className="reveal">
    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>
      {sub}
    </div>
    <div>
      <div style={{
        fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
        fontSize: 'clamp(72px, 10vw, 160px)', lineHeight: 0.85,
        letterSpacing: '-0.04em', color: '#fff',
      }}>
        {numeric || value}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 16 }}>
        {label}
      </div>
    </div>
  </div>
);

const Region = ({ refEl, name, value, pct }) => (
  <div ref={refEl} style={{
    display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
    padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.15)',
  }} className="reveal">
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {name}
        </span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 2, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #fff, #3370FF)', transform: 'translateX(-100%)', animation: 'barFill 1400ms cubic-bezier(0.22,1,0.36,1) forwards', animationDelay: '300ms' }}/>
      </div>
    </div>
    <div style={{ fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700, fontSize: 32, letterSpacing: '-0.01em', minWidth: 100, textAlign: 'right' }}>
      {value}
    </div>
    <style>{`@keyframes barFill { to { transform: translateX(0); } }`}</style>
  </div>
);

// Real DK map from asset — SVG overlay keeps markers aligned at any display size
const DKMap = ({ sj, jy, fy }) => (
  <div style={{ position: 'relative', maxWidth: 520, overflow: 'hidden' }}>
    <img src="assets/DK_AR_Kort.png" alt="Danmarkskort med scanninger fordelt på Jylland, Fyn og Sjælland"
      style={{ width: '100%', display: 'block', filter: 'invert(1) brightness(0.9) contrast(1.1)' }}/>
    {/* viewBox matches image pixel dimensions so coordinates map 1:1 */}
    <svg viewBox="0 0 1770 2119"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Corner frame */}
      <g stroke="rgba(255,255,255,0.5)" strokeWidth="7" fill="none">
        <path d="M 55 55 L 165 55 M 55 55 L 55 165"/>
        <path d="M 1715 55 L 1605 55 M 1715 55 L 1715 165"/>
        <path d="M 55 2064 L 165 2064 M 55 2064 L 55 1954"/>
        <path d="M 1715 2064 L 1605 2064 M 1715 2064 L 1715 1954"/>
      </g>
      <text x="72" y="2052" fill="rgba(255,255,255,0.55)" fontFamily="Space Mono, monospace" fontSize="52" letterSpacing="4">DK / REMIX · SCAN MAP</text>
      <text x="1698" y="2052" fill="rgba(255,255,255,0.55)" fontFamily="Space Mono, monospace" fontSize="52" textAnchor="end" letterSpacing="4">2024</text>

      <Marker cx={440} cy={980}  label="JYLLAND"  value={jy.toLocaleString('da-DK')} align="left"/>
      <Marker cx={910} cy={1430} label="FYN"       value={fy.toLocaleString('da-DK')} align="center"/>
      <Marker cx={1330} cy={1420} label="SJÆLLAND" value={sj.toLocaleString('da-DK')} align="right"/>
    </svg>
  </div>
);

const Marker = ({ cx, cy, label, value, align }) => {
  const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';
  const xOff = align === 'left' ? -22 : align === 'right' ? 22 : 0;
  const lineX = align === 'left' ? cx - 22 : align === 'right' ? cx + 22 : cx;
  const lineY = cy - 220;
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" fill="#3370FF"/>
      <circle cx={cx} cy={cy} r="55" fill="none" stroke="#3370FF" strokeWidth="2" opacity="0.6">
        <animate attributeName="r" values="14;85" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
      </circle>
      <line x1={cx} y1={cy - 11} x2={lineX} y2={lineY + 28} stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
      <text x={cx + xOff} y={lineY} fill="#fff" fontFamily="Oswald, Impact, sans-serif" fontSize="78" fontWeight="700" textAnchor={anchor} letterSpacing="-2">
        {value}
      </text>
      <text x={cx + xOff} y={lineY - 140} fill="rgba(255,255,255,0.8)" fontFamily="Space Mono, monospace" fontSize="52" textAnchor={anchor} letterSpacing="4">
        {label}
      </text>
    </g>
  );
};

window.Stats = Stats;
