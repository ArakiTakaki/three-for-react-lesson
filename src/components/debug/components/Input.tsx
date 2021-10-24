import React, { FunctionComponent, useEffect, useRef, useState }  from 'react';

interface InputProps {
    text?: string;
    onChange?: (text: string) => void;
}

export const Input: FunctionComponent<InputProps> = () => {
    const [text, setText] = useState('');
    const [validate, setValidate] = useState('');
    const elInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const validationList: string[] = [];
        if (text.length >= 5) validationList.push('error 2');
        if (text.length <= 1) validationList.push('error 1');
        setValidate(validationList.join(' '));
        if (elInput.current == null) return;
        console.log(elInput.current.value);
    }, [text]);

    return (
        <div>
            <p>{text}</p>
            <input type="text" name="" id="" ref={elInput} value={text} onChange={(e) => {
                setText(e.currentTarget.value);
            }} />
            <p>{validate}</p>
        </div>
    );
};
