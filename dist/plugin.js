var capacitorPlugin = (function (exports, core) {
    'use strict';

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
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
            this.callback = core.Plugins.SafeAreaPlugin.addListener("safeAreaPluginsInsetChange", (insets) => {
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
                switch (core.Capacitor.getPlatform()) {
                    case "android":
                    case "ios":
                        {
                            document.documentElement.style.setProperty(`--${core.Capacitor.getPlatform()}-safe-area-inset-${inset}`, `${this.insets[inset]}px`);
                            document.documentElement.style.setProperty(`--safe-area-inset-${inset}`, `var(--${core.Capacitor.getPlatform()}-safe-area-inset-${inset}, env(safe-area-inset-${inset}))`);
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
                const { insets } = yield core.Plugins.SafeAreaPlugin.getSafeAreaInsets();
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

    const SafeAreaInsetsChangeEventName = "safeAreaPluginsInsetChange";

    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    class SafeAreaPluginWeb extends core.WebPlugin {
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
            return __awaiter$1(this, void 0, void 0, function* () {
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
    core.registerWebPlugin(SafeAreaPlugin);

    const controller = new SafeAreaController();

    exports.SafeAreaController = controller;
    exports.SafeAreaInsetsChangeEventName = SafeAreaInsetsChangeEventName;
    exports.SafeAreaPlugin = SafeAreaPlugin;
    exports.SafeAreaPluginWeb = SafeAreaPluginWeb;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports));
//# sourceMappingURL=plugin.js.map
