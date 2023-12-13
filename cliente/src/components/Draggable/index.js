import React, { useRef, useState, useEffect, ReactDOM } from 'react';
import {DivDraggable,Botoes} from './styles';
import {CgClose,CgMiniPlayer} from 'react-icons/cg';
import {VscChromeMinimize} from 'react-icons/vsc';

const Draggable = (props) => {
  const [pressed, setPressed] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position])

  const onMouseMove = (event) => {
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY
      })
    }
  }
  const close = () => {
    var container = ReactDOM.findDOMNode().parentNode;
    ReactDOM.unmountComponentAtNode(container);
  }
  const minimize = () => {
  }
  return (
        <DivDraggable
            ref={ ref }
            id={props.id}
            style={props.style}
            onMouseMove={ onMouseMove }
            onBlur={ () => setPressed(false) }
            onMouseLeave={ () => setPressed(false) }
            onMouseDown={()=>setPressed(true)} 
            onMouseUp={ () => setPressed(false) }
            >
              <Botoes>
               {props.minimizable && <VscChromeMinimize onClick={minimize}/>}
               {props.lockable && <CgClose onClick={close}/>} 
              </Botoes>
            {props.content}
         </DivDraggable>
  )
}

export default Draggable