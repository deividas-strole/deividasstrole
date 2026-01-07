import { useEffect, useRef } from "react";
import * as THREE from "three";

const RotatingTechCube = ({
                              words = ["Java", "JavaScript", "SQL", "AI", "React", "SpringBoot"],
                          }) => {
    const containerRef = useRef(null);
    const frameIdRef = useRef(null);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: "default",
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 1);
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        container.appendChild(renderer.domElement);

        // Texture helper
        const createTextTexture = (text) => {
            const canvas = document.createElement("canvas");
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "#1a237e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 60px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.LinearSRGBColorSpace;
            texture.generateMipmaps = false;
            return texture;
        };

        // Materials
        const materials = words.map(
            (word) =>
                new THREE.MeshStandardMaterial({
                    map: createTextTexture(word),
                    metalness: 0.4,
                    roughness: 0.4,
                    emissive: 0x3949ab,
                    emissiveIntensity: 0.25,
                })
        );

        // Cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 1.3));
        const light = new THREE.DirectionalLight(0xffffff, 1.2);
        light.position.set(5, 8, 5);
        scene.add(light);

        // Visibility observer
        const observer = new IntersectionObserver(
            ([entry]) => (isVisibleRef.current = entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(container);

        // Animation (30fps)
        let lastTime = performance.now();
        const frameInterval = 1000 / 30;

        const animate = (time) => {
            frameIdRef.current = requestAnimationFrame(animate);
            if (!isVisibleRef.current) return;

            const delta = time - lastTime;
            if (delta < frameInterval) return;

            lastTime = time - (delta % frameInterval);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.015;

            renderer.render(scene, camera);
        };

        animate(performance.now());

        // Resize
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameIdRef.current);

            geometry.dispose();
            materials.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
            });

            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, [words]);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                minHeight: "600px",
                backgroundColor: "#000",
            }}
        />
    );
};

export default RotatingTechCube;
