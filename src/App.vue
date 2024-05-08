<script setup lang="ts">
import FilePicker from '@/components/FilePicker.vue'
import PointCloudViewer from '@/components/PointCloudViewer.vue'
import { usePointCloudStore } from './stores/pointCloud'

const pointCloudStore = usePointCloudStore()
</script>

<template>
  <div v-if="pointCloudStore.isLoading">Loading</div>
  <PointCloudViewer v-else-if="pointCloudStore.isInitialized">Loaded</PointCloudViewer>
  <FilePicker v-else />
</template>
