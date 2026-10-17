import * as THREE from 'three';
import {
  createContactShadowTexture,
  createBoothHeaderTexture,
  createBoothCounterTexture,
  createGrapheneBottleLabel,
  createAcidRainLabel,
  createStainRemoverLabel,
  createCarbonFiberTexture
} from './proceduralTextures';

// Shared Materials & Geometries caching
const contactShadowGeo = new THREE.PlaneGeometry(1, 1);
const shadowTex = createContactShadowTexture();
const contactShadowMat = new THREE.MeshBasicMaterial({
  map: shadowTex,
  transparent: true,
  opacity: 0.55,
  depthWrite: false,
});

/**
 * 1. PROPOSED BOOTH (1.5m x 1.0m Kiosk from PDF Page 8)
 */
export function createMallBoothKiosk(): THREE.Group {
  const boothGroup = new THREE.Group();
  boothGroup.name = 'MallBoothKiosk';

  // Scale: 1 unit = 1 meter
  // Footprint marker: 1.5m width (X) x 1.0m depth (Z)
  const footprintGeo = new THREE.PlaneGeometry(1.5, 1.0);
  const footprintCanvas = document.createElement('canvas');
  footprintCanvas.width = 512;
  footprintCanvas.height = 340;
  const fCtx = footprintCanvas.getContext('2d')!;
  fCtx.fillStyle = '#1e293b';
  fCtx.fillRect(0, 0, 512, 340);
  fCtx.strokeStyle = '#ef4444';
  fCtx.lineWidth = 10;
  fCtx.strokeRect(5, 5, 502, 330);
  // Dashed inner lines
  fCtx.setLineDash([12, 8]);
  fCtx.strokeStyle = '#f59e0b';
  fCtx.lineWidth = 4;
  fCtx.strokeRect(16, 16, 480, 308);
  // Text label
  fCtx.setLineDash([]);
  fCtx.fillStyle = '#ffffff';
  fCtx.font = 'bold 24px sans-serif';
  fCtx.textAlign = 'center';
  fCtx.fillText('1.5m × 1.0m PROPOSED MALL BOOTH AREA', 256, 170);
  fCtx.font = 'bold 16px sans-serif';
  fCtx.fillStyle = '#ef4444';
  fCtx.fillText('JCS-AVIOR CARCARE TRADING', 256, 210);

  const footprintTex = new THREE.CanvasTexture(footprintCanvas);
  footprintTex.colorSpace = THREE.SRGBColorSpace;
  const footprintMat = new THREE.MeshBasicMaterial({
    map: footprintTex,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const footprintMesh = new THREE.Mesh(footprintGeo, footprintMat);
  footprintMesh.rotation.x = -Math.PI / 2;
  footprintMesh.position.y = 0.005;
  boothGroup.add(footprintMesh);

  // Contact shadow under kiosk
  const shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.0, 1.4),
    contactShadowMat
  );
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.002;
  boothGroup.add(shadowMesh);

  // Counter Body: width = 1.1m, depth = 0.55m, height = 0.95m
  const counterGeo = new THREE.BoxGeometry(1.1, 0.95, 0.55);
  // Materials: front face gets branded wrap, other faces get glossy dark metallic
  const darkMetallicMat = new THREE.MeshStandardMaterial({
    color: 0x11141a,
    roughness: 0.35,
    metalness: 0.7,
  });
  const counterWrapTex = createBoothCounterTexture();
  const counterFrontMat = new THREE.MeshStandardMaterial({
    map: counterWrapTex,
    roughness: 0.25,
    metalness: 0.15,
  });

  // Cube materials array: +X, -X, +Y, -Y, +Z (front), -Z (back)
  const counterMats = [
    darkMetallicMat, // right
    darkMetallicMat, // left
    new THREE.MeshStandardMaterial({ color: 0x18181f, roughness: 0.2, metalness: 0.8 }), // top counter
    darkMetallicMat, // bottom
    counterFrontMat, // front
    darkMetallicMat, // back
  ];
  const counterMesh = new THREE.Mesh(counterGeo, counterMats);
  counterMesh.position.set(0, 0.95 / 2, 0.05);
  counterMesh.castShadow = true;
  counterMesh.receiveShadow = true;
  boothGroup.add(counterMesh);

  // Glossy Countertop Lip (slightly overhangs)
  const countertopGeo = new THREE.BoxGeometry(1.16, 0.04, 0.62);
  const countertopMat = new THREE.MeshPhysicalMaterial({
    color: 0x09090b,
    roughness: 0.15,
    metalness: 0.5,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  });
  const countertopMesh = new THREE.Mesh(countertopGeo, countertopMat);
  countertopMesh.position.set(0, 0.95 + 0.02, 0.05);
  countertopMesh.castShadow = true;
  countertopMesh.receiveShadow = true;
  boothGroup.add(countertopMesh);

  // Display Tier / Acrylic Riser on the Countertop
  const riserGeo = new THREE.BoxGeometry(0.85, 0.12, 0.32);
  const riserMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    transmission: 0.8,
    opacity: 0.85,
    transparent: true,
    roughness: 0.1,
    ior: 1.5,
  });
  const riserMesh = new THREE.Mesh(riserGeo, riserMat);
  riserMesh.position.set(0, 0.95 + 0.04 + 0.06, -0.05);
  boothGroup.add(riserMesh);

  // Display Sample Bottles on top of the counter & riser
  const samplePositions = [
    { x: -0.28, z: -0.05, type: 'graphene' },
    { x: -0.1, z: -0.05, type: 'graphene' },
    { x: 0.1, z: -0.05, type: 'acidRain' },
    { x: 0.28, z: -0.05, type: 'stainTub' },
    { x: -0.2, z: 0.15, type: 'cloth' },
    { x: 0.2, z: 0.15, type: 'cloth' }
  ];

  samplePositions.forEach((pos) => {
    if (pos.type === 'graphene' || pos.type === 'acidRain') {
      const bottle = createMiniProductBottle(pos.type === 'graphene' ? 0xef4444 : 0xf59e0b);
      bottle.position.set(pos.x, 0.95 + 0.04 + 0.12, pos.z);
      boothGroup.add(bottle);
    } else if (pos.type === 'stainTub') {
      const tub = createMiniProductTub();
      tub.position.set(pos.x, 0.95 + 0.04 + 0.12, pos.z);
      boothGroup.add(tub);
    } else {
      // Microfiber cloth roll
      const clothGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.16, 16);
      const clothMat = new THREE.MeshStandardMaterial({
        color: pos.x < 0 ? 0xfacc15 : 0x38bdf8,
        roughness: 0.9,
      });
      const clothMesh = new THREE.Mesh(clothGeo, clothMat);
      clothMesh.rotation.z = Math.PI / 2;
      clothMesh.position.set(pos.x, 0.95 + 0.04 + 0.035, pos.z);
      boothGroup.add(clothMesh);
    }
  });

  // Support Poles (2 vertical aluminium trusses / posts rising to 2.2 meters)
  const poleGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.25, 16);
  const poleMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    roughness: 0.2,
    metalness: 0.9,
  });

  const leftPole = new THREE.Mesh(poleGeo, poleMat);
  leftPole.position.set(-0.52, 2.25 / 2, -0.15);
  leftPole.castShadow = true;
  boothGroup.add(leftPole);

  const rightPole = new THREE.Mesh(poleGeo, poleMat);
  rightPole.position.set(0.52, 2.25 / 2, -0.15);
  rightPole.castShadow = true;
  boothGroup.add(rightPole);

  // Curved Overhead Header Marquee (curved cylinder slice or angled arch)
  const headerGeo = new THREE.CylinderGeometry(
    0.95, // top radius
    0.95, // bottom radius
    0.42, // height
    32,   // segments
    1,
    true,
    -Math.PI / 3.2,
    Math.PI / 1.6
  );
  const headerTex = createBoothHeaderTexture();
  const headerMat = new THREE.MeshStandardMaterial({
    map: headerTex,
    roughness: 0.3,
    metalness: 0.4,
    side: THREE.DoubleSide,
  });
  const headerMesh = new THREE.Mesh(headerGeo, headerMat);
  headerMesh.position.set(0, 2.15, 0.45);
  headerMesh.castShadow = true;
  boothGroup.add(headerMesh);

  // Header Backing structure
  const headerBackGeo = new THREE.BoxGeometry(1.15, 0.44, 0.04);
  const headerBackMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4,
    metalness: 0.6,
  });
  const headerBackMesh = new THREE.Mesh(headerBackGeo, headerBackMat);
  headerBackMesh.position.set(0, 2.15, -0.15);
  boothGroup.add(headerBackMesh);

  // Small spotlight on header shining down on counter
  const headerSpot = new THREE.SpotLight(0xffffff, 25, 3.5, Math.PI / 4, 0.3);
  headerSpot.position.set(0, 2.25, 0.1);
  headerSpot.target = counterMesh;
  boothGroup.add(headerSpot);

  // Side Banner Wings (like shown in Page 8 photo)
  const wingGeo = new THREE.PlaneGeometry(0.35, 1.4);
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const leftWing = new THREE.Mesh(wingGeo, wingMat);
  leftWing.position.set(-0.55, 1.35, -0.05);
  leftWing.rotation.y = Math.PI / 4;
  boothGroup.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeo, wingMat);
  rightWing.position.set(0.55, 1.35, -0.05);
  rightWing.rotation.y = -Math.PI / 4;
  boothGroup.add(rightWing);

  return boothGroup;
}

function createMiniProductBottle(colorHex: number): THREE.Group {
  const group = new THREE.Group();
  // Bottle body
  const bodyGeo = new THREE.CylinderGeometry(0.03, 0.034, 0.15, 16);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: colorHex,
    roughness: 0.2,
    metalness: 0.3,
    clearcoat: 0.6,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.075;
  group.add(body);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.012, 0.016, 0.04, 16);
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x111, roughness: 0.5 });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.y = 0.17;
  group.add(neck);

  // Trigger head
  const headGeo = new THREE.BoxGeometry(0.025, 0.035, 0.06);
  const headMat = new THREE.MeshStandardMaterial({ color: 0x111, roughness: 0.3 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(0, 0.20, 0.01);
  group.add(head);

  return group;
}

function createMiniProductTub(): THREE.Group {
  const group = new THREE.Group();
  const tubGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.06, 20);
  const tubMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.3,
    metalness: 0.4,
  });
  const tub = new THREE.Mesh(tubGeo, tubMat);
  tub.position.y = 0.03;
  group.add(tub);

  const lidGeo = new THREE.CylinderGeometry(0.052, 0.052, 0.018, 20);
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.15,
    metalness: 0.9,
  });
  const lid = new THREE.Mesh(lidGeo, lidMat);
  lid.position.y = 0.065;
  group.add(lid);

  return group;
}

/**
 * 2. SPORTS CAR 3D MODEL (With Graphene Coating / Waterless Demonstration)
 */
export function createSportsCarModel(isGrapheneCoated = true): { carGroup: THREE.Group; updateCoating: (coated: boolean) => void } {
  const carGroup = new THREE.Group();
  carGroup.name = 'SportsCar3D';

  // Car Paint Material (Dynamic PBR clearcoat & roughness)
  const paintMat = new THREE.MeshPhysicalMaterial({
    color: 0xd90429, // Metallic Crimson
    metalness: 0.85,
    roughness: isGrapheneCoated ? 0.08 : 0.45,
    clearcoat: isGrapheneCoated ? 1.0 : 0.2,
    clearcoatRoughness: isGrapheneCoated ? 0.03 : 0.4,
    reflectivity: isGrapheneCoated ? 1.0 : 0.4,
  });

  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    roughness: 0.4,
    metalness: 0.7,
    map: createCarbonFiberTexture(),
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a1128,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.75,
    transparent: true,
    opacity: 0.85,
    ior: 1.52,
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.95,
    roughness: 0.1,
  });

  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x1c1917,
    roughness: 0.85,
    metalness: 0.1,
  });

  // 1. Lower Chassis & Floor
  const chassisGeo = new THREE.BoxGeometry(1.85, 0.24, 4.3);
  const chassisMesh = new THREE.Mesh(chassisGeo, carbonMat);
  chassisMesh.position.set(0, 0.28, 0);
  chassisMesh.castShadow = true;
  carGroup.add(chassisMesh);

  // 2. Main Aerodynamic Body (Hood, Fenders & Rear)
  const bodyGeo = new THREE.BoxGeometry(1.82, 0.42, 3.8);
  const bodyMesh = new THREE.Mesh(bodyGeo, paintMat);
  bodyMesh.position.set(0, 0.52, -0.05);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  carGroup.add(bodyMesh);

  // 3. Sloped Front Hood & Nose Cone
  const hoodGeo = new THREE.CylinderGeometry(0.86, 0.91, 1.4, 4);
  const hoodMesh = new THREE.Mesh(hoodGeo, paintMat);
  hoodMesh.rotation.y = Math.PI / 4;
  hoodMesh.rotation.x = -Math.PI / 2.3;
  hoodMesh.position.set(0, 0.56, 1.4);
  hoodMesh.castShadow = true;
  carGroup.add(hoodMesh);

  // Front Carbon Splitter
  const splitterGeo = new THREE.BoxGeometry(1.88, 0.05, 0.6);
  const splitterMesh = new THREE.Mesh(splitterGeo, carbonMat);
  splitterMesh.position.set(0, 0.18, 2.1);
  splitterMesh.castShadow = true;
  carGroup.add(splitterMesh);

  // 4. Cabin & Glass Canopy
  const cabinGeo = new THREE.BoxGeometry(1.42, 0.44, 1.85);
  const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
  cabinMesh.position.set(0, 0.9, -0.2);
  cabinMesh.castShadow = true;
  carGroup.add(cabinMesh);

  // Cabin Roof Panel (Paint color)
  const roofGeo = new THREE.BoxGeometry(1.36, 0.06, 1.4);
  const roofMesh = new THREE.Mesh(roofGeo, paintMat);
  roofMesh.position.set(0, 1.13, -0.2);
  roofMesh.castShadow = true;
  carGroup.add(roofMesh);

  // Windshield Frame & A-Pillars
  const pillarGeo = new THREE.BoxGeometry(0.08, 0.5, 0.08);
  const leftPillar = new THREE.Mesh(pillarGeo, carbonMat);
  leftPillar.position.set(-0.68, 0.9, 0.65);
  leftPillar.rotation.x = -Math.PI / 6;
  carGroup.add(leftPillar);

  const rightPillar = new THREE.Mesh(pillarGeo, carbonMat);
  rightPillar.position.set(0.68, 0.9, 0.65);
  rightPillar.rotation.x = -Math.PI / 6;
  carGroup.add(rightPillar);

  // 5. Headlights with LED Strips
  const headLightGeo = new THREE.BoxGeometry(0.42, 0.1, 0.18);
  const headLightMat = new THREE.MeshStandardMaterial({
    color: 0x93c5fd,
    emissive: 0x60a5fa,
    emissiveIntensity: 1.5,
    roughness: 0.1,
  });

  const leftHeadlight = new THREE.Mesh(headLightGeo, headLightMat);
  leftHeadlight.position.set(-0.65, 0.55, 2.05);
  leftHeadlight.rotation.y = 0.2;
  carGroup.add(leftHeadlight);

  const rightHeadlight = new THREE.Mesh(headLightGeo, headLightMat);
  rightHeadlight.position.set(0.65, 0.55, 2.05);
  rightHeadlight.rotation.y = -0.2;
  carGroup.add(rightHeadlight);

  // Front JCS Shield Badge on grille
  const badgeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 6);
  const badgeMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    metalness: 0.8,
    roughness: 0.2,
  });
  const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
  badgeMesh.rotation.x = Math.PI / 2;
  badgeMesh.position.set(0, 0.5, 2.12);
  carGroup.add(badgeMesh);

  // 6. Rear Tail Lights & Diffuser
  const tailLightGeo = new THREE.BoxGeometry(1.65, 0.08, 0.08);
  const tailLightMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xd90429,
    emissiveIntensity: 2.0,
  });
  const tailLightMesh = new THREE.Mesh(tailLightGeo, tailLightMat);
  tailLightMesh.position.set(0, 0.68, -2.05);
  carGroup.add(tailLightMesh);

  // Rear Spoiler / Wing
  const wingPlankGeo = new THREE.BoxGeometry(1.7, 0.04, 0.32);
  const wingPlank = new THREE.Mesh(wingPlankGeo, carbonMat);
  wingPlank.position.set(0, 0.98, -1.9);
  wingPlank.castShadow = true;
  carGroup.add(wingPlank);

  const wingStrutGeo = new THREE.BoxGeometry(0.04, 0.25, 0.15);
  const leftStrut = new THREE.Mesh(wingStrutGeo, carbonMat);
  leftStrut.position.set(-0.55, 0.82, -1.9);
  carGroup.add(leftStrut);

  const rightStrut = new THREE.Mesh(wingStrutGeo, carbonMat);
  rightStrut.position.set(0.55, 0.82, -1.9);
  carGroup.add(rightStrut);

  // Rear Exhaust Pipes
  const exhaustGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.16, 16);
  const leftExhaust = new THREE.Mesh(exhaustGeo, chromeMat);
  leftExhaust.rotation.x = Math.PI / 2;
  leftExhaust.position.set(-0.45, 0.25, -2.12);
  carGroup.add(leftExhaust);

  const rightExhaust = new THREE.Mesh(exhaustGeo, chromeMat);
  rightExhaust.rotation.x = Math.PI / 2;
  rightExhaust.position.set(0.45, 0.25, -2.12);
  carGroup.add(rightExhaust);

  // 7. Wheels & Brake Assemblies (4 corners)
  const wheelRadius = 0.36;
  const wheelWidth = 0.24;
  const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 24);
  const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.72, wheelRadius * 0.72, wheelWidth + 0.01, 16);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x111,
    metalness: 0.9,
    roughness: 0.15,
  });
  const caliperGeo = new THREE.BoxGeometry(0.12, 0.18, 0.08);
  const caliperMat = new THREE.MeshStandardMaterial({
    color: 0xd90429,
    roughness: 0.3,
  });

  const wheelPositions = [
    { x: -0.92, z: 1.35 },
    { x: 0.92, z: 1.35 },
    { x: -0.92, z: -1.35 },
    { x: 0.92, z: -1.35 },
  ];

  wheelPositions.forEach((pos) => {
    const wheelGroup = new THREE.Group();

    // Tire
    const tire = new THREE.Mesh(tireGeo, rubberMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Rim
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.z = Math.PI / 2;
    wheelGroup.add(rim);

    // Red Brake Caliper
    const caliper = new THREE.Mesh(caliperGeo, caliperMat);
    caliper.position.set(pos.x < 0 ? 0.05 : -0.05, 0.15, 0);
    wheelGroup.add(caliper);

    wheelGroup.position.set(pos.x, wheelRadius, pos.z);
    carGroup.add(wheelGroup);
  });

  // Soft Contact Shadow Plane underneath car
  const carShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 5.0),
    contactShadowMat
  );
  carShadow.rotation.x = -Math.PI / 2;
  carShadow.position.y = 0.005;
  carGroup.add(carShadow);

  const updateCoating = (coated: boolean) => {
    paintMat.roughness = coated ? 0.06 : 0.48;
    paintMat.clearcoat = coated ? 1.0 : 0.15;
    paintMat.clearcoatRoughness = coated ? 0.02 : 0.45;
    paintMat.reflectivity = coated ? 1.0 : 0.35;
    paintMat.needsUpdate = true;
  };

  return { carGroup, updateCoating };
}

/**
 * 3. DETAILED PRODUCT 3D MODELS (Flagship inspection)
 */
export function createProductDetailedModel(productId: string): THREE.Group {
  const group = new THREE.Group();
  group.name = `Product_${productId}`;

  if (productId === 'graphene-coat') {
    // 500ml Graphene Spray Bottle with Trigger Sprayer
    const bottleBodyGeo = new THREE.CylinderGeometry(0.38, 0.42, 1.5, 32);
    const labelTex = createGrapheneBottleLabel();
    const bottleBodyMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      roughness: 0.18,
      metalness: 0.35,
    });
    const bottleBody = new THREE.Mesh(bottleBodyGeo, bottleBodyMat);
    bottleBody.position.y = 0.75;
    bottleBody.castShadow = true;
    group.add(bottleBody);

    // Bottle Shoulder & Neck
    const shoulderGeo = new THREE.ConeGeometry(0.38, 0.3, 32, 1, true);
    const blackPlasticMat = new THREE.MeshStandardMaterial({
      color: 0x171717,
      roughness: 0.3,
      metalness: 0.2,
    });
    const shoulder = new THREE.Mesh(shoulderGeo, blackPlasticMat);
    shoulder.position.y = 1.65;
    group.add(shoulder);

    const neckGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.35, 24);
    const neck = new THREE.Mesh(neckGeo, blackPlasticMat);
    neck.position.y = 1.85;
    group.add(neck);

    // Threaded Collar Ring
    const collarGeo = new THREE.TorusGeometry(0.15, 0.03, 12, 24);
    const redAccentMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.25,
      metalness: 0.7,
    });
    const collar = new THREE.Mesh(collarGeo, redAccentMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 1.88;
    group.add(collar);

    // Ergonomic Trigger Head
    const triggerHousingGeo = new THREE.BoxGeometry(0.25, 0.38, 0.65);
    const triggerHousing = new THREE.Mesh(triggerHousingGeo, blackPlasticMat);
    triggerHousing.position.set(0, 2.18, 0.08);
    triggerHousing.castShadow = true;
    group.add(triggerHousing);

    // Spray Nozzle Tip
    const nozzleGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.15, 16);
    const nozzle = new THREE.Mesh(nozzleGeo, redAccentMat);
    nozzle.rotation.x = Math.PI / 2;
    nozzle.position.set(0, 2.22, 0.44);
    group.add(nozzle);

    // Pull Trigger Lever
    const leverGeo = new THREE.BoxGeometry(0.08, 0.3, 0.08);
    const lever = new THREE.Mesh(leverGeo, redAccentMat);
    lever.position.set(0, 2.05, 0.16);
    lever.rotation.x = 0.25;
    group.add(lever);

  } else if (productId === 'acid-rain-remover') {
    // Glass & Klin Acid Rain Remover Bottle
    const bottleBodyGeo = new THREE.CylinderGeometry(0.36, 0.36, 1.4, 32);
    const labelTex = createAcidRainLabel();
    const bottleMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      roughness: 0.2,
      metalness: 0.1,
    });
    const body = new THREE.Mesh(bottleBodyGeo, bottleMat);
    body.position.y = 0.7;
    body.castShadow = true;
    group.add(body);

    // Tapered Cap / Precision Dispenser
    const capGeo = new THREE.ConeGeometry(0.18, 0.55, 24);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.25,
      metalness: 0.3,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.65;
    group.add(cap);

  } else {
    // All Around Stain Remover Heavy-Duty Tub
    const tubGeo = new THREE.CylinderGeometry(0.65, 0.62, 0.75, 36);
    const labelTex = createStainRemoverLabel();
    const tubMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      roughness: 0.22,
      metalness: 0.3,
    });
    const tub = new THREE.Mesh(tubGeo, tubMat);
    tub.position.y = 0.38;
    tub.castShadow = true;
    group.add(tub);

    // Chrome Fluted Lid
    const lidGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.22, 36);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.12,
      metalness: 0.95,
    });
    const lid = new THREE.Mesh(lidGeo, lidMat);
    lid.position.y = 0.82;
    lid.castShadow = true;
    group.add(lid);
  }

  // Soft base contact shadow
  const baseShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 1.6),
    contactShadowMat
  );
  baseShadow.rotation.x = -Math.PI / 2;
  baseShadow.position.y = 0.005;
  group.add(baseShadow);

  return group;
}

/**
 * 4. WATER DROPLET PARTICLE SYSTEM FOR HYDROPHOBIC SIMULATION
 */
export class WaterSpraySystem {
  public particlesMesh: THREE.Points;
  private particleCount = 280;
  private positions: Float32Array;
  private velocities: Float32Array;
  private initialY = 2.4;
  public isActive = false;
  public isHydrophobic = true;

  constructor(scene: THREE.Group) {
    const geo = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.particleCount * 3);
    this.velocities = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      this.resetParticle(i, true);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    // Procedural water droplet circular alpha map
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.4, 'rgba(186, 230, 253, 0.7)');
    grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const dropTex = new THREE.CanvasTexture(canvas);

    const mat = new THREE.PointsMaterial({
      size: 0.14,
      map: dropTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particlesMesh = new THREE.Points(geo, mat);
    scene.add(this.particlesMesh);
  }

  private resetParticle(i: number, randomY = false) {
    const idx = i * 3;
    this.positions[idx] = (Math.random() - 0.5) * 1.6;
    this.positions[idx + 1] = randomY ? Math.random() * 2.0 + 0.8 : this.initialY;
    this.positions[idx + 2] = (Math.random() - 0.5) * 3.4;

    this.velocities[idx] = (Math.random() - 0.5) * 0.4;
    this.velocities[idx + 1] = -3.2 - Math.random() * 2.5; // downward gravity
    this.velocities[idx + 2] = (Math.random() - 0.5) * 0.4;
  }

  public update(delta: number) {
    if (!this.isActive) {
      this.particlesMesh.visible = false;
      return;
    }
    this.particlesMesh.visible = true;
    const posAttr = this.particlesMesh.geometry.getAttribute('position') as THREE.BufferAttribute;

    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;
      this.positions[idx] += this.velocities[idx] * delta;
      this.positions[idx + 1] += this.velocities[idx + 1] * delta;
      this.positions[idx + 2] += this.velocities[idx + 2] * delta;

      // Contact with hood/roof (Y around 0.6 to 1.1)
      if (this.positions[idx + 1] < 0.62) {
        if (this.isHydrophobic) {
          // Graphene effect: Beads roll rapidly off the edges!
          const angle = Math.atan2(this.positions[idx + 2], this.positions[idx]);
          this.velocities[idx] = Math.cos(angle) * 3.8;
          this.velocities[idx + 2] = Math.sin(angle) * 3.8;
          this.velocities[idx + 1] = -1.2; // Slide off
          if (Math.abs(this.positions[idx]) > 1.2 || Math.abs(this.positions[idx + 2]) > 2.2) {
            this.resetParticle(i);
          }
        } else {
          // Uncoated effect: Sluggish clinging / pooling
          this.velocities[idx] *= 0.15;
          this.velocities[idx + 2] *= 0.15;
          if (this.positions[idx + 1] < 0.25) {
            this.resetParticle(i);
          }
        }
      }

      if (this.positions[idx + 1] < 0.1) {
        this.resetParticle(i);
      }
    }

    posAttr.needsUpdate = true;
  }

  public dispose() {
    this.particlesMesh.geometry.dispose();
    if (Array.isArray(this.particlesMesh.material)) {
      this.particlesMesh.material.forEach((m) => m.dispose());
    } else {
      this.particlesMesh.material.dispose();
    }
  }
}
