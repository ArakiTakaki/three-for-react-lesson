import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from 'react';

export interface TextProps {
    id?: string;
    type?: string;
    defaultValue?: string;
    onChange?: (text: string) => void;
}

export const Text: FC<TextProps> = ({
    id,
    type,
    defaultValue = '',
    onChange,
}) => {
    const [text, setText] = useState(defaultValue);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setText(e.currentTarget.value);
    }, [setText]);

    useEffect(() => {
        onChange && onChange(text);
    }, [text, onChange]);

    return (
        <input
            id={id}
            type={type}
            onChange={handleChange}
            value={text}
        />
    );
};
