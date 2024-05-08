<script setup lang="ts">
import { usePointCloudStore } from '@/stores/pointCloud'
import { Camera, Renderer, Scene, Points, Box, StandardMaterial, PointLight, AmbientLight } from 'troisjs'
import { computed, ref, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  activeCuboidId?: string
}>()

const pointCloudStore = usePointCloudStore()
const pointsRef = ref<InstanceType<typeof Points>>()

const geometry = computed(() => {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(pointCloudStore.verticesArray, 3))
  return geometry
})
const material = computed(() => new THREE.PointsMaterial({ color: 0xffffff, size: 0.14 }))

watch(pointsRef, () => {
  if (pointsRef.value) {
    pointsRef.value.setGeometry(geometry.value)
    pointsRef.value.setMaterial(material.value)
  }
})

watch(geometry, () => {
  if (pointsRef.value) {
    pointsRef.value.setGeometry(geometry.value)
  }
})

watch(material, () => {
  if (pointsRef.value) {
    pointsRef.value.setMaterial(material.value)
  }
})
</script>

<template>
  <Renderer ref="renderer" orbit-ctrl resize="true">
    <Camera :position="{ z: 100 }" />
    <Scene ref="sceneRef" background="#050505">
      <AmbientLight color="#808080"></AmbientLight>
      <PointLight color="#ffffff" :position="{ y: 50, z: 0 }"></PointLight>
      <PointLight color="#ffffff" :position="{ y: -50, z: 0 }"></PointLight>
      <PointLight color="#ffffff" :position="{ y: 0, z: 0 }"></PointLight>
      <Points ref="pointsRef" />
      <Box
        v-for="(cuboid, cuboidId) in pointCloudStore.cuboids"
        :key="cuboidId"
        :position="{ x: cuboid.x, y: cuboid.y, z: cuboid.z }"
        :scale="{ x: cuboid.width, y: cuboid.depth, z: cuboid.height }"
      >
        <StandardMaterial
          :color="props.activeCuboidId === cuboidId ? '#a7f3d0' : '#10b981'"
          :props="{ opacity: props.activeCuboidId === cuboidId ? 0.9 : 0.7, transparent: true }"
        />
      </Box>
    </Scene>
  </Renderer>
</template>
