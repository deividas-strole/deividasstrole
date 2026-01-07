import { useRef, useEffect } from "react";
import * as THREE from "three";

const Floating3DModel = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const container = mountRef.current;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Sizes
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.appendChild(renderer.domElement);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
        pointLight1.position.set(5, 5, 5);
        pointLight1.castShadow = true;
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight2.position.set(-5, -3, 3);
        pointLight2.castShadow = true;
        scene.add(pointLight2);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(3, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Geometry
        const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 150, 20);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00d4ff,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x002233,
            emissiveIntensity: 0.1,
        });

        const model = new THREE.Mesh(geometry, material);
        model.castShadow = true;
        model.receiveShadow = true;
        scene.add(model);

        // Animation
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.01;

            model.position.y = Math.sin(time) * 0.5;
            model.rotation.x += 0.005;
            model.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: "100%",
                height: "100%",
                minHeight: "600px",
                backgroundColor: "#000",
            }}
        />
    );
};

export default Floating3DModel;