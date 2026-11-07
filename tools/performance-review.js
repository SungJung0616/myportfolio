// Local-only observer: no synthetic input, no production instrumentation.
(() => {
  const shifts = [], frames = [], interactions = [];
  let last = 0, lcp = null, cls = 0, sessionValue = 0, sessionStart = 0, sessionLast = 0;
  const selector = node => node?.id ? `#${node.id}` : node?.tagName + (node?.className ? `.${String(node.className).trim().replace(/\s+/g, '.')}` : '');
  for (const type of ['largest-contentful-paint', 'layout-shift', 'event']) {
    try {
      new PerformanceObserver(list => {
        for (const e of list.getEntries()) {
          if (type === 'largest-contentful-paint') lcp = { ms: e.startTime, element: selector(e.element) };
          if (type === 'event' && e.interactionId) interactions.push({ name: e.name, ms: e.duration, target: selector(e.target), id: e.interactionId });
          if (type !== 'layout-shift' || e.hadRecentInput) continue;
          if (e.startTime - sessionLast > 1000 || e.startTime - sessionStart > 5000) { sessionStart = e.startTime; sessionValue = 0; }
          sessionLast = e.startTime; sessionValue += e.value; cls = Math.max(cls, sessionValue);
          shifts.push({ ms: e.startTime, value: e.value, sources: (e.sources || []).map(s => ({ element: selector(s.node), previous: s.previousRect.toJSON(), current: s.currentRect.toJSON() })) });
        }
      }).observe({ type, buffered: true, ...(type === 'event' ? { durationThreshold: 16 } : {}) });
    } catch {}
  }
  function frame(t) { if (last && !document.hidden) frames.push(t - last); last = t; if (frames.length > 600) frames.shift(); requestAnimationFrame(frame); }
  requestAnimationFrame(frame);
  setInterval(() => {
    let out = document.getElementById('performance-review');
    if (!out) { out = document.createElement('script'); out.id = 'performance-review'; out.type = 'application/json'; document.body.append(out); }
    const sorted = [...frames].sort((a, b) => a - b), nav = performance.getEntriesByType('navigation')[0];
    out.textContent = JSON.stringify({ viewport: [innerWidth, innerHeight], samples: frames.length, meanFrameMs: frames.reduce((a, b) => a + b, 0) / frames.length, p95FrameMs: sorted[Math.floor(sorted.length * .95)], lcp, cls, shifts, interactions, loadMs: nav?.loadEventEnd, arena: window.arenaDiagnostics });
  }, 1000);
})();
