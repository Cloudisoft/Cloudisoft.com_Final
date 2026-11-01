const { chromium } = require('playwright');
(async () => {
  const dir = __dirname, fps = 30;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + dir + '/reel.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const only = process.argv[2]; // optional: comma list of seconds to preview
  if (only) {
    for (const s of only.split(',')) { await p.evaluate(t => render(t), +s); await p.screenshot({ path: `${dir}/prev-${s}.jpg`, type: 'jpeg', quality: 80 }); }
  } else {
    const dur = await p.evaluate(() => DUR);
    const n = Math.round(dur * fps);
    require('fs').mkdirSync(dir + '/frames', { recursive: true });
    for (let i = 0; i < n; i++) {
      await p.evaluate(t => render(t), i / fps);
      await p.screenshot({ path: `${dir}/frames/${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
    }
    console.log('frames', n);
  }
  await b.close();
})();
