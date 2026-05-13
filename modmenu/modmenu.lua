-- ModMenu UI System
local ModMenu = {}
ModMenu.Version = "1.0.0"
ModMenu.IsOpen = false
ModMenu.Pages = {}
ModMenu.CurrentPage = 1
ModMenu.Elements = {}
ModMenu.Buttons = {}

-- Initialize ModMenu
function ModMenu:Initialize(config)
    self.Config = config or {}
    self.Config.Title = self.Config.Title or "MOD MENU"
    self.Config.Width = self.Config.Width or 400
    self.Config.Height = self.Config.Height or 600
    self.Config.Theme = self.Config.Theme or "dark"
    
    print("[ModMenu] Initialized v" .. self.Version)
    return self
end

-- Create a button element
function ModMenu:CreateButton(id, label, callback, config)
    local button = {
        id = id,
        label = label,
        callback = callback,
        color = config and config.color or "#4CAF50",
        width = config and config.width or "100%",
        height = config and config.height or "40px",
        enabled = true
    }
    
    self.Buttons[id] = button
    return button
end

-- Create a toggle element
function ModMenu:CreateToggle(id, label, default, callback, config)
    local toggle = {
        id = id,
        label = label,
        state = default or false,
        callback = callback,
        color = config and config.color or "#2196F3",
        enabled = true
    }
    
    self.Elements[id] = toggle
    return toggle
end

-- Create a slider element
function ModMenu:CreateSlider(id, label, min, max, default, callback, config)
    local slider = {
        id = id,
        label = label,
        min = min,
        max = max,
        value = default or min,
        callback = callback,
        color = config and config.color or "#FF9800",
        enabled = true
    }
    
    self.Elements[id] = slider
    return slider
end

-- Create a dropdown element
function ModMenu:CreateDropdown(id, label, options, default, callback, config)
    local dropdown = {
        id = id,
        label = label,
        options = options,
        selected = default or options[1],
        callback = callback,
        color = config and config.color or "#9C27B0",
        isOpen = false,
        enabled = true
    }
    
    self.Elements[id] = dropdown
    return dropdown
end

-- Create a text input element
function ModMenu:CreateTextInput(id, label, placeholder, callback, config)
    local input = {
        id = id,
        label = label,
        placeholder = placeholder or "Enter text...",
        value = "",
        callback = callback,
        color = config and config.color or "#607D8B",
        enabled = true
    }
    
    self.Elements[id] = input
    return input
end

-- Create a page
function ModMenu:CreatePage(id, title)
    local page = {
        id = id,
        title = title,
        elements = {}
    }
    
    self.Pages[id] = page
    return page
end

-- Add element to page
function ModMenu:AddElementToPage(pageId, elementId)
    if self.Pages[pageId] then
        table.insert(self.Pages[pageId].elements, elementId)
    end
end

-- Toggle menu visibility
function ModMenu:Toggle()
    self.IsOpen = not self.IsOpen
    print("[ModMenu] Menu is now " .. (self.IsOpen and "OPEN" or "CLOSED"))
    return self.IsOpen
end

-- Execute button callback
function ModMenu:PressButton(buttonId)
    if self.Buttons[buttonId] and self.Buttons[buttonId].enabled then
        if self.Buttons[buttonId].callback then
            self.Buttons[buttonId].callback()
        end
        print("[ModMenu] Button pressed: " .. buttonId)
    end
end

-- Toggle switch state
function ModMenu:ToggleSwitch(toggleId)
    if self.Elements[toggleId] and self.Elements[toggleId].state ~= nil then
        self.Elements[toggleId].state = not self.Elements[toggleId].state
        if self.Elements[toggleId].callback then
            self.Elements[toggleId].callback(self.Elements[toggleId].state)
        end
        print("[ModMenu] Toggle " .. toggleId .. " set to " .. tostring(self.Elements[toggleId].state))
    end
end

-- Set slider value
function ModMenu:SetSlider(sliderId, value)
    if self.Elements[sliderId] and self.Elements[sliderId].max then
        local min = self.Elements[sliderId].min
        local max = self.Elements[sliderId].max
        self.Elements[sliderId].value = math.max(min, math.min(max, value))
        
        if self.Elements[sliderId].callback then
            self.Elements[sliderId].callback(self.Elements[sliderId].value)
        end
        print("[ModMenu] Slider " .. sliderId .. " set to " .. tostring(self.Elements[sliderId].value))
    end
end

-- Set dropdown value
function ModMenu:SetDropdown(dropdownId, value)
    if self.Elements[dropdownId] then
        self.Elements[dropdownId].selected = value
        if self.Elements[dropdownId].callback then
            self.Elements[dropdownId].callback(value)
        end
        print("[ModMenu] Dropdown " .. dropdownId .. " set to " .. value)
    end
end

-- Set text input value
function ModMenu:SetTextInput(inputId, value)
    if self.Elements[inputId] and self.Elements[inputId].value ~= nil then
        self.Elements[inputId].value = value
        if self.Elements[inputId].callback then
            self.Elements[inputId].callback(value)
        end
        print("[ModMenu] Text input " .. inputId .. " set to " .. value)
    end
end

-- Get element value
function ModMenu:GetElementValue(elementId)
    if self.Elements[elementId] then
        if self.Elements[elementId].state ~= nil then
            return self.Elements[elementId].state
        elseif self.Elements[elementId].value then
            return self.Elements[elementId].value
        elseif self.Elements[elementId].selected then
            return self.Elements[elementId].selected
        end
    end
    return nil
end

-- Disable/Enable element
function ModMenu:SetElementEnabled(elementId, enabled)
    if self.Elements[elementId] then
        self.Elements[elementId].enabled = enabled
    elseif self.Buttons[elementId] then
        self.Buttons[elementId].enabled = enabled
    end
end

-- Show notification
function ModMenu:Notify(title, message, duration, color)
    local notification = {
        title = title,
        message = message,
        duration = duration or 3,
        color = color or "#4CAF50",
        timestamp = os.time()
    }
    print("[ModMenu Notification] " .. title .. ": " .. message)
    return notification
end

-- Print menu status
function ModMenu:PrintStatus()
    print("\n========== ModMenu Status ==========")
    print("Title: " .. self.Config.Title)
    print("Version: " .. self.Version)
    print("Is Open: " .. tostring(self.IsOpen))
    print("Theme: " .. self.Config.Theme)
    print("Total Pages: " .. tostring(#self.Pages))
    print("Total Elements: " .. tostring(#self.Elements))
    print("Total Buttons: " .. tostring(#self.Buttons))
    print("====================================\n")
end

return ModMenu