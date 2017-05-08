// @flow
const { app, Menu } = require('electron')
const { MainWindow } = require('./windows')
const MainMenu = require('./MainMenu')
const { events } = require('./constants')

let win
let mainMenu

function createWindow () {
  win = MainWindow.create()
}

app.on('ready', () => {
  createWindow()
  mainMenu = new MainMenu(app.getName())
  const menu = Menu.buildFromTemplate(mainMenu.template)
  Menu.setApplicationMenu(menu)

  mainMenu.on(events.openNewFile, () => {
    console.log('open new file')
  })

  mainMenu.on(events.exportPdf, () => {
    console.log('export pdf')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})