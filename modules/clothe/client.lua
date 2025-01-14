if IsDuplicityVersion() then return end

QBX = {} -- luacheck: ignore
QBX.PlayerData = exports.qbx_core:GetPlayerData() or {}

RegisterNetEvent('QBCore:Client:OnPlayerUnload', function()
  ---@diagnostic disable-next-line: missing-fields
  QBX.PlayerData = {}
end)

RegisterNetEvent('QBCore:Player:SetPlayerData', function(value)
  QBX.PlayerData = value
end)


local function getGender()
  if shared.framework == "qbx" then
    if QBX.PlayerData.charinfo.gender == 1 then
      return "female"
    else
      return "male"
    end
  end
  local ped = cache.ped
  local model = GetEntityModel(ped)
  if model == GetHashKey('mp_f_freemode_01') then
    return 'female'
  elseif model == GetHashKey('mp_m_freemode_01') then
    return 'male'
  end
end



local function loadDefaultModel()
  local model = GetHashKey('mp_m_freemode_01')
  if getGender() == "female" then
    model = GetHashKey('mp_f_freemode_01')
  end
  RequestModel(model)
  while not HasModelLoaded(model) do
    Wait(100)
  end
  if (IsModelInCdimage(model) and IsModelValid(model)) then
    SetPlayerModel(PlayerId(), model)
    SetPedDefaultComponentVariation(PlayerPedId())
  end

  SetModelAsNoLongerNeeded(model)
  cache.ped = PlayerPedId()
end

local function getDefaultComponents()
  if getGender() == "male" then
    return {
      { component_id = 1,  drawable = 0,  texture = 0 },
      { component_id = 3,  drawable = 15, texture = 0 },
      { component_id = 4,  drawable = 18, texture = 0 },
      { component_id = 5,  drawable = 0,  texture = 0 },
      { component_id = 6,  drawable = 16, texture = 0 },
      { component_id = 7,  drawable = 0,  texture = 0 },
      { component_id = 8,  drawable = 15, texture = 0 },
      { component_id = 9,  drawable = 0,  texture = 0 },
      { component_id = 10, drawable = 0,  texture = 0 },
      { component_id = 11, drawable = 15, texture = 0 },
    }
  else
    return {
      { component_id = 1,  drawable = 0,  texture = 0 },
      { component_id = 3,  drawable = 15, texture = 0 },
      { component_id = 4,  drawable = 12, texture = 0 },
      { component_id = 5,  drawable = 0,  texture = 0 },
      { component_id = 6,  drawable = 16, texture = 0 },
      { component_id = 7,  drawable = 0,  texture = 0 },
      { component_id = 8,  drawable = 15, texture = 0 },
      { component_id = 9,  drawable = 0,  texture = 0 },
      { component_id = 10, drawable = 0,  texture = 0 },
      { component_id = 11, drawable = 15, texture = 0 },
    }
  end
end

local function getDefaultProps()
  return {
    {
      prop_id = 0, -- Hat
      drawable = -1,
      texture = -1
    },
    {
      prop_id = 1, -- Glasses
      drawable = -1,
      texture = -1
    },
    {
      prop_id = 2, -- Ear
      drawable = -1,
      texture = -1
    },
    {
      prop_id = 6, -- Watch
      drawable = -1,
      texture = -1
    },
    {
      prop_id = 7, -- Bracelet
      drawable = -1,
      texture = -1
    }
  }
end


function refreshPlayerClothing(updatePed)
  if not PlayerData.clothing then return end
  local clothing = PlayerData.clothing
  --[[ local appearance = lib.callback.await("illenium-appearance:server:getAppearance", false)
  if not appearance then return end ]]
  if GetResourceState('illenium-appearance') == 'started' then
    local openedSlot = 0
    local components = getDefaultComponents()
    local props = getDefaultProps()
    for k, v in pairs(clothing) do
      local itemData = v.metadata
      if itemData then
        if v.name == 'clothing' then
          if itemData.componentType == "component" then
            --SetPedComponentVariation(ped, itemData.componentId, itemData.drawableId, itemData.textureId, 2)
            table.insert(components, {
              component_id = itemData.componentId,
              drawable = itemData.drawableId,
              texture = itemData.textureId
            })
            if itemData.openSlot ~= nil then
              openedSlot += itemData.openSlot
            end
          elseif itemData.componentType == "props" then
            --SetPedPropIndex(ped, itemData.componentId, itemData.drawableId, itemData.textureId, true)
            table.insert(props, {
              prop_id = itemData.componentId,
              drawable = itemData.drawableId,
              texture = itemData.textureId
            })
            if itemData.componentId == 6 then
              hasWatch = true
            end
          end
        end
      end
    end
    print('components', json.encode(components))
    --[[ exports['illenium-appearance']:setPedComponents(PlayerPedId(), components)
    exports['illenium-appearance']:setPedProps(PlayerPedId(), props) ]]
    local appearance = exports['illenium-appearance']:getPedAppearance(PlayerPedId())
    appearance.components = components
    appearance.props = props
    print('appearance', json.encode(appearance))
    exports['illenium-appearance']:setPlayerAppearance(appearance)
    TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
    return
  end

  loadDefaultModel()


  local ped = updatePed or PlayerPedId()

  if getGender() == 'male' then
    SetPedComponentVariation(ped, 1, 0, 0, 2)   -- Mask
    SetPedComponentVariation(ped, 3, 15, 0, 2)  -- Torso
    SetPedComponentVariation(ped, 4, 18, 0, 2)  -- Pants
    SetPedComponentVariation(ped, 5, 0, 0, 2)   -- Backpack / parachute
    SetPedComponentVariation(ped, 6, 16, 0, 2)  -- Shoes
    SetPedComponentVariation(ped, 7, 0, 0, 2)   -- Neck
    SetPedComponentVariation(ped, 8, 15, 0, 2)  -- Undershirt
    SetPedComponentVariation(ped, 9, 0, 0, 2)   -- bulletproof
    SetPedComponentVariation(ped, 10, 0, 0, 2)  -- badge
    SetPedComponentVariation(ped, 11, 15, 0, 2) -- Torso 2
    ClearPedProp(ped, 0)
    ClearPedProp(ped, 1)
    ClearPedProp(ped, 2)
    ClearPedProp(ped, 6)
    ClearPedProp(ped, 7)
  elseif getGender() == 'female' then
    SetPedComponentVariation(ped, 1, 0, 0, 2)   -- Mask
    SetPedComponentVariation(ped, 3, 15, 0, 2)  -- Torso
    SetPedComponentVariation(ped, 4, 12, 0, 2)  -- Pants
    SetPedComponentVariation(ped, 5, 0, 0, 2)   -- Backpack / parachute
    SetPedComponentVariation(ped, 6, 16, 0, 2)  -- Shoes
    SetPedComponentVariation(ped, 7, 0, 0, 2)   -- Neck
    SetPedComponentVariation(ped, 8, 15, 0, 2)  -- Undershirt
    SetPedComponentVariation(ped, 9, 0, 0, 2)   -- bulletproof
    SetPedComponentVariation(ped, 10, 0, 0, 2)  -- badge
    SetPedComponentVariation(ped, 11, 15, 0, 2) -- Torso 2
    ClearPedProp(ped, 0)
    ClearPedProp(ped, 1)
    ClearPedProp(ped, 2)
    ClearPedProp(ped, 6)
    ClearPedProp(ped, 7)
  end

  local openedSlot = 0
  local hasWatch = false
  for k, v in pairs(clothing) do
    local itemData = v.metadata
    if itemData then
      if v.name == 'clothing' then
        if itemData.componentType == "component" then
          SetPedComponentVariation(ped, itemData.componentId, itemData.drawableId, itemData.textureId, 2)
          if itemData.openSlot ~= nil then
            openedSlot += itemData.openSlot
          end
        elseif itemData.componentType == "props" then
          SetPedPropIndex(ped, itemData.componentId, itemData.drawableId, itemData.textureId, true)
          if itemData.componentId == 6 then
            hasWatch = true
          end
        end
      end
    end
  end
  SendNUIMessage({
    action = 'setOpenedSlot',
    data = openedSlot
  })
end

AddEventHandler("ox_inventory:onPlayerCreated", refreshPlayerClothing)
exports('refreshPlayerClothing', refreshPlayerClothing)
print('clothe/client.lua loaded')
RegisterNUICallback("screenshot:stopScreenShot", function(body, resultCallback)
  resultCallback("ok")
  refreshPlayerClothing()
end)
