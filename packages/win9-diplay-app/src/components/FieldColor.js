import { Component, onWillPatch, onWillUpdateProps, useEffect, useRef, useState, xml } from "@odoo/owl";

import './FieldColor.scss'

export class FieldColor extends Component {
    // static template = xml`<button class="btn-color" t-on-click="btnClick"><input type="color" t-model="props.model" t-att-style="style" t-ref="input"/></button>`
    static template = xml`<button class="btn-color" t-on-click="btnClick" t-att="{disabled: props.disabled}"><i t-attf-style="background:{{state.color}};"/><s/><b/><t t-slot="default"/></button>`

    setup(){
        this.state = useState({color: color2color(this.props.color)})
        // this.input = useRef("input");
        // useEffect(
        //     (el, color)=>{
        //         if(el){
        //             el.value = color
        //         }

        //     },
        //     [this.input.el, this.state.color]
        // )
        onWillUpdateProps(({color})=>{
            if(color /*&& !this.props.disabled*/){
                // console.log('field.color:',color)
                this.state.color = color2color(color)

            }
        })
    }

    get disable(){
        return this.props.disabled != null
    }
    btnClick(){
        // this.input.el.click();
    }
}

function color2color(color){
    if(!color) return 'transparent'
    if(color.startsWith('#')) return color;
    const elem = document.createElement('div')
    elem.style.color = color;

    document.body.appendChild(elem);
    // Mengambil warna dalam format rgb dari elemen
    const rgb = window.getComputedStyle(elem).color;
    document.body.removeChild(elem);
     // Mengonversi rgb ke hex
    const result = rgbToHex(rgb);
    // console.log('original:',color, result)
    return result
}

function rgbToHex(rgb) {
    // Menangkap nilai r, g, dan b dari rgb string
    const rgbArray = rgb.match(/\d+/g);
    const r = parseInt(rgbArray[0]);
    const g = parseInt(rgbArray[1]);
    const b = parseInt(rgbArray[2]);

    // Mengonversi nilai r, g, dan b ke format hex
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}
