import React, { useState, useEffect } from 'react';
import TagsInput from './TagsInput';

import {getMailingListById, sendMailingList} from './services';

const App: React.FC = () => {
  function handleSelecetedTags(items: string[]) {
    return items;
  }

  const initMailingListId = "211df294-037f-778b-2723-784fdb3b5037";

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const getMails = async () =>{
      try {
        const response = getMailingListById(initMailingListId);
        setTags((await response).data.emails)
      } catch (error) {
        console.log(error)
      }
    }
    getMails();
  }, []);

  const handleSendMailingList = async (mailingList : any[]) => {
    if(mailingList.length !== 0){
      try {
        const response = sendMailingList(initMailingListId, mailingList)
        setTags((await response).data.emails)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="App">
      <TagsInput
        onSelectTags={handleSelecetedTags}
        onSendMailingList={handleSendMailingList}
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Tags"
        label="tags"
        tags={tags}
      />
    </div>
  );
}

export default App;