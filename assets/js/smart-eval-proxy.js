/* eslint-disable */
export default ({
  openWindow,
  closeWindow,
  setActiveWindow,
}) => {
  const Ext = window.Ext

  const isWindow = obj => obj && obj instanceof Ext.Window
  const initWindow = (win) => {
    const config = {
      key: win.id,
      component: import('Windows/ExtWindow.vue'),
      data: {
        props: {
          win: {
            extWin: win,
            title: win.title,
            disabled: win.disabled,
            minimized: win.hidden,
            maximized: win.maximized,
          },
        },
      },
    }
    win.on('minimize', () => {
      win.hide()
      setActiveWindow()
    })
    win.on('close', () => {
      closeWindow(config.key)
    })
    win.on('activate', () => {
      setActiveWindow(config)
    })
    openWindow(config)
  }
  const _smartEval = window.smart_eval
  // eslint-disable-next-line @typescript-eslint/camelcase
  window.smart_eval = new Proxy(_smartEval, {
    apply(target, thisArg, argumentsList) {
      const result = target(...argumentsList)
      if (isWindow(result)) {
        initWindow(result)
      }
      return result
    },
  })
}
