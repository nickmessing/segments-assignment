<script setup lang="ts">
import { usePointCloudStore } from '@/stores/pointCloud'
import { computed } from 'vue'

const activeCuboidId = defineModel<string>()

const pointCloudStore = usePointCloudStore()

const hasCuboids = computed(() => Object.keys(pointCloudStore.cuboids).length > 0)

function addCuboid() {
  activeCuboidId.value = pointCloudStore.addCuboid()
}
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="flex flex-row justify-between gap-2">
      <button @click="addCuboid" class="rounded bg-slate-600 px-4 py-2">New cuboid</button>
      <button @click="pointCloudStore.resetApp" class="rounded bg-slate-600 px-4 py-2">Reset app</button>
    </div>
    <div v-if="hasCuboids" class="flex flex-col items-stretch gap-2 overflow-auto">
      <button
        v-for="(cuboid, cuboidId) in pointCloudStore.cuboids"
        :key="cuboidId"
        class="px-2 text-left hover:bg-slate-600"
        :class="{
          'bg-slate-800': activeCuboidId === cuboidId,
        }"
        @click="activeCuboidId = String(cuboidId)"
      >
        {{ cuboid.label }}
      </button>
    </div>
    <div v-else class="text-center text-xl">No cuboids</div>
  </div>
</template>
