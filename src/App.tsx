import React, { useState, useEffect } from 'react';
import TagsInput from './TagsInput';

import {getMailingListById} from './services';

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

  return (
    <div className="App">
      <TagsInput
        onSelectTags={handleSelecetedTags}
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