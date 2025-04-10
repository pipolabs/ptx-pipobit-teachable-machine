//% color="#008080" icon="\uf06d" weight=100
//% block="Teachable Machine"
namespace pipobitTeachableMachine {

    let classHandler: { [key: string]: () => void } = {};
    let serialData: string = "";
    let isInitialized: boolean = false;


    //% block="Initialize AI connection"
    //% block.loc.es-ES="Iniciar conexión con IA"
    //% weight=20
    export function initAiConnexion(): void {
        serial.redirectToUSB();
        isInitialized = true;
    }

    //% block="On receiving class $className"
    //% block.loc.es-ES="Al recibir clase $className"
    //% className.defl="Class 1" 
    //% draggableParameters
    //% weight=10
    export function registerClassListener(className: string, callback: () => void) {
        classHandler[className.toLowerCase()] = callback;
    }

    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
        if (!isInitialized) {
            return;
        }
        serialData = serial.readUntil(serial.delimiters(Delimiters.NewLine));
        if (classHandler[serialData.toLowerCase()]) {
            classHandler[serialData.toLowerCase()]();
        }
    })
}