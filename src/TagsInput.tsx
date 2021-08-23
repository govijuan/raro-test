import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

import {validateEmail} from './helpers'

export default function TagsInput(props) {
  const { onSelectTags, tags, ...other } = props;
  const [ selectedItem, setSelectedItem ] = React.useState([]);


  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  const onKeyDown = e => {
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

  const processTags = e => {
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

  const handleBackspace = (e) => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.pop();
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = (item) => () => {
    const newTags = selectedItem.filter( setItem => setItem !== item);
    setSelectedItem(newTags);
  };

  return (
    <TextField
      InputProps={{
        startAdornment: selectedItem.map((item) => (
          <Chip
            key={item}
            tabIndex={-1}
            label={item}
            onDelete={handleDelete(item)}
            data-testid='email-tag'
          />
        ))
      }}
      {...other}
      onKeyDown={onKeyDown}
    />
  );
}
TagsInput.defaultProps = {
  tags: []
};
