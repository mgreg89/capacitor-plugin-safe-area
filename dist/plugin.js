var capacitorPlugin = (function (exports, core) {
    'use strict';

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
            this.callback?.remove();
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
        async refresh() {
            const { insets } = await core.Plugins.SafeAreaPlugin.getSafeAreaInsets();
            this.updateInsets(insets);
            this.injectCSSVariables();
            this.notifyListeners();
        }
        getInsets() {
            return this.insets;
        }
        unload() {
            this.callback?.remove();
        }
        notifyListeners() {
            this.listeners.forEach((listener) => listener(this.insets));
        }
        updateInsets(insets) {
            this.insets = insets;
        }
    }

    const SafeAreaInsetsChangeEventName = "safeAreaPluginsInsetChange";

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
    const SafeAreaPlugin = core.registerPlugin('SafeAreaPlugin', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.SafeAreaPluginWeb()),
    });

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        SafeAreaPluginWeb: SafeAreaPluginWeb,
        SafeAreaPlugin: SafeAreaPlugin,
        SafeAreaInsetsChangeEventName: SafeAreaInsetsChangeEventName
    });

    const controller = new SafeAreaController();

    exports.SafeAreaController = controller;
    exports.SafeAreaInsetsChangeEventName = SafeAreaInsetsChangeEventName;
    exports.SafeAreaPlugin = SafeAreaPlugin;
    exports.SafeAreaPluginWeb = SafeAreaPluginWeb;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports));
//# sourceMappingURL=plugin.js.map
