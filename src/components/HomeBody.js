import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import { Box, Button, Container, InputWrapper, Stack } from "./styled";

const HomeBody = () => {
  return (
    <Container size="fullwidth">
      <Container mt="96px">
        <Stack justify="space-between" align="end">
          <h4>search your photos</h4>
          <p
            style={{
              color: "var(--grey-700)",
            }}
          ></p>
        </Stack>
          <Box mt='24px'>
        <Stack 
        width='fit-content'
        bg='grey.900'
        borderRadius='100px'
        border='1px solid'
        borderColor={'grey.700'}
        px='18px'
        style={{
          overflowX:'hidden'
        }}
        >
          <InputWrapper placeholder="cerca foto"
          border='none'
          pl='0px'
          value='React'
          onChange={()=>{
            return
          }}
          >
          </InputWrapper>
          <Button rigthIcon={<SearchIcon/>}
          isLoading={false}
          disabled={false}
          variant='text'
          iconColor='grey.700'
          bg='grey.900'></Button>
        </Stack>
        </Box>
      </Container>
    </Container>
  );
};

export default HomeBody;
