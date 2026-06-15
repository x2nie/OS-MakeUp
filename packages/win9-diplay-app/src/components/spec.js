// doc: https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-nonclientmetricsa

export const spec = {

    ActiveTitle: {
        label: 'Active Title Bar',
        size: 'iCaptionWidth', //? The width of caption buttons, in pixels.
        siz2: 'iCaptionHeight', //? The height of caption buttons, in pixels. LETS MAKE IT SAME
        color: 'ActiveTitle',
        color2: 'GradientActiveTitle',
        text: 'TitleText', //font
        font: 'CaptionFont',
    },

    InactiveTitle: {
        label: 'Inactive Title Bar',
        size: 'iCaptionWidth', //? The width of caption buttons, in pixels.
        siz2: 'iCaptionHeight', //? The height of caption buttons, in pixels. LETS MAKE IT SAME
        color: 'InactiveTitle',
        color2: 'GradientInactiveTitle',
        text: 'InactiveTitleText', //font
        font: 'CaptionFont',
    },
    
    CaptionButton: {
        label: 'Caption Buttons',
        size: 'iCaptionWidth', //? The width of caption buttons, in pixels.
        siz2: 'iCaptionHeight', //? The height of caption buttons, in pixels. LETS MAKE IT SAME
    },

    Desktop: {
        label: 'Desktop',
        color: 'Background'
    },


    Input: {
        label: 'Window',
        color: 'Window',
        text: 'WindowText', 
    },

    Form: {
        label: 'Message Box',
        // text: 'WindowText', 
        font: 'MessageFont'
    },

    Surface: {
        label: '3D Object',
        color: 'ButtonFace',
        text: 'ButtonText', 
        size: 'iFooBar',
    },

    MDI: {
        label: 'Application Background',
        color: 'AppWorkspace',
    },

    BorderActive: {
        label: 'Active Border',
        color: 'ActiveBorder',
    },

    BorderInactive: {
        label: 'Inactive Border',
        color: 'InactiveBorder',
    },

    Scrollbar: {
        label: 'Scroll Bar'
    },

    // MENUS:------------- \

    Selection: {
        label: 'Selected Items',
        color: 'Hilight', 
        text: 'HilightText', 
        font: 'MenuFont',
    },

    Menu: {
        label: 'Menu',
        color: 'MenuBar', 
        text: 'MenuText', 
        font: 'MenuFont',
    },

    // ActiveBorder: {label: active_border},
    // AppWorkspace: {label: app_workspace},
    // Background: {label: background},
    // ButtonAlternateFace: {label: button_alternate_face},
    // ButtonDkShadow: {label: button_dk_shadow},
    // ButtonFace: {label: button_face},
    // ButtonHilight: {label: button_hilight},
    // ButtonLight: {label: button_light},
    // ButtonShadow: {label: button_shadow},
    // ButtonText: {label: button_text},
    // GradientActiveTitle: {label: gradient_active_title},
    // GradientInactiveTitle: {label: gradient_inactive_title},
    // GrayText: {label: gray_text},
    // Hilight: {label: hilight},
    // HilightText: {label: hilight_text},
    // HotTrackingColor: {label: hot_tracking_color},
    // InactiveBorder: {label: inactive_border},
    // InactiveTitleText: {label: inactive_title_text},
    // InfoText: {label: info_text},
    // InfoWindow: {label: info_window},
    // Menu: {label: menu},
    // MenuHilight: {label: menu_hilight},
    // MenuText: {label: menu_text},
    // Scrollbar: {label: scrollbar},
    // TitleText: {label: title_text},
    // Window: {label: window},
    // WindowFrame: {label: window_frame},
    // WindowText: {label: window_text},

}

export const win95_colors = {
    // iFooBar: 8, //dummy for dev mode only
    BorderWidth: 1,
    ScrollHeight: 13,
    ScrollWidth: 13,
    CaptionWidth: 18,
    CaptionHeight: 18,
    SmCaptionWidth: 15,
    SmCaptionHeight: 15,
    MenuHeight: 18, //menubar.height
    MenuWidth: 18,  //popup.min-width?

    CaptionFont: {name: 'sans-serif', Weight:700, Italic:true},
    SmCaptionFont: {name: 'sans-serif', Weight:700, Italic:true},
    MessageFont: {name: 'monospace', Italic:true},
    MenuFont: {name: 'monospace'},
    StatusFont: {name: 'monospace'},


    HorzSpacing: 43,
    VertSpacing: 75,
    TitleWrap: 1,
    'IconFont-Height': 8,
    'IconFont-Weight': 400,
    // 'IconFont-Italic': normal,
    'IconFont-Name': 'Tahoma',

    ActiveBorder: 'rgb(192 192 192)',
    ActiveTitle: 'rgb(0 0 128)',
    AppWorkspace: 'rgb(128 128 128)',
    Background: 'rgb(0 128 128)',
    ButtonAlternateFace: 'rgb(181 181 181)',
    ButtonDkShadow: 'rgb(0 0 0)',
    ButtonFace: 'rgb(192 192 192)',
    ButtonHilight: 'rgb(255 255 255)',
    ButtonLight: 'rgb(192 192 192)',
    ButtonShadow: 'rgb(128 128 128)',
    ButtonText: 'rgb(0 0 0)',
    GradientActiveTitle: 'skyblue',
    GradientInactiveTitle: 'rgb(128 128 120)',
    GrayText: 'rgb(128 128 128)',
    Hilight: 'rgb(0 0 128)',
    HilightText: 'rgb(255 255 255)',
    HotTrackingColor: 'rgb(0 0 128)',
    InactiveBorder: 'rgb(192 192 192)',
    InactiveTitle: 'rgb(128 128 120)',
    InactiveTitleText: 'rgb(192 192 192)',
    InfoText: 'rgb(0 0 0)',
    InfoWindow: 'rgb(255 255 225)',
    Menu: 'rgb(192 192 192)',
    MenuBar: 'rgb(212 208 200)',
    MenuHilight: 'rgb(0 0 0)',
    MenuText: 'rgb(0 0 0)',
    Scrollbar: 'rgb(192 192 192)',
    TitleText: 'rgb(255 255 255)',
    Window: 'rgb(255 255 255)',
    WindowFrame: 'rgb(0 0 0)',
    WindowText: 'rgb(0 0 0)',
}