import { useGLTF } from "@react-three/drei"
import { useMemo } from "react"
import * as THREE from 'three'

export default function HelmetModel() {
  const { scene } = useGLTF('/models/viking.glb')

  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 4
    const s = targetSize / maxDim
    return {
      scale: s,
      offset: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
    }
  }, [scene])

  return (
    <group scale={scale} position={offset}>
      <primitive object={scene} />
    </group>
  )
}