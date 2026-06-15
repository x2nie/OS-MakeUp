// const { Component, useState, mount, loadFile, xml } = owl;
import { Component, useState, mount, loadFile, xml, onWillStart, useEffect, onMounted } from '@odoo/owl';
import { spec, win95_colors } from "./spec";
// import { parseCustomJSON } from './cssThemeInfo';

// import './DesktopTheme.scss'
import './PreviewBox.scss'
// import './Editors.scss'
import './DesktopIcon.scss'
import { parseIniFile } from './iniFileParser';

class Root extends Component {
static template = "theme_preview";

    setup(){
        // this.data = useState(win95_colors);
        // this.data = {...win95_colors}; // assure simple
        // this.state = useState({
            // theme: 'win98',
            // item: 'Desktop',
            // size: 10,
            // font: {name:'Arial'},
            // color: win95_colors.Background,//'lime',
            // color2: 'fuchsia',
            // mapping: spec.Desktop,
            // fullCss : '',// this.windowStyle(),
            // color_schemes : [],
            // color_scheme : '',
        // })

        // Menerima pesan dari iframe
        window.addEventListener('message', (event) => {
            const {theTheme, theSceme, thePatch} = event.data

            if(theTheme) this.switchTheme(theTheme);
            if(theSceme) this.switchScheme(theSceme);
            if(thePatch) this.applyPatch(thePatch);
        });
        onWillStart(
            // () => this.switchTheme('win98')
            ()=> {
                const themeStyle = document.getElementById("the-theme");
                if (themeStyle) {
                    themeStyle.remove(); // Hapus elemen dari posisi awal
                    document.head.appendChild(themeStyle); // Tambahkan kembali di akhir <head>
                }
                window.parent.postMessage({ready: true});
                this.mayRunStandalone()
            }
        )
    }

    mayRunStandalone(){
        // var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; 
        var url = new URL(window.location.href);
        var theme = url.searchParams.get("theme");
        if(theme){
            this.switchTheme(theme)
        }
    }

    async switchTheme(theme){
        //? host tell to switch of theme.css
        const styleElement = document.getElementById('the-theme');
        styleElement.innerHTML = ''
        // styleElement.setAttribute('src', '');
        // styleElement.setAttribute('src', `themes/${theme}/${theme}.css`)
        let themeInfo = {ThemeInfo:{Name:null}, Schemes:{}, Variants:[]}
        // const filePath =  `themes/${theme}/${theme}.css`
        const filePath =  `/os-makeup/themes/${theme}/theme.css`;
        // styleElement.setAttribute('src', filePath);
        let link = document.getElementById('theme')

        if (!link) {
            link = document.createElement('link')
            link.id = 'theme'
            link.rel = 'stylesheet'
            document.head.appendChild(link)
        }
        link.href = filePath;

        // link.href = `/theme/themes/${name}/theme.css`
        /*
        try {
            // Fetch CSS file content
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch CSS file. Status: ${response.status}`);
            }

            const cssContent = await response.text();
            // console.log(`CSS content of ${filePath}:\n`, cssContent);

            //? ambil theme info
            const regex = /\/\*\*\s+(\[ThemeInfo\][^*]+)\*\*\//gm;
            const match = regex.exec(cssContent);

            if (match) {
                // console.log(match[1]); // Output: [ThemeInfo]\n    Name = Win7\n\n[Schemes]\n    Nature = style: --ActiveColor:#123123\n\n[Variants]\n    Normal = class:\n    Small Button = class:vista
                themeInfo = parseIniFile(match[1])
                // console.log('themeInfo:', )
            } 
            // else {console.log('No match found');            }

            //? Update the content of the <style> element
            styleElement.textContent = cssContent;

            console.log(`CSS injected into <style> from: ${filePath}`);
        } catch (error) {
            console.error(`Error loading or injecting CSS content: ${filePath}`, error);
        }
        */
        
        //? clear last mod
        document.body.className = ''
        document.body.style = ''



        window.parent.postMessage({themeInfo})
        window.requestAnimationFrame(() => {
            this.parseCurrentTheme()
        });
    }

    switchScheme(scheme){
        const [kind, value] = splitOnce(scheme, ':')
        console.log([kind, value])
        switch (kind) {
            case 'class':
                document.body.className = value;
                setTimeout(() => {
                    this.parseCurrentTheme()
                }, 500);
                break;
        
            default:
                break;
        }
    }

    parseCurrentTheme(){
        //? report the current (live) style to host.
        // grab actual css into obj
        const spec = {...win95_colors}
        const style = window.getComputedStyle(document.body)
        Object.keys(win95_colors).forEach(name =>{
            let value = style.getPropertyValue(`--${name}`);
            if(value.startsWith('rgb('))
                value = rgbToHex(value);
            spec[name] = value
        })
        // console.log( style.getPropertyValue('--bar') ) // #336699
        window.parent.postMessage({theSpec: spec})
    }

    applyPatch(changes){
        //? user change a color, size, font, etc.
        // console.log('applying css:', changes)
        const style = document.body.style
        for (const [key, value] of Object.entries(changes)) {
            style.setProperty(`--${key}`, value)
        }
    }

    previewClick(ev){
        //? user click an element
        const scope = findEldataScope(ev.target)
        window.parent.postMessage({theScope: scope})
    }
}

function findEldataScope(el) {
    var name = el.getAttribute('data-el');
    if(name) return name;
    if(el.parentElement){
        return findEldataScope(el.parentElement)
    }
}

function rgbToHex(rgbString) {
    // Regex untuk menangkap angka-angka di dalam format rgb
    const regex = /rgb\((\d+)[,\s]+(\d+)[,\s]+(\d+)\)/;
    const match = rgbString.match(regex);

    if (!match) {
        throw new Error("Format warna tidak valid");
    }

    // Ekstrak nilai R, G, B dari hasil match
    const [_, r, g, b] = match;

    // Konversi setiap nilai ke format hex dengan padding 0 bila perlu
    const toHex = (num) => parseInt(num).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function splitOnce(str, delimiter) {
    const index = str.indexOf(delimiter);
    if (index === -1) {
        return [str]; // Jika delimiter tidak ditemukan, kembalikan string utuh dalam array
    }
    return [str.slice(0, index), str.slice(index + delimiter.length)];
}
// mount(Root, document.body);
// async, so we can use async/await
(async function setup() {
    const templates = await loadFile(`/owl_templates.xml`);
    const env = {
    // designer : reactive({
    //   root: null, //will be a form being designing
    //   pickedComponent: 'TButton'
    // })
    // ui: createUI(),
    // _t: someTranslateFn,
    // templates,
    // possibly other stuff
    };

    // @ts-ignore
    mount(Root, document.body, { env, templates, });
})();

// document.addEventListener("DOMContentLoaded", () => {
//     const specificStyle = document.getElementById("the-theme");
//     if (specificStyle) {
//       document.head.appendChild(specificStyle);
//     }
// });