/* ═══════════════════════════════════════════════
   EMMAT Cosmetics — Sensory radar charts (v2)
   Data extracted from Emma Terenzi's thesis
   presentation deck (slides 06 and 07).
   Panel n = 5, scale 0–10.
   Polished with gradients, custom tooltip,
   viewport-triggered reveal, and datalabels.
   ═══════════════════════════════════════════════ */

(function () {
  if (typeof Chart === 'undefined') return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Brand palette
  const PALETTE = {
    text:   '#3B2E24',
    cream:  '#FBF6EE',
    muted:  '#8B7D6C',
    gold:   '#B58E5F',
    deep:   '#5C4B3A',
    rose:   '#EDDBCE',
    ester:  { line: '#5C4B3A', rgb: '92, 75, 58'  },   // deep tone
    apg:    { line: '#EDDBCE', rgb: '237, 219, 206' }, // soft rose (alpha 0.9 for stroke)
    starch: { line: '#B58E5F', rgb: '181, 142, 95' }   // gold
  };

  Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
  Chart.defaults.color = PALETTE.deep;
  Chart.defaults.borderColor = 'rgba(181, 142, 95, .18)';

  // Register datalabels plugin if it loaded
  if (window.ChartDataLabels) {
    Chart.register(window.ChartDataLabels);
  }

  // Vertical linear-gradient fill per dataset (0.4 → 0.02 alpha)
  const makeGradient = (ctx, chartArea, rgb) => {
    if (!chartArea) return `rgba(${rgb}, 0.2)`;
    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    g.addColorStop(0, `rgba(${rgb}, 0.40)`);
    g.addColorStop(1, `rgba(${rgb}, 0.02)`);
    return g;
  };

  const gradientBg = (rgb) => (context) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    return makeGradient(ctx, chartArea, rgb);
  };

  const commonRadarOptions = (max) => ({
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.05,
    animation: prefersReducedMotion
      ? false
      : { duration: 900, easing: 'easeOutQuart' },
    layout: { padding: 12 },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: PALETTE.text,
          font: { family: "'Inter', sans-serif", size: 12, weight: '500' },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 14,
          boxWidth: 12
        }
      },
      tooltip: {
        backgroundColor: PALETTE.cream,
        titleColor: PALETTE.text,
        bodyColor: PALETTE.text,
        titleFont: { family: "'Cormorant Garamond', Georgia, serif", size: 14, weight: '600', style: 'italic' },
        bodyFont: { family: "'Inter', sans-serif", size: 12, weight: '500' },
        padding: 10,
        cornerRadius: 8,
        borderColor: PALETTE.gold,
        borderWidth: 1,
        displayColors: false,
        boxPadding: 0,
        caretPadding: 6,
        titleMarginBottom: 4
      },
      datalabels: window.ChartDataLabels ? {
        color: PALETTE.text,
        backgroundColor: 'rgba(251, 246, 238, 0.7)',
        borderRadius: 8,
        padding: { top: 2, bottom: 2, left: 5, right: 5 },
        font: { family: "'Inter', sans-serif", size: 10, weight: '500' },
        formatter: (v) => (typeof v === 'number' ? v.toFixed(1) : v),
        anchor: 'end',
        align: 'end',
        offset: 2,
        clamp: true
      } : false
    },
    scales: {
      r: {
        min: 0,
        max: max,
        ticks: {
          stepSize: 2,
          display: true,
          backdropColor: 'transparent',
          color: PALETTE.muted,
          font: { family: "'Cormorant Garamond', Georgia, serif", style: 'italic', size: 11 }
        },
        pointLabels: {
          color: PALETTE.deep,
          font: { family: "'Inter', sans-serif", size: 11, weight: '600' },
          padding: 14
        },
        angleLines: { color: 'rgba(139, 125, 108, 0.35)' },
        grid: { color: 'rgba(181, 142, 95, 0.25)' }
      }
    },
    elements: {
      line: { borderWidth: 2, tension: 0.3 },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        borderColor: PALETTE.cream
      }
    }
  });

  const styleDataset = (label, data, tone) => ({
    label,
    data,
    borderColor: tone === PALETTE.apg
      ? `rgba(${tone.rgb}, 0.9)`
      : tone.line,
    backgroundColor: gradientBg(tone.rgb),
    pointBackgroundColor: tone === PALETTE.apg
      ? `rgba(${tone.rgb}, 0.95)`
      : tone.line,
    pointBorderColor: PALETTE.cream,
    pointHoverBackgroundColor: tone === PALETTE.apg
      ? `rgba(${tone.rgb}, 1)`
      : tone.line,
    pointHoverBorderColor: PALETTE.cream,
    pointHoverBorderWidth: 2
  });

  // Chart builders — deferred until canvas enters the viewport
  const buildBaseChart = (canvas) => new Chart(canvas, {
    type: 'radar',
    data: {
      labels: [
        'Pickup',
        'Thickness',
        'Spreadability',
        'Soaping effect',
        'Absorption rate',
        'Shine effect',
        'Residual amount'
      ],
      datasets: [
        styleDataset('Ester Blend',        [7.0, 5.5, 7.9, 2.2, 5.0, 4.0, 4.5], PALETTE.ester),
        styleDataset('Alkyl Polyglucoside',[7.5, 6.0, 5.5, 7.5, 5.5, 7.4, 7.1], PALETTE.apg),
        styleDataset('Modified Starch',    [7.8, 6.5, 6.5, 4.0, 6.5, 4.5, 3.6], PALETTE.starch)
      ]
    },
    options: commonRadarOptions(10)
  });

  const buildPigmentChart = (canvas) => new Chart(canvas, {
    type: 'radar',
    data: {
      labels: [
        'Spreadability',
        'Mattifying effect',
        'Colour homogeneity',
        'Coverage',
        'Blendability',
        'Residual amount'
      ],
      datasets: [
        styleDataset('Ester Blend',     [8.0, 7.0, 7.3, 7.5, 7.6, 4.0], PALETTE.ester),
        styleDataset('Modified Starch', [4.5, 3.8, 1.9, 3.0, 2.6, 2.4], PALETTE.starch)
      ]
    },
    options: commonRadarOptions(10)
  });

  const deferRender = (id, builder) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    // Reserve layout height to prevent CLS while waiting for render
    const wrap = canvas.parentElement;
    if (wrap) wrap.style.minHeight = wrap.offsetHeight + 'px';

    if (!('IntersectionObserver' in window)) {
      builder(canvas);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          builder(canvas);
          io.disconnect();
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    io.observe(canvas);
  };

  deferRender('radarBase', buildBaseChart);
  deferRender('radarPigment', buildPigmentChart);
})();
