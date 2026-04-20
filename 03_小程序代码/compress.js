const sharp = require('sharp')
const glob = require('glob')
const fs = require('fs')

const files = glob.sync('images/**/*.{png,jpg,jpeg}')

async function run() {
  for (const file of files) {
    const ext = file.split('.').pop().toLowerCase()

    try {
      if (ext === 'png') {
        await sharp(file)
          .resize({ width: 800 })
          .png({ compressionLevel: 9, quality: 60 })
          .toFile(file + '.tmp')
      } else {
        await sharp(file)
          .resize({ width: 800 })
          .jpeg({ quality: 55, mozjpeg: true })
          .toFile(file + '.tmp')
      }

      fs.unlinkSync(file)
      fs.renameSync(file + '.tmp', file)

      console.log('✔ 已压缩:', file)
    } catch (err) {
      console.log('✘ 失败:', file)
      console.error(err)
    }
  }
}

run()
