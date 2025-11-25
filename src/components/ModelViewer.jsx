/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

// Constantes de ayuda
const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = d => (d * Math.PI) / 180;

// Componente de Carga
const Loader = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        background: 'rgba(26, 83, 92, 0.9)', 
        padding: '12px 24px', 
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap'
      }}>
        {placeholderSrc ? (
          <img src={placeholderSrc} width={128} height={128} style={{borderRadius: 8}} />
        ) : (
          <>
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Cargando... {Math.round(progress)}%</span>
          </>
        )}
      </div>
    </Html>
  );
};

// Componente Interno del Modelo (Lógica de centrado y materiales)
const ModelInner = ({ 
  url, 
  xOff, 
  yOff, 
  pivot, 
  initYaw, 
  initPitch, 
  fadeIn, 
  onLoaded 
}) => {
  const inner = useRef(null);
  const { camera } = useThree();

  const ext = useMemo(() => url.split('.').pop().toLowerCase(), [url]);
  const content = useMemo(() => {
    try {
      if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();
      if (ext === 'fbx') return useFBX(url).clone();
      if (ext === 'obj') return useLoader(OBJLoader, url).clone();
    } catch (e) {
      console.error("Error cargando modelo:", e);
      return null;
    }
    return null;
  }, [url, ext]);

  const pivotW = useRef(new THREE.Vector3());

  useLayoutEffect(() => {
    if (!content) return;
    const g = inner.current;
    
    // 1. Centrar Matemáticamente el objeto
    g.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(g);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const height = box.max.y - box.min.y;
    const center = box.getCenter(new THREE.Vector3());

    // Escala normalizada para que no sea gigante ni diminuto
    const s = 1 / (sphere.radius * 2); 
    g.scale.setScalar(s*2.5); // Multiplicador para tamaño visual agradable

    // Posicionar el objeto para que su centro esté en el origen (0,0,0)
    g.position.set(-center.x * s * 2.5, -center.y * s * 2.5, -center.z * s * 2.5);
    
    // Aplicar Offset manual del usuario (para bajar el poste, por ejemplo)
    g.position.y += yOff; 
    g.position.x += xOff;

    // Configuración de Sombras y Materiales
    g.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        // Material optimization
        if (o.material) {
            o.material.side = THREE.DoubleSide;
            o.material.envMapIntensity = 1.2; // Brillo extra para metales
        }
        if (fadeIn) {
          o.material.transparent = true;
          o.material.opacity = 0;
        }
      }
    });

    // Guardar la posición del pivote para los controles
    g.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);

    // Fade In Animation
    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.05;
        const v = Math.min(t, 1);
        g.traverse(o => {
          if (o.isMesh) o.material.opacity = v;
        });
        invalidate();
        if (v === 1) {
          clearInterval(id);
          onLoaded?.();
        }
      }, 16);
      return () => clearInterval(id);
    } else {
        onLoaded?.();
    }
  }, [content, xOff, yOff, fadeIn, onLoaded, pivot]);

  if (!content) return null;
  return (
    <group ref={inner}>
      <primitive object={content} />
    </group>
  );
};

// Componente Principal
const ModelViewer = ({
  url,
  width = '100%',
  height = 400,
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -15,
  defaultRotationY = 20,
  defaultZoom = 1.5,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  enableManualZoom = true,
  ambientIntensity = 0.6,
  keyLightIntensity = 1,
  fillLightIntensity = 0.5,
  rimLightIntensity = 0.8,
  environmentPreset = 'forest',
  placeholderSrc,
  showScreenshotButton = true,
  fadeIn = true,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  onModelLoaded
}) => {
  useEffect(() => void useGLTF.preload(url), [url]);
  
  const pivot = useRef(new THREE.Vector3()).current;
  const contactRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);

  // Captura de pantalla
  const capture = () => {
    const g = rendererRef.current;
    const s = sceneRef.current;
    const c = cameraRef.current;
    if (!g || !s || !c) return;
    
    g.shadowMap.enabled = false;
    if (contactRef.current) contactRef.current.visible = false;
    
    g.render(s, c);
    const urlPNG = g.domElement.toDataURL('image/png');
    
    const a = document.createElement('a');
    a.download = 'PhotonTech-Modelo.png';
    a.href = urlPNG;
    a.click();
    
    g.shadowMap.enabled = true;
    if (contactRef.current) contactRef.current.visible = true;
    invalidate();
  };

  return (
    <div style={{ 
      width, 
      height, 
      position: 'relative', 
      overflow: 'hidden', 
      borderRadius: '1rem',
      background: 'transparent',
      touchAction: 'none' // Importante para móviles
    }}>
      {showScreenshotButton && (
        <button
          onClick={capture}
          /* CAMBIO AQUÍ: Cambié 'right-4' por 'left-4' */
          className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 rounded-full hover:bg-white/20 transition-all shadow-lg"
          title="Tomar Captura"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </button>
      )}

      <Canvas
        shadows
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        onCreated={({ gl, scene, camera }) => {
          rendererRef.current = gl;
          sceneRef.current = scene;
          cameraRef.current = camera;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        // Ajustamos la cámara inicial basada en tu zoom
        camera={{ fov: 45, position: [0, 2, defaultZoom * 3], near: 0.1, far: 200 }}
      >
        {/* --- AMBIENTE --- */}
        {environmentPreset !== 'none' && <Environment preset={environmentPreset} background={false} />}
        
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[5, 10, 5]} intensity={keyLightIntensity} castShadow shadow-bias={-0.0001} />
        <directionalLight position={[-5, 5, 5]} intensity={fillLightIntensity} />
        <spotLight position={[0, 5, -5]} intensity={rimLightIntensity} angle={0.5} penumbra={1} />

        <ContactShadows ref={contactRef} position={[0, -1.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />

        {/* --- MODELO --- */}
        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            xOff={modelXOffset}
            yOff={modelYOffset}
            pivot={pivot}
            initYaw={initYaw}
            initPitch={initPitch}
            fadeIn={fadeIn}
            onLoaded={onModelLoaded}
          />
        </Suspense>

        {/* --- CONTROLES (La parte importante para móviles) --- */}
        <OrbitControls 
          makeDefault
          
          /* 1. CONFIGURACIÓN DE MOVIMIENTO */
          enableDamping={true} // Inercia suave (como mantequilla)
          dampingFactor={0.05}
          
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          
          /* 2. LIMITES */
          minDistance={minZoomDistance}
          maxDistance={maxZoomDistance}
          
          /* 3. PANEO (MOVER ARRIBA/ABAJO/LADOS) */
          enablePan={true} 
          panSpeed={1}

          /* 4. CONFIGURACIÓN MOUSE (PC) */
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,   // Clic Izquierdo: Rotar
            MIDDLE: THREE.MOUSE.PAN,    // Rueda Clic: Panear
            RIGHT: THREE.MOUSE.ROTATE   // Clic Derecho: Rotar (o Pan si prefieres)
          }}

          /* 5. CONFIGURACIÓN TACTIL (CELULAR) - CLAVE */
          touches={{
            ONE: THREE.TOUCH.ROTATE,        // 1 Dedo: Rotar
            TWO: THREE.TOUCH.DOLLY_PAN      // 2 Dedos: Zoom + Panear
          }}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;