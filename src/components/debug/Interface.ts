import { FC } from "react";

export interface DebugComponent<T extends string, Props> {
    type: T;
    component: FC;
    props: Props;
}
