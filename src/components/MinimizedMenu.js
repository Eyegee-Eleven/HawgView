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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import ClearIcon from '@material-ui/icons/Clear'
import DescriptionIcon from '@material-ui/icons/Description'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import GetAppIcon from '@material-ui/icons/GetApp'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import InvertColorsOffIcon from '@material-ui/icons/InvertColorsOff'
import LabelIcon from '@material-ui/icons/Label'
import LabelOffIcon from '@material-ui/icons/LabelOff'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge'
import RedoIcon from '@material-ui/icons/Redo'
import SaveIcon from '@material-ui/icons/Save'
import StyleIcon from '@material-ui/icons/Style'
import UndoIcon from '@material-ui/icons/Undo'
import ViewListIcon from '@material-ui/icons/ViewList'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}))

//----------------------------------------------------------------//
// Minimized Menu Component
//----------------------------------------------------------------//
const MinimizedMenu = (props) => {
  const classes = useStyles()

  const handleClearMarkersClick = () => {
    props.onClose()
    props.handleClearMarkers()
  }

  const handleColorToggleClick = () => {
    props.onClose()
    props.handleColorToggle()
  }

  const handleMarkerSizeDecreaseClick = () => {
    props.onClose()
    props.handleMarkerSizeDecrease()
  }

  const handleMarkerSizeIncreaseClick = () => {
    props.onClose()
    props.handleMarkerSizeIncrease()
  }

  const handleRedoClick = () => {
    props.onClose()
    props.handleRedo()
  }

  const handleUndoClick = () => {
    props.onClose()
    props.handleUndo()
  }

  const handleToggleTooltipsClick = () => {
    props.onClose()
    props.toggleTooltips()
  }

  return (
    <Menu
      anchorEl={props.minMenuAnchorElement}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      onClose={() => props.onClose()}
      open={props.open}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={() => props.setActiveDialog('addMarker')}>
        <AddPhotoAlternateIcon className={classes.icon} />
        Add Marker
      </MenuItem>
      <MenuItem
        disabled={props.undoDisabled}
        onClick={!props.undoDisabled ? handleUndoClick : undefined}
      >
        <UndoIcon className={classes.icon} />
        Undo {props.undoAction}
      </MenuItem>
      <MenuItem
        disabled={props.redoDisabled}
        onClick={!props.redoDisabled ? handleRedoClick : undefined}
      >
        <RedoIcon className={classes.icon} />
        Redo {props.redoAction}
      </MenuItem>
      <MenuItem onClick={handleClearMarkersClick}>
        <ClearIcon className={classes.icon} />
        Clear all markers
      </MenuItem>
      <MenuItem onClick={handleMarkerSizeIncreaseClick}>
        <PhotoSizeSelectActualIcon className={classes.icon} />
        Increase marker size
      </MenuItem>
      <MenuItem onClick={handleMarkerSizeDecreaseClick}>
        <PhotoSizeSelectLargeIcon className={classes.icon} />
        Decrease marker size
      </MenuItem>
      <MenuItem onClick={handleColorToggleClick}>
        {props.mapColor ? <InvertColorsIcon className={classes.icon} /> : <InvertColorsOffIcon className={classes.icon} />}
        Toggle map color
      </MenuItem>
      <MenuItem onClick={props.handleMinMenuClose} disabled>
        <DescriptionIcon className={classes.icon} />
        CONOP tools
      </MenuItem>
      <MenuItem onClick={() => props.setActiveDialog('markerList')}>
        <ViewListIcon className={classes.icon} />
        View marker list
      </MenuItem>
      <MenuItem onClick={handleToggleTooltipsClick}>
        {props.tooltipsActive ? <LabelOffIcon className={classes.icon} /> : <LabelIcon className={classes.icon} />}
        Toggle marker labels
      </MenuItem>
      <MenuItem onClick={() => props.setActiveDialog('save')}>
        <SaveIcon className={classes.icon} />
        Save scenario
      </MenuItem>
      <MenuItem onClick={() => props.setActiveDialog('load')}>
        <FolderOpenIcon className={classes.icon} />
        Load scenario
      </MenuItem>
      <MenuItem onClick={() => props.setActiveDialog('style')}>
        <StyleIcon className={classes.icon} />
        Styles
      </MenuItem>
      <MenuItem disabled onClick={props.handleMinMenuClose}>
        <GetAppIcon className={classes.icon} />
        Download products
      </MenuItem>
    </Menu>
  )
}

export default MinimizedMenu