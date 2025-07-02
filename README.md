# Treatland Auto Bundle

## 📦 Description
**Treatland Auto Bundle** is a Node.js tool designed to automate bundle generation from a CSV file. For each parent product containing a list of accessories, it:

1. Removes any text within parentheses.
2. Splits accessory strings by commas, generating one row per accessory.
3. Outputs an Excel file (`.xlsx`) styled with alternating row colors per product group, improving readability.

## 🛠 Technologies Used
- **Node.js (ESM)** – primary runtime and language.
- **exceljs** – for generating `.xlsx` files with advanced styling and formatting.
- **csv-parse** – efficient CSV reading/streaming.
- **csv-stringify** – optional, for clean CSV output (if needed).
- **fs** and **path** – native Node.js modules for file and path handling.

## ⚙️ Key Features
- Stream-based CSV processing that handles large files.
- Regex-based removal of parentheses content.
- Row expansion: one line per accessory.
- Zebra-striping in Excel output at the **group** level, based on parent SKU changes.

## 🚀 Installation

```bash
git clone https://github.com/yourusername/treatland-auto-bundle.git
cd treatland-auto-bundle
npm install
