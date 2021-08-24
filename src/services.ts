import axios from 'axios'

const token = "f81d4fae-7dec-11d0-a765-00a0c91e6bf6";
const URL= "http://localhost:4010/mailing-lists";

export const getMailingListById = (id :string) => {
    const res = axios.get(`${URL}/${id}`, { 
        headers: {
            'token': `${token}`
        }
    })
    return res;
}

export const sendMailingList = (id : string, mailingList :any[]) => {
    const body = {emails: mailingList}
    const options = {
        headers: {
            'token': `${token}`
        },
    }
    const res = axios.patch(`${URL}/${id}`, body, options)
    return res;
}