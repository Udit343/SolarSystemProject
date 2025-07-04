import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('solarCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);


const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planetsData = [
    { name: "Mercury", color: 0xaaaaaa, size: 0.3, distance: 5, speed: 0.02 },
    { name: "Venus", color: 0xffcc99, size: 0.5, distance: 7, speed: 0.015 },
    { name: "Earth", color: 0x3399ff, size: 0.6, distance: 10, speed: 0.01 },
    { name: "Mars", color: 0xff3300, size: 0.4, distance: 13, speed: 0.008 },
    { name: "Jupiter", color: 0xff9966, size: 1.2, distance: 17, speed: 0.005 },
    { name: "Saturn", color: 0xffcc66, size: 1.0, distance: 21, speed: 0.003 },
    { name: "Uranus", color: 0x66ffff, size: 0.9, distance: 25, speed: 0.002 },
    { name: "Neptune", color: 0x3366ff, size: 0.8, distance: 28, speed: 0.0015 },
];

const planets = [];
const controlsDiv = document.getElementById("controls");


planetsData.forEach((data, index) => {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: data.color });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);


    planet.angle = Math.random() * Math.PI * 2;
    planet.distance = data.distance;
    planet.speed = data.speed;
    planet.name = data.name;


    const label = document.createElement("label");
    label.textContent = `${data.name} Speed:`;
    const input = document.createElement("input");
    input.type = "range";
    input.min = "0";
    input.max = "0.05";
    input.step = "0.001";
    input.value = data.speed;
    input.oninput = () => {
        planet.speed = parseFloat(input.value);
    };
    controlsDiv.appendChild(label);
    controlsDiv.appendChild(input);
    controlsDiv.appendChild(document.createElement("br"));

    planets.push(planet);
});

camera.position.z = 50;


function animate() {
    requestAnimationFrame(animate);
    planets.forEach(p => {
        p.angle += p.speed;
        p.position.x = Math.cos(p.angle) * p.distance;
        p.position.z = Math.sin(p.angle) * p.distance;
    });
    renderer.render(scene, camera);
}
animate();
