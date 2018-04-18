import styled from 'styled-components'

export const Header = styled.h1`
  font-weight: 600;
  font-size: 1.7rem;
`

export const Badges = styled.p`
  & > * {
    margin-right: 6px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`

export const PackHeader = styled.h2`
  font-weight: 500;
  font-size: 1.1rem;
`

export const CodeExample = styled.code`
  display: block;
  max-width: 600px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  white-space: pre;
  padding: 12px;
  text-align: left;
  margin-top: 1em;
  color: #000;
`

export const IconDemoContainer = styled.div`
  width: 20vw;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  color: #000;
  transition: transform 0.5s ease-out;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }
`

export const IconCode = styled.code`
  white-space: pre;
  overflow-x: scroll;
  display: block;
  padding: 12px;
  width: 100%;
`

export const IconName = styled.strong`
  font-weight: 500;
`

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-end;
`

export const A = styled.a`
  color: #fff;
`

export const SearchBox = styled.input`
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  margin-bottom: 2em;
  padding: 12px;
  width: 400px;
  color: #000;
  font-weight: 300;
  outline: none;
  text-align: center;
  font-size: 1.2rem;
`
