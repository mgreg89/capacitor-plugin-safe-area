var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
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
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const dummy = {
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
            };
            this.notifyListeners(SafeAreaInsetsChangeEventName, {
                insets: dummy
            });
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
const SafeAreaPlugin = new SafeAreaPluginWeb();
export { SafeAreaPlugin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(SafeAreaPlugin);
//# sourceMappingURL=web.js.map