import { useEffect, useRef } from 'react';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function generateBoltPath(startX, startY, maxHeight, maxDeviation) {
  const points = [{ x: startX, y: startY }];
  let y = startY;
  let x = startX;

  while (y < maxHeight) {
    y += randomBetween(10, 25);
    x += randomBetween(-maxDeviation, maxDeviation);
    points.push({ x, y });
  }

  return points;
}

function drawBolt(ctx, points, opacity) {
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = `rgba(180, 220, 255, ${opacity})`;
  ctx.shadowBlur = 10;
  ctx.beginPath();

  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.stroke();
}

function drawBranch(ctx, start, length, direction, opacity) {
  const branchPoints = [start];
  let x = start.x;
  let y = start.y;
  for (let i = 0; i < length; i++) {
    x += direction * randomBetween(1, 3);
    y += randomBetween(5, 15);
    branchPoints.push({ x, y });
  }
  drawBolt(ctx, branchPoints, opacity);
}

export default function ThunderBackground() {
  const canvasRef = useRef(null);
  const bolts = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Bolt object template:
    // { points: [...], opacity: 1, fadeSpeed: 0.02, branches: [...] }

    const createBolt = () => {
      const startX = randomBetween(0, window.innerWidth);
      const startY = 0;
      const maxHeight = randomBetween(window.innerHeight * 0.6, window.innerHeight * 0.9);
      const maxDeviation = 20;

      const mainPoints = generateBoltPath(startX, startY, maxHeight, maxDeviation);

      // Generate 1-2 branches near the bottom half of the bolt
      const branches = [];
      const branchCount = Math.floor(randomBetween(1, 3));
      for (let i = 0; i < branchCount; i++) {
        const branchStartIndex = Math.floor(randomBetween(mainPoints.length / 2, mainPoints.length - 2));
        const branchStart = mainPoints[branchStartIndex];
        const direction = Math.random() > 0.5 ? 1 : -1; // Left or right branch
        branches.push({
          start: branchStart,
          length: Math.floor(randomBetween(5, 15)),
          direction,
        });
      }

      return {
        points: mainPoints,
        opacity: 1,
        fadeSpeed: randomBetween(0.015, 0.03),
        branches,
      };
    };

    const boltsArray = [];
    bolts.current = boltsArray;

    let lastStrikeTime = 0;
    const strikeInterval = () => randomBetween(800, 2000);

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (time - lastStrikeTime > strikeInterval()) {
        // Push a new bolt more likely from the top 60% width zone
        const x = randomBetween(0, canvas.width);
        const startX = x < canvas.width * 0.6 ? x : randomBetween(canvas.width * 0.2, canvas.width * 0.8);
        boltsArray.push(createBolt());
        lastStrikeTime = time;
      }

      // Draw and update bolts
      for (let i = boltsArray.length - 1; i >= 0; i--) {
        const bolt = boltsArray[i];

        drawBolt(ctx, bolt.points, bolt.opacity);
        bolt.branches.forEach(({ start, length, direction }) => {
          drawBranch(ctx, start, length, direction, bolt.opacity * 0.6);
        });

        bolt.opacity -= bolt.fadeSpeed;
        if (bolt.opacity <= 0) {
          boltsArray.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0d0d0d]"
    />
  );
}
