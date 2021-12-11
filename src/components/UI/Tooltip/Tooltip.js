import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

export const LightTooltip = withStyles((theme) => ({
  tooltip: {
    color: '#666',
    boxShadow: '0 0 7px 0px rgba(0,0,0,.1)',
    fontSize: 14,
    padding: '1em',
    border: '1px solid #ddd',
    borderRadius: 0,
    textAlign: 'left',
    backgroundColor: 'rgba(255,255,255, 0.97)',
  },
}))(Tooltip);
