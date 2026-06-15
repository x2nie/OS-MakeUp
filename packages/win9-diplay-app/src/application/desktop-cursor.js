import { Component, onWillDestroy, useEffect, useEnv, useState, xml } from "@odoo/owl";
import debounce from 'lodash.debounce'


export default class DesktopCursor extends Component {
    static template = xml`
        <div class="component-cursor"
            t-if="state.pickedComponent != null" 
            t-attf-style="left:#{mouse.x}px; top:#{mouse.y}px"
        >
            <div class="component-icon" style="--item-index:8;"/>
            <!-- <t t-out="window.JSON.stringify(env.designer.pickedComponent)" /> -->
        </div>
    `
    setup() {
        this.env = useEnv()
        this.state = useState(this.env.designer);

        useEffect(
            (active)=>{
                document.body.style.cursor = active? 'none': 'default';
            },
            () => [this.state.pickedComponent != null]
        )

        // this hooks is bound to the 'mouse' property.
        this.mouse = useMouse();
    }

}


// We define here a custom behaviour: this hook tracks the state of the mouse
// position
function useMouse() {
    const position = useState({x:0, y: 0});

    function update(e) {
      position.x = e.clientX;
      position.y = e.clientY;
    }
    const debounceMouseMove = debounce(update, 0, {leading:true, trailing:true, maxWait: 10})
    window.addEventListener('mousemove', debounceMouseMove);
    onWillDestroy(() => {
        window.removeEventListener('mousemove', debounceMouseMove);
    });

    return position;
}