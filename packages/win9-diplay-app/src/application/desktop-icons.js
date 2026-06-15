import { Component, xml } from "@odoo/owl";
import './desktop-icons.scss'

// css and html is borrowed from webamp : https://webamp.org/

export class DesktopIcons extends Component {
    // static template = 'FormDesigner'
    static template = xml`


    <div class="loaded-icon" style="right: 5px; top: 15px; width: 85px; position: absolute;"><div class="desktop-icon" tabindex="0">
        <img src="images/icon/my-computer-32x32.png" style="width: 32px; height: 32px;"/>
    <div class="desktop-icon-title">My Computer</div></div></div>

    <div class="loaded-icon" style="right: 5px; top: 100px; width: 85px; position: absolute;"><div class="desktop-icon" tabindex="0">
        <img src="images/icon/themes-32x32.png"/>
    <div class="desktop-icon-title">Change Theme</div></div></div>
  
    <div class="loaded-icon" style="right: 5px; bottom: 5px; width: 85px; position: absolute;"><div class="desktop-icon" tabindex="0">
        <img src="images/icon/recycle-bin-full-32x32.png"/>
    <div class="desktop-icon-title">Recycle Bin</div></div></div>
  
`;

}