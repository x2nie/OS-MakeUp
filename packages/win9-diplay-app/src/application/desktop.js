import { Component, xml } from "@odoo/owl";
import { DesktopTheme } from "../components/DesktopTheme"; 
import { DesktopIcons } from "./desktop-icons";
import DesktopCursor from "./desktop-cursor";

export class Desktop extends Component {
    static components = {DesktopTheme, DesktopIcons, DesktopCursor}
    static template = xml`
        <div class="desktop xp0 win70 win980 bluecurve" style="">

            <DesktopIcons />
            <DesktopTheme />
            
            <DesktopCursor />
        </div>
    `;

}