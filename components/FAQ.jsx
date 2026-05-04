/** @jsx React.createElement */
const faqs = [
  { q: 'Skal brugeren downloade en app for at opleve AR?', a: 'Nej. Vi bygger WebAR. Oplevelsen åbner direkte i browseren på iOS og Android efter et scan, et tryk eller et link. Ingen app-download, ingen friktion.' },
  { q: 'Hvor lang tid tager det at producere en AR-kampagne?', a: 'Typisk 4–8 uger fra koncept til launch. Enklere aktiveringer kan leveres hurtigere; 3D-tunge produktioner med custom assets kræver mere tid.' },
  { q: 'Hvad koster en AR-oplevelse?', a: 'Fra 75.000 kr. for en enkel aktivering og op. Vi skræddersyr altid efter brief. Book et møde, så kommer vi med et præcist estimat og timeline.' },
  { q: 'Kan AR integreres med eksisterende kampagner?', a: 'Absolut. AR fungerer bedst som forlængelse af print, emballage, OOH eller SoMe. Vi integrerer QR, NFC eller image-tracking med dit eksisterende setup.' },
  { q: 'Måler I engagement og resultater?', a: 'Ja. Vi tracker scanninger, sessionstid, delinger og interaktioner. Du får fuld indsigt i, hvordan din målgruppe bruger oplevelsen i realtid.' },
  { q: 'Ejer vi selv oplevelsen bagefter?', a: 'Ja. Du modtager kildefiler, 3D-assets og en komplet hosting-opsætning — så I frit kan drifte og videreudvikle løsningen helt på egen hånd. Vi kan selvfølgelig også stå for løbende support og iterationer, hvis det ønskes.' },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  const isMobile = useWindowWidth() < 768;
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr',
      gap: isMobile ? 40 : 80,
      padding: isMobile ? '80px 20px' : '160px 32px',
      background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      maxWidth: 1600, margin: '0 auto',
    }}>
      <div>
        <div style={{
          fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 32,
          display: 'flex', alignItems: 'center', gap: 14,
        }} className="reveal">
          <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }}/>
          <span style={{ color: '#3370FF' }}>07</span> · SPØRGSMÅL
        </div>
        <h2 style={{
          margin: 0, fontFamily: 'Oswald, Impact, sans-serif', fontWeight: 700,
          fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.92,
          letterSpacing: '-0.02em', textTransform: 'uppercase',
        }}>
          <div className="mask-line"><span>Svarene</span></div>
          <div className="mask-line"><span style={{ transitionDelay: '120ms' }}>på dine</span></div>
          <div className="mask-line"><span style={{ transitionDelay: '240ms', color: 'rgba(255,255,255,0.4)' }}>spørgsmål</span></div>
        </h2>
      </div>
      <div style={{ paddingTop: 8 }}>
        {faqs.map((f, i) => (
          <div key={i} className="reveal hot" data-hot
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              borderTop: i === 0 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              padding: '26px 0', cursor: 'pointer',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#fff', fontWeight: 500 }}>
                {f.q}
              </div>
              <div style={{
                width: 24, height: 24, position: 'relative',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
                flexShrink: 0,
              }}>
                <span style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: '#fff' }}/>
                <span style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: '#fff' }}/>
              </div>
            </div>
            <div style={{
              maxHeight: open === i ? 200 : 0, overflow: 'hidden',
              transition: 'max-height 600ms cubic-bezier(0.22,1,0.36,1), margin-top 400ms',
              marginTop: open === i ? 14 : 0,
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.85, maxWidth: '58ch',
                opacity: open === i ? 1 : 0,
                transform: open === i ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 500ms 100ms, transform 500ms 100ms',
              }}>
                {f.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
window.FAQ = FAQ;
