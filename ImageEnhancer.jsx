import { useState, useRef, useCallback } from 'react';

/**
 * AI Product Photo Enhancer
 * ---------------------------------------------------------
 * Drop-in component. Cuts the background out of a product photo
 * (fully on-device, no server) and composites it onto a clean studio
 * backdrop.
 *
 * Usage on the "Add Product" page:
 *
 *   <ImageEnhancer onSave={(blob) => {
 *     // blob is a PNG Blob of the finished studio photo — upload it,
 *     // attach it to the product form, whatever you need.
 *   }} />
 *
 * No npm install required — @imgly/background-removal is loaded from
 * the CDN on first use (same as the original standalone tool). If you'd
 * rather bundle it, run `npm install @imgly/background-removal` and swap
 * the dynamic import below for a static one.
 */

const BACKDROPS = [
  { id: 'ivory', kind: 'solid', css: '#F6F1E4', label: 'Ivory' },
  { id: 'white', kind: 'solid', css: '#FFFFFF', label: 'White' },
  { id: 'slate', kind: 'solid', css: '#212F4E', label: 'Indigo' },
  { id: 'gradient', kind: 'gradient', css: 'linear-gradient(#F0CE8B,#E1A93B)', label: 'Marigold' },
];

const MAX_PROCESS_DIM = 1600; // downscale large phone photos before AI processing

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function prepareForProcessing(objectUrl) {
  const img = await loadImage(objectUrl);
  const longEdge = Math.max(img.naturalWidth, img.naturalHeight);
  if (longEdge <= MAX_PROCESS_DIM) return objectUrl;

  const scale = MAX_PROCESS_DIM / longEdge;
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  c.getContext('2d').drawImage(img, 0, 0, w, h);
  const blob = await new Promise((res) => c.toBlob(res, 'image/png'));
  return URL.createObjectURL(blob);
}

async function removeBackgroundWithFallback(sourceUrl, onProgress) {
  const { removeBackground } = await import(
    /* webpackIgnore: true */ 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm'
  );
  const attempts = ['medium', 'small'];
  let lastErr;
  for (let i = 0; i < attempts.length; i++) {
    try {
      return await removeBackground(sourceUrl, {
        model: attempts[i],
        output: { format: 'image/png', quality: 1 },
        progress: onProgress,
      });
    } catch (err) {
      lastErr = err;
      console.error(`background removal failed with model "${attempts[i]}"`, err);
    }
  }
  throw lastErr;
}

function drawComposite(canvas, cutoutImage, backdrop) {
  const size = 1000;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (backdrop.kind === 'solid') {
    ctx.fillStyle = backdrop.css;
    ctx.fillRect(0, 0, size, size);
  } else {
    const g = ctx.createLinearGradient(0, 0, size * 0.3, size);
    const stops = backdrop.css.match(/#[0-9A-Fa-f]{6}/g);
    g.addColorStop(0, stops[0]);
    g.addColorStop(1, stops[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }

  const maxDim = size * 0.82;
  const iw = cutoutImage.naturalWidth;
  const ih = cutoutImage.naturalHeight;
  const scale = Math.min(maxDim / iw, maxDim / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (size - dw) / 2;
  const dy = (size - dh) / 2 + size * 0.015;

  ctx.save();
  ctx.filter = 'blur(16px)';
  ctx.fillStyle = 'rgba(20,18,14,0.18)';
  ctx.beginPath();
  ctx.ellipse(size / 2, dy + dh - dh * 0.02, dw * 0.3, dh * 0.045 + 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.filter = 'blur(0.6px)';
  ctx.drawImage(cutoutImage, dx, dy, dw, dh);
  ctx.restore();
}

export default function ImageEnhancer({ onSave }) {
  const [status, setStatus] = useState('idle'); // idle | processing | done | error
  const [progressPct, setProgressPct] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [backdrop, setBackdrop] = useState(BACKDROPS[0]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const canvasRef = useRef(null);
  const cutoutImageRef = useRef(null);
  const originalUrlRef = useRef(null);

  const runEnhance = useCallback(async (file) => {
    setErrorMsg('');
    setStatus('processing');
    setProgressPct(0);
    setProgressText('Preparing your photo…');
    setShowResult(false);

    const objectUrl = URL.createObjectURL(file);
    originalUrlRef.current = objectUrl;
    setPreviewUrl(objectUrl);

    try {
      const processingUrl = await prepareForProcessing(objectUrl);

      const onProgress = (key, current, total) => {
        const pct = total ? Math.min(100, Math.round((current / total) * 100)) : 0;
        setProgressPct(Math.max(4, pct));
        setProgressText(
          key && key.includes('fetch')
            ? 'Downloading the AI model (first time only)…'
            : 'Removing the background…'
        );
      };

      const blob = await removeBackgroundWithFallback(processingUrl, onProgress);
      const cutoutUrl = URL.createObjectURL(blob);
      const cutoutImg = await loadImage(cutoutUrl);
      cutoutImageRef.current = cutoutImg;

      setProgressText('Setting the scene…');
      setProgressPct(100);

      drawComposite(canvasRef.current, cutoutImg, backdrop);

      setStatus('done');
      setShowResult(true);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(
        "Couldn't process that photo in this browser. Try a clearer, smaller photo, or a different browser (Chrome or Edge work best)."
      );
    }
  }, [backdrop]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) runEnhance(file);
    e.target.value = ''; // allow re-selecting the same file
  };

  const handleBackdropChange = (bd) => {
    setBackdrop(bd);
    if (cutoutImageRef.current && canvasRef.current) {
      drawComposite(canvasRef.current, cutoutImageRef.current, bd);
    }
  };

  const handleUsePhoto = () => {
    canvasRef.current.toBlob((blob) => {
      if (onSave) onSave(blob);
    }, 'image/png');
  };

  const handleReset = () => {
    setStatus('idle');
    setShowResult(false);
    setPreviewUrl(null);
    cutoutImageRef.current = null;
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current);
  };

  return (
    <div style={styles.wrap}>
      <style>{`
        @keyframes ie-spin { to { transform: rotate(360deg); } }
      `}</style>

      {status === 'idle' && (
        <div style={styles.dropzone}>
          <p style={styles.dzTitle}>Add a product photo</p>
          <p style={styles.dzSub}>We'll clean up the background automatically.</p>
          <div style={styles.actions}>
            <button style={styles.btnPrimary} onClick={() => cameraInputRef.current.click()}>
              Take a photo
            </button>
            <button style={styles.btnOutline} onClick={() => fileInputRef.current.click()}>
              Choose from gallery
            </button>
          </div>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      )}

      {status !== 'idle' && (
        <div>
          <div style={styles.canvasFrame}>
            {previewUrl && !showResult && (
              <img src={previewUrl} alt="Your product" style={styles.media} />
            )}
            <canvas
              ref={canvasRef}
              style={{ ...styles.media, display: showResult ? 'block' : 'none' }}
            />
            {status === 'processing' && (
              <div style={styles.veil}>
                <div style={styles.spinner} />
              </div>
            )}
          </div>

          {status === 'processing' && (
            <div style={styles.progressWrap}>
              <div style={styles.progressTrack}>
                <div style={{ ...styles.progressBar, width: `${progressPct}%` }} />
              </div>
              <p style={styles.progressText}>{progressText} ({progressPct}%)</p>
            </div>
          )}

          {status === 'error' && (
            <p style={styles.errorText}>{errorMsg}</p>
          )}

          {showResult && (
            <>
              <div style={styles.swatches}>
                {BACKDROPS.map((bd) => (
                  <button
                    key={bd.id}
                    title={bd.label}
                    onClick={() => handleBackdropChange(bd)}
                    style={{
                      ...styles.swatch,
                      background: bd.css,
                      borderColor: backdrop.id === bd.id ? '#E1A93B' : 'transparent',
                    }}
                  />
                ))}
              </div>
              <div style={styles.actions}>
                <button style={styles.btnPrimary} onClick={handleUsePhoto}>
                  Use this photo
                </button>
                <button style={styles.btnOutline} onClick={handleReset}>
                  Start over
                </button>
              </div>
            </>
          )}

          {status === 'error' && (
            <div style={styles.actions}>
              <button style={styles.btnOutline} onClick={handleReset}>
                Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: { fontFamily: 'inherit', maxWidth: 420, margin: '0 auto' },
  dropzone: {
    border: '1.5px dashed rgba(33,30,25,0.28)',
    borderRadius: 14,
    padding: '28px 20px',
    textAlign: 'center',
  },
  dzTitle: { fontWeight: 600, fontSize: '1.02rem', margin: '0 0 4px' },
  dzSub: { fontSize: '0.88rem', color: '#5B564C', margin: '0 0 20px' },
  actions: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 },
  btnPrimary: {
    background: '#212F4E', color: '#F6F1E4', border: 'none', borderRadius: 999,
    padding: '12px 20px', fontWeight: 600, cursor: 'pointer',
  },
  btnOutline: {
    background: 'transparent', color: '#212F4E', border: '1.5px solid rgba(33,47,78,0.3)',
    borderRadius: 999, padding: '12px 20px', fontWeight: 600, cursor: 'pointer',
  },
  canvasFrame: {
    position: 'relative', borderRadius: 14, overflow: 'hidden',
    aspectRatio: '1 / 1', width: '100%', background: '#eee',
  },
  media: { width: '100%', height: '100%', objectFit: 'contain', display: 'block' },
  veil: {
    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(23,31,51,0.28)', backdropFilter: 'blur(2px)',
  },
  spinner: {
    width: 34, height: 34, borderRadius: '50%',
    border: '3px solid rgba(246,241,228,0.35)', borderTopColor: '#E1A93B',
    animation: 'ie-spin 0.85s linear infinite',
  },
  progressWrap: { marginTop: 14 },
  progressTrack: { height: 6, borderRadius: 999, background: '#EDE6D3', overflow: 'hidden' },
  progressBar: { height: '100%', background: '#E1A93B', transition: 'width .2s ease' },
  progressText: { fontSize: '0.82rem', color: '#5B564C', marginTop: 6, textAlign: 'center' },
  errorText: { color: '#A23E33', fontSize: '0.9rem', marginTop: 12, textAlign: 'center' },
  swatches: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 },
  swatch: {
    width: 44, height: 44, borderRadius: 12, cursor: 'pointer',
    border: '2px solid transparent',
  },
};
