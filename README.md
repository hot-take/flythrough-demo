# 🌆 Lawless City — Flythrough Demo

An atmospheric, low-poly 3D urban environment walkthrough built with **React Three Fiber (R3F)** and **Theatre.js**. This project features a stylized night scene with customized warm sodium-vapor lighting, dynamic camera movements, and a custom water feature.

---

## 🚀 Key Features

### 🎬 Theatre.js Camera Animations
* **Interactive Timeline:** Implements **Theatre.js** (`@theatre/r3f`) to coordinate complex camera paths, rotations, and field-of-view changes.
* **Scroll-Driven Flythrough:** Uses `@react-three/drei`'s `ScrollControls` to map the playback of the Theatre.js animation sequence directly to the user's scroll wheel.
* **Seamless Toggle:** Features a control button that lets users switch instantly between the linear cinematic **Fly-Through** mode and an interactive **Orbit / OrbitControls** exploration mode.

### 🌊 Dynamic Water Feature
* **Reflective Shader:** Integrates a realistic, procedurally animated **Water** component (`three-stdlib` and R3F) representing a crimson-colored sea beneath the low-poly city skyline.
* **Custom Normal Maps:** Uses a custom normal map texture (`waternormals.jpeg`) with repeat wrapping to simulate realistic ripples and wave distortion under the spotlight glow.
* **Atmospheric Contrast:** The sodium-vapor glow from the city's streetlights reflects dynamically off the moving water surface.

---

## 🛠️ Project Customizations

* **Warm Sodium-Vapor Lighting:** Upgraded all scene streetlamps/spotlights to a rich warm yellow (`#ffcc00`) to create a high-contrast noir night aesthetic.
* **Clean Open Views:** Programmatically removed the boundary fencing/hedges along the left side of the street to provide an unobstructed view of the starry sky and ocean.
* **100% Lint Clean:** Resolved all React and React Three Fiber linter errors and warnings. Fully certified to build with zero issues.

---

## 💻 Tech Stack

* **Core:** React, Vite, Three.js
* **3D Rendering:** React Three Fiber, `@react-three/drei`
* **Animation & Sequencing:** Theatre.js (`@theatre/core`, `@theatre/r3f`)
* **Styling & Effects:** Vanilla CSS, `@react-three/postprocessing`

---

## 📦 Getting Started

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Production Build & Lint
```bash
npm run lint
npm run build
```
