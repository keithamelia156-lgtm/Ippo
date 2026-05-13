// BAR HUB DUPLICATOR SYSTEM - JavaScript Port

class BarHubDuplicator {
    constructor() {
        this.totalDuplicates = 0;
        this.inventory = [
            {
                name: "FireSword",
                damage: 50,
                rarity: "Epic",
                stats: {
                    critChance: 25,
                    durability: 100
                }
            },
            {
                name: "IceBlade",
                damage: 35,
                rarity: "Rare",
                stats: {
                    critChance: 10,
                    durability: 80
                }
            }
        ];
        this.selectedIndex = null;
    }

    generateID() {
        this.totalDuplicates += 1;
        return "BAR_DUP_" + this.totalDuplicates;
    }

    deepCopy(original) {
        if (typeof original !== 'object' || original === null) {
            return original;
        }

        const copy = Array.isArray(original) ? [] : {};

        for (const key in original) {
            if (original.hasOwnProperty(key)) {
                if (typeof original[key] === 'object' && original[key] !== null) {
                    copy[key] = this.deepCopy(original[key]);
                } else {
                    copy[key] = original[key];
                }
            }
        }

        return copy;
    }

    duplicate(index) {
        const item = this.inventory[index];

        if (!item) {
            console.warn("[BAR HUB] Invalid item index.");
            return false;
        }

        const copy = this.deepCopy(item);
        copy.id = this.generateID();
        copy.isDuplicate = true;
        copy.name = item.name + "_Copy";

        console.log("[BAR HUB] Duplicated:", item.name);
        console.log("[BAR HUB] New ID:", copy.id);

        this.inventory.push(copy);
        return true;
    }

    clearAll() {
        this.inventory = this.inventory.filter(item => !item.isDuplicate);
        this.totalDuplicates = 0;
        this.selectedIndex = null;
    }

    getInventory() {
        return this.inventory;
    }

    selectItem(index) {
        this.selectedIndex = index;
    }

    getSelectedIndex() {
        return this.selectedIndex;
    }
}

// Initialize BAR HUB
const barHub = new BarHubDuplicator();

// DOM Elements
const inventoryList = document.getElementById('inventoryList');
const refreshBtn = document.getElementById('refreshBtn');
const duplicateBtn = document.getElementById('duplicateBtn');
const clearBtn = document.getElementById('clearBtn');
const totalItemsSpan = document.getElementById('totalItems');
const totalDuplicatesSpan = document.getElementById('totalDuplicates');

// Render Inventory
function renderInventory() {
    inventoryList.innerHTML = '';
    const inventory = barHub.getInventory();

    inventory.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'inventory-item';

        if (index === barHub.getSelectedIndex()) {
            itemEl.classList.add('selected');
        }

        const isDupText = item.isDuplicate ? ' [COPY]' : '';
        const idText = item.id ? ` (${item.id})` : '';

        itemEl.innerHTML = `
            <div class="item-name">${item.name}${isDupText}${idText}<\/div>
            <div class="item-stats">
                <span class="item-stat"><strong>Damage:<\/strong> ${item.damage}<\/span>
                <span class="item-stat"><strong>Rarity:<\/strong> ${item.rarity}<\/span>
                <span class="item-stat"><strong>Crit:<\/strong> ${item.stats.critChance}%<\/span>
                <span class="item-stat"><strong>Durability:<\/strong> ${item.stats.durability}<\/span>
            <\/div>
        `;

        itemEl.addEventListener('click', () => {
            barHub.selectItem(index);
            renderInventory();
            updateStats();
        });

        inventoryList.appendChild(itemEl);
    });

    updateStats();
}

// Update Stats
function updateStats() {
    const inventory = barHub.getInventory();
    const duplicateCount = inventory.filter(item => item.isDuplicate).length;

    totalItemsSpan.textContent = inventory.length;
    totalDuplicatesSpan.textContent = duplicateCount;
}

// Event Listeners
refreshBtn.addEventListener('click', () => {
    renderInventory();
    console.log("[BAR HUB] Inventory refreshed.");
});

duplicateBtn.addEventListener('click', () => {
    const selectedIndex = barHub.getSelectedIndex();
    if (selectedIndex !== null) {
        barHub.duplicate(selectedIndex);
        renderInventory();
        console.log("[BAR HUB] Item duplicated successfully.");
    } else {
        alert("Please select an item to duplicate!");
    }
});

clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all duplicates?")) {
        barHub.clearAll();
        renderInventory();
        console.log("[BAR HUB] All duplicates cleared.");
    }
});

// Initial Render
renderInventory();