var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Capacitor, Plugins } from '@capacitor/core';
class SafeAreaController {
    constructor() {
        this.insets = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        };
        this.callback = undefined;
        this.listeners = [];
    }
    load() {
        var _a;
        (_a = this.callback) === null || _a === void 0 ? void 0 : _a.remove();
        this.callback = Plugins.SafeAreaPlugin.addListener("safeAreaPluginsInsetChange", (insets) => {
            this.updateInsets(insets);
            this.injectCSSVariables();
            this.notifyListeners();
        });
        this.refresh();
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    removeListener(listener) {
        const index = this.listeners.indexOf(listener);
        if (index >= 0)
            delete this.listeners[index];
    }
    removeAllListeners() {
        this.listeners.length = 0;
    }
    injectCSSVariables() {
        for (const inset in this.insets) {
            switch (Capacitor.getPlatform()) {
                case "android":
                case "ios":
                    {
                        document.documentElement.style.setProperty(`--${Capacitor.getPlatform()}-safe-area-inset-${inset}`, `${this.insets[inset]}px`);
                        document.documentElement.style.setProperty(`--safe-area-inset-${inset}`, `var(--${Capacitor.getPlatform()}-safe-area-inset-${inset}, env(safe-area-inset-${inset}))`);
                    }
                    break;
                default:
                    {
                        document.documentElement.style.setProperty(`--safe-area-inset-${inset}`, "0px");
                    }
                    break;
            }
        }
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const { insets } = yield Plugins.SafeAreaPlugin.getSafeAreaInsets();
            this.updateInsets(insets);
            this.injectCSSVariables();
            this.notifyListeners();
        });
    }
    getInsets() {
        return this.insets;
    }
    unload() {
        var _a;
        (_a = this.callback) === null || _a === void 0 ? void 0 : _a.remove();
    }
    notifyListeners() {
        this.listeners.forEach((listener) => listener(this.insets));
    }
    updateInsets(insets) {
        this.insets = insets;
    }
}
;
export default SafeAreaController;
//# sourceMappingURL=controller.js.map