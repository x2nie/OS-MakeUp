const fs = require('fs');
const path = require('path');

// Path ke folder themes
const themesDir = path.join(__dirname, '..', 'themes');

// Baca semua folder di /themes
const themeFolders = fs.readdirSync(themesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Untuk setiap theme folder
themeFolders.forEach(themeFolder => {
  const skinsDir = path.join(themesDir, themeFolder, 'skins');
  
  // Cek apakah folder skins ada
  if (fs.existsSync(skinsDir)) {
    // Baca semua file di skins folder
    const skinFiles = fs.readdirSync(skinsDir)
      .filter(file => file.endsWith('.css'))
      .map(file => file.replace('.css', ''));

    //TODO: urutkan berdasarkan: 'default' duluan
    
    // Buat string untuk skinList
    const skinList = skinFiles.join(', ');
    
    // Konten file _skinList.scss
    const content = `:root {
    --skinlist: ${skinList};
}
`;
    
    // Tulis file
    const outputPath = path.join(themesDir, themeFolder, '_skinList.scss');
    fs.writeFileSync(outputPath, content);
    
    console.log(`Generated: ${outputPath}`);
  }
});
