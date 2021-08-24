import React, { useEffect } from "react";
import {TextField, Chip, Button } from "@material-ui/core";
import { useStyles } from "./TagsInput.styles";

import {validateEmail} from './helpers';


function TagsInput(props) {
  const { onSelectTags, onSendMailingList, tags, ...other } = props;
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
        startAdornment: 
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
          </React.Fragment>),
        endAdornment: (
          <Button onClick={() => {
            onSendMailingList(selectedItem);
            setSelectedItem([]);
          }} >
            Send mailing list
          </Button>
        )
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
