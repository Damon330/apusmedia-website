import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform float uNoiseStrength;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

  float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod289(Pi0); Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0*(1.0/7.0); vec4 gy0 = fract(floor(gx0)*(1.0/7.0))-0.5;
    gx0 = fract(gx0); vec4 gz0 = vec4(0.5)-abs(gx0)-abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0)); gx0 -= sz0*(step(0.0,gx0)-0.5); gy0 -= sz0*(step(0.0,gy0)-0.5);
    vec4 gx1 = ixy1*(1.0/7.0); vec4 gy1 = fract(floor(gx1)*(1.0/7.0))-0.5;
    gx1 = fract(gx1); vec4 gz1 = vec4(0.5)-abs(gx1)-abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0)); gx1 -= sz1*(step(0.0,gx1)-0.5); gy1 -= sz1*(step(0.0,gy1)-0.5);
    vec3 g000=vec3(gx0.x,gy0.x,gz0.x); vec3 g100=vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010=vec3(gx0.z,gy0.z,gz0.z); vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001=vec3(gx1.x,gy1.x,gz1.x); vec3 g101=vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011=vec3(gx1.z,gy1.z,gz1.z); vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
    g000*=norm0.x; g010*=norm0.y; g100*=norm0.z; g110*=norm0.w;
    vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
    g001*=norm1.x; g011*=norm1.y; g101*=norm1.z; g111*=norm1.w;
    float n000=dot(g000,Pf0); float n100=dot(g100,vec3(Pf1.x,Pf0.yz));
    float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)); float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
    float n001=dot(g001,vec3(Pf0.xy,Pf1.z)); float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
    float n011=dot(g011,vec3(Pf0.x,Pf1.yz)); float n111=dot(g111,Pf1);
    vec3 fade_xyz=fade(Pf0);
    vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
    vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);
    return 2.2*mix(n_yz.x,n_yz.y,fade_xyz.x);
  }

  void main() {
    vec3 pos = position;
    float noise = cnoise(pos * 0.6 + uTime * 0.18);
    pos += normal * noise * uNoiseStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`

function ThreeScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.innerWidth < 768
    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.set(0, 0, isMobile ? 6 : 5)

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true })
    renderer.setSize(width, height)
    // Cap pixel ratio at 1.5 on mobile to save GPU
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Lower geometry detail on mobile for performance
    const detail = isMobile ? 3 : 5
    const geometry = new THREE.IcosahedronGeometry(2, detail)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      wireframe: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: isMobile ? 0.25 : 0.35 },
        uColor: { value: new THREE.Color(0xffffff) },
        uOpacity: { value: isMobile ? 0.10 : 0.13 },
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const pointLight = new THREE.PointLight(0xffffff, 8, 20)
    pointLight.position.set(3, 3, 3)
    scene.add(pointLight)

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    // Touch tracking for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      material.uniforms.uTime.value = t

      mesh.rotation.x = t * 0.07
      mesh.rotation.y = t * 0.11

      pointLight.position.x += (mouse.x * 4 - pointLight.position.x) * 0.06
      pointLight.position.y += (mouse.y * 4 - pointLight.position.y) * 0.06

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
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
