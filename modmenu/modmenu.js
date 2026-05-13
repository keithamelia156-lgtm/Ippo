// ModMenu UI JavaScript Implementation

class ModMenuUI {
    constructor(config = {}) {
        this.config = config;
        this.isOpen = false;
        this.elements = {};
        this.pages = {};
        this.currentPage = config.defaultPage || 'main';
        this.init();
    }

    init() {
        this.createHTML();
        this.attachEventListeners();
        console.log('[ModMenuUI] Initialized');
    }

    createHTML() {
        const container = document.createElement('div');
        container.className = 'modmenu-container';
        container.id = 'modmenu';
        container.innerHTML = `
            <div class="modmenu-header">
                <h1>${this.config.title || 'MOD MENU'}</h1>
                <button class="modmenu-close-btn" id="modmenuClose">✕</button>
            </div>
            <div class="modmenu-pages" id="modmenuPages"></div>
            <div class="modmenu-content" id="modmenuContent"></div>
            <div class="modmenu-footer">
                ${this.config.title || 'MOD MENU'} v1.0.0
            </div>
        `;
        document.body.appendChild(container);
    }

    attachEventListeners() {
        document.getElementById('modmenuClose').addEventListener('click', () => this.toggle());
        
        // Hotkey: M to toggle menu
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'm' && e.altKey) {
                this.toggle();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('modmenu');
        container.classList.toggle('open', this.isOpen);
        console.log('[ModMenuUI] Menu is now ' + (this.isOpen ? 'OPEN' : 'CLOSED'));
    }

    addPage(pageId, pageTitle) {
        this.pages[pageId] = { id: pageId, title: pageTitle, elements: [] };
        this.renderPageTabs();
    }

    renderPageTabs() {
        const pagesContainer = document.getElementById('modmenuPages');
        pagesContainer.innerHTML = '';
        
        for (const [pageId, page] of Object.entries(this.pages)) {
            const btn = document.createElement('button');
            btn.className = `modmenu-page-btn ${pageId === this.currentPage ? 'active' : ''}`;
            btn.textContent = page.title;
            btn.addEventListener('click', () => this.switchPage(pageId));
            pagesContainer.appendChild(btn);
        }
    }

    switchPage(pageId) {
        if (this.pages[pageId]) {
            this.currentPage = pageId;
            this.renderPageTabs();
            this.renderPageContent();
        }
    }

    addButton(elementId, label, callback, config = {}) {
        this.addElement(elementId, {
            type: 'button',
            label: label,
            callback: callback,
            color: config.color || '#4CAF50',
            page: config.page || this.currentPage
        });
    }

    addToggle(elementId, label, defaultState, callback, config = {}) {
        this.addElement(elementId, {
            type: 'toggle',
            label: label,
            state: defaultState,
            callback: callback,
            page: config.page || this.currentPage
        });
    }

    addSlider(elementId, label, min, max, defaultValue, callback, config = {}) {
        this.addElement(elementId, {
            type: 'slider',
            label: label,
            min: min,
            max: max,
            value: defaultValue,
            callback: callback,
            page: config.page || this.currentPage
        });
    }

    addDropdown(elementId, label, options, defaultValue, callback, config = {}) {
        this.addElement(elementId, {
            type: 'dropdown',
            label: label,
            options: options,
            selected: defaultValue,
            callback: callback,
            page: config.page || this.currentPage
        });
    }

    addTextInput(elementId, label, placeholder, callback, config = {}) {
        this.addElement(elementId, {
            type: 'input',
            label: label,
            placeholder: placeholder,
            callback: callback,
            page: config.page || this.currentPage
        });
    }

    addElement(elementId, config) {
        this.elements[elementId] = config;
        const pageId = config.page || this.currentPage;
        if (this.pages[pageId] && !this.pages[pageId].elements.includes(elementId)) {
            this.pages[pageId].elements.push(elementId);
        }
        if (pageId === this.currentPage) {
            this.renderPageContent();
        }
    }

    renderPageContent() {
        const contentDiv = document.getElementById('modmenuContent');
        contentDiv.innerHTML = '';
        
        const page = this.pages[this.currentPage];
        if (!page) return;

        page.elements.forEach(elementId => {
            const element = this.elements[elementId];
            if (!element) return;

            const elementDiv = document.createElement('div');
            elementDiv.className = 'modmenu-element';
            elementDiv.id = `elem-${elementId}`;

            switch (element.type) {
                case 'button':
                    elementDiv.innerHTML = `
                        <button class="modmenu-btn modmenu-btn-primary" id="btn-${elementId}">
                            ${element.label}
                        </button>
                    `;
                    document.getElementById(`btn-${elementId}`).addEventListener('click', element.callback);
                    break;

                case 'toggle':
                    elementDiv.innerHTML = `
                        <div class="modmenu-toggle">
                            <label class="modmenu-label">${element.label}</label>
                            <div class="modmenu-switch ${element.state ? 'on' : ''}" id="tog-${elementId}"></div>
                        </div>
                    `;
                    document.getElementById(`tog-${elementId}`).addEventListener('click', () => {
                        element.state = !element.state;
                        document.getElementById(`tog-${elementId}`).classList.toggle('on');
                        if (element.callback) element.callback(element.state);
                    });
                    break;

                case 'slider':
                    elementDiv.innerHTML = `
                        <label class="modmenu-label">${element.label}</label>
                        <div style="display: flex; align-items: center;">
                            <input type="range" class="modmenu-slider" id="sld-${elementId}" 
                                   min="${element.min}" max="${element.max}" value="${element.value}" />
                            <span class="modmenu-slider-value" id="sldval-${elementId}">${element.value}</span>
                        </div>
                    `;
                    const slider = document.getElementById(`sld-${elementId}`);
                    slider.addEventListener('input', (e) => {
                        element.value = e.target.value;
                        document.getElementById(`sldval-${elementId}`).textContent = e.target.value;
                        if (element.callback) element.callback(e.target.value);
                    });
                    break;

                case 'dropdown':
                    elementDiv.innerHTML = `
                        <label class="modmenu-label">${element.label}</label>
                        <div class="modmenu-dropdown" id="dd-${elementId}">
                            <button class="modmenu-dropdown-button" id="ddbtn-${elementId}">
                                <span>${element.selected}</span>
                                <span>▼</span>
                            </button>
                            <ul class="modmenu-dropdown-list" id="ddlist-${elementId}">
                                ${element.options.map(opt => `<li class="modmenu-dropdown-option ${opt === element.selected ? 'selected' : ''}" data-value="${opt}">${opt}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    const ddBtn = document.getElementById(`ddBtn-${elementId}`);
                    const ddList = document.getElementById(`ddlist-${elementId}`);
                    ddBtn.addEventListener('click', () => {
                        ddList.classList.toggle('open');
                        ddBtn.classList.toggle('open');
                    });
                    document.querySelectorAll(`#ddlist-${elementId} .modmenu-dropdown-option`).forEach(opt => {
                        opt.addEventListener('click', () => {
                            element.selected = opt.dataset.value;
                            document.getElementById(`ddBtn-${elementId}`).querySelector('span').textContent = opt.dataset.value;
                            ddList.querySelectorAll('.selected').forEach(s => s.classList.remove('selected'));
                            opt.classList.add('selected');
                            ddList.classList.remove('open');
                            ddBtn.classList.remove('open');
                            if (element.callback) element.callback(element.selected);
                        });
                    });
                    break;

                case 'input':
                    elementDiv.innerHTML = `
                        <label class="modmenu-label">${element.label}</label>
                        <input type="text" class="modmenu-input" id="inp-${elementId}" 
                               placeholder="${element.placeholder}" />
                    `;
                    document.getElementById(`inp-${elementId}`).addEventListener('input', (e) => {
                        element.value = e.target.value;
                        if (element.callback) element.callback(e.target.value);
                    });
                    break;
            }
            contentDiv.appendChild(elementDiv);
        });
    }

    showNotification(title, message, duration = 3, type = 'success') {
        const notif = document.createElement('div');
        notif.className = `modmenu-notification ${type}`;
        notif.innerHTML = `<strong>${title}</strong><br>${message}`;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.remove();
        }, duration * 1000);
    }

    getElementValue(elementId) {
        const element = this.elements[elementId];
        if (!element) return null;
        return element.value || element.state || element.selected || null;
    }

    setElementValue(elementId, value) {
        const element = this.elements[elementId];
        if (!element) return;
        
        if (element.type === 'toggle') {
            element.state = value;
        } else if (element.type === 'slider') {
            element.value = value;
        } else if (element.type === 'dropdown') {
            element.selected = value;
        } else if (element.type === 'input') {
            element.value = value;
        }
        this.renderPageContent();
    }
}

// Export for use
window.ModMenuUI = ModMenuUI;