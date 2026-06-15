import { Component, onMounted, useEffect, useRef, useState, xml } from "@odoo/owl";

import './FieldSpin.scss'

// https://guinotebook.com/spin-controls/
export class FieldSpin extends Component {
    // static template = xml`<button class="btn-color" t-on-click="btnClick"><input type="color" t-model="props.model" t-att-style="style" t-ref="input"/></button>`
    static template = xml`
        <div t-ref="root" class="FieldSpin">
            <t t-slot="default"/>
            <button class="btn-spin" t-on-click="upClick" t-att="{disabled: props.disabled}"/>
            <button class="btn-spin" t-on-click="downClick" t-att="{disabled: props.disabled}"/>
        </div>`

    setup(){
        this.state = useState({value: this.props.state[this.props.field]})
        const root = useRef("root")
        // useEffect(
        //     ()=>{
        //         this.input = root.el ? root.el.querySelector('input') : null;
        //     },
        //     ()=> [root.el]
        // )
        // this.root = useRef("root")
        onMounted(()=>{
            this.input = root.el.querySelector('input');

        })
    }
    
    // get input(){
    //     return this.root.el ? this.root.el.querySelector('input') : {};
    // }

    get disable(){
        return this.props.disabled != null
    }
    upClick(){
        // this.input.value = parseInt(this.input.value || '0') + 1;
        this.state.value = parseInt(this.input.value || '0') + 1;
        this.changed()
    }
    downClick(){
        // this.input.value = parseInt(this.input.value || '0') - 1
        this.state.value = parseInt(this.input.value || '0') - 1
        this.changed()
    }
    changed(){
        // this.props.state[this.props.field] = this.input.value;
        this.props.state[this.props.field] = this.state.value;
        return
        // // Create a new 'change' event
        // var event = new Event('input');
        // // Dispatch it.
        // this.input.dispatchEvent(event);
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("input", false, true);
            this.input.dispatchEvent(evt);
        }
        else
            this.input.fireEvent("oninput");
    }
}