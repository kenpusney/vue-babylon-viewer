const BabylonViewer = require('babylonjs-viewer/babylon.viewer')

let model_mapping = {
  0: './01_test/jp.gltf',
}

async function load(model_id, replace_dict, dom_node) {
  let model_path = model_mapping[model_id]
  if (!model_path) {
    throw new Error(`Model {model id} not found.`)
  }
  let div_element = document.createElement('div')
  div_element.insertAdjacentHTML('beforeend', `<babylon id='babylon-viewer' configuration='./config.json' model='${model_path}' style='width:100%'></babylon>`)
  dom_node.appendChild(div_element)

  let viewer = await BabylonViewer.viewerManager.getViewerPromiseById('babylon-viewer')
  await new Promise(resolve => viewer.onModelLoadedObservable.add(resolve))
  let camera = viewer.sceneManager.scene.cameras.find(x => x.name == 'Camera001')
  viewer.sceneManager._defaultRenderingPipeline.addCamera(camera)
  viewer.sceneManager._defaultRenderingPipeline.prepare()
  window._viewer = viewer
  window._camera = camera
  await update_pic(replace_dict)
  await new Promise(resolve => setTimeout(resolve, 500))
  return div_element
}

async function update_pic(replace_dict) {
  if (!window._viewer) {
    throw new Error('viewer not initialized')
  }
  for (const [key, value] of Object.entries(replace_dict)) {
    for (let texture of window._viewer.sceneManager.scene.textures) {
      if (texture.name.split(' (')[0] === key) {
        texture.updateURL(value)
      }
    }
  }
}

async function take_snapshot() {
  if (!window._viewer) {
    throw new Error('viewer not initialized')
  }
  return await BabylonViewer.BABYLON.Tools.CreateScreenshotUsingRenderTargetAsync(window._viewer.engine, window._camera, { precision: 2 }, { antialiasing: true })
}

module.exports = { load, take_snapshot }
