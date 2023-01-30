import { WebPlugin } from '@capacitor/core';
import { SafeArea, SafeAreaInsetsResult } from './definitions';
export declare class SafeAreaPluginWeb extends WebPlugin implements SafeArea {
    constructor();
    /**
     * Call this whenever you want the EventOnInsetsChanged to be fired manually.
     */
    refresh(): Promise<void>;
    /**
     * Gets the current SafeAreaInsets.
     */
    getSafeAreaInsets(): Promise<SafeAreaInsetsResult>;
}
declare const SafeAreaPlugin: SafeAreaPluginWeb;
export * from './definitions';
export { SafeAreaPlugin };
