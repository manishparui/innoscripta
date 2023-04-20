import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

export const Pagination = ({meta, setCurrentPage}: {meta: any, setCurrentPage: any}) => {

  // console.log(meta)

  const onClickHandler = (index: number) => {
    if (index === 0) {
      setCurrentPage(meta.current_page - 1)
    } else if ( index === meta.links.length - 1) {
      setCurrentPage(meta.current_page + 1)
    } else {
      setCurrentPage(index)
    }
  }

  return (
    <Flex>
      {meta.links.map((link: any, index: number) => {
        if (link.url) {          
          return (
            <Button key={link.label} size={"sm"} marginX={1} onClick={() => onClickHandler(index)}>
              {index === 0
                ? "Previous"
                : index === meta.links.length - 1
                ? "Next"
                : link.label}
            </Button>
          );
        }
      }
        
        
      )}
    </Flex>
  );
}
