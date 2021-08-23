import React from 'react'
import TagsInput from '@/TagsInput'
import { cleanup, render, fireEvent, queryByTestId, screen, within } from '@testing-library/react'

describe('TagsInput Component', () => {
  afterEach(jest.clearAllMocks)
  afterEach(cleanup)

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
    // teste não implementado.
    render(<TagsInput placeholder='add Tags'/>)
    const input = screen.getByPlaceholderText('add Tags');
    fireEvent.change(input, {target: {value: 'contato@rarolabs.com.br;nao-responda@rarolabs.com.br'}})
    fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'})
    const inputTags = screen.getAllByTestId('email-tag')
    expect(inputTags.length).toBe(2)
    const tagTexts = inputTags.map( tag => {
      const tagSpan = within(tag).getByText((content, element) =>{
        return element.tagName.toLocaleLowerCase() === 'span'
      })
      return tagSpan.textContent.toString()
    })
    console.log("tagTexts: ", tagTexts)
    expect([ 'contato@rarolabs.com.br', 'nao-responda@rarolabs.com.br' ]).toEqual(tagTexts)
  })

  it('deve renderizar tags quando preencher o input e pressionar tab', () => {
    // teste não implementado.
  })

  it('deve deletar a útima tag criada ao pressionar o botão de backspace', async () => {
    // teste não implementado.
  })
})
