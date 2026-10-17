import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  createMallBoothKiosk,
  createSportsCarModel,
  createProductDetailedModel,
  WaterSpraySystem
} from './proceduralModels';
import { soundFX } from '../../utils/audio';
import {
  Sparkles,
  Droplets,
  RotateCw,
  Sun,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Store,
  Car,
  Package,
  Layers,
  ShieldCheck,
  Eye,
  Camera
} from 'lucide-react';

export type SceneMode = 'booth' | 'car' | 'product';
export type ProductFocus = 'graphene-coat' | 'acid-rain-remover' | 'all-around-remover';

interface ThreeViewportProps {
  currentMode: SceneMode;
  onModeChange: (mode: SceneMode) => void;
  selectedProductId: ProductFocus;
  onSelectProduct: (id: ProductFocus) => void;
  onRegisterSnapshot?: (handler: () => void) => void;
}

export const ThreeViewport: React.FC<ThreeViewportProps> = ({
  currentMode,
  onModeChange,
  selectedProductId,
  onSelectProduct,
  onRegisterSnapshot,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // User controls state
  const [isCoated, setIsCoated] = useState(true);
  const [isSprayingWater, setIsSprayingWater] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'mall' | 'night'>('studio');
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [activeCamPreset, setActiveCamPreset] = useState<'hero' | 'top' | 'close' | 'front'>('hero');

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carControllerRef = useRef<{ carGroup: THREE.Group; updateCoating: (c: boolean) => void } | null>(null);
  const waterSystemRef = useRef<WaterSpraySystem | null>(null);
  const boothGroupRef = useRef<THREE.Group | null>(null);
  const productGroupRef = useRef<THREE.Group | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);

  // Target camera positions for smooth damping
  const targetCamPos = useRef(new THREE.Vector3(2.5, 1.8, 3.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  const handleDownloadSnapshot = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    soundFX.playClick(850);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `JCS-Car-Solution-3D-${currentMode}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  useEffect(() => {
    if (onRegisterSnapshot) {
      onRegisterSnapshot(handleDownloadSnapshot);
    }
  }, [onRegisterSnapshot, currentMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Color
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.05);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(2.6, 2.0, 3.4);
    cameraRef.current = camera;

    // 3. Renderer with ACES Tone Mapping, PBR settings, and buffer preservation for snapshots
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envRoom = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(envRoom, 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Rig (Warm Key Light, Cool Sky Hemisphere, Rim Light)
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x090d16, 0.7);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    dirLight.position.set(3.5, 5.0, 3.0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 15;
    dirLight.shadow.camera.left = -3;
    dirLight.shadow.camera.right = 3;
    dirLight.shadow.camera.top = 3;
    dirLight.shadow.camera.bottom = -3;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Soft Rim Light
    const rimLight = new THREE.DirectionalLight(0xef4444, 0.8);
    rimLight.position.set(-3.5, 2.5, -3.5);
    scene.add(rimLight);

    // Floor Grid Texture (Luxury showroom reflective floor)
    const gridGeo = new THREE.PlaneGeometry(24, 24);
    const gridMat = new THREE.MeshStandardMaterial({
      color: 0x0e1117,
      roughness: 0.15,
      metalness: 0.6,
    });
    const floorMesh = new THREE.Mesh(gridGeo, gridMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Circular glowing podium perimeter
    const ringGeo = new THREE.RingGeometry(2.1, 2.14, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.004;
    scene.add(ringMesh);

    // 6. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below floor
    controls.minDistance = 1.0;
    controls.maxDistance = 9.0;
    controls.target.set(0, 0.8, 0);
    controlsRef.current = controls;

    // 7. Models Initialization
    // A. Booth Kiosk
    const booth = createMallBoothKiosk();
    boothGroupRef.current = booth;
    scene.add(booth);

    // B. Sports Car
    const carObj = createSportsCarModel(true);
    carControllerRef.current = carObj;
    scene.add(carObj.carGroup);

    // C. Water Spray System for Car
    const waterSystem = new WaterSpraySystem(scene as unknown as THREE.Group);
    waterSystemRef.current = waterSystem;

    // D. Flagship Product Model
    const product = createProductDetailedModel(selectedProductId);
    productGroupRef.current = product;
    scene.add(product);

    // Initial visibility state based on currentMode
    updateSceneVisibility(currentMode, selectedProductId);

    // 8. Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera interpolation
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.current.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.current.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.current.z, 3.5, delta);

      controls.target.x = THREE.MathUtils.damp(controls.target.x, targetLookAt.current.x, 4.0, delta);
      controls.target.y = THREE.MathUtils.damp(controls.target.y, targetLookAt.current.y, 4.0, delta);
      controls.target.z = THREE.MathUtils.damp(controls.target.z, targetLookAt.current.z, 4.0, delta);

      // Auto rotation
      if (controls.autoRotate) {
        controls.update();
      } else {
        controls.update();
      }

      // Update water spray if active
      if (waterSystemRef.current) {
        waterSystemRef.current.update(delta);
      }

      // Gentle product inspection spin in product mode
      if (currentMode === 'product' && productGroupRef.current && controls.autoRotate) {
        productGroupRef.current.rotation.y += delta * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      waterSystem.dispose();
    };
  }, []);

  // Update scene objects visibility when currentMode changes
  const updateSceneVisibility = (mode: SceneMode, prodId: ProductFocus) => {
    if (boothGroupRef.current) boothGroupRef.current.visible = mode === 'booth';
    if (carControllerRef.current) carControllerRef.current.carGroup.visible = mode === 'car';
    if (productGroupRef.current) productGroupRef.current.visible = mode === 'product';

    if (waterSystemRef.current) {
      waterSystemRef.current.isActive = mode === 'car' && isSprayingWater;
    }

    // Adjust camera targets per mode
    if (mode === 'booth') {
      targetCamPos.current.set(2.4, 1.9, 2.7);
      targetLookAt.current.set(0, 1.1, 0);
    } else if (mode === 'car') {
      targetCamPos.current.set(3.4, 1.6, 3.4);
      targetLookAt.current.set(0, 0.6, 0);
    } else if (mode === 'product') {
      targetCamPos.current.set(0, 1.2, 2.4);
      targetLookAt.current.set(0, 1.0, 0);
    }
  };

  useEffect(() => {
    updateSceneVisibility(currentMode, selectedProductId);
  }, [currentMode, isSprayingWater]);

  // Update product model when selected product changes
  useEffect(() => {
    if (!sceneRef.current || currentMode !== 'product') return;

    if (productGroupRef.current) {
      sceneRef.current.remove(productGroupRef.current);
    }
    const newProduct = createProductDetailedModel(selectedProductId);
    productGroupRef.current = newProduct;
    sceneRef.current.add(newProduct);
  }, [selectedProductId, currentMode]);

  // Update car coating state
  useEffect(() => {
    if (carControllerRef.current) {
      carControllerRef.current.updateCoating(isCoated);
    }
    if (waterSystemRef.current) {
      waterSystemRef.current.isHydrophobic = isCoated;
    }
  }, [isCoated]);

  // Update water spray state
  useEffect(() => {
    if (waterSystemRef.current) {
      waterSystemRef.current.isActive = currentMode === 'car' && isSprayingWater;
    }
  }, [isSprayingWater, currentMode]);

  // Auto rotate toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
      controlsRef.current.autoRotateSpeed = 1.2;
    }
  }, [isAutoRotate]);

  // Lighting preset switcher
  const handleLightingChange = (preset: 'studio' | 'mall' | 'night') => {
    setLightingPreset(preset);
    soundFX.playClick(720);
    if (!dirLightRef.current || !hemiLightRef.current || !sceneRef.current) return;

    if (preset === 'studio') {
      dirLightRef.current.color.setHex(0xfff7ed);
      dirLightRef.current.intensity = 2.4;
      hemiLightRef.current.color.setHex(0xe0f2fe);
      hemiLightRef.current.intensity = 0.7;
      sceneRef.current.fog = new THREE.FogExp2(0x0a0c10, 0.05);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.15;
    } else if (preset === 'mall') {
      // Bright mall atrium lighting
      dirLightRef.current.color.setHex(0xffffff);
      dirLightRef.current.intensity = 3.2;
      hemiLightRef.current.color.setHex(0xffffff);
      hemiLightRef.current.intensity = 1.2;
      sceneRef.current.fog = new THREE.FogExp2(0x131720, 0.03);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.35;
    } else {
      // Moody night neon car show
      dirLightRef.current.color.setHex(0xef4444);
      dirLightRef.current.intensity = 1.6;
      hemiLightRef.current.color.setHex(0x0284c7);
      hemiLightRef.current.intensity = 0.5;
      sceneRef.current.fog = new THREE.FogExp2(0x05070a, 0.08);
      if (rendererRef.current) rendererRef.current.toneMappingExposure = 1.0;
    }
  };

  // Camera presets
  const handleCamPreset = (view: 'hero' | 'top' | 'close' | 'front') => {
    setActiveCamPreset(view);
    soundFX.playClick(640);
    if (currentMode === 'booth') {
      if (view === 'hero') {
        targetCamPos.current.set(2.4, 1.9, 2.7);
        targetLookAt.current.set(0, 1.1, 0);
      } else if (view === 'front') {
        targetCamPos.current.set(0, 1.4, 2.6);
        targetLookAt.current.set(0, 1.1, 0);
      } else if (view === 'top') {
        targetCamPos.current.set(0.1, 3.8, 0.4);
        targetLookAt.current.set(0, 0.5, 0);
      } else {
        // close-up of counter and bottles
        targetCamPos.current.set(0.6, 1.3, 1.2);
        targetLookAt.current.set(0, 1.0, 0);
      }
    } else if (currentMode === 'car') {
      if (view === 'hero') {
        targetCamPos.current.set(3.4, 1.6, 3.4);
        targetLookAt.current.set(0, 0.6, 0);
      } else if (view === 'front') {
        targetCamPos.current.set(0, 1.0, 4.2);
        targetLookAt.current.set(0, 0.5, 0);
      } else if (view === 'top') {
        targetCamPos.current.set(0.1, 4.6, 0.1);
        targetLookAt.current.set(0, 0.4, 0);
      } else {
        targetCamPos.current.set(1.4, 1.1, 1.5);
        targetLookAt.current.set(0, 0.7, 0.8);
      }
    } else {
      if (view === 'hero') {
        targetCamPos.current.set(0, 1.2, 2.4);
        targetLookAt.current.set(0, 1.0, 0);
      } else if (view === 'front') {
        targetCamPos.current.set(0, 1.0, 2.2);
        targetLookAt.current.set(0, 1.0, 0);
      } else if (view === 'top') {
        targetCamPos.current.set(0, 2.9, 0.1);
        targetLookAt.current.set(0, 0.8, 0);
      } else {
        targetCamPos.current.set(0.4, 1.8, 0.9);
        targetLookAt.current.set(0, 1.6, 0);
      }
    }
  };

  return (
    <div className="relative w-full h-[620px] md:h-[720px] bg-neutral-950 select-none overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Badge & Scene Selector */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-2 bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-1.5 shadow-lg backdrop-blur-md">
          <button
            onClick={() => {
              onModeChange('booth');
              soundFX.playSwoosh();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
              currentMode === 'booth'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-current" />
            <span>1.5m×1m MALL BOOTH</span>
          </button>

          <button
            onClick={() => {
              onModeChange('car');
              soundFX.playSwoosh();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
              currentMode === 'car'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-current" />
            <span>CAR COATING LAB</span>
          </button>

          <button
            onClick={() => {
              onModeChange('product');
              soundFX.playSwoosh();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
              currentMode === 'product'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-current" />
            <span>3D PRODUCT BOTTLES</span>
          </button>
        </div>

        {/* Quick Viewport Badge */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-neutral-300">
            {currentMode === 'booth' && 'Page 8: 1.5m × 1m Mall Promotional Kiosk'}
            {currentMode === 'car' && 'Page 6: Hydrophobic Waterless Graphene Simulation'}
            {currentMode === 'product' && 'Page 6-7: Flagship Car Care Product Visualizer'}
          </span>
          <span className="text-neutral-500 text-[10px] ml-1">| Drag to Orbit</span>
        </div>
      </div>

      {/* Mode-Specific Sub-Selectors (Top Right) */}
      {currentMode === 'product' && (
        <div className="absolute top-18 right-4 flex flex-col gap-1.5 z-10">
          <div className="bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-1.5 flex flex-col gap-1 shadow-xl">
            <span className="text-[10px] uppercase font-bold text-neutral-400 px-2 py-0.5 tracking-wider">
              Inspect Product
            </span>
            <button
              onClick={() => {
                onSelectProduct('graphene-coat');
                soundFX.playClick(600);
              }}
              className={`text-left text-xs px-3 py-1.5 rounded-lg transition-all font-medium ${
                selectedProductId === 'graphene-coat'
                  ? 'bg-red-600 text-white font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              1. JCS Graphene Coat (500ml)
            </button>
            <button
              onClick={() => {
                onSelectProduct('acid-rain-remover');
                soundFX.playClick(600);
              }}
              className={`text-left text-xs px-3 py-1.5 rounded-lg transition-all font-medium ${
                selectedProductId === 'acid-rain-remover'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              2. Glass & Klin Acid Rain Remover
            </button>
            <button
              onClick={() => {
                onSelectProduct('all-around-remover');
                soundFX.playClick(600);
              }}
              className={`text-left text-xs px-3 py-1.5 rounded-lg transition-all font-medium ${
                selectedProductId === 'all-around-remover'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              3. All Around Stain Remover Tub
            </button>
          </div>
        </div>
      )}

      {/* Car Lab Specific Floating Simulator Card */}
      {currentMode === 'car' && (
        <div className="absolute top-18 left-4 z-10 max-w-xs">
          <div className="bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                Graphene Protection Status
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                  isCoated
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
              >
                {isCoated ? 'Coated (60-70% Gloss)' : 'Unprotected Surface'}
              </span>
            </div>

            <p className="text-neutral-400 text-[11px] leading-relaxed">
              {isCoated
                ? 'Ultra-hydrophobic graphene nano-barrier active. Repels acid rain, watermarks, soil deposits, and UV rays.'
                : 'Raw clearcoat exposed to acid rain etching, road tar, and dull oxidation.'}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setIsCoated(!isCoated);
                  soundFX.playClick(isCoated ? 450 : 800);
                }}
                className={`w-full py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 border ${
                  isCoated
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                    : 'bg-red-600 border-red-500 text-white shadow-lg'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                {isCoated ? 'Remove Coat' : 'Apply JCS Coat'}
              </button>

              <button
                onClick={() => {
                  const nextSpray = !isSprayingWater;
                  setIsSprayingWater(nextSpray);
                  if (nextSpray) {
                    soundFX.playSpray();
                  } else {
                    soundFX.playClick(500);
                  }
                }}
                className={`w-full py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 border ${
                  isSprayingWater
                    ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                    : 'bg-sky-950/80 border-sky-800/80 text-sky-300 hover:bg-sky-900'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                {isSprayingWater ? 'Stop Water' : 'Spray Water'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIFIED SLEEK BOTTOM CONTROL DOCK (Collapsible, Zero Viewport Occlusion as per Three.js Skill) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-20 transition-all duration-300">
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => {
              setIsControlsCollapsed(!isControlsCollapsed);
              soundFX.playClick(550);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-neutral-900 border-t border-x border-neutral-700 text-[11px] font-bold text-neutral-300 hover:text-white transition-all shadow-md"
          >
            {isControlsCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-red-500" />
                <span>Show 3D Studio Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-red-500" />
                <span>Cinema / Viewport Mode</span>
              </>
            )}
          </button>
        </div>

        {!isControlsCollapsed && (
          <div className="bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Camera Presets */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mr-1 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-red-500" />
                  View:
                </span>
                {(['hero', 'front', 'top', 'close'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => handleCamPreset(view)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                      activeCamPreset === view
                        ? 'bg-neutral-800 text-white border border-neutral-600'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              {/* Lighting Presets */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mr-1 flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-400" />
                  Light:
                </span>
                {(['studio', 'mall', 'night'] as const).map((lgt) => (
                  <button
                    key={lgt}
                    onClick={() => handleLightingChange(lgt)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                      lightingPreset === lgt
                        ? 'bg-neutral-800 text-white border border-neutral-600'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                    }`}
                  >
                    {lgt}
                  </button>
                ))}
              </div>

              {/* Auto Spin & Snapshot Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAutoRotate(!isAutoRotate);
                    soundFX.playClick(620);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all border ${
                    isAutoRotate
                      ? 'bg-red-600/20 border-red-500/50 text-red-400'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>360° Spin: {isAutoRotate ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={handleDownloadSnapshot}
                  title="Download high-resolution 3D screenshot"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all border bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border-neutral-700"
                >
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  <span>Capture PNG</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
