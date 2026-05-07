import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function ThreeScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.innerWidth < 768
    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050010, 0.035)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.set(0, 0, isMobile ? 14 : 12)

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1a0040, 3)
    scene.add(ambientLight)

    const purpleLight = new THREE.PointLight(0x7B2FBE, 20, 28)
    purpleLight.position.set(-4, 3, 2)
    scene.add(purpleLight)

    const blueLight = new THREE.PointLight(0x2F5FBE, 18, 24)
    blueLight.position.set(4, -2, 3)
    scene.add(blueLight)

    const pinkLight = new THREE.PointLight(0xBE2F8B, 12, 18)
    pinkLight.position.set(0, 5, -3)
    scene.add(pinkLight)

    // Rocky asteroids
    const asteroidData: {
      mesh: THREE.Mesh
      rotX: number; rotY: number; rotZ: number
      orbitSpeed: number; orbitRadius: number; orbitOffset: number; orbitTilt: number
    }[] = []

    const asteroidColors = [
      0x6B2FBE, 0x4B2FCE, 0x8B3FDE, 0x3B5FAE, 0x9B4FBE, 0x5B3FAE, 0x7B5FFF, 0x3B3FBE,
    ]

    const count = isMobile ? 9 : 16

    for (let i = 0; i < count; i++) {
      const detail = Math.floor(Math.random() * 2)
      const size = 0.2 + Math.random() * 0.75
      const geo = Math.random() > 0.5
        ? new THREE.IcosahedronGeometry(size, detail)
        : new THREE.DodecahedronGeometry(size, detail)

      // Displace vertices for a rocky, lumpy look
      const posAttr = geo.attributes.position as THREE.BufferAttribute
      for (let j = 0; j < posAttr.count; j++) {
        const x = posAttr.getX(j)
        const y = posAttr.getY(j)
        const z = posAttr.getZ(j)
        const len = Math.sqrt(x * x + y * y + z * z) || 1
        const factor = 0.75 + Math.random() * 0.5
        posAttr.setXYZ(j, (x / len) * size * factor, (y / len) * size * factor, (z / len) * size * factor)
      }
      geo.computeVertexNormals()

      const color = asteroidColors[Math.floor(Math.random() * asteroidColors.length)]
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.9,
        metalness: 0.25,
        transparent: true,
        opacity: 0.65 + Math.random() * 0.35,
      })

      const mesh = new THREE.Mesh(geo, mat)
      const orbitRadius = 2.5 + Math.random() * 5.5
      const orbitOffset = Math.random() * Math.PI * 2
      const orbitTilt = (Math.random() - 0.5) * Math.PI * 0.7

      mesh.position.set(
        Math.cos(orbitOffset) * orbitRadius,
        Math.sin(orbitOffset) * orbitRadius * 0.4,
        (Math.random() - 0.5) * 6
      )

      scene.add(mesh)
      asteroidData.push({
        mesh,
        rotX: (Math.random() - 0.5) * 0.025,
        rotY: (Math.random() - 0.5) * 0.035,
        rotZ: (Math.random() - 0.5) * 0.015,
        orbitSpeed: 0.08 + Math.random() * 0.18,
        orbitRadius,
        orbitOffset,
        orbitTilt,
      })
    }

    // Swirling energy particles
    const particleCount = isMobile ? 500 : 1000
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)

    const pColorOptions = [
      new THREE.Color(0x7B2FBE),
      new THREE.Color(0x2F5FBE),
      new THREE.Color(0xBE2F8B),
      new THREE.Color(0x4B7FFF),
      new THREE.Color(0xA04FFF),
      new THREE.Color(0x5F2FBE),
    ]

    const pData: { angle: number; radius: number; speed: number; y: number; ySpeed: number }[] = []

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.5 + Math.random() * 7.5
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 12

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(angle) * radius

      const c = pColorOptions[Math.floor(Math.random() * pColorOptions.length)]
      pColors[i * 3] = c.r
      pColors[i * 3 + 1] = c.g
      pColors[i * 3 + 2] = c.b

      pData.push({
        angle,
        radius,
        speed: (0.04 + Math.random() * 0.14) * (Math.random() > 0.5 ? 1 : -1),
        y,
        ySpeed: (Math.random() - 0.5) * 0.012,
      })
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Soft central atmospheric glow
    const glowGeo = new THREE.SphereGeometry(2, 16, 16)
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x5B2FBE, transparent: true, opacity: 0.06 })
    scene.add(new THREE.Mesh(glowGeo, glowMat))

    // Mouse / touch tracking
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Orbit & spin asteroids
      asteroidData.forEach((d, i) => {
        d.orbitOffset += d.orbitSpeed * 0.004
        d.mesh.position.x = Math.cos(d.orbitOffset) * d.orbitRadius
        d.mesh.position.y = Math.sin(d.orbitOffset + d.orbitTilt) * d.orbitRadius * 0.35 + Math.sin(t * 0.25 + i) * 0.25
        d.mesh.rotation.x += d.rotX
        d.mesh.rotation.y += d.rotY
        d.mesh.rotation.z += d.rotZ
      })

      // Swirl particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < particleCount; i++) {
        const d = pData[i]
        d.angle += d.speed * 0.012
        d.y += d.ySpeed
        if (d.y > 6) d.ySpeed = -Math.abs(d.ySpeed)
        if (d.y < -6) d.ySpeed = Math.abs(d.ySpeed)
        posAttr.setXYZ(i, Math.cos(d.angle) * d.radius, d.y, Math.sin(d.angle) * d.radius)
      }
      posAttr.needsUpdate = true

      // Pulse lights
      purpleLight.intensity = 16 + Math.sin(t * 0.7) * 6
      blueLight.intensity = 14 + Math.cos(t * 0.55) * 5

      // Mouse-driven light parallax
      purpleLight.position.x += (mouse.x * 5 - purpleLight.position.x) * 0.05
      purpleLight.position.y += (mouse.y * 3 - purpleLight.position.y) * 0.05
      blueLight.position.x += (-mouse.x * 4 - blueLight.position.x) * 0.04
      blueLight.position.y += (-mouse.y * 3 - blueLight.position.y) * 0.04

      // Gentle camera drift
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.018
      camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.018
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      glowGeo.dispose()
      glowMat.dispose()
      asteroidData.forEach(d => {
        d.mesh.geometry.dispose()
        ;(d.mesh.material as THREE.Material).dispose()
      })
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
