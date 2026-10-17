import * as THREE from 'three';

// Generates procedural canvas textures for labels, signage, and carbon weaves
// Strictly zero external file dependencies to avoid 404s.

export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
  gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.45)');
  gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createCarbonFiberTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#16161a';
  ctx.fillRect(0, 0, 64, 64);

  // Checkerboard carbon weave
  ctx.fillStyle = '#222228';
  for (let x = 0; x < 64; x += 16) {
    for (let y = 0; y < 64; y += 16) {
      if ((x + y) % 32 === 0) {
        ctx.fillRect(x, y, 16, 16);
      }
    }
  }

  // Micro thread lines
  ctx.strokeStyle = '#0d0d10';
  ctx.lineWidth = 1;
  for (let i = 0; i < 64; i += 4) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(64, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// Overhead Kiosk Curved Marquee Header ("JCS GRAPHENE / JCS CAR SOLUTION")
export function createBoothHeaderTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Deep glossy midnight blue gradient as seen in PDF page 8
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 256);
  bgGrad.addColorStop(0, '#0a1128');
  bgGrad.addColorStop(0.5, '#001f54');
  bgGrad.addColorStop(1, '#0a1128');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 256);

  // Hexagonal carbon grid accent
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < 1024; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 20, 256);
    ctx.stroke();
  }

  // Shield Emblem
  ctx.save();
  ctx.translate(512, 60);
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(30, -18);
  ctx.lineTo(30, 16);
  ctx.lineTo(0, 36);
  ctx.lineTo(-30, 16);
  ctx.lineTo(-30, -18);
  ctx.closePath();
  ctx.fillStyle = '#111';
  ctx.fill();
  ctx.strokeStyle = '#e63946';
  ctx.lineWidth = 4;
  ctx.stroke();

  // "JCS" text inside shield
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JCS', 0, -2);
  ctx.font = 'bold 8px sans-serif';
  ctx.fillStyle = '#e63946';
  ctx.fillText('CAR CARE', 0, 16);
  ctx.restore();

  // Main Header Text: GRAPHENE TOP COATING
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 64px "Montserrat", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  ctx.shadowColor = 'rgba(230, 57, 70, 0.8)';
  ctx.shadowBlur = 12;
  ctx.fillText('GRAPHENE', 512, 160);

  // Subtitle
  ctx.shadowBlur = 0;
  ctx.font = 'bold 22px "Montserrat", sans-serif';
  ctx.fillStyle = '#e63946';
  ctx.letterSpacing = '12px';
  ctx.fillText('TOP COATING & CAR CARE', 512, 210);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Front Counter Kiosk Wrap from PDF Page 8:
// UV PROTECTION, SCRATCH RESISTANCE, CHEMICAL RESISTANCE, ENHANCE SHINE, WEATHER EROSION, DUSK RESISTANCE
export function createBoothCounterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  // Dark carbon fiber background
  ctx.fillStyle = '#0c0e14';
  ctx.fillRect(0, 0, 1024, 768);

  // High-contrast angled racing red stripe and blue geometric accents
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(400, 0);
  ctx.lineTo(250, 768);
  ctx.lineTo(0, 768);
  ctx.fill();

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(380, 0);
  ctx.lineTo(430, 0);
  ctx.lineTo(280, 768);
  ctx.lineTo(230, 768);
  ctx.fill();

  // Shield Emblem in center
  ctx.save();
  ctx.translate(540, 220);
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(55, -30);
  ctx.lineTo(55, 30);
  ctx.lineTo(0, 65);
  ctx.lineTo(-55, 30);
  ctx.lineTo(-55, -30);
  ctx.closePath();
  ctx.fillStyle = '#0a0a0d';
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 7;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JCS', 0, -5);
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('CAR SOLUTION', 0, 26);
  ctx.restore();

  // Bold brand headline
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('JCS-AVIOR CARCARE TRADING', 540, 350);

  // Feature bullets from the actual physical kiosk wrap in PDF page 8:
  const claims = [
    '✔ UV PROTECTION',
    '✔ SCRATCH RESISTANCE',
    '✔ CHEMICAL RESISTANCE',
    '✔ ENHANCE SHINE',
    '✔ WEATHER EROSION',
    '✔ DUST & WATER REPELLENT'
  ];

  ctx.textAlign = 'left';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = '#f8fafc';
  
  claims.forEach((claim, idx) => {
    const col = idx < 3 ? 0 : 1;
    const row = idx % 3;
    const x = col === 0 ? 340 : 660;
    const y = 430 + row * 60;

    // Red highlight on checkmark
    ctx.fillStyle = '#ef4444';
    ctx.fillText('✔', x, y);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(claim.substring(2), x + 30, y);
  });

  // Footer banner
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(0, 690, 1024, 78);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 30px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GRAPHENE TOP COATING & WATERLESS CARE • 2026', 512, 740);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// JCS Graphene Coat Bottle Label
export function createGrapheneBottleLabel(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Rich carbon & metallic gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#111');
  grad.addColorStop(0.3, '#1c1917');
  grad.addColorStop(0.7, '#292524');
  grad.addColorStop(1, '#0c0a09');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Red racing diagonal bars
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 20, 512, 14);
  ctx.fillRect(0, 480, 512, 14);

  // Logo shield
  ctx.save();
  ctx.translate(256, 110);
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.lineTo(40, -20);
  ctx.lineTo(40, 20);
  ctx.lineTo(0, 45);
  ctx.lineTo(-40, 20);
  ctx.lineTo(-40, -20);
  ctx.closePath();
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JCS', 0, -4);
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('CAR SOLUTION', 0, 18);
  ctx.restore();

  // Product title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GRAPHENE', 256, 220);

  ctx.font = 'bold 26px sans-serif';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('TOP COATING', 256, 260);

  // Hydrophobic Badge
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(80, 290, 352, 44);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 290, 352, 44);

  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('💧 ULTRA HYDROPHOBIC FORMULA', 256, 318);

  // Bullet properties
  ctx.font = '600 16px sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('• 60%–70% High-Gloss Restoration', 256, 365);
  ctx.fillText('• Waterless Maintenance & UV Shield', 256, 395);
  ctx.fillText('• Acid Rain & Surface Barrier', 256, 425);

  ctx.font = 'bold 15px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('500 mL / 16.9 fl. oz.', 256, 460);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Glass and Klin Acid Rain Remover Label
export function createAcidRainLabel(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 512);

  // Red and black racing checker top & bottom
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 0, 512, 80);
  ctx.fillRect(0, 440, 512, 72);

  // Shield
  ctx.save();
  ctx.translate(256, 120);
  ctx.beginPath();
  ctx.moveTo(0, -35);
  ctx.lineTo(35, -18);
  ctx.lineTo(35, 18);
  ctx.lineTo(0, 40);
  ctx.lineTo(-35, 18);
  ctx.lineTo(-35, -18);
  ctx.closePath();
  ctx.fillStyle = '#111';
  ctx.fill();
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JCS', 0, -2);
  ctx.restore();

  // Title
  ctx.fillStyle = '#111827';
  ctx.font = '900 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GLASS & KLIN', 256, 210);

  ctx.fillStyle = '#dc2626';
  ctx.font = '900 32px sans-serif';
  ctx.fillText('ACID RAIN REMOVER', 256, 255);

  // Subtitle
  ctx.fillStyle = '#4b5563';
  ctx.font = 'bold 17px sans-serif';
  ctx.fillText('HEAVY WATER MARKS & STAINS ERASER', 256, 300);

  ctx.fillStyle = '#111827';
  ctx.font = '600 16px sans-serif';
  ctx.fillText('Restores Clear Optical Windshields', 256, 345);
  ctx.fillText('Cuts Etched Mineral Calcification', 256, 375);
  ctx.fillText('Safe on Paint & Glass Panels', 256, 405);

  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('PROFESSIONAL GRADE FORMULA', 256, 482);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// All Around Stain Remover Lid & Wrap
export function createStainRemoverLabel(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 512);

  // Blue and silver chrome borders
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, 492, 492);

  ctx.save();
  ctx.translate(256, 120);
  ctx.beginPath();
  ctx.moveTo(0, -35);
  ctx.lineTo(35, -18);
  ctx.lineTo(35, 18);
  ctx.lineTo(0, 40);
  ctx.lineTo(-35, 18);
  ctx.lineTo(-35, -18);
  ctx.closePath();
  ctx.fillStyle = '#0284c7';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JCS', 0, 0);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 38px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ALL AROUND', 256, 215);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '900 32px sans-serif';
  ctx.fillText('STAIN REMOVER', 256, 260);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('MULTI-PURPOSE COMPOUND PASTE', 256, 310);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '600 16px sans-serif';
  ctx.fillText('• Erases Parking Paint Transfers', 256, 355);
  ctx.fillText('• Clears Oxidized Yellow Headlights', 256, 385);
  ctx.fillText('• Removes Embedded Tar & Dirt', 256, 415);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('HEAVY DUTY 250G CONCENTRATE', 256, 465);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
