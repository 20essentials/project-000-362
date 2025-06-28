/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { css, Global } from "@emotion/react";

const globalStyles = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue";
    -webkit-tap-highlight-color: transparent;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: white transparent;
  }

  body {
    min-height: 100svh;
    background-image: url("assets/texture.svg");
    background-size: 256px;
    display: flex;
    flex-wrap: wrap;
    place-content: center;
  }

  canvas {
    border-radius: 12px;
    box-shadow: 0 4px 15px 0 #0002;
  }
`;

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e9e9e9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const generateRandomColor = () => {
      const r = Math.floor(Math.random() * 200 + 55);
      const g = Math.floor(Math.random() * 200 + 55);
      const b = Math.floor(Math.random() * 200 + 55);
      return `rgba(${r},${g},${b}, 0.5)`;
    };

    const drawPetal = (x, y, size, angle, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size / 2, -size, size, 0);
      ctx.quadraticCurveTo(size / 2, size, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const onClick = (e) => {
      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const petalCount = Math.floor(Math.random() * 5 + 5);
      const size = Math.floor(Math.random() * 50 + 10);
      const color = generateRandomColor();

      for (let i = 0; i < petalCount; i++) {
        const angle = i * ((Math.PI * 2) / petalCount);
        drawPetal(x, y, size, angle, color);
      }
    };

    canvas.addEventListener("click", onClick);

    ctx.font = "20px sans-serif";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Click to generate a flower 🌸", canvas.width / 2, canvas.height / 2);

    return () => {
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} width={320} height={600} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>
);
