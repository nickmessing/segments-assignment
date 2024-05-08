<script setup lang="ts">
import { usePointCloudStore } from '@/stores/pointCloud'
import { cellRef } from 'vue-tinybase'
import { computed } from 'vue'

const props = defineProps<{
  cuboidId: string
}>()

const emit = defineEmits<{
  removeCuboidClick: []
}>()

const pointCloudStore = usePointCloudStore()

const x = cellRef('cuboids', () => props.cuboidId, 'x')
const y = cellRef('cuboids', () => props.cuboidId, 'y')
const z = cellRef('cuboids', () => props.cuboidId, 'z')
const width = cellRef('cuboids', () => props.cuboidId, 'width')
const height = cellRef('cuboids', () => props.cuboidId, 'height')
const depth = cellRef('cuboids', () => props.cuboidId, 'depth')
const label = cellRef('cuboids', () => props.cuboidId, 'label')

const xRange = computed(() => ({
  min: Math.min(pointCloudStore.values.boundingBoxStartX ?? 0, pointCloudStore.values.boundingBoxEndX ?? 0),
  max: Math.max(pointCloudStore.values.boundingBoxStartX ?? 0, pointCloudStore.values.boundingBoxEndX ?? 0),
}))
const yRange = computed(() => ({
  min: Math.min(pointCloudStore.values.boundingBoxStartY ?? 0, pointCloudStore.values.boundingBoxEndY ?? 0),
  max: Math.max(pointCloudStore.values.boundingBoxStartY ?? 0, pointCloudStore.values.boundingBoxEndY ?? 0),
}))
const zRange = computed(() => ({
  min: Math.min(pointCloudStore.values.boundingBoxStartZ ?? 0, pointCloudStore.values.boundingBoxEndZ ?? 0),
  max: Math.max(pointCloudStore.values.boundingBoxStartZ ?? 0, pointCloudStore.values.boundingBoxEndZ ?? 0),
}))
</script>

<template>
  <form class="flex flex-col gap-5 overflow-auto p-2" @submit.prevent>
    <div class="flex flex-col gap-2">
      <label for="label" class="block text-sm font-medium text-white">label</label>
      <input
        type="string"
        id="label"
        class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="cuboid"
        v-model="label"
        required
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="x" class="block text-sm font-medium text-white">X Coordinate</label>
      <input
        type="string"
        id="x"
        class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="0.000"
        v-model.number="x"
        required
      />
      <input
        id="x-range"
        type="range"
        v-model.number="x"
        :min="xRange.min"
        :max="xRange.max"
        step="0.001"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="y" class="block text-sm font-medium text-white">Y Coordinate</label>
      <input
        type="string"
        id="y"
        class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="0.000"
        v-model.number="y"
        required
      />
      <input
        id="y-range"
        type="range"
        v-model.number="y"
        :min="yRange.min"
        :max="yRange.max"
        step="0.001"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="z" class="block text-sm font-medium text-white">Z Coordinate</label>
      <input
        type="string"
        id="z"
        class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="0.000"
        v-model.number="z"
        required
      />
      <input
        id="y-range"
        type="range"
        v-model.number="z"
        :min="zRange.min"
        :max="zRange.max"
        step="0.001"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="width" class="block text-sm font-medium text-white">width</label>
      <input
        type="string"
        id="width"
        class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="0.000"
        v-model.number="width"
        required
      />
      <input
        id="width-range"
        type="range"
        v-model.number="width"
        :min="0"
        :max="100"
        step="0.001"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="height" class="block text-sm font-medium text-white">height</label>
      <input
        type="string"
        id="height"
        class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="0.000"
        v-model.number="height"
        required
      />
      <input
        id="height-range"
        type="range"
        v-model.number="height"
        :min="0"
        :max="100"
        step="0.001"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="depth" class="block text-sm font-medium text-white">depth</label>
      <input
        type="string"
        id="depth"
        class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="0.000"
        v-model.number="depth"
        required
      />
      <input
        id="depth-range"
        type="range"
        v-model.number="depth"
        :min="0"
        :max="100"
        step="0.001"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </div>

    <div class="flex flex-row justify-end">
      <button @click="emit('removeCuboidClick')" class="rounded bg-slate-600 px-4 py-2">Delete cuboid</button>
    </div>
  </form>
</template>
