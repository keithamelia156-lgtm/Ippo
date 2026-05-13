# ModMenu UI System

🎮 A powerful and flexible modmenu UI system with built-in element support for games and applications.

## Features

✨ **Rich Element Support**
- Buttons with custom colors and callbacks
- Toggle switches with state management
- Sliders with min/max values
- Dropdown menus with custom options
- Text input fields

📄 **Multi-Page System**
- Create multiple pages
- Easy page navigation
- Organize elements by category

🎨 **Customizable Themes**
- Dark theme (default)
- Light theme
- Custom color support
- Responsive design

⚡ **Performance Optimized**
- Lightweight and fast
- Smooth animations
- Efficient rendering

## Files

- `modmenu.lua` - Lua implementation
- `modmenu.js` - JavaScript implementation
- `modmenu.css` - Styling and themes
- `example.html` - Complete working example

## JavaScript Usage

```javascript
// Initialize the menu
const menu = new ModMenuUI({
    title: 'MY MODMENU',
    defaultPage: 'main'
});

// Add pages
menu.addPage('main', '🏠 Home');
menu.addPage('settings', '⚙️ Settings');

// Add button
menu.addButton('btn1', 'Click Me', () => {
    console.log('Button clicked!');
    menu.showNotification('Success', 'Button was clicked!', 3, 'success');
}, { page: 'main' });

// Add toggle
menu.addToggle('toggle1', 'Enable Feature', false, (state) => {
    console.log('Toggle state:', state);
}, { page: 'main' });

// Add slider
menu.addSlider('slider1', 'Volume', 0, 100, 50, (value) => {
    console.log('Volume:', value);
}, { page: 'main' });

// Add dropdown
menu.addDropdown('dropdown1', 'Select Option',
    ['Option 1', 'Option 2', 'Option 3'],
    'Option 1',
    (value) => {
        console.log('Selected:', value);
    },
    { page: 'main' }
);

// Add text input
menu.addTextInput('input1', 'Enter Name', 'Your name here...', (value) => {
    console.log('Input value:', value);
}, { page: 'main' });

// Toggle menu visibility (Alt+M hotkey also works)
menu.toggle();

// Get/Set element values
const value = menu.getElementValue('slider1');
menu.setElementValue('slider1', 75);

// Show notifications
menu.showNotification('Title', 'Message', 3, 'success'); // success, danger, warning
```

## Lua Usage

```lua
local ModMenu = require('modmenu')

-- Initialize
local menu = ModMenu:Initialize({
    Title = "MY MODMENU",
    Width = 400,
    Height = 600,
    Theme = "dark"
})

-- Create pages
menu:CreatePage('main', 'Home')
menu:CreatePage('settings', 'Settings')

-- Create button
menu:CreateButton('btn1', 'Click Me', function()
    print('Button clicked!')
end, { color = "#4CAF50" })

-- Create toggle
menu:CreateToggle('toggle1', 'Enable Feature', false, function(state)
    print('Toggle state:', state)
end)

-- Create slider
menu:CreateSlider('slider1', 'Volume', 0, 100, 50, function(value)
    print('Volume:', value)
end)

-- Create dropdown
menu:CreateDropdown('dropdown1', 'Select Option',
    {'Option 1', 'Option 2', 'Option 3'},
    'Option 1',
    function(value)
        print('Selected:', value)
    }
)

-- Add element to page
menu:AddElementToPage('main', 'btn1')
menu:AddElementToPage('main', 'toggle1')
menu:AddElementToPage('main', 'slider1')

-- Toggle menu
menu:Toggle()

-- Execute button
menu:PressButton('btn1')

-- Toggle switch
menu:ToggleSwitch('toggle1')

-- Set slider
menu:SetSlider('slider1', 75)

-- Show status
menu:PrintStatus()
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Alt + M` | Toggle Menu |
| `Esc` (in menu) | Close Menu |

## CSS Classes

### Container
- `.modmenu-container` - Main menu container
- `.modmenu-header` - Header section
- `.modmenu-content` - Content area
- `.modmenu-footer` - Footer section

### Elements
- `.modmenu-button` - Button element
- `.modmenu-toggle` / `.modmenu-switch` - Toggle switch
- `.modmenu-slider` - Slider element
- `.modmenu-dropdown` - Dropdown menu
- `.modmenu-input` - Text input

### States
- `.open` - Open state
- `.disabled` - Disabled state
- `.active` - Active state

## Customization

### Change Colors

```css
:root {
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
    --accent-color: #FF9800;
    --danger-color: #f44336;
    --dark-bg: #1a1a1a;
    --light-bg: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
}
```

### Customize Buttons

```javascript
menu.addButton('custom-btn', 'Custom Button', () => {
    // callback
}, {
    page: 'main',
    color: '#FF5722' // Custom color
});
```

## Example

See `example.html` for a complete working example. Open it in a browser and press `Alt+M` to toggle the menu.

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Minimal DOM operations
- Efficient event delegation
- Smooth 60fps animations
- Optimized re-rendering

## License

MIT License - Feel free to use in your projects!

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Made with ❤️ for game developers and modders**