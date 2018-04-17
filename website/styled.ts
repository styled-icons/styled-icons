import styled from 'styled-components'

export const Header = styled.h1`
  font-weight: 600;
  font-size: 1.7rem;
`

export const PackHeader = styled.h2`
  font-weight: 500;
  font-size: 1.1rem;
`

export const InstallCode = styled.code`
  display: inline-block;
  background: rgba(0, 0, 0, 0.2);
  white-space: pre;
  padding: 12px;
  color: #000;
`

export const CodeExample = styled.code`
  display: inline-block;
  background: rgba(0, 0, 0, 0.2);
  white-space: pre;
  padding: 12px;
  text-align: left;
  margin-top: 1em;
  color: #000;
`

export const IconDemoContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
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
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, max-content));
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`

export const A = styled.a`
  color: #fff;
`
