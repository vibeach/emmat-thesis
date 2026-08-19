/* ═══════════════════════════════════════════════
   EMMAT Cosmetics — Sensory radar charts
   Data extracted from Emma Terenzi's thesis
   presentation deck (slides 06 and 07).
   Panel n = 5, scale 0–10.
   ═══════════════════════════════════════════════ */

(function () {
  if (typeof Chart === 'undefined') return;

  // Shared style tokens (mirroring styles.css palette)
  const PALETTE = {
    text:  '#3B2E24',
    muted: '#8B7D6C',
    gold:  '#B58E5F',
    deep:  '#5C4B3A',
    rose:  '#EDDBCE',
    ester:  { line: '#3B2E24', fill: 'rgba(59, 46, 36, .16)' },
    apg:    { line: '#D4A5A5', fill: 'rgba(212, 165, 165, .28)' },
    starch: { line: '#B58E5F', fill: 'rgba(181, 142, 95, .22)' }
  };

  Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
  Chart.defaults.color = PALETTE.deep;
  Chart.defaults.borderColor = 'rgba(181, 142, 95, .18)';

  const commonRadarOptions = (max) => ({
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.05,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: PALETTE.text,
          font: { size: 12, weight: '500' },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          boxWidth: 10
        }
      },
      tooltip: {
        backgroundColor: PALETTE.text,
        titleFont: { family: "'Cormorant Garamond', Georgia, serif", size: 14, weight: '500' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        boxPadding: 4
      }
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
          font: { size: 9 }
        },
        pointLabels: {
          color: PALETTE.deep,
          font: { size: 11, weight: '500', family: "'Inter', sans-serif" },
          padding: 12
        },
        angleLines: { color: 'rgba(181, 142, 95, .2)' },
        grid: { color: 'rgba(181, 142, 95, .15)' }
      }
    },
    elements: {
      line: { borderWidth: 2, tension: 0.05 },
      point: { radius: 3, hoverRadius: 5, borderWidth: 1.5 }
    }
  });

  // ─── Base emulsion — three systems ─────────────────
  const baseCanvas = document.getElementById('radarBase');
  if (baseCanvas) {
    new Chart(baseCanvas, {
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
          {
            label: 'Ester Blend',
            data: [7.0, 5.5, 7.9, 2.2, 5.0, 4.0, 4.5],
            backgroundColor: PALETTE.ester.fill,
            borderColor: PALETTE.ester.line,
            pointBackgroundColor: PALETTE.ester.line
          },
          {
            label: 'Alkyl Polyglucoside',
            data: [7.5, 6.0, 5.5, 7.5, 5.5, 7.4, 7.1],
            backgroundColor: PALETTE.apg.fill,
            borderColor: PALETTE.apg.line,
            pointBackgroundColor: PALETTE.apg.line
          },
          {
            label: 'Modified Starch',
            data: [7.8, 6.5, 6.5, 4.0, 6.5, 4.5, 3.6],
            backgroundColor: PALETTE.starch.fill,
            borderColor: PALETTE.starch.line,
            pointBackgroundColor: PALETTE.starch.line
          }
        ]
      },
      options: commonRadarOptions(10)
    });
  }

  // ─── Pigmented series — Ester vs Starch ────────────
  const pigmentCanvas = document.getElementById('radarPigment');
  if (pigmentCanvas) {
    new Chart(pigmentCanvas, {
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
          {
            label: 'Ester Blend',
            data: [8.0, 7.0, 7.3, 7.5, 7.6, 4.0],
            backgroundColor: PALETTE.ester.fill,
            borderColor: PALETTE.ester.line,
            pointBackgroundColor: PALETTE.ester.line
          },
          {
            label: 'Modified Starch',
            data: [4.5, 3.8, 1.9, 3.0, 2.6, 2.4],
            backgroundColor: PALETTE.starch.fill,
            borderColor: PALETTE.starch.line,
            pointBackgroundColor: PALETTE.starch.line
          }
        ]
      },
      options: commonRadarOptions(10)
    });
  }
})();
