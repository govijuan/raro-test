import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    root: {
      '& > div': {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& .tags-container': {
          '& > div': {
            margin: '2px',
          },
        },
        '& button': {
          background: 'linear-gradient(355deg, rgba(19,121,9,1) 0%, rgba(64,179,147,1) 49%, rgba(0,212,255,1) 100%)',
          marginTop: '10px',
          color: '#fff',
          '& :hover, :active': {
            color: '#333'
          }
        },
        '& input': {
          padding: '0',
          height: '30px',
          marginTop: '10px',
          borderBottom: '1px solid #333'
        }
      }
    },
    notchedOutline: {},
    disabled: {},
  }));