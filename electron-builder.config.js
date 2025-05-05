/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: "com.electron.scientific-toolkit",
  productName: "Scientific Toolkit",
  copyright: "Copyright © 2025",
  asar: true,
  directories: {
    output: "release",
    buildResources: "resources",
  },
  files: [
    "dist",
    "dist-electron"
  ],
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64"],
      },
    ],
    artifactName: "${productName}-Windows-${version}-Setup.${ext}",
  },
  mac: {
    target: ["dmg"],
    artifactName: "${productName}-Mac-${version}.${ext}",
  },
  linux: {
    target: ["AppImage"],
    artifactName: "${productName}-Linux-${version}.${ext}",
  },
};

module.exports = config;