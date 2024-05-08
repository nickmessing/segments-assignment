import { createStore } from 'tinybase/with-schemas'
import { createLocalPersister } from 'tinybase/with-schemas/persisters/persister-browser'
import 'vue-tinybase'

export const store = createStore()
  .setTablesSchema({
    vertices: {
      value: {
        type: 'number',
      },
    },
    cuboids: {
      x: {
        type: 'number',
      },
      y: {
        type: 'number',
      },
      z: {
        type: 'number',
      },
      width: {
        type: 'number',
      },
      height: {
        type: 'number',
      },
      depth: {
        type: 'number',
      },
      label: {
        type: 'string',
      },
    },
  })
  .setValuesSchema({
    boundingBoxStartX: {
      type: 'number',
    },
    boundingBoxStartY: {
      type: 'number',
    },
    boundingBoxStartZ: {
      type: 'number',
    },
    boundingBoxEndX: {
      type: 'number',
    },
    boundingBoxEndY: {
      type: 'number',
    },
    boundingBoxEndZ: {
      type: 'number',
    },
  })

const persister = createLocalPersister(store, 'point-cloud-app')

await persister.startAutoLoad()
await persister.startAutoSave()

export type Store = typeof store

declare module 'vue-tinybase' {
  export interface VueTinybaseContext {
    store: Store
  }
}
