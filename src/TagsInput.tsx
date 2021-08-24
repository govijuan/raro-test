import React, { useEffect } from "react";
import {TextField, Chip, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import {validateEmail} from './helpers';

const useStyles = makeStyles(() => ({
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
          //boxShadow: '2px 2px 15px 5px rgba(64,179,147,1)'
          color: '#333'
        }
      },
      '& input': {
        padding: '0',
        height: '30px',
        marginBottom: '10px',
        borderBottom: '1px solid #333'
      }
    }
  },
  notchedOutline: {},
  disabled: {},
}));

function TagsInput(props) {
  const { onSelectTags, tags, ...other } = props;
  const [ selectedItem, setSelectedItem ] = React.useState([]);


  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  const onKeyDown = (e: any) => {
    const key = e.code;
    switch(key){
      case 'Tab':
      case 'Enter':
        processTags(e);
        e.target.value = '';
        break;
      case 'Backspace':
        console.log("Backspace presionado!");
        handleBackspace(e);
        break;
      default:
        return;
    }
  }

  const processTags = (e: any) => {
    const value = e.target.value;
    let emailsForAdding=[]
    if(value.includes(';')){
      emailsForAdding = value.split(';').filter( item =>
                                                    item !== ''
                                                    && validateEmail(item) 
                                                    && !selectedItem.includes(item)
                                                );
      console.log("Split result: ", emailsForAdding);
    }else{
      if(validateEmail(value) && !selectedItem.includes(value)) emailsForAdding.push(value)
    }
    if(emailsForAdding.length !== 0) {
      setSelectedItem([...selectedItem, ...emailsForAdding]);
    }
  };

  const handleBackspace = (e: any) => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.pop();
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item: any) => () => {
    const newTags = selectedItem.filter( setItem => setItem !== item);
    setSelectedItem(newTags);
  };

  return (
    <TextField
      InputProps={{
        endAdornment: 
          (<React.Fragment>
            <div className='tags-container'>
            { selectedItem.map((item) => (
              <Chip
                key={item}
                tabIndex={-1}
                label={item}
                onDelete={handleDelete(item)}
                data-testid='email-tag'
              />
            ))}
            </div>
            <Button>Send mailing list</Button>
          </React.Fragment>)
      }}
      {...other}
      onKeyDown={onKeyDown}
    />
  );
}
TagsInput.defaultProps = {
  tags: []
};

export default function Hook(props) {
  const classes = useStyles();
  return <TagsInput className={classes.root} {...props}/>
}
