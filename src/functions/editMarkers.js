/**
 * ${SUMMARY}
 * 
 * ${DESCRIPTION}
 * 
 * @author  chris-m92
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Airmen Coders
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
//export const editMarkers = (action, history, step, iconType, color, src, title, sovereignty, threatSovereignty, id, latlng, marker, data) => {
export const editMarkers = (action, history, step, payload) => {

  switch (action) {
    case 'clear':
      return clearMarkers(history, step)
    case 'create':
      return createMarker(history, step, payload)
    case 'delete':
      return deleteMarker(history, step, payload)
    case 'drag':
      return dragMarker(history, step, payload)
    case 'edit':
      return editMarker(history, step, payload)
    default:
      console.error(`Error: Invalid action ${action}`)
      return false
  }
}

/**
 * Clears all the markers from the map. But only does so if there is anything to clear.
 * Performs length check on the various arrays in history for the current step to decide
 * if there is anything to clear.
 */
const clearMarkers = (history, step) => {
  if (history[step].buildingLabels.length > 0 ||
    history[step].combatAirPatrols.length > 0 ||
    history[step].engagementAreas.length > 0 ||
    history[step].friendlyMarkers.length > 0 ||
    history[step].hostileMarkers.length > 0 ||
    history[step].initialPoints.length > 0 ||
    history[step].lines.length > 0 ||
    history[step].polygons.length > 0 ||
    history[step].restrictedOperatingZones.length > 0 ||
    history[step].survivors.length > 0 ||
    history[step].threatMarkers.length > 0) {

    return {
      action: 'clear markers',
      buildingLabels: [],
      combatAirPatrols: [],
      engagementAreas: [],
      friendlyMarkers: [],
      hostileMarkers: [],
      initialPoints: [],
      lines: [],
      polygons: [],
      restrictedOperatingZones: [],
      survivors: [],
      threatMarkers: [],
    }
  } else {
    return false
  }
}

/**
 * Create a new marker, add it to a new step object, and add the step object to the history array.
 * Alternatively, if the user is adding a new marker and they are not at the next step, then 
 * remove all the 'alternate reality' future steps and then add the step object.
 * 
 * @param {Object} history 
 * @param {Integer} step 
 * @param {Object} payload
 */
const createMarker = (history, step, payload) => {
  if (payload.latlng !== null) {
    const marker = {
      color: payload.color,
      data: payload.data,
      elevation: payload.elevation,
      iconType: payload.iconType,
      iconUrl: payload.iconUrl,
      id: payload.id,
      latlng: payload.latlng,
      layer: payload.layer,
      sovereignty: payload.sovereignty,
      title: payload.title,
    }

    let targetHistory
    if (step === history.length - 1) {
      targetHistory = history.slice()
    } else {
      targetHistory = history.slice(0, step + 1)
    }

    switch (payload.layer) {
      case 'friendly':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          friendlyMarkers: [...targetHistory[step].friendlyMarkers, marker]
        }
      case 'hostile':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          hostileMarkers: [...targetHistory[step].hostileMarkers, marker]
        }
      case 'ip':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          initialPoints: [...targetHistory[step].initialPoints, marker]
        }
      case 'survivor':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          survivors: [...targetHistory[step].survivors, marker]
        }
      case 'threat':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          threatMarkers: [...targetHistory[step].threatMarkers, marker]
        }
      default:
        console.error(`Error: Could not create marker. Invalid layer (${payload.layer})`)
        return false
    }
  } else {
    return false
  }
}

const deleteMarker = (history, step, payload) => {
  const marker = {...payload.marker}

  switch (marker.layer) {
    case 'friendly':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        friendlyMarkers: history[step].friendlyMarkers.filter(fMarker => fMarker.id !== marker.id)
      }
    case 'hostile':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        hostileMarkers: history[step].hostileMarkers.filter(hMarker => hMarker.id !== marker.id)
      }
    case 'threat':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        threatMarkers: history[step].threatMarkers.filter(tMarker => tMarker.id !== marker.id)
      }
    case 'ip':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        initialPoints: history[step].initialPoints.filter(iMarker => iMarker.id !== marker.id)
      }
    case 'survivor':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        survivors: history[step].survivors.filter(sMarker => sMarker.id !== marker.id)
      }
    default:
      console.error(`Error: Could not delete marker (${marker}). Invalid layer (${marker.layer})`)
      return false
  }
}

/**
 * If the user drags the marker, once done reset the lat/lon and title for the popup
 * 
 * @param {Object} marker Object representing the marker being drug around the map
 * @param {Object} newLatLng New Lat/Lng coordinates of the marker
 */
const dragMarker = (history, step, payload) => {
  let targetHistory, filteredMarkers, newMarker

  const marker = payload.marker

  if (step === history.length - 1) {
    targetHistory = history.slice()
  } else {
    targetHistory = history.slice(0, step + 1)
  }

  switch (marker.layer) {
    case 'friendly':
      filteredMarkers = targetHistory[step].friendlyMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        latlng: payload.latlng
      }

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        friendlyMarkers: [...filteredMarkers, newMarker]
      }
    case 'hostile':
      filteredMarkers = targetHistory[step].hostileMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        latlng: payload.latlng
      }

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        hostileMarkers: [...filteredMarkers, newMarker]
      }
    case 'ip':
      filteredMarkers = targetHistory[step].initialPoints.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        latlng: payload.latlng
      }

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        initialPoints: [...filteredMarkers, newMarker]
      }
    case 'survivor':
      filteredMarkers = targetHistory[step].survivors.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        latlng: payload.latlng
      }

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        survivors: [...filteredMarkers, newMarker]
      }
    case 'threat':
      filteredMarkers = targetHistory[step].threatMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        latlng: payload.latlng
      }

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        threatMarkers: [...filteredMarkers, newMarker]
      }
    default:
      console.error(`Error: Could not drag marker (${marker}). Invalid sovereignty (${marker.sovereignty})`)
      return false
  }
}

const editMarker = (history, step, payload) => {
  let targetHistory, filteredMarkers, newMarker

  const marker = payload.marker

  if (step === history.length - 1) {
    targetHistory = history.slice()
  } else {
    targetHistory = history.slice(0, step + 1)
  }

  switch (marker.layer) {
    case 'friendly':
      filteredMarkers = targetHistory[step].friendlyMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        color: payload.color,
        data: payload.data,
        sovereignty: payload.sovereignty,
        title: payload.title,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        friendlyMarkers: [...filteredMarkers, newMarker]
      }
    case 'hostile':
      filteredMarkers = targetHistory[step].hostileMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        color: payload.color,
        data: payload.data,
        sovereignty: payload.sovereignty,
        title: payload.title,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        hostileMarkers: [...filteredMarkers, newMarker]
      }
    case 'ip':
      filteredMarkers = targetHistory[step].initialPoints.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        color: payload.color,
        data: payload.data,
        sovereignty: payload.sovereignty,
        title: payload.title,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        initialPoints: [...filteredMarkers, newMarker]
      }
    case 'survivor':
      filteredMarkers = targetHistory[step].survivors.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        color: payload.color,
        data: payload.data,
        sovereignty: payload.sovereignty,
        title: payload.title,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        survivors: [...filteredMarkers, newMarker]
      }
    case 'threat':
      filteredMarkers = targetHistory[step].threatMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        color: payload.color,
        data: payload.data,
        sovereignty: payload.sovereignty,
        title: payload.title,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        threatMarkers: [...filteredMarkers, newMarker]
      }
    default:
      console.error(`Error: Could not move marker (${marker}). Invalid layer (${marker.layer})`)
      return false
  }
}