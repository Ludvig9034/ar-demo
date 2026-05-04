/** @jsx React.createElement */
// Shared hooks + utilities

// Track mouse position within an element — returns 0..1 coords, origin at element center
const useCursorInside = (ref) => {
  const [p, setP] = React.useState({ x: 0, y: 0, active: false });
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setP({ x, y, active: true });
    };
    const onLeave = () => setP({ x: 0, y: 0, active: false });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);
  return p;
};

// Global scroll offset
const useScrollY = () => {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener('scroll', on, { passive: true });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return y;
};

// Returns element's progress through viewport: 0 when top enters bottom, 1 when bottom exits top
const useScrollProgress = (ref, { start = 0, end = 1 } = {}) => {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element top aligns with viewport bottom; 1 when element bottom aligns with viewport top
      const total = r.height + vh;
      const scrolled = vh - r.top;
      let prog = scrolled / total;
      prog = Math.max(0, Math.min(1, prog));
      setP(prog);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
  return p;
};

// Counts up to target when element enters viewport
const useCountUp = (ref, target, duration = 1800) => {
  const [n, setN] = React.useState(0);
  const done = React.useRef(false);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, target, duration]);
  return n;
};

// Split text into words + letters for mask-animation
const splitWords = (text) => {
  return text.split(' ').map((word, i) => (
    <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em' }}>
      <span style={{ display: 'inline-block' }} className="__w">{word}</span>
    </span>
  ));
};

const useWindowWidth = () => {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
};

// Touch-swipe carousel — returns index, drag offset, and touch handlers
const useSwipeCarousel = (total) => {
  const [index, setIndex] = React.useState(0);
  const [dragX, setDragX] = React.useState(0);
  const startX = React.useRef(null);
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchMove = (e) => {
    if (startX.current === null) return;
    setDragX(e.touches[0].clientX - startX.current);
  };
  const onTouchEnd = () => {
    if (dragX > 50 && index > 0) setIndex(i => i - 1);
    if (dragX < -50 && index < total - 1) setIndex(i => i + 1);
    setDragX(0);
    startX.current = null;
  };
  return { index, dragX, onTouchStart, onTouchMove, onTouchEnd, goTo: setIndex };
};

Object.assign(window, { useCursorInside, useScrollY, useScrollProgress, useCountUp, splitWords, useWindowWidth, useSwipeCarousel });
