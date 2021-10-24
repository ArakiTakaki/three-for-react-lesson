
/**
 * @param target
 * @returns
 */
const createKeyEvent = (target: string) => {
    return (keyCode: KeyboardEvent, callback: () => void) => {
        if (keyCode.key.toLocaleLowerCase() === target) {
            callback();
        }
        return;
    }
}
/**
 * KeyboardEvent.keyの値を利用し、キーを判別する関数
 */
export const KEY_NAME = {
    SHIFT: createKeyEvent('shift'),
    ALT: createKeyEvent('alt'),
    A: createKeyEvent('a'),
    S: createKeyEvent('s'),
    D: createKeyEvent('d'),
    W: createKeyEvent('w'),
}