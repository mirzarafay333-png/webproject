import Particles from "react-tsparticles";

export default function ParticlesBg() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none", // 🔥 THIS IS THE KEY FIX
        zIndex: 0,
      }}
    >
      <Particles
        options={{
          fullScreen: { enable: false }, // 🔥 prevents overlay conflict
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { speed: 1 },
          },
        }}
      />
    </div>
  );
}