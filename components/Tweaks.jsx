/** @jsx React.createElement */
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "cursor": "ring",
  "intensity": "medium",
  "grain": true
}/*EDITMODE-END*/;

const Tweaks = () => {
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState(DEFAULTS);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Apply effects
  React.useEffect(() => {
    document.body.classList.toggle('grain', state.grain);
    const ring = document.getElementById('__cursor');
    const dot = document.getElementById('__dot');
    if (ring && dot) {
      const hide = state.cursor === 'off';
      ring.style.display = hide ? 'none' : 'block';
      dot.style.display = hide ? 'none' : 'block';
      if (state.cursor === 'dot') ring.style.display = 'none';
    }
  }, [state]);

  const set = (k, v) => {
    const next = { ...state, [k]: v };
    setState(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  if (!visible) return null;

  const Group = ({ label, keyName, opts }) => (
    <>
      <label>{label}</label>
      <div className="row">
        {opts.map(o => (
          <button key={o} className={state[keyName] === o ? 'active' : ''}
            onClick={() => set(keyName, o)}>{o}</button>
        ))}
      </div>
    </>
  );

  return (
    <div className="tweaks-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ letterSpacing: '0.14em' }}>TWEAKS</strong>
        <span style={{ opacity: 0.5, fontSize: 9 }}>LC/AR</span>
      </div>
      <Group label="Cursor" keyName="cursor" opts={['ring', 'dot', 'off']}/>
      <Group label="Anim intensity" keyName="intensity" opts={['subtle', 'medium', 'loud']}/>
      <label>Film grain</label>
      <div className="row">
        <button className={state.grain ? 'active' : ''} onClick={() => set('grain', true)}>ON</button>
        <button className={!state.grain ? 'active' : ''} onClick={() => set('grain', false)}>OFF</button>
      </div>
    </div>
  );
};
window.Tweaks = Tweaks;
