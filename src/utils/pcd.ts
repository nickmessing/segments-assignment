import { PCDLoader } from '@loaders.gl/pcd'
import { load } from '@loaders.gl/core'

export type Coordinates = {
  x: number
  y: number
  z: number
}

export async function loadPcdFile(content: File) {
  // This will probably only work with the provided file and similar ones
  const data = await load(content, PCDLoader)

  const boundingBox: [Coordinates, Coordinates] = [
    {
      x: data.header!.boundingBox![0][0],
      y: data.header!.boundingBox![0][1],
      z: data.header!.boundingBox![0][2],
    },
    {
      x: data.header!.boundingBox![1][0],
      y: data.header!.boundingBox![1][1],
      z: data.header!.boundingBox![1][2],
    },
  ]

  const vertices = data.attributes.POSITION.value as Float32Array

  return { boundingBox, vertices }
}
