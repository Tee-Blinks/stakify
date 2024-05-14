import { Button } from "@chakra-ui/react"

const WebButton = ({onClick, label}) => {
  return (
    <Button outline={'none'} onClick={onClick} >
      {label}
    </Button>
  )
}

export default WebButton