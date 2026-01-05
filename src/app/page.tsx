<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Senku Project | Wagmi</title>
    <style>
        :root {
            --neon-green: #00ff41;
            --neon-blue: #00f2ff;
            --bg-dark: #0a0a0a;
        }

        body {
            margin: 0;
            padding: 0;
            background: var(--bg-dark);
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden; /* لمنع التمرير أثناء تفاعل الثلج */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        /* نظام الثلج الخلفي */
        #snow-canvas {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 1;
        }

        /* حاوية العميل Senku */
        .senku-card {
            position: relative;
            z-index: 10;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid var(--neon-green);
            box-shadow: 0 0 20px var(--neon-green), inset 0 0 10px var(--neon-blue);
            border-radius: 20px;
            padding: 2rem;
            width: 85%;
            max-width: 400px;
            text-align: center;
            backdrop-filter: blur(10px);
        }

        .senku-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 3px solid var(--neon-blue);
            margin: 0 auto 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle, var(--neon-blue) 0%, transparent 70%);
            box-shadow: 0 0 30px var(--neon-blue);
            animation: pulse 2s infinite;
        }

        h1 {
            color: var(--neon-green);
            text-shadow: 0 0 10px var(--neon-green);
            letter-spacing: 2px;
            margin-bottom: 0.5rem;
        }

        .status {
            font-size: 0.9rem;
            color: var(--neon-blue);
            margin-bottom: 1.5rem;
        }

        .terminal-text {
            background: #000;
            padding: 10px;
            border-radius: 5px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.8rem;
            border-right: 2px solid var(--neon-green);
            white-space: nowrap;
            overflow: hidden;
            animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
        }

        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: var(--neon-green); } }
    </style>
</head>
<body>

    <canvas id="snow-canvas"></canvas>

    <div class="senku-card">
        <div class="senku-avatar">
            <span style="font-size: 3rem;">S</span>
        </div>
        <h1>SENKU</h1>
        <div class="status">System Status: <span style="color: var(--neon-green);">ACTIVE</span></div>
        <div class="terminal-text">Initializing Wagmi Protocol...</div>
        <p style="margin-top: 15px; font-size: 0.8rem; opacity: 0.7;">Developer: bedro95</p>
    </div>

    <script>
        const canvas = document.getElementById('snow-canvas');
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 3 + 1,
                    d: Math.random() * 1
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            for (let p of particles) {
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();
        }

        function update() {
            for (let p of particles) {
                p.y += Math.cos(p.d) + 1 + p.r / 2;
                p.x += Math.sin(0) * 2;
                if (p.y > height) {
                    p.x = Math.random() * width;
                    p.y = -10;
                }
            }
        }

        function animate() {
            draw();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', init);
        init();
        animate();
    </script>
</body>
</html>
