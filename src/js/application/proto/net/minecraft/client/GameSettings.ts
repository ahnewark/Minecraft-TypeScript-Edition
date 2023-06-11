import Session from "../util/Session";

export default class GameSettings {

    private keyCrouching: string;
    private keySprinting: string;
    private keyTogglePerspective: string;
    private keyOpenChat: string;
    private keyOpenInventory: string;
    private keyPlayerList: string;
    
    public session: Session;
    private thirdPersonView: number;
    private fov: number;
    private viewBobbing: boolean;
    private ambientOcclusion: boolean;
    private sensitivity: number;
    private viewDistance: number;
    private debugOverlay: boolean;
    private serverAddress: string;

    constructor() {
        this.keyCrouching = 'ShiftLeft';
        this.keySprinting = 'ControlLeft';
        this.keyTogglePerspective = 'F5';
        this.keyOpenChat = 'KeyT';
        this.keyOpenInventory = 'KeyE';
        this.keyPlayerList = 'Tab';

        this.session = null;

        this.thirdPersonView = 0;
        this.fov = 70;
        this.viewBobbing = true;
        this.ambientOcclusion = true;
        this.sensitivity = 100;
        this.viewDistance = 4;
        this.debugOverlay = false;
        this.serverAddress = 'server.labystudio.de';
    }

    [prop: string | number]: any

    load(): void {
        for (let prop in this) {
            let nameEQ = prop + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                    let value: string | number | boolean = c.substring(nameEQ.length, c.length);
                    if (value.match(/^[0-9]+$/)) {
                        value = parseInt(value);
                    }
                    if (value === 'true') {
                        value = true;
                    }
                    if (value === 'false') {
                        value = false;
                    }
                    if (value === 'null') {
                        value = null;
                    }
                    this[prop as string] = value;
                }
            }
        }
    }

    save(): void {
        for (let prop in this) {
            document.cookie = prop + "=" + this[prop] + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
    }



}