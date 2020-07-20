import React from 'react'
import Control from 'react-leaflet-control'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import SettingsIcon from '@material-ui/icons/Settings'
import StopIcon from '@material-ui/icons/Stop'
import SquareFootIcon from '@material-ui/icons/SquareFoot'
import TimelineIcon from '@material-ui/icons/Timeline'

import { Icon } from '@iconify/react'

import pentagonIcon from '@iconify/icons-mdi/pentagon'

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '25px',
  },
}))

export default (props) => {
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
            color={props.analysisToolActive ? 'primary' : undefined}
            onClick={() => props.toggle('analysis')}
          >
            <SquareFootIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw line'>
          <Button
            color={props.lineToolActive ? 'primary' : undefined}
            onClick={() => props.toggle('line')}
          >
            <TimelineIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw circle'>
          <Button
            color={props.circleToolActive ? 'primary' : undefined}
            onClick={() => props.toggle('circle')}
          >
            <FiberManualRecordIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw rectangle'>
          <Button
            color={props.rectangleToolActive ? 'primary' : undefined}
            onClick={() => props.toggle('rectangle')}
          >
            <StopIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw polygon'>
          <Button
            color={props.polygonToolActive ? 'primary' : undefined}
            onClick={() => props.toggle('polygon')}
          >
            <Icon className={classes.icon} icon={pentagonIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw settings'>
          <Button
            onClick={() => props.toggle('settings')}
          >
            <SettingsIcon className={classes.icon} />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Control>
  )
}