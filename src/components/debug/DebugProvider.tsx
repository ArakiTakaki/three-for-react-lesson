import { createContext, FC } from "react";

export interface Hoge {
}

export interface ProviderContext {
    value: Hoge[];
}

const DebugContext = createContext<ProviderContext>({ value: [] });

export const DebugProvider: FC = ({ children }) => {
    return (
        <DebugContext.Provider
            value={{ value: [] }}
        >
            {children}
        </DebugContext.Provider>
    );
};
