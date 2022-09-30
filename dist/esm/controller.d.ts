import { SafeAreaInsets, SafeAreaInsetsChangedCallback } from './definitions';
declare class SafeAreaController {
    private callback;
    private insets;
    private listeners;
    constructor();
    load(): void;
    addListener(listener: SafeAreaInsetsChangedCallback): void;
    removeListener(listener: SafeAreaInsetsChangedCallback): void;
    removeAllListeners(): void;
    private injectCSSVariables;
    refresh(): Promise<void>;
    getInsets(): SafeAreaInsets;
    unload(): void;
    private notifyListeners;
    private updateInsets;
}
export default SafeAreaController;
