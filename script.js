const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#e9e9e9';
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

canvas.addEventListener('click', e => {
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
});

ctx.font = '20px sans-serif';
ctx.fillStyle = 'black';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.fillText(
  'Click to generate a flower 🌸',
  canvas.width / 2,
  canvas.height / 2
);
