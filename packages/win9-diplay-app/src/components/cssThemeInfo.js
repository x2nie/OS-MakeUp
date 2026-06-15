const rawString = `
/** =ThemeInfo= {
    Name : Win7
    
    Schemes: [
        Nature: {css: {--ActiveColor:#123123} }
        Sky: {style: {--ActiveColor:#123123} }
    ]
    Variant: [
        Normal: {class:}
        Small Button      : {class:vista}
        Extra Small Button:{class:vista2}
    ]

} 
`;
// ------------- **/

// Fungsi untuk membersihkan dan memformat string menjadi JSON
export function parseCustomJSON(input) {
    // Hilangkan komentar di awal dan akhir
    let cleanString = input.replace(/\/\*\*.*?=\w+=|[\-*\s]+$/g, '').trim();

    // Tambahkan tanda kutip untuk properti
    cleanString = cleanString.replace(/([\w\-]+[\w ]*)\s*:/g, '"$1":');
    
    // Tambahkan tanda kutip untuk string nilai properti yang tidak diawali dengan [ atau {
    cleanString = cleanString.replace(/:\s*([^\n,\]\}\[\{]+)/g, (_, value) => {
        const trimmedValue = value.trim();
        if (trimmedValue && !trimmedValue.startsWith('[') && !trimmedValue.startsWith('{')) {
            return `: "${trimmedValue}",`;
        }
        return `: ${trimmedValue}`;
    });
    cleanString = cleanString.replace(/:\s*\}/g, ':""}');

    // Tambahkan tanda kutip untuk string dalam kutip tunggal
    cleanString = cleanString.replace(/'([^']*)'/g, '"$1"');

    // Tambahkan {} untuk setiap elemen dalam array, dan akhiri setiap elemen dengan koma
    cleanString = cleanString.replace(/\[\s*\n([^\]]*)\n[ ]+\]/gm, (match, content) => {
        // Split setiap baris dalam array
        const items = content
            .split('\n')
            // .map(line => line.trim())
            .filter(line => line); // Hilangkan baris kosong
        const formattedItems = items.map(item => {
            // Tambahkan {} jika elemen tidak diawali dan diakhiri dengan {}
            if (!item.trim().startsWith('{') || !item.trim().endsWith('}')) {
                return `{${item}},`;
            }
            return `${item},`;
        });
        return `[\n${formattedItems.join('\n')}\n]`; // Gabungkan kembali dengan newline
    });

    cleanString = cleanString.replace(/\](\s+)/g, '],$1');
    // Ganti ,} dan ,] dengan } dan ]
     cleanString = cleanString.replace(/,(\s*[}\]])/g, '$1');

     cleanString = cleanString.replace(/\s+"/g, '"');

    
    console.log('final:', cleanString)

    try {
        // Parse JSON
        return JSON.parse(cleanString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

const parsedData = parseCustomJSON(rawString);
console.log(parsedData);
