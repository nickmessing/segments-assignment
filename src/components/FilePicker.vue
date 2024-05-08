<script setup lang="ts">
import { usePointCloudStore } from '@/stores/pointCloud'

const pointCloudStore = usePointCloudStore()

async function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file: File = (target.files as FileList)[0]

  await pointCloudStore.init(file)
}
</script>

<template>
  <div class="file-picker">
    <input type="file" @change="onFileChange" />
  </div>
</template>
