import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import { Box, Button, Container, InputWrapper, Stack } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import {
  catchError,
  cleanError,
  fetchData,
  saveQuery,
  updatePage,
} from "../redux/reducers/api-reducer";
import { rowalizer } from "../utils/helpers";
import PhotoSection from "./Photo-Section";
import Paginator from "./Paginator";

const HomeBody = () => {
  const dispatch = useDispatch();
  const {
    photos,
    error,
    loading,
    rate_limit,
    query: lastSearch,
  } = useSelector((state) => state.photos);

  const [itemPerPage, setItemPerPage] = useState(lastSearch.itemPerPage || 12);
  const [query, setQuery] = useState(lastSearch.query || "");

  const fetchPhotos = (type = "popular", page = 1) => {
    let apiUrl;
    if (type === "search") {
      if (!query || query === " ") {
        dispatch(catchError(["Insert at least 1 characther"]));
        return;
      }
      apiUrl = `search/photos?query=${query}&`;
    } else {
      apiUrl = "photos?";
    }
    dispatch(updatePage(page));
    dispatch(fetchData(`${apiUrl}per_page=${itemPerPage}&page=${page}`));
    dispatch(
      saveQuery({
        path: ` ${apiUrl}`.trim(),
        itemPerPage,
        type,
        query,
      })
    );
  };

  const searchPhoto = (page = 1) => {
    fetchPhotos("search");
  };

  const handleChange = (e) => {
    dispatch(cleanError());
    const { value } = e.target;
    setQuery(value);
  };

  useEffect(() => {
    if (!lastSearch.query) {
      fetchPhotos();
    } else {
      fetchPhotos(lastSearch.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemPerPage]);

  // useEffect(() => {
  //   async function prova() {
  //     try {
  //       const response = await instance.get("photos");
  //       console.log("RESPONSE", response);
  //     } catch (err) {
  //       console.log("ERROR", err);
  //     }
  //   }
  //   prova();
  // }, []);
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
            borderColor={error.status ? "error" : "grey.700"}
            px="18px"
            style={{
              overflowX: "hidden",
            }}
          >
            <InputWrapper
              placeholder="cerca foto"
              border="none"
              pl="0px"
              value={query}
              onChange={handleChange}
            ></InputWrapper>
            <Button
              rigthIcon={<SearchIcon />}
              isLoading={false}
              disabled={loading}
              variant={error.status || loading ? "disabled" : "text"}
              iconColor="grey.700"
              bg="grey.900"
              onClick={() => searchPhoto()}
            ></Button>
          </Stack>
        </Box>
        <Container mt="72px">
          <Stack direction="column" spacing="118px">
            {!loading &&
            !error.status &&
            (photos?.length > 0 || photos?.results?.length > 0) ? (
              rowalizer(photos?.results ? photos.results : photos).map(
                (row, index) => <PhotoSection row={row} key={index} />
              )
            ) : !loading && error.status ? (
              <h3>
                {error?.message && error.message.length > 0
                  ? error.message.join(" ")
                  : "Sorry, there was an Error. Try Again"}
              </h3>
            ) : (
              <h3>Loading...</h3>
            )}

            <Stack justify="flex-end">
              <p
                style={{
                  color: "var(--grey-700",
                }}
              >
                Item per page{" "}
                <select
                  value={itemPerPage}
                  onChange={(e) => setItemPerPage(e.target.value)}
                >
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
      {lastSearch.type === "search" && <Paginator />}
    </Container>
  );
};

export default HomeBody;
