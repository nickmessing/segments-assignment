import { loadPcdFile } from '@/utils/pcd'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useStore, useTable, useValues } from 'vue-tinybase'

export const usePointCloudStore = defineStore('pointCloud', () => {
  const store = useStore()
  const { data: values } = useValues()
  const { data: vertices } = useTable('vertices')

  const verticesArray = computed(
    () => new Float32Array(Object.values(vertices.value).map(vertex => vertex.value as number)),
  )

  const isLoading = ref(false)
  const isInitialized = computed(() => values.value.boundingBoxEndX !== undefined)

  async function init(file: File) {
    isLoading.value = true
    try {
      const fileContent = await loadPcdFile(file)
      store.setValues({
        boundingBoxStartX: fileContent.boundingBox[0].x,
        boundingBoxStartY: fileContent.boundingBox[0].y,
        boundingBoxStartZ: fileContent.boundingBox[0].z,
        boundingBoxEndX: fileContent.boundingBox[1].x,
        boundingBoxEndY: fileContent.boundingBox[1].y,
        boundingBoxEndZ: fileContent.boundingBox[1].z,
      })

      const tableObject: Record<string, { value: number }> = {}

      for (let i = 0; i < fileContent.vertices.length; i++) {
        tableObject[i] = { value: fileContent.vertices[i] }
      }

      store.setTable('vertices', tableObject)
    } catch {
      // Do nothing?
    }

    isLoading.value = false
  }

  function addCuboid() {
    const cuboid = {
      x: 0,
      y: 0,
      z: 0,
      width: 10,
      height: 10,
      depth: 10,
      label: 'New cuboid',
    }

    return store.addRow('cuboids', cuboid) as string
  }
  function removeCuboid(id: string) {
    store.delRow('cuboids', id)
  }

  const { data: cuboids } = useTable('cuboids')

  function resetApp() {
    store.delTables()
    store.delValues()
  }

  return {
    isLoading,
    isInitialized,
    init,
    vertices,
    verticesArray,
    addCuboid,
    cuboids,
    values,
    removeCuboid,
    resetApp,
  }
})
