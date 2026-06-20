import { Component, loadFile, onMounted, onRendered, onWillStart, useEffect, useRef, useState } from "@odoo/owl";
import { parseIconMetrics, parseIniFile, parseNonclientMetrics } from "./iniFileParser";
import { FieldColor } from "./FieldColor";
import { FieldSpin } from "./FieldSpin";
import { spec, win95_colors } from "./spec";

import './DesktopTheme.scss'
import './PreviewBox.scss'
import './Editors.scss'
import './DesktopIcon.scss'

export class DesktopTheme extends Component{
    static template = "DesktopTheme.Form"
    static components = {FieldColor, FieldSpin}
    setup(){
        // this.data = useState(win95_colors);
        this.data = {...win95_colors}; // assure simple
        this.state = useState({
            theme: 'win7',
            theme: 'nu',
            theme: 'bluecurve',
            item: 'Desktop',
            theme: 'win9x',
            size: 10,
            font: {name:'Arial'},
            color: win95_colors.Background,//'lime',
            color2: 'fuchsia',
            mapping: spec.Desktop,
            fullCss : this.windowStyle(),
            color_schemes : [],
            color_scheme : '',

            //? new pool
            themeInfo: null,
        })
        this.iframeRef = useRef('client')

        // //? load color schems
        // onWillStart(async () => {
        //     const ini = await loadFile(`/color_schemes.ini`);
        //     this.colorSchemesIni = parseIniFile(ini)
        //     console.log(this.colorSchemesIni)
        // })

        // const scroll10px = useRef('scroll10px')
        // onMounted(() => scroll10px.el.scrollTop = 10);


        useEffect(
            //? if user click any of colors or sizes, apply to data-then-CSS!
            ()=>{
                console.log('preparing-to-apply-cangess')
                this.applyChanges()
            },
            () => [this.state.size, this.state.color, this.state.color2, this.state.text, JSON.stringify(this.state.font)]
        )

        //? user change theme, let reload its color schemes list
        useEffect(
            (theme_name)=>{
                // this.state.color_schemes = this.colorSchemesIni[theme_name] || [];
                this.state.color_scheme = '' //* Default.
                this.iframeRef.el.contentWindow.postMessage({theTheme: theme_name})
                // this.applyChanges()
            },
            () => [this.state.theme]
        )

        //? user change color schem, let aplly the colors
        useEffect(
            (color_scheme)=>{
                // debugger
                if(this.state.color_scheme == '') return //* Default.
                // this.applyChanges()
                // this.applyThemeFile()
                this.iframeRef.el.contentWindow.postMessage({theSceme: color_scheme})
                // this.state.fullCss = this.windowStyle()
            },
            () => [this.state.color_scheme]
        )
        
        // Menerima pesan dari iframe
        window.addEventListener('message', (event) => {
            const {ready, theScope, themeInfo, theSpec} = event.data

            if(ready) this.iframeRef.el.contentWindow.postMessage({theTheme: this.state.theme});
            if(theScope) this.switchScope(theScope);
            if(themeInfo) this.updateThemeInfo(themeInfo);
            if(theSpec) this.updateData(theSpec);
        });
    }

    updateThemeInfo(themeInfo){
        // console.log(themeInfo)
        this.state.themeInfo = themeInfo
        // this.state.color_schemes = []
        console.log(Object.keys(this.state.themeInfo.Schemes))
    }

    updateData(data){
        console.log('updating.data=',data)
        this.data = data;
    }

    get sel_items(){
        return spec
    }

    toggleBold(){
        this.state.font.bold = !this.state.font.bold;
    }
    toggleItalic(){
        this.state.font.italic = !this.state.font.italic;
    }
    getLongText(){
        let txt = 'Text'
        for (let i = 0; i < 10; i++) {
            txt += '\n'
        }
        return txt
    }

    async applyThemeFile(){
        return
        this.data = {...win95_colors}; //reset all
        const {theme, color_scheme} = this.state;
        const themeFile = this.colorSchemesIni[theme][color_scheme]
        const schemeRoot = `/src/styles/themes/${theme}/color-scheme/`;
        const content = await loadFile(schemeRoot+ themeFile);
        const ini = parseIniFile(content)
        const colors = ini["Control Panel\\Colors"]
        for (let [key, value] of Object.entries(colors)) {
            if(key=='TitleWrap'){
                value = value ? 'wrap' : 'nowrap';
            } else {
                value = isNaN(parseInt(value)) ? value : `rgb(${value})`
            }
            this.data[key] = value;
            // console.log(`${key}: ${value}`);
        }

        //? wallpaper
        const desktop = ini['Control Panel\\Desktop']
        if(desktop && desktop['Wallpaper']){
            let wallpaper = desktop['Wallpaper'].replace(/\\/g, '/');
            wallpaper = wallpaper.slice(wallpaper.indexOf('Themes') + 7 ).trim('/')
            this.data['wallpaper'] = `url("${schemeRoot}/${wallpaper}")`
        } else {
            this.data['wallpaper'] = undefined; //delete
        }


        //? MyComputer
        const MyComputer = ini['CLSID\\{20D04FE0-3AEA-1069-A2D8-08002B30309D}\\DefaultIcon']
        if(MyComputer && MyComputer.DefaultValue){
            MyComputer.icon = MyComputer.DefaultValue.replace(/\\/g, '/');
            MyComputer.icon = MyComputer.icon.slice(MyComputer.icon.indexOf('Themes') + 7 );//trim().split('/').join('/')
            MyComputer.icon = MyComputer.icon.split(',')[0];
            this.data['di-my-computer'] = `url("${schemeRoot}/${MyComputer.icon}")`
        }
        const network = ini._DefaultIcon('208D2C60-3AEA-1069-A2D7-08002B30309D')
        network && (this.data['di-network'] = `url("${schemeRoot}/${network}")`)

        const myDocs = ini._DefaultIcon('450D8FBA-AD25-11D0-98A8-0800361B1103')
        myDocs && (this.data['di-my-documents'] = `url("${schemeRoot}/${myDocs}")`);

        const recycleBin = ini._DefaultIcon('645FF040-5081-101B-9F08-00AA002F954E', 'full')
        recycleBin && (this.data['di-recycle-bin'] = `url("${schemeRoot}/${recycleBin}")`);

        //? fonts & sizes
        const Metrics = ini['Metrics']
        if(Metrics){
            const NonclientMetrics = parseNonclientMetrics(Metrics['NonclientMetrics'], true);
            // NonclientMetrics.CaptionHeight = 65; //demo
            console.log(NonclientMetrics)
            Object.assign(this.data, NonclientMetrics)
            
            //? Desktop Icon
            const IconMetrics = parseIconMetrics(Metrics['IconMetrics'], true)
            Object.assign(this.data, IconMetrics)
        }

        
        this.state.fullCss = this.windowStyle()
        // console.log(colors)

    }

    windowStyle(){
        //? generate css for html
        let ret = '\n'
        for(const [k,v] of Object.entries(this.data)){
            //? it is Font struct
            if(v && typeof v == 'object'){
                // for(const n of ['name', 'color', 'color2', 'text']){
                //     const key = scoop[n]
                //     if(key != null){
                //         this.data[key] = this.state[n]
                //     }
                // }
                for(let [p, yn] of Object.entries(v)){
                    switch (p) {
                        case 'FaceName':
                        case 'Name':
                            ret += `--${k}-Name: '${yn}' !important;\n`;
                            break;
                        case 'Height':
                            ret += `--${k}-${p}: ${yn*-1}px !important;\n`;
                            break;
                        case 'Weight':
                            ret += `--${k}-${p}: ${yn} !important;\n`;
                            break;
                        case 'Italic':
                            ret += `--${k}-${p}: ${yn?'italic':'normal'} !important;\n`;
                            break;
                        // case 'name':
                        //     break;
                            
                        // default:
                        //     ret += `--${k}-${p}: ${yn} !important;\n`;
                        //     break;
                    }
                }
            }
            //? size
            else if (!isNaN(v)) {
                ret += `--${k}: ${v}px;\n`;
            }
            //? color
            else {
                ret += `--${k}: ${v|| 'none'};\n`;
            }
        }
        ret += `--CaptionHeight: ${this.data.CaptionHeight};\n` ; //without px
        return ret;
    }

    // previewClick(ev){
    //     // console.log('EL:', findEl(ev.target))
    //     console.log('state:', this.state)
    //     console.log('data:', this.data)
    //     const item = findEl(ev.target)
    //     this.switchScope(item)
    // }
    switchScope(item){
        const scope = spec[item];
        console.log('switching.scope:', item)
        if(!scope){
            console.log('not found scoop:', item)
            return
        }
        this.state.item = item;
        this.state.mapping = scope;
        //? prepare .state
        for(const [k,v] of Object.entries(scope)){
            // this.state[k] = this.data[v]
            let val = this.data[v];
            if(v.endsWith('Width') || v.endsWith('Height')){
                val = parseInt(val);
            }
            console.log(`set state[${k}] <-- ${v} (${val})`)
            this.state[k] = val;
        }
    }
    fillState(scoop){
        for(const [k,v] of Object.entries(scoop)){
            this.state[k] = win95_colors[v]
        }
    }
    applyChanges(){
        //? user click(state) --> send to html/css
        const changes = {}
        const scoop = this.state.mapping
        for(const n of ['size', 'color', 'color2', 'text']){
            const key = scoop[n]
            if(key != null){
                // this.data[key] = this.state[n]
                console.log('applying',`key:${key}, n:${n}`)
                // changes[key] = this.state[n]
                let val = this.state[n];
                if(key.endsWith('Height') || key.endsWith('Width')){
                    val = `${val}px`
                }
                changes[key] = val;
            }
        }
        // for(const n of ['name', 'bold', 'italic']){
        //     const key = scoop['font']
        //     if(key != null){
        //         this.data[key][n] = this.state.font[n]
        //     }
        // }
        // this.state.fullCss = this.windowStyle()
        this.iframeRef.el.contentWindow.postMessage({thePatch: changes})

    }
}

function findEl(el) {
    var name = el.getAttribute('data-el');
    if(name) return name;
    if(el.parentElement){
        return findEl(el.parentElement)
    }
}