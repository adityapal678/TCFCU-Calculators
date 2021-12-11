import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';

export const StyledSlider = withStyles({
  root: {
    color: 'rgba(77, 100, 255, 0.7)',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: 'rgba(77, 100, 255, 1)',
    border: '1px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
