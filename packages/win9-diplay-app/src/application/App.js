import { Component, loadFile, onWillStart, useChildSubEnv, useState, useSubEnv, xml } from "@odoo/owl";

import './style.css'
// import '98.css/dist/98.css'
// import '7.css/dist/7.css'

// import './7css-scooped.scss'

// import '7.css/dist/7.scoped.css'
// import '../styles/basic.scss'
// import '../styles/7.css.modified/gui/index.scss'
// import '../styles/7.css.modified/gui/scoped.scss'
// import '../styles/themes/98/scoped.scss'

// import '../styles/gui/_global.scss'
// import '../styles/gui/index.scss'

//? 3 LINES BELOW ARE FINE -------------
// import '../styles/themes/98/windowed.scss'
// import '../styles/themes/XP/windowed.scss'
// import '../styles/7.css.modified/gui/windowed.scss'

//? REBUILD FROM SCRATCH
// import '../styles/themes/base/_window.scss'
// import '../styles/themes/base/index.scss'
// import '../styles/themes/basic/windowed.scss'
// import '../styles/themes/nt/_window.scss'
// import '../styles/themes/nt/windowed.scss'
// import '../styles/themes/win95/windowed.scss'
// import '../styles/themes/31/windowed.scss'
// import '../styles/themes/bluecurve/windowed.scss'


// import 'xp.css/dist/XP.css'
// import 'xp.css/dist/98.css'
// import './desktop.scss'

// import '../sample/bluecurve/index.scss'
// import '../sample/bluecurve/gtk-3.0/gtk.css'
// import '../sample/bluecurve/gtk-3.0/gtk-style.css'


import './style-designer.scss'


// import { Cockpit } from "./Cockpit";
import { Desktop } from "./desktop";

export default class Application extends Component {
    static components = { Desktop}
    setup(){
        const designer = useState({
            root: null, //will be a form being designing
            // pickedComponent: 'TButton'
            // seed: {},
            // findObject: (name) => this.lookupObject(name, this.env.designer.seed),
            // // pickedComponent: null
            // pickedComponent: 'TPanel'
        })
        // useChildSubEnv({designer})
        onWillStart(async ()=>{
            // const res = await loadFile('/samples/form1.json')
            // designer.seed = JSON.parse(res)
        })
        useSubEnv({designer})
    }

    lookupObject(name, rootObject){
        if(rootObject.object == name)
            return rootObject;
        for(const child of rootObject.children){
            // if(child.object == name)
            //     return child;
            let result = this.lookupObject(name, child)
            if(result) return result
        }
    }
    
}
Application.template = xml`
    <!-- <Cockpit /> -->
    <!-- <t t-out="env.designer.pickedComponent" /> -->
    <!-- <br/> -->
    <Desktop />
`;