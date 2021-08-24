import React from 'react'
import TagsInput from '@/TagsInput'
import { cleanup, render, fireEvent, screen, within } from '@testing-library/react'

describe('TagsInput Component', () => {
  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

  const emailsArray = ['contato@rarolabs.com.br', 'nao-responda@rarolabs.com.br']

  const processKeyboardEvents = (keyboardEvt: string, emailsArr: any[]) => {
    render(<TagsInput placeholder='add Tags' tags={ keyboardEvt === 'Backspace' ? emailsArr : [] }/>)
    const input = screen.getByPlaceholderText('add Tags');
    if(keyboardEvt === 'Enter' || keyboardEvt === 'Tab') { 
      const inputValue = emailsArr.join(';')
      fireEvent.change(input, { target: { value:  inputValue} }) 
    }
    fireEvent.keyDown(input, { key: keyboardEvt, code: keyboardEvt })
    const inputTags = screen.getAllByTestId('email-tag')
    let expectedLength = 0
    switch(keyboardEvt) {
      case 'Enter':
      case 'Tab':
        expectedLength = emailsArr.length
        break;
      case 'Backspace':
        expectedLength = emailsArr.length - 1
        break;
    }
    expect(inputTags.length).toBe(expectedLength)
    const tagTexts = inputTags.map( tag => {
      const tagSpan = within(tag).getByText((content, element) =>{
        return element.tagName.toLocaleLowerCase() === 'span'
      })
      return tagSpan.textContent.toString()
    })
    if(keyboardEvt === 'Backspace'){
      expect(emailsArr).not.toEqual(tagTexts)
      expect(emailsArr).toEqual(expect.arrayContaining(tagTexts))
    } else {
      expect(emailsArr).toEqual(tagTexts)
    }
  }

  it('cria o snapshot do component', () => {
    const container = render(<TagsInput />)
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('deve renderizar as tags enviadas por atributos', () => {
    const emails = ['contato@rarolabs.com.br', 'nao-responda@rarolabs.com.br']

    const { debug } = render(<TagsInput tags={emails} />)

    debug()
  })

  it('deve renderizar tags quando preencher o input e pressionar enter', () => {
    processKeyboardEvents('Enter', emailsArray)
  })

  it('deve renderizar tags quando preencher o input e pressionar tab', () => {
    processKeyboardEvents('Tab', emailsArray)
  })

  it('deve deletar a útima tag criada ao pressionar o botão de backspace', async () => {
    processKeyboardEvents('Backspace', emailsArray )
  })
})
