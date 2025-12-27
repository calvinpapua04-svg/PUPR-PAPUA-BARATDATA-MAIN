/**
 * OPACITY PRESERVATION HELPER - COMPLETE LOCK MODE
 * This script completely locks opacity settings when layers are interacted with
 * Opacity will NOT change regardless of hover, click, or any other interaction
 */

// Wait for Leaflet to be loaded
(function () {
    function initOpacityLock() {
        if (typeof L === 'undefined' || !L.Path) {
            console.log('Waiting for Leaflet to load...');
            setTimeout(initOpacityLock, 100);
            return;
        }

        console.log('Initializing COMPLETE opacity lock system...');

        // Override Leaflet's setStyle to ALWAYS enforce stored opacity
        const originalSetStyle = L.Path.prototype.setStyle;

        L.Path.prototype.setStyle = function (style) {
            // Only proceed if we have a style object
            if (!style || typeof style !== 'object') {
                return originalSetStyle.call(this, style);
            }

            // Find which layer this feature belongs to
            const layerNames = [
                'layer_btspbd_1',
                'layer_DASPBD_2',
                'layer_KELERENGANPBD_3',
                'layer_topopbd_4',
                'layer_KONTURPBD_5',
                'layer_kwsnhtnpbd_6',
                'layer_jlnprovinsi_7',
                'layer_dis_banjir_1'
            ];

            for (let layerName of layerNames) {
                const layer = window[layerName];
                if (layer && layer.hasLayer && layer.hasLayer(this)) {
                    const storedOpacity = window.getLayerOpacity ? window.getLayerOpacity(layerName) : 1.0;

                    // FORCE the stored opacity - completely override any incoming opacity values
                    if (style.opacity !== undefined) {
                        style.opacity = storedOpacity;
                    }
                    if (style.fillOpacity !== undefined) {
                        style.fillOpacity = storedOpacity;
                    }

                    // Also set opacity even if not in the style object
                    if (!('opacity' in style)) {
                        style.opacity = storedOpacity;
                    }
                    if (!('fillOpacity' in style) && this.options && this.options.fill) {
                        style.fillOpacity = storedOpacity;
                    }

                    console.log('LOCKED opacity for', layerName, 'at', storedOpacity);
                    break;
                }
            }

            return originalSetStyle.call(this, style);
        };

        console.log('✅ Opacity lock system activated - opacity will NOT change on hover!');
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOpacityLock);
    } else {
        initOpacityLock();
    }
})();
