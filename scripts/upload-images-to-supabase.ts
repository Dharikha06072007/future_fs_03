import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
)

const imagesDir = 'public/images'
const imageFiles = [
  'cc.webp', 'Rv.jpg', 'vc.png', 'bfc.webp', '3c.jpg', 'orc.webp', 'dcc.jpg',
  'fc.jpg', 'dp.jpg', 'cp.jpg', 'sb.jpg', 'wwb.jpg', 'gb.webp', 'bm.jpg',
  'ccm.webp', 'bnm.jpg', 'cvc.webp', 'ccup.jpg', 'wnb.webp', 'Classic-Brownies.jpg',
  'gd.jpg', 'chocod.png', 'apie.webp', 'pumpie.jpg', 'ft.webp', 'chocot.jpeg',
  'nycc.png', 'bbcc.jpg', 'scc.jpg', 'mac.jpg', 'cmac.webp', 'pmac.webp',
]

function getContentType(ext: string): string {
  const types: Record<string, string> = {
    webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    png: 'image/png', gif: 'image/gif',
  }
  return types[ext] || 'image/jpeg'
}

async function uploadImages() {
  const uploadedUrls: Record<string, string> = {}

  for (const filename of imageFiles) {
    const filePath = path.join(imagesDir, filename)
    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(filename).slice(1)

    const { data, error } = await supabase.storage
      .from('dish-images')
      .upload(`dishes/${filename}`, fileBuffer, {
        contentType: getContentType(ext),
        upsert: true,
      })

    if (error) {
      console.error(`Failed to upload ${filename}:`, error.message)
      continue
    }

    const { data: urlData } = supabase.storage
      .from('dish-images')
      .getPublicUrl(`dishes/${filename}`)

    uploadedUrls[filename] = urlData.publicUrl
    console.log(`Uploaded: ${filename} -> ${urlData.publicUrl}`)
  }

  fs.writeFileSync('scripts/uploaded-image-urls.json', JSON.stringify(uploadedUrls, null, 2))
  console.log('\nAll uploads complete. URLs saved to scripts/uploaded-image-urls.json')
}

uploadImages().catch(console.error)
