import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react'
import copy from 'copy-to-clipboard'
import {StyledIcon} from 'styled-icons/types'

const importMap: any = {
  'boxicons-logos': import('styled-icons/boxicons-logos'),
  'boxicons-regular': import('styled-icons/boxicons-regular'),
  'boxicons-solid': import('styled-icons/boxicons-solid'),
  crypto: import('styled-icons/crypto'),
  entypo: import('styled-icons/entypo'),
  'entypo-social': import('styled-icons/entypo-social'),
  'evaicons-outline': import('styled-icons/evaicons-outline'),
  'evaicons-solid': import('styled-icons/evaicons-solid'),
  evil: import('styled-icons/evil'),
  'fa-brands': import('styled-icons/fa-brands'),
  'fa-regular': import('styled-icons/fa-regular'),
  'fa-solid': import('styled-icons/fa-solid'),
  feather: import('styled-icons/feather'),
  foundation: import('styled-icons/foundation'),
  'heroicons-outline': import('styled-icons/heroicons-outline'),
  'heroicons-solid': import('styled-icons/heroicons-solid'),
  icomoon: import('styled-icons/icomoon'),
  'ionicons-sharp': import('styled-icons/ionicons-sharp'),
  'ionicons-solid': import('styled-icons/ionicons-solid'),
  'ionicons-outline': import('styled-icons/ionicons-outline'),
  material: import('styled-icons/material'),
  'material-outlined': import('styled-icons/material-outlined'),
  'material-rounded': import('styled-icons/material-rounded'),
  'material-sharp': import('styled-icons/material-sharp'),
  'material-twotone': import('styled-icons/material-twotone'),
  'open-iconic': import('styled-icons/open-iconic'),
  octicons: import('styled-icons/octicons'),
  'remix-fill': import('styled-icons/remix-fill'),
  'remix-line': import('styled-icons/remix-line'),
  'simple-icons': import('styled-icons/simple-icons'),
  typicons: import('styled-icons/typicons'),
  zondicons: import('styled-icons/zondicons'),
}

function useIsMounted() {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])
  return isMounted
}

interface Props {
  pack: string
  name: string
}

export const IconCard: React.SFC<Props> = ({name, pack}) => {
  const isMounted = useIsMounted()
  const [copied, setCopied] = useState(false)
  const iconImport = useMemo(() => `@styled-icons/${pack}/${name}`, [pack, name])
  const [Icon, setIcon] = useState<StyledIcon | null>(null)

  const copyCallback = useCallback(() => {
    copy(iconImport)
    setCopied(true)

    setTimeout(() => {
      if (isMounted.current) {
        setCopied(false)
      }
    }, 2000)
  }, [iconImport, isMounted])

  useEffect(() => {
    importMap[pack].then((packImport: any) => {
      setIcon(packImport[name])
    })
  }, [name, pack])

  return (
    <div className="icon-card" onClick={copyCallback}>
      <div>{Icon ? <Icon size="48" title={`${name} icon`} /> : null}</div>
      <div className="name">{name}</div>
      <code>{copied ? 'Copied!' : iconImport}</code>
    </div>
  )
}
