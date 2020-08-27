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
import { SketchPicker as ColorPicker } from 'react-color'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { units } from '../constants/threats'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  marginsMd: {
    margin: theme.spacing(2),
  },
  marginsSm: {
    margin: theme.spacing(1),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

//----------------------------------------------------------------//
// Marker Drawer Component
//----------------------------------------------------------------//
export default (props) => {
  const classes = useStyles()

  const [dashed, setDashed] = React.useState(false)
  const [dashArray, setDashArray] = React.useState('12, 12')
  const [fill, setFill] = React.useState(false)
  const [fillColor, setFillColor] = React.useState('#4A90E2')
  const [title, setTitle] = React.useState('')
  const [color, setColor] = React.useState('#4A90E2')
  const [length, setLength] = React.useState(10)
  const [width, setWidth] = React.useState(2)
  const [tilt, setTilt] = React.useState(0)
  const [radius, setRadius] = React.useState(0)
  const [unit, setUnit] = React.useState('m')

  const container = props.window !== undefined ? () => window().document.body : undefined

  React.useEffect(() => {
    if (props.marker !== null) {
      setDashed(props.marker.dashArray === null ? false : true)
      setDashArray(props.marker.dashArray === null ? '12, 12' : props.marker.dashArray)
      setFill(props.marker.fillColor === null ? false : true)
      setFillColor(props.marker.fillColor === null ? '#4A90E2' : props.marker.fillColor)
      setTitle(props.marker.title)
      setColor(props.marker.color)

      if (props.marker.layer === 'ellipse') {
        setLength(props.marker.length / 926)
        setWidth(props.marker.width / 926)
        setTilt(props.marker.tilt - 90)
      }

      if (props.marker.layer === 'circle') {
        setRadius(Number.parseFloat(props.marker.radius).toFixed(2))
        setUnit(props.marker.unit)
      }
    }
  }, [props.marker])

  const handleUnitChange = newUnit => {
    switch (unit) {
      case 'm':
        if (newUnit === 'km') {
          setRadius((radius / 1000).toFixed(2))
        } else if (newUnit === 'NM') {
          setRadius((radius / 1852).toFixed(2))
        }
        break
      case 'km':
        if (newUnit === 'm') {
          setRadius((radius * 1000).toFixed(2))
        } else if (newUnit === 'NM') {
          setRadius((radius / 1.852).toFixed(2))
        }
        break
      case 'NM':
        if (newUnit === 'm') {
          setRadius((radius * 1852).toFixed(2))
        } else if (newUnit === 'km') {
          setRadius((radius * 1.852).toFixed(2))
        }
        break
      default:
        break
    }
    setUnit(newUnit)
  }

  const handleSubmit = () => {
    let payload = {
      marker: props.marker,
      color: color,
      dashArray: dashed ? dashArray : null,
      fillColor: fill ? fillColor : null,
      title: title,
    }

    if (props.marker.layer === 'ellipse') {
      payload = {
        ...payload,
        length: length * 926,
        width: width * 926,
        tilt: Number.parseInt(tilt) + 90
      }
    }

    if (props.marker.layer === 'circle') {
      payload = {
        ...payload,
        radius: radius,
        unit: unit,
      }
    }

    props.submit('edit', payload)
    props.onClose()
    setDashed(false)
    setDashArray('12, 12')
    setFill(false)
    setFillColor('#4A90E2')
    setTitle('')
    setColor('#4A90E2')
    setLength(10)
    setWidth(2)
    setTilt(90)
  }

  return (
    <nav
      className={classes.drawer}
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={props.open}
        onClose={props.onClose}
        classes={{ paper: classes.drawerPaper, }}
        ModalProps={{ keepMounted: true, }}
      >
        <Grid
          container
          direction='row'
          justify='center'
        >
          <TextField
            className={classes.marginsMd}
            label='Shape label'
            onChange={event => setTitle(event.target.value)}
            variant='outlined'
            value={title}
          />
          {(props.marker !== null && props.marker.layer === 'circle') ?
            <React.Fragment>
              <TextField
                className={classes.marginsMd}
                label='Radius'
                onChange={event => setRadius(event.target.value)}
                variant='outlined'
                value={radius}
              />
              <FormControl
                className={classes.marginsMd}
                fullWidth={true}
                variant='outlined'
              >
                <InputLabel>Radius Unit</InputLabel>
                <Select
                  label='Radius Unit'
                  onChange={event => handleUnitChange(event.target.value)}
                  value={unit}
                >
                  {units.map(unit => (
                    <MenuItem
                      key={unit}
                      value={unit}
                    >
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </React.Fragment>
            : null
          }
          {(props.marker !== null && props.marker.layer === 'ellipse') ?
            <React.Fragment>
              <TextField
                className={classes.marginsMd}
                label='Ellipse length'
                onChange={event => setLength(event.target.value)}
                variant='outlined'
                value={length}
              />
              <TextField
                className={classes.marginsMd}
                label='Ellipse width'
                onChange={event => setWidth(event.target.value)}
                variant='outlined'
                value={width}
              />
              <TextField
                className={classes.marginsMd}
                helperText=' -90 (W) to 90 (E)'
                label='Ellipse tilt'
                onChange={event => setTilt(event.target.value)}
                variant='outlined'
                value={tilt}
              />
            </React.Fragment>
            : null
          }
        </Grid>
        <Grid
          container
          direction='row'
          justify='center'
        >
          <Typography
            variant='body1'
          >
            Stroke Color
          </Typography>
          <ColorPicker
            className={classes.marginsMd}
            color={color}
            disableAlpha={true}
            onChange={color => setColor(color.hex)}
          />
        </Grid>
        {(props.marker !== null && props.marker.layer !== 'line') ?
          <Grid
            container
            direction='row'
            justify='center'
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={fill}
                    color='primary'
                    name='fill'
                    onChange={() => setFill(!fill)}
                  />
                }
                label='Fill'
              />
            </FormGroup>
            {(fill) ?
              <Grid
                container
                direction='row'
                justify='center'
              >
                <Typography variant='body1'>
                  Fill Color
                </Typography>
                <ColorPicker
                  className={classes.marginsMd}
                  color={fillColor}
                  disableAlpha={true}
                  onChange={color => setFillColor(color.hex)}
                />
              </Grid>
              : null
            }
          </Grid>
          : null
        }
        <Grid
          container
          direction='row'
          justify='center'
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={dashed}
                  color='primary'
                  name='dashed'
                  onChange={() => setDashed(!dashed)}
                />
              }
              label='Dashed'
            />
          </FormGroup>
          {(dashed) ?
            <Grid
              container
              direction='row'
              justify='center'
            >
              <TextField
                className={classes.marginsMd}
                helperText='Comma separated values, every other number is line to gap in pixels.'
                label='Dash Array'
                onChange={event => setDashArray(event.target.value)}
                variant='outlined'
                value={dashArray}
              />
            </Grid>
            : null
          }
        </Grid>
        <Grid
          container
          direction='row'
          justify='center'
        >
          <Button
            className={classes.marginsMd}
            color='primary'
            onClick={() => handleSubmit()}
            variant='contained'
          >
            Save Changes
          </Button>
        </Grid>

      </Drawer>
    </nav>
  )
}