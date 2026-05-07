import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ─── Animated liquid floor ─────────────────────────────────────── */
const FLOOR_VERT = `
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.y += sin(p.x * 1.4 + uTime * 0.85) * cos(p.z * 1.1 + uTime * 0.65) * 0.30;
    p.y += sin(p.x * 0.65 - uTime * 0.50) * sin(p.z * 1.9 + uTime * 0.75) * 0.20;
    p.y += cos(p.x * 2.2 + uTime * 1.15) * cos(p.z * 0.85 - uTime * 0.40) * 0.12;
    vElevation = p.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`
const FLOOR_FRAG = `
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;
  void main() {
    float t = clamp((vElevation + 0.62) / 1.24, 0.0, 1.0);
    vec3 deep  = vec3(0.04, 0.01, 0.15);
    vec3 mid   = vec3(0.18, 0.06, 0.55);
    vec3 crest = vec3(0.50, 0.18, 0.95);
    vec3 col = mix(deep, mid, t);
    col = mix(col, crest, t * t * 0.65);
    float s = sin(vUv.x * 48.0 + uTime * 2.2) * sin(vUv.y * 38.0 - uTime * 1.7) * 0.022;
    col += s;
    gl_FragColor = vec4(col, 0.86);
  }
`

/* ─── GPU-driven swirling energy particles ───────────────────────── */
const PARTICLE_VERT = `
  attribute float aSpeed;
  attribute float aSize;
  attribute float aOffset;
  attribute vec3  aColor;
  uniform   float uTime;
  varying   vec3  vColor;
  void main() {
    vColor = aColor;
    float angle  = atan(position.z, position.x) + uTime * aSpeed * 0.28;
    float radius = length(position.xz) + sin(uTime * aSpeed * 0.55 + aOffset * 6.28) * 0.28;
    float y      = mod(position.y - uTime * aSpeed * 0.35 + aOffset * 12.0, 18.0) - 9.0;
    vec3 pos     = vec3(cos(angle) * radius, y, sin(angle) * radius);
    vec4 mv      = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (270.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`
const PARTICLE_FRAG = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, (0.5 - d) * 1.25 * 0.65);
  }
`

function ThreeScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.innerWidth < 768
    const W = mount.clientWidth
    const H = mount.clientHeight

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    /* ── Scene ── */
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060014, 0.030)

    /* ── Camera — slightly elevated, tilted down to reveal floor ── */
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.set(0, 2, isMobile ? 16 : 13)
    camera.lookAt(0, -1, 0)

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x180040, 4))

    const purpleLight = new THREE.PointLight(0x8B35D6, 28, 32)
    purpleLight.position.set(-3, 4, 2)
    scene.add(purpleLight)

    const blueLight = new THREE.PointLight(0x3055CC, 22, 28)
    blueLight.position.set(4, -1, 3)
    scene.add(blueLight)

    const rimLight = new THREE.PointLight(0xCC3090, 16, 22)
    rimLight.position.set(0, 6, -4)
    scene.add(rimLight)

    /* ── Liquid floor ── */
    const floorSegs = isMobile ? 35 : 60
    const floorGeo = new THREE.PlaneGeometry(40, 40, floorSegs, floorSegs)
    floorGeo.rotateX(-Math.PI / 2)
    const floorUni = { uTime: { value: 0 } }
    const floorMat = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERT,
      fragmentShader: FLOOR_FRAG,
      uniforms: floorUni,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.position.y = -4
    scene.add(floor)

    /* ── Falling meteor stones ── */
    const stoneColors = [
      0x6B2FBE, 0x4B2FCE, 0x8B3FDE, 0x3B5FAE,
      0x9B4FBE, 0x5B3FAE, 0x7B5FFF, 0x2B3FAE,
    ]
    const stoneCount = isMobile ? 10 : 18

    type StoneData = {
      mesh: THREE.Mesh
      rx: number; ry: number; rz: number
      fallSpeed: number
      yReset: number
    }
    const stones: StoneData[] = []

    for (let i = 0; i < stoneCount; i++) {
      // Unique geometry per stone (detail 0 = 12 verts, very low-poly rocky)
      const detail = i % 3 === 0 ? 1 : 0
      const geo = i % 2 === 0
        ? new THREE.IcosahedronGeometry(1, detail)
        : new THREE.DodecahedronGeometry(1, detail)

      // Displace vertices for lumpy rock appearance
      const pa = geo.attributes.position as THREE.BufferAttribute
      for (let j = 0; j < pa.count; j++) {
        const x = pa.getX(j), y = pa.getY(j), z = pa.getZ(j)
        const len = Math.sqrt(x * x + y * y + z * z) || 1
        const f = 0.72 + Math.random() * 0.56
        pa.setXYZ(j, (x / len) * f, (y / len) * f, (z / len) * f)
      }
      geo.computeVertexNormals()

      const scale = 0.12 + Math.random() * 0.50
      const mat = new THREE.MeshStandardMaterial({
        color: stoneColors[i % stoneColors.length],
        roughness: 0.88,
        metalness: 0.18,
        transparent: true,
        opacity: 0.72 + Math.random() * 0.28,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.scale.setScalar(scale)

      // Spread across a wide area so it looks like a meteor shower curtain
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 13
      const z = (Math.random() - 0.5) * 7 - 1
      mesh.position.set(x, y, z)
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )
      scene.add(mesh)

      stones.push({
        mesh,
        rx: (Math.random() - 0.5) * 0.028,
        ry: (Math.random() - 0.5) * 0.038,
        rz: (Math.random() - 0.5) * 0.018,
        fallSpeed: 0.007 + Math.random() * 0.018,
        yReset: 6.5 + Math.random() * 3.5,
      })
    }

    /* ── GPU-driven energy particle swirl ── */
    const pCount = isMobile ? 500 : 900
    const pPos     = new Float32Array(pCount * 3)
    const pSpeeds  = new Float32Array(pCount)
    const pSizes   = new Float32Array(pCount)
    const pOffsets = new Float32Array(pCount)
    const pColors  = new Float32Array(pCount * 3)

    const palette = [
      new THREE.Color(0x7B2FBE), new THREE.Color(0x2F5FBE),
      new THREE.Color(0xBE2F8B), new THREE.Color(0x4B7FFF),
      new THREE.Color(0xA04FFF), new THREE.Color(0x5F2FCE),
    ]

    for (let i = 0; i < pCount; i++) {
      const r = 1.5 + Math.random() * 7.5
      const a = Math.random() * Math.PI * 2
      pPos[i * 3]     = Math.cos(a) * r
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 2] = Math.sin(a) * r
      pSpeeds[i]      = 0.04 + Math.random() * 0.12
      pSizes[i]       = 0.75 + Math.random() * 1.5
      pOffsets[i]     = Math.random()
      const c = palette[Math.floor(Math.random() * palette.length)]
      pColors[i * 3] = c.r; pColors[i * 3 + 1] = c.g; pColors[i * 3 + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('aSpeed',   new THREE.BufferAttribute(pSpeeds, 1))
    pGeo.setAttribute('aSize',    new THREE.BufferAttribute(pSizes, 1))
    pGeo.setAttribute('aOffset',  new THREE.BufferAttribute(pOffsets, 1))
    pGeo.setAttribute('aColor',   new THREE.BufferAttribute(pColors, 3))

    const pUni = { uTime: { value: 0 } }
    const pMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: pUni,
      transparent: true,
      depthWrite: false,
    })
    scene.add(new THREE.Points(pGeo, pMat))

    /* ── Mouse / touch parallax ── */
    const mouse = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1
    }
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const r = mount.getBoundingClientRect()
      mouse.x = ((e.touches[0].clientX - r.left) / r.width) * 2 - 1
      mouse.y = -((e.touches[0].clientY - r.top) / r.height) * 2 + 1
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })

    /* ── Animation loop ── */
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Shader uniforms — GPU handles the rest (zero JS particle updates)
      floorUni.uTime.value = t
      pUni.uTime.value = t

      // Meteor stones fall + rotate
      for (const d of stones) {
        d.mesh.position.y -= d.fallSpeed
        if (d.mesh.position.y < -5) {
          // Reset above viewport, random x so they don't bunch up
          d.mesh.position.y = d.yReset
          d.mesh.position.x = (Math.random() - 0.5) * 20
        }
        d.mesh.rotation.x += d.rx
        d.mesh.rotation.y += d.ry
        d.mesh.rotation.z += d.rz
      }

      // Pulsing lights
      purpleLight.intensity = 22 + Math.sin(t * 0.72) * 8
      blueLight.intensity   = 18 + Math.cos(t * 0.54) * 6

      // Mouse-driven light parallax
      purpleLight.position.x += (mouse.x * 5 - purpleLight.position.x) * 0.04
      purpleLight.position.y += (mouse.y * 3 - purpleLight.position.y) * 0.04
      blueLight.position.x   += (-mouse.x * 4 - blueLight.position.x) * 0.04
      blueLight.position.y   += (-mouse.y * 2 - blueLight.position.y) * 0.04

      // Gentle camera drift on mouse
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.015
      camera.position.y += (mouse.y * 0.35 + 2 - camera.position.y) * 0.015
      camera.lookAt(0, -1, 0)

      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize ── */
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      floorGeo.dispose()
      floorMat.dispose()
      pGeo.dispose()
      pMat.dispose()
      for (const d of stones) {
        d.mesh.geometry.dispose()
        ;(d.mesh.material as THREE.Material).dispose()
      }
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} />
}

export default function AnomalousMatterHero() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <ThreeScene className="w-full h-full" />
    </div>
  )
}
