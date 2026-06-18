import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
)

const uploadedUrls = JSON.parse(fs.readFileSync('scripts/uploaded-image-urls.json', 'utf8'))

const dishImageMap: Record<string, string> = {
  'cc.webp': 'Classic Chocolate Cake',
  'Rv.jpg': 'Red Velvet Cake',
  'vc.png': 'Vanilla Bean Cake',
  'bfc.webp': 'Black Forest Cake',
  '3c.jpg': 'Chocolate Chip Cookies',
  'orc.webp': 'Oatmeal Raisin Cookies',
  'dcc.jpg': 'Double Chocolate Cookies',
  'fc.jpg': 'French Croissant',
  'dp.jpg': 'Danish Pastry',
  'cp.jpg': 'Cream Puff',
  'sb.jpg': 'Sourdough Bread',
  'wwb.jpg': 'Whole Wheat Bread',
  'gb.webp': 'Garlic Bread',
  'bm.jpg': 'Blueberry Muffin',
  'ccm.webp': 'Chocolate Chip Muffin',
  'bnm.jpg': 'Banana Nut Muffin',
  'cvc.webp': 'Vanilla Cupcake',
  'ccup.jpg': 'Chocolate Cupcake',
  'wnb.webp': 'Walnut Brownie',
  'Classic-Brownies.jpg': 'Classic Brownie',
  'gd.jpg': 'Glazed Donut',
  'chocod.png': 'Chocolate Donut',
  'apie.webp': 'Apple Pie',
  'pumpie.jpg': 'Pumpkin Pie',
  'ft.webp': 'Fruit Tart',
  'chocot.jpeg': 'Chocolate Tart',
  'nycc.png': 'New York Cheesecake',
  'bbcc.jpg': 'Blueberry Cheesecake',
  'scc.jpg': 'Strawberry Cheesecake',
  'mac.jpg': 'Assorted Macarons',
  'cmac.webp': 'Chocolate Macaron',
  'pmac.webp': 'Pistachio Macaron',
}

async function updateDatabase() {
  for (const [filename, productName] of Object.entries(dishImageMap)) {
    const imageUrl = uploadedUrls[filename]
    if (!imageUrl) {
      console.warn(`No URL found for ${filename}`)
      continue
    }

    const { error } = await supabase
      .from('products')
      .update({ image_url: imageUrl })
      .eq('name', productName)

    if (error) {
      console.error(`Failed to update ${productName}:`, error.message)
    } else {
      console.log(`Updated ${productName} with image URL`)
    }
  }

  console.log('\nDatabase updated with all image URLs!')
}

updateDatabase().catch(console.error)
