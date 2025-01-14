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
