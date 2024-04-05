import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import { Box, Button, Container, InputWrapper, Stack } from "./styled";
import instance from "../api";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/reducers/api-reducer";
import { rowalizer } from "../utils/helpers";
import PhotoSection from "./Photo-Section";

const HomeBody = () => {
  const { photos, error, loading, rate_limit } = useSelector(
    (state) => state.photos
  );

  const dispatch = useDispatch();

  const [itemPerPage, setItemPerPage] = useState(12);

  useEffect(() => {
    dispatch(fetchData("photos"));
  }, []);

  useEffect(() => {
    async function prova() {
      try {
        const response = await instance.get("photos");
        console.log("RESPONSE", response);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
    prova();
  }, []);
  return (
    <Container size="fullwidth">
      <Container mt="96px">
        <Stack justify="space-between" align="end">
          <h4>search your photos</h4>
          <p
            style={{
              color: "var(--grey-700)",
            }}
          >
            {`Richieste: ${rate_limit.remaining}/${rate_limit.total}`}
          </p>
        </Stack>
        <Box mt="24px">
          <Stack
            width="fit-content"
            bg="grey.900"
            borderRadius="100px"
            border="1px solid"
            borderColor={"grey.700"}
            px="18px"
            style={{
              overflowX: "hidden",
            }}
          >
            <InputWrapper
              placeholder="cerca foto"
              border="none"
              pl="0px"
              value="React"
              onChange={() => {
                return;
              }}
            ></InputWrapper>
            <Button
              rigthIcon={<SearchIcon />}
              isLoading={false}
              disabled={false}
              variant="text"
              iconColor="grey.700"
              bg="grey.900"
            ></Button>
          </Stack>
        </Box>
        <Container mt="72px">
          <Stack direction="column" spacing="118px">
            {!loading && !error.status && photos.length > 0 ? (
              rowalizer(photos).map((el)=>{
                return(<PhotoSection row={el}/>)
              })
            ) : !loading && error.status ? (
              error.message && error.message.length > 0 ? (
                error.message.join(" ")
              ) : (
                "Error"
              )
            ) : (
              <h3>Loading</h3>
            )}

            <Stack justify="flex-end">
              <p
                style={{
                  color: "var(--grey-700",
                }}
              >
                Item per page{" "}
                <select value={12} onChange={(e) => setItemPerPage(e)}>
                  {Array.from({ length: 7 }, (_, index) => {
                    return (index + 1) * 3;
                  }).map((el) => {
                    return (
                      <option value={el} key={`option-${el}`}>
                        {el}
                      </option>
                    );
                  })}
                </select>
              </p>
            </Stack>
          </Stack>
        </Container>
      </Container>
    </Container>
  );
};

export default HomeBody;
