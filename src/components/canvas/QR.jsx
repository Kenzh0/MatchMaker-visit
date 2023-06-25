import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Text } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
// import { VideoTexture, MeshBasicMaterial} from 'three';
import * as THREE from 'three';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    setAnimationProgress(animationProgress + delta / 2); // Increase the animation progress
    
    if (animationProgress >= 1) {
      // If animation progress reaches 1, gather all points into one
      const gatherAnimationSphere = sphere.map((position) => position * (1 - animationProgress));
      ref.current.geometry.attributes.position.array = gatherAnimationSphere;
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(0); // Reset the animation progress
    }, 4000); // Set the interval duration in milliseconds (4 seconds in this case)
    
    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const AnimatedText = () => {
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    const showTextInterval = setInterval(() => {
      setShowText(true);
      
      setTimeout(() => {
        setShowText(false);
      }, 10000);
    }, 10000);
    
    return () => {
      clearInterval(showTextInterval);
    };
  }, []);
  
  return showText && (
    <Text
      position={[0, 0, 0]}
      color="#ffffff"
      fontSize={0.2}
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign={'center'}
      anchorX="center"
      anchorY="middle"
    >
      MatchMaker
    </Text>
  );
};

const VideoTexture = ({ url }) => {
  const mesh = useRef();
  const video = useRef(document.createElement('video'));
  
  useEffect(() => {
    video.current.src = url;
    video.current.loop = true;  // Loop the video
    video.current.muted = true;  // Mute the video
    
    const playPromise = video.current.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        document.addEventListener('click', () => video.current.play());
      });
    }
    
    const texture = new THREE.VideoTexture(video.current);
    mesh.current.material = new THREE.MeshBasicMaterial({ map: texture });
  }, [url]);
  
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[3, 3, 3]} />
    </mesh>
  );
};

const QRCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-1">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
          <VideoTexture url="/qr.mp4" />
          <AnimatedText />
        </Suspense>
        
        <Preload all />
      </Canvas>
    </div>
  );
};

export default QRCanvas;