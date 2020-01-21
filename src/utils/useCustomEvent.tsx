
const useCustomEvent = ({ ref, eventName, data }) => {
    const customEvent = new CustomEvent(eventName, {
        detail: data,
        bubbles: true,
    });

    const dispatchEvent = () => {
        if (ref.current) ref.current.dispatchEvent(customEvent);
    }
    return dispatchEvent
}

export default useCustomEvent;
