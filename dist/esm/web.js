import { WebPlugin, registerPlugin } from '@capacitor/core';
import { SafeAreaInsetsChangeEventName } from './definitions';
export class SafeAreaPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'SafeAreaPlugin',
            platforms: ['web'],
        });
    }
    /**
     * Call this whenever you want the EventOnInsetsChanged to be fired manually.
     */
    async refresh() {
        const dummy = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        };
        this.notifyListeners(SafeAreaInsetsChangeEventName, {
            insets: dummy
        });
    }
    /**
     * Gets the current SafeAreaInsets.
     */
    getSafeAreaInsets() {
        const dummy = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        };
        return new Promise((resolve) => {
            resolve({ insets: dummy });
        });
    }
}
const SafeAreaPlugin = registerPlugin('SafeAreaPlugin', {
    web: () => import('./web').then(m => new m.SafeAreaPluginWeb()),
});
export * from './definitions';
export { SafeAreaPlugin };
//# sourceMappingURL=web.js.map