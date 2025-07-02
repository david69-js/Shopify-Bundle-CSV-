import fs from 'fs';
import ExcelJS from 'exceljs';
import { cleanAndSplit } from './csv/utils.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultBundleType = 'Infinite Options Bundle';
const defaultBundleItemQuantity = 1;
const defaultSyncPrice = 'TRUE';

async function run() {
  const workbook = new ExcelJS.Workbook();
  const wsOut = workbook.addWorksheet('Bundles');

  wsOut.columns = [
    { header: 'bundle_variant_sku', key: 'bundle_variant_sku', width: 30 },
    { header: 'bundle_item_variant_sku', key: 'bundle_item_variant_sku', width: 40 },
    { header: 'bundle_type', key: 'bundle_type', width: 30 },
    { header: 'bundle_item_quantity', key: 'bundle_item_quantity', width: 10 },
    { header: 'sync_price', key: 'sync_price', width: 10 },
  ];

  const parser = (await import('csv-parse')).parse({ columns: true, trim: true });

  const inCsv = path.join(__dirname, 'csv', 'bundle-sku-input.csv');
  let currentGroup = null;
  let stripe = false; // color toggle per grupo

  fs.createReadStream(inCsv)
    .pipe(parser)
    .on('data', row => {
      const padre = row.productcode;
      if (padre !== currentGroup) {
        stripe = !stripe;
        currentGroup = padre;
      }

      const accesorios = cleanAndSplit(row.freeaccessories);
      accesorios.forEach(acc => {
        const newRow = wsOut.addRow({
          bundle_variant_sku: padre,
          bundle_item_variant_sku: acc,
          bundle_type: defaultBundleType,
          bundle_item_quantity: defaultBundleItemQuantity,
          sync_price: defaultSyncPrice,
        });

        // Aplica color por grupo
        const color = stripe ? 'FFFFFFFF' : 'FFEEEEEE';
        newRow.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: color }
          };
        });
      });
    })
    .on('end', async () => {
      const outXlsx = path.join(__dirname, 'csv', 'bundle-sku-output.xlsx');
      await workbook.xlsx.writeFile(outXlsx);
      console.log('✅ Archivo con zebra por grupo generado.');
    });
}

run().catch(console.error);
