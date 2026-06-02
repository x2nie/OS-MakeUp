export async function parseTheme(theme) {
	// debugger;
	// document.getElementById('parent').innerHTML = ''
    // Implementation for applying theme
	var response = await fetch(theme);
	var txt = await response.text();
	const props = parseColorScheme(txt);
    
    let result = [':root {'];
    for (const [key, value] of Object.entries(props)) {
        result.push(`  --${key}: ${value};`);
    }
    result.push('}');
    return result.join('\n');
}


    // Fungsi konversi RGB string "r g b" ke HEX
    function rgbStringToHex(rgbStr) {
		// return `rgb(${rgbStr})`
        const parts = rgbStr.trim().split(/\s+/);
        if (parts.length !== 3) return null;
        const r = parseInt(parts[0], 10);
        const g = parseInt(parts[1], 10);
        const b = parseInt(parts[2], 10);
        if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // Parse teks dan return Map/Dict { key: { rgb, hex } }
    const LINE_PATTERN = /^(?!\s*;)([a-zA-Z]+)\s*=\s*(\d+(?:\s+\d+)*)\s*$/gm;
    function parseColorScheme(text) {
        const result = {}; // pakai Map biar urutan retain
        let match;
        // Reset lastIndex karena pattern global
        LINE_PATTERN.lastIndex = 0;
        while ((match = LINE_PATTERN.exec(text)) !== null) {
            const key = match[1];
            const rgbValue = match[2]; // string "0 0 128"
            const hex = rgbStringToHex(rgbValue);
            if (hex) {
                result[key] = hex;
            } else {
                // fallback kalau format RGB salah
                result[key] = 'invalid' ;
            }
        }
        return result;
    }