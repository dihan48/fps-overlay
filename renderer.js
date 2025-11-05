const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')


function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()

// heavy particles
let particles = []
for (let i = 0; i < 10000; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2
  })
}

// FPS
let frames = 0
let fps = 0
let lastFpsUpdate = performance.now()

// throttled 30fps loop
let last = 0
function tick(ts) {
  frames++

  if (ts - lastFpsUpdate > 1000) {
    fps = frames
    frames = 0
    lastFpsUpdate = ts
    document.getElementById("fps").textContent = fps
  }

  if (ts - last > 33) { // 30fps throttle

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let p of particles) {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(p.x, p.y, 2, 2)
    }

    last = ts
  }

  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)
