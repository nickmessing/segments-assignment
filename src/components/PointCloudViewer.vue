<script setup lang="ts">
import { ref } from 'vue'
import PointCloudRenderer from './PointCloudRenderer.vue'
import CuboidsList from './editor/CuboidsList.vue'
import CuboidEditor from './editor/CuboidEditor.vue'
import { usePointCloudStore } from '@/stores/pointCloud'

const pointCloudStore = usePointCloudStore()

const activeCuboidId = ref<string>()

function removeCuboid() {
  if (activeCuboidId.value) {
    pointCloudStore.removeCuboid(activeCuboidId.value)
    activeCuboidId.value = undefined
  }
}
</script>

<template>
  <div class="flex h-screen w-screen flex-row items-stretch">
    <div class="grow">
      <PointCloudRenderer :activeCuboidId="activeCuboidId" />
    </div>
    <div class="flex w-96 shrink-0 flex-col items-stretch text-white">
      <CuboidsList v-model="activeCuboidId" class="grow basis-0" />
      <CuboidEditor
        v-if="activeCuboidId"
        :cuboidId="activeCuboidId"
        class="grow basis-0"
        @removeCuboidClick="removeCuboid"
      />
    </div>
  </div>
</template>
