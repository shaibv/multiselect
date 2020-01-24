import { PropRef } from "preact/hooks/src";

interface CustomEvent {
    ref: PropRef<any>,
    eventName: string,
}

const useCustomEvent = ({ ref, eventName }: CustomEvent) => {
    const customEvent = (detail) => new CustomEvent(eventName, {
        detail,
        bubbles: true,
    });

    const dispatchEvent = (evData) => {
        if (ref.current) ref.current.dispatchEvent(customEvent(evData));
    }
    return dispatchEvent
}

export default useCustomEvent;
