import React, {useEffect, useState} from 'react'
import {IconButton, Icon} from '@material-ui/core'
export interface MouseoverButtonProps {
    onClick?: VoidFunction
    name: string
}
const MouseoverButton: React.FC<MouseoverButtonProps> = ({onClick, name}) => {
    const [mouseOver, setMouseOver] = useState(false)
    const handleMouseEnter = () => {
        setMouseOver(true)
    }
    const handleMouseLeave = () => {
        setMouseOver(false)
    }
    return (
        <IconButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <Icon color={mouseOver?'secondary':'disabled'}>{name}</Icon>
        </IconButton>
    )
}
export default MouseoverButton