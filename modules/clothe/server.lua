--[[ local Inventory = require 'modules.inventory.server'
RegisterCommand("test_clothe", function(source, args, rawCommand)
  Inventory.AddItem(source, "clothing", 1, {
    componentId = 11,
    drawableId = 1,
    textureId = 0,
    componentType = 'component',
    gender = 'male',
    imageurl = 'https://sp.lorax.vn/storage/v1/object/public/ps-clothes/female_component_11_0_12.png'
  })
end, false)
 ]]

local Inventory = require 'modules.inventory.server'

---@param source number
---@param invType string
---@param data string|number|table
lib.callback.register('ox_inventory:getBackpackInventory', function(source)
  local left = Inventory(source)
  if not left then return end
  local clothing = left.clothing
  local backpackItem = clothing.items[5]
  local backpackInv = nil
  if backpackItem then
    backpackInv = Inventory(backpackItem.metadata.container)
    if not backpackInv then
      backpackInv = Inventory.Create(backpackItem.metadata.container, backpackItem.label, 'container',
        backpackItem.metadata.size[1],
        0,
        backpackItem.metadata.size[2], false)
    end
    left:openInventory(backpackInv)
  end
  if not backpackInv then
    return
  end
  Inventory.CloseAll(backpackInv, source)
  return {
    slots = backpackInv.slots,
    weight = backpackInv.weight,
    maxWeight = backpackInv.maxWeight,
    items = backpackInv.items,
  }
end)
