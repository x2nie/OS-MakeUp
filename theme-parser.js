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

    const nc = parseNonclientMetrics(txt);
    console.log(nc);
    result.push(`  --ScrollWidth: ${nc.ScrollWidth}px;`);
    result.push(`  --arrowSize: calc(var(--ScrollWidth) * 0.5 );`);
    result.push(`  --CaptionHeight: ${nc.CaptionHeight}px;`);
    result.push(`  --CaptionFont-Height: ${nc.CaptionFont.Height}px;`);
    result.push(`  --CaptionFont-Weight: ${nc.CaptionFont.Weight}px;`);
    result.push(`  --CaptionFont-Name: '${nc.CaptionFont.Name}';`);
    result.push(`  --SmCaptionHeight: ${nc.SmCaptionHeight}px;`);
    result.push(`  --SmCaptionFont-Height: ${nc.SmCaptionFont.Height}px;`);
    result.push(`  --SmCaptionFont-Weight: ${nc.SmCaptionFont.Weight}px;`);
    result.push(`  --SmCaptionFont-Name: '${nc.SmCaptionFont.Name}';`);
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

    const NONCLIENTMETRICS_PATTERN = /^(?!\s*;)NonclientMetrics\s*=\s*(\d+(?:\s+\d+)*)\s*$/gm;
    function parseNonclientMetrics(text) {
        NONCLIENTMETRICS_PATTERN.lastIndex = 0;
        const match = NONCLIENTMETRICS_PATTERN.exec(text);
        if (!match) {
            throw new Error("NonclientMetrics not found in theme file");
        }
        const dataStr = match[1];
        return parseNONCLIENTMETRICS_raw(dataStr);
    }



function toBytes(str){

    return Uint8Array.from(

        str
            .trim()
            .split(/\s+/)
            .map(v => parseInt(v,10))
    );
}

function i32(dv,o){
    return dv.getInt32(o,true);
}

function u32(dv,o){
    return dv.getUint32(o,true);
}

function parseLOGFONTA(dv,o){

    let face = "";

    for(let i=0;i<32;i++){

        const c = dv.getUint8(o + 28 + i);

        if(c === 0)
            break;

        face += String.fromCharCode(c);
    }

    return {

        Height: i32(dv,o + 0),
        Width: i32(dv,o + 4),
        Escapement: i32(dv,o + 8),
        Orientation: i32(dv,o + 12),
        Weight: i32(dv,o + 16),
        Italic: dv.getUint8(o + 20),
        Underline: dv.getUint8(o + 21),
        StrikeOut: dv.getUint8(o + 22),
        CharSet: dv.getUint8(o + 23),
        OutPrecision: dv.getUint8(o + 24),
        ClipPrecision: dv.getUint8(o + 25),
        Quality: dv.getUint8(o + 26),
        PitchAndFamily: dv.getUint8(o + 27),
        Name: face
    };
}

function parseNONCLIENTMETRICS_raw(text){

    const bytes = toBytes(text);

    const dv = new DataView(bytes.buffer);

    let o = 0;

    const out = {

        cbSize: u32(dv,o),
        BorderWidth: i32(dv,o += 4),
        ScrollWidth: i32(dv,o += 4),
        ScrollHeight: i32(dv,o += 4),
        CaptionWidth: i32(dv,o += 4),
        CaptionHeight: i32(dv,o += 4)
    };

    o += 4;

    out.CaptionFont = parseLOGFONTA(dv,o);

    o += 60;

    out.SmCaptionWidth = i32(dv,o);

    o += 4;

    out.SmCaptionHeight = i32(dv,o);

    o += 4;

    out.SmCaptionFont = parseLOGFONTA(dv,o);

    o += 60;

    out.MenuWidth = i32(dv,o);

    o += 4;

    out.MenuHeight = i32(dv,o);

    o += 4;

    out.MenuFont = parseLOGFONTA(dv,o);

    o += 60;

    out.StatusFont = parseLOGFONTA(dv,o);

    o += 60;

    out.MessageFont = parseLOGFONTA(dv,o);

    o += 60;

    if(o + 4 <= bytes.length){

        out.PaddedBorderWidth = i32(dv,o);
    }

    return out;
}

function run(){

    try{

        const txt = document.getElementById("input").value;

        const result = parseNONCLIENTMETRICS_raw(txt);

        document.getElementById("out").textContent =
            JSON.stringify(result,null,4);

    }catch(err){

        document.getElementById("out").textContent =
            err.stack;
    }
}

// document.getElementById("input").value =
// `88 1 0 0 1 0 0 0 16 0 0 0 16 0 0 0 18 0 0 0 18 0 0 0 245 255 255 255 0 0 0 0 0 0 0 0 0 0 0 0 188 2 0 0 0 0 0 1 0 0 0 0 84 97 104 111 109 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 15 0 0 0 15 0 0 0`;

// run();
