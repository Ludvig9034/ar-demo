/** @jsx React.createElement */
// Big pinned statement with word-by-word reveal on scroll
const Statement = () => {
  const ref = React.useRef(null);
  const p = useScrollProgress(ref);
  const words = 'Det handler ikke om kompleksitet, men om kreativitet'.split(' ');

  return (
    <section ref={ref} style={{
      padding: '180px 32px', background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background giant echo */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
        fontSize: 'clamp(220px, 40vw, 620px)', lineHeight: 1,
        color: 'rgba(255,255,255,0.03)', textTransform: 'uppercase',
        letterSpacing: '-0.04em',
        transform: `translateX(${(p - 0.5) * 300}px)`,
      }}>
        AR AR AR
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', position: 'relative' }}>
        <div style={{
          fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 56,
          display: 'flex', alignItems: 'center', gap: 14,
        }} className="reveal">
          <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
          <span style={{ color: '#3370FF' }}>03</span> · FILOSOFI
        </div>

        <h2 style={{
          margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 'clamp(48px, 9vw, 180px)', lineHeight: 0.95,
          letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#fff',
          maxWidth: '18ch',
        }}>
          {words.map((w, i) => {
            // Reveal threshold per word based on scroll progress
            const threshold = 0.15 + (i / words.length) * 0.55;
            const revealed = p > threshold;
            const isEmph = w.includes('kreativitet');
            return (
              <span key={i} style={{
                display: 'inline-block', marginRight: '0.25em',
                color: isEmph ? '#fff' : (revealed ? '#fff' : 'rgba(255,255,255,0.14)'),
                transition: 'color 500ms cubic-bezier(0.22,1,0.36,1)',
                textDecoration: isEmph && revealed ? 'underline' : 'none',
                textDecorationThickness: '3px',
                textUnderlineOffset: '0.12em',
              }}>{w}</span>
            );
          })}
        </h2>

        <div style={{
          marginTop: 80, display: 'flex', gap: 40, flexWrap: 'wrap',
          paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.15)',
        }} className="reveal reveal-delay-2">
          {[
            ['Konceptualisering', 'Vi hjælper jer med at løfte jeres kampagner med Augmented Reality, eller skabe nye, interaktive oplevelser fra bunden.\n\nMed stærke idéer og teknologisk indsigt udvikler vi løsninger, der skaber engagement, opbygger brand love og efterlader et varigt indtryk hos jeres målgruppe.'],
            ['Eksekvering', 'I eksekveringsfasen modtager vi jeres visuelle elementer, brandmateriale og brandguide. På den baggrund udvikler vi 3D-modeller og grafiske assets, der indgår i løsningen. Ønsker I selv at levere disse elementer, er det naturligvis også en mulighed.'],
            ['Levering', 'Ved levering modtager I et link, hvor oplevelsen er live. Her har I mulighed for at opsætte et custom domæne, så URL’en matcher jeres brand.\n\nDerudover får I adgang til data og indsigter såsom antal scanninger, view time og øvrige relevante metrics.'],
          ].map(([h, s], i) => (
            <div key={h} style={{ flex: '1 1 320px', maxWidth: 420 }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 10 }}>
                0{i+1} /
              </div>
              <h3 style={{ fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 12, margin: '0 0 12px' }}>
                {h}
              </h3>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
window.Statement = Statement;
