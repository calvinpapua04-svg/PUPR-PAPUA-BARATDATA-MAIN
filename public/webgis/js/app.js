/**
 * WEBGIS APPLICATION - INTERACTIVE CONTROLS
 * Modern JavaScript for UI interactions and functionality
 * Fixed version - waits for map to be ready
 */

(function () {
    'use strict';

    // ============================================
    // WAIT FOR MAP TO BE READY
    // ============================================
    function initializeApp() {
        // Check if map exists
        if (typeof map === 'undefined') {
            console.log('Map not ready yet, waiting...');
            setTimeout(initializeApp, 100);
            return;
        }

        console.log('Map is ready, initializing app...');

        initializeSidebar();
        initializeLayerControls();
        initializeBasemapSwitcher();
        initializeSearch();
        initializeInfoBar();
        initializeFloatingControls();
        updateStatistics();
    }

    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

    // ============================================
    // SIDEBAR CONTROLS
    // ============================================
    function initializeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.querySelector('.sidebar-toggle');

        if (toggle && sidebar) {
            toggle.addEventListener('click', function () {
                sidebar.classList.toggle('collapsed');

                // Update toggle icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (sidebar.classList.contains('collapsed')) {
                        icon.className = 'fas fa-chevron-right';
                    } else {
                        icon.className = 'fas fa-chevron-left';
                    }
                }
            });
        }
    }

    // ============================================
    // LAYER CONTROLS
    // ============================================
    // Store opacity values for each layer
    const layerOpacity = {};

    function initializeLayerControls() {
        // Get all layer checkboxes
        const layerCheckboxes = document.querySelectorAll('.layer-checkbox');

        layerCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const layerName = this.dataset.layer;
                const layer = window[layerName];

                console.log('Layer control change:', layerName);
                console.log('Layer object:', layer);
                console.log('Map object:', map);

                if (layer && map) {
                    if (this.checked) {
                        if (!map.hasLayer(layer)) {
                            map.addLayer(layer);
                            console.log('Added layer:', layerName);
                        }
                    } else {
                        if (map.hasLayer(layer)) {
                            map.removeLayer(layer);
                            console.log('Removed layer:', layerName);
                        } else {
                            console.log('Map does not have layer:', layerName);
                        }
                    }
                    updateStatistics();
                } else {
                    console.error('Layer or map not found');
                }
            });
        });

        // Initialize opacity storage with default values
        layerCheckboxes.forEach(checkbox => {
            const layerName = checkbox.dataset.layer;
            layerOpacity[layerName] = 1.0; // Default 100%
        });

        // Opacity sliders
        const opacitySliders = document.querySelectorAll('.opacity-slider');

        opacitySliders.forEach(slider => {
            slider.addEventListener('input', function () {
                const layerName = this.dataset.layer;
                const layer = window[layerName];
                const opacity = this.value / 100;

                // Store the opacity value
                layerOpacity[layerName] = opacity;

                console.log('Opacity change for', layerName, ':', opacity);

                if (layer) {
                    // For tile layers (basemaps)
                    if (layer.setOpacity) {
                        layer.setOpacity(opacity);
                    }
                    // For GeoJSON layers
                    else if (layer.setStyle) {
                        // Apply opacity to all features in the layer
                        layer.setStyle(function (feature) {
                            // Get the current style
                            const currentStyle = layer.options.style ? layer.options.style(feature) : {};
                            // Update with new opacity
                            return {
                                ...currentStyle,
                                opacity: opacity,
                                fillOpacity: opacity
                            };
                        });
                    }
                    // For layer groups
                    else if (layer.eachLayer) {
                        layer.eachLayer(function (subLayer) {
                            if (subLayer.setStyle) {
                                subLayer.setStyle({
                                    opacity: opacity,
                                    fillOpacity: opacity
                                });
                            }
                        });
                    }
                }

                // Update label
                const label = this.parentElement.querySelector('.opacity-value');
                if (label) {
                    label.textContent = this.value + '%';
                }
            });
        });
    }

    // Helper function to get stored opacity for a layer
    window.getLayerOpacity = function (layerName) {
        return layerOpacity[layerName] || 1.0;
    };

    // ============================================
    // BASEMAP SWITCHER
    // ============================================
    function initializeBasemapSwitcher() {
        const basemapOptions = document.querySelectorAll('.basemap-option');

        basemapOptions.forEach(option => {
            option.addEventListener('click', function () {
                // Remove active class from all options
                basemapOptions.forEach(opt => opt.classList.remove('active'));

                // Add active class to clicked option
                this.classList.add('active');

                // Switch basemap
                const basemapType = this.dataset.basemap;
                switchBasemap(basemapType);
            });
        });
    }

    function switchBasemap(type) {
        if (!map) return;

        // Remove current basemap
        if (window.currentBasemap) {
            map.removeLayer(window.currentBasemap);
        }

        // Remove OSM Standard if it exists
        if (window.layer_OSMStandard_0 && map.hasLayer(window.layer_OSMStandard_0)) {
            map.removeLayer(window.layer_OSMStandard_0);
        }

        // If type is 'none', just return after removing layers
        if (type === 'none') {
            return;
        }

        // Define basemap tiles
        const basemaps = {
            osm: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            terrain: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
            dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            google_satellite: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            mapbox_satellite: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=YOUR_ACCESS_TOKEN', // Placeholder
            satellite_streets: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
        };

        const attributions = {
            osm: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            satellite: '© <a href="https://www.esri.com/">Esri</a>',
            terrain: '© <a href="http://stamen.com">Stamen Design</a>',
            dark: '© <a href="https://carto.com/">CartoDB</a>',
            google_satellite: '© Google',
            mapbox_satellite: '© Mapbox',
            satellite_streets: '© Google'
        };

        const tileUrl = basemaps[type] || basemaps.osm;
        const attribution = attributions[type] || attributions.osm;

        window.currentBasemap = L.tileLayer(tileUrl, {
            attribution: attribution,
            maxZoom: 19,
            subdomains: 'abcd'
        });

        map.addLayer(window.currentBasemap);
        window.currentBasemap.bringToBack();
    }

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    function initializeSearch() {
        const searchInput = document.getElementById('search-input');

        if (searchInput) {
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const query = this.value.trim();
                    if (query) {
                        performSearch(query);
                    }
                }
            });
        }
    }

    function performSearch(query) {
        if (!map) return;

        // Use Photon geocoding API
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const feature = data.features[0];
                    const coords = feature.geometry.coordinates;

                    // Fly to location
                    map.flyTo([coords[1], coords[0]], 13, {
                        duration: 1.5
                    });

                    // Add temporary marker
                    const marker = L.marker([coords[1], coords[0]]).addTo(map);
                    const name = feature.properties.name || 'Location';
                    const city = feature.properties.city || feature.properties.state || '';
                    marker.bindPopup(`<b>${name}</b><br>${city}`).openPopup();

                    // Remove marker after 5 seconds
                    setTimeout(() => {
                        map.removeLayer(marker);
                    }, 5000);
                } else {
                    showNotification('Lokasi tidak ditemukan', 'warning');
                }
            })
            .catch(error => {
                console.error('Search error:', error);
                showNotification('Pencarian gagal', 'error');
            });
    }

    // ============================================
    // INFO BAR UPDATES
    // ============================================
    function initializeInfoBar() {
        if (!map) return;

        // Update coordinates on mouse move
        map.on('mousemove', function (e) {
            const coordElement = document.getElementById('coordinates');
            if (coordElement) {
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                coordElement.textContent = `${lat}, ${lng}`;
            }
        });

        // Update zoom level
        map.on('zoomend', function () {
            const zoomElement = document.getElementById('zoom-level');
            if (zoomElement) {
                zoomElement.textContent = `Zoom: ${map.getZoom()}`;
            }
        });

        // Initial update
        const zoomElement = document.getElementById('zoom-level');
        if (zoomElement) {
            zoomElement.textContent = `Zoom: ${map.getZoom()}`;
        }

        // Update scale
        updateScale();
        map.on('zoomend', updateScale);
        map.on('moveend', updateScale);
    }

    function updateScale() {
        if (!map) return;

        const scaleElement = document.getElementById('scale');
        if (scaleElement) {
            const bounds = map.getBounds();
            const distance = bounds.getNorthEast().distanceTo(bounds.getSouthWest());
            const scale = formatDistance(distance);
            scaleElement.textContent = `Scale: ~${scale}`;
        }
    }

    function formatDistance(meters) {
        if (meters < 1000) {
            return Math.round(meters) + ' m';
        } else {
            return (meters / 1000).toFixed(1) + ' km';
        }
    }

    // ============================================
    // FLOATING CONTROLS
    // ============================================
    function initializeFloatingControls() {
        // Fullscreen control
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', toggleFullscreen);
        }

        // Geolocation control
        const locationBtn = document.getElementById('location-btn');
        if (locationBtn) {
            locationBtn.addEventListener('click', getUserLocation);
        }

        // Home/reset view
        const homeBtn = document.getElementById('home-btn');
        if (homeBtn) {
            homeBtn.addEventListener('click', function () {
                if (map) {
                    map.fitBounds([[-3.4029371742925996, 129.31165626177687], [1.324502463835572, 135.1510592025225]]);
                }
            });
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Fullscreen error:', err);
                showNotification('Fullscreen tidak didukung', 'error');
            });
        } else {
            document.exitFullscreen();
        }
    }

    function getUserLocation() {
        if (!map) return;

        if (navigator.geolocation) {
            showNotification('Mencari lokasi Anda...', 'info');
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    map.flyTo([lat, lng], 15);

                    const marker = L.marker([lat, lng]).addTo(map);
                    marker.bindPopup('<b>Lokasi Anda</b>').openPopup();

                    setTimeout(() => {
                        map.removeLayer(marker);
                    }, 10000);
                },
                error => {
                    console.error('Geolocation error:', error);
                    showNotification('Tidak dapat menemukan lokasi Anda', 'error');
                }
            );
        } else {
            showNotification('Geolocation tidak didukung browser Anda', 'error');
        }
    }

    // ============================================
    // STATISTICS
    // ============================================
    function updateStatistics() {
        if (!map) return;

        // Count visible layers by checking which layers are actually on the map
        let visibleLayers = 0;
        const layerCheckboxes = document.querySelectorAll('.layer-checkbox');

        layerCheckboxes.forEach(checkbox => {
            const layerName = checkbox.dataset.layer;
            const layer = window[layerName];

            if (layer && map.hasLayer(layer)) {
                visibleLayers++;
            }
        });

        // Update visible layers count
        const layerCountElement = document.getElementById('visible-layers');
        if (layerCountElement) {
            layerCountElement.textContent = visibleLayers;
        }

        // Update total layers count
        const totalLayersElement = document.getElementById('total-layers');
        if (totalLayersElement) {
            totalLayersElement.textContent = layerCheckboxes.length;
        }

        console.log('Statistics updated - Visible:', visibleLayers, 'Total:', layerCheckboxes.length);
    }

    // ============================================
    // NOTIFICATIONS
    // ============================================
    function showNotification(message, type = 'info') {
        // Remove any existing notifications first
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const colors = {
            info: 'rgba(59, 130, 246, 0.9)',
            success: 'rgba(16, 185, 129, 0.9)',
            warning: 'rgba(245, 158, 11, 0.9)',
            error: 'rgba(239, 68, 68, 0.9)'
        };

        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 12px 20px;
            background: ${colors[type] || colors.info};
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
            font-family: Inter, sans-serif;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    // Make functions globally available if needed
    window.WebGISApp = {
        showNotification,
        updateStatistics,
        switchBasemap
    };

})();

// Add animation keyframes
if (!document.getElementById('app-animations')) {
    const style = document.createElement('style');
    style.id = 'app-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
