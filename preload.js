const { contextBridge } = require("electron")

contextBridge.exposeInMainWorld("overlay", {})
