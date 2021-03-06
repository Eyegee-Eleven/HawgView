/**
 * ${SUMMARY}
 * 
 * Based on the leaflet.js plugin leaflet-ruler. A bearing and range analysis tool.
 * Improvements include modularization for use with React and the ability to use
 * magnetic declination for magnetic rather than true headings.
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
import React from 'react'
import Control from 'react-leaflet-control'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import ApartmentIcon from '@material-ui/icons/Apartment'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import FontDownloadIcon from '@material-ui/icons/FontDownload'
import StopIcon from '@material-ui/icons/Stop'
import SquareFootIcon from '@material-ui/icons/SquareFoot'
import TimelineIcon from '@material-ui/icons/Timeline'

//----------------------------------------------------------------//
// Iconify Icons
//----------------------------------------------------------------//
import { Icon } from '@iconify/react'
import pentagonIcon from '@iconify/icons-mdi/pentagon'
import ellipseIcon from '@iconify/icons-mdi/ellipse'

//----------------------------------------------------------------//
// Custom Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '25px',
  },
}))

//----------------------------------------------------------------//
// Tool Control Component
//----------------------------------------------------------------//
const ToolControls = (props) => {
  const classes = useStyles()

  return (
    <Control position='topright'>
      <ButtonGroup
        orientation='vertical'
        size='small'
        variant='contained'
      >
        <Tooltip placement='left' title='Analysis tool: Press ESC to finish, twice to exit'>
          <Button
            color={props.activeTool === 'analysis' ? 'primary' : undefined}
            onClick={() => props.toggle('analysis')}
          >
            <SquareFootIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Building Label: Increments with each click'>
          <Button
            color={props.activeTool === 'buildingLabel' ? 'primary' : undefined}
            onClick={() => props.toggle('buildingLabel')}
          >
            <ApartmentIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Kinetic Points: Increments with each click'>
          <Button
            color={props.activeTool === 'kineticPoint' ? 'primary' : undefined}
            onClick={() => props.toggle('kineticPoint')}
          >
            <FontDownloadIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw line: Press ESC to exit'>
          <Button
            color={props.activeTool === 'line' ? 'primary' : undefined}
            onClick={() => props.toggle('line')}
          >
            <TimelineIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw circle: Click to set circle, again to set radius'>
          <Button
            color={props.activeTool === 'circle' ? 'primary' : undefined}
            onClick={() => props.toggle('circle')}
          >
            <FiberManualRecordIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw rectangle: Click to set each corner'>
          <Button
            color={props.activeTool === 'rectangle' ? 'primary' : undefined}
            onClick={() => props.toggle('rectangle')}
          >
            <StopIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw polygon: Press ESC to exit'>
          <Button
            color={props.activeTool === 'polygon' ? 'primary' : undefined}
            onClick={() => props.toggle('polygon')}
          >
            <Icon className={classes.icon} icon={pentagonIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw Ellipse: Click map to select center'>
          <Button
            color={props.activeTool === 'ellipse' ? 'primary' : undefined}
            onClick={() => props.toggle('ellipse')}
          >
            <Icon className={classes.icon} icon={ellipseIcon} />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Control>
  )
}

export default ToolControls