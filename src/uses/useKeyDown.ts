import { useEffect, useMemo } from "react"

/**
 * キーボードのイベントを登録する
 * @param keyName [a-z]
 * @param pressStartCallback 
 * @param pressEndCallback 
 * @todo //TODO: Hookが呼ばれる旅にキーイベントが登録されるため、要リファクタリング
 */
export const useKeyPress = (keyName: string, pressStartCallback: (event: KeyboardEvent) => void, pressEndCallback: (event: KeyboardEvent) => void) => {

    const _keyName = useMemo(() => keyName.toLocaleLowerCase(), [keyName]);

    useEffect(() => {
        let isKeypress = false;
        const handleKeydown = (event: KeyboardEvent) => {
            if (isKeypress) return;
            if (event.key.toLocaleLowerCase() !== _keyName) return;
            pressStartCallback(event);
            isKeypress = true;
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key.toLocaleLowerCase() !== _keyName) return;
            pressEndCallback(event);
            isKeypress = false;
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressStartCallback, pressEndCallback, _keyName]);
};
