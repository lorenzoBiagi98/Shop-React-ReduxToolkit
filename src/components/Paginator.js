import React from "react";
import { Container, Stack, Button } from "./styled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as RigthIcon } from "../images/right-arrow.svg";
import { ReactComponent as LeftIcon } from "../images/left-arrow.svg";

const Paginator = () => {
  const { currentPage, hasPrevPage, hasNextPage } = useSelector(
    (store) => store.photos.pagination
  );

  function definePaginationSlice() {
    if (!hasNextPage && hasPrevPage) {
      return "flex-start";
    } else if (hasNextPage && !hasPrevPage) {
      return "flex-end";
    }
    return "space-between";
  }
  return (
    <Container size="fullwidth" mt="118px">
      <Container>
        <Stack justify={definePaginationSlice()} align="center" width="100%">
          {hasPrevPage && (
            <Link
              to={
                parseInt(currentPage, 10) === 2
                  ? "/"
                  : `/photo/${parseInt(currentPage, 10) - 1}`
              }
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                size="md"
                variant="outlined"
                leftIcon={<LeftIcon />}
                iconColor="purple.300"
              >
                Prev
              </Button>
            </Link>
          )}
          {hasNextPage && (
            <Link to={`/photo/${parseInt(currentPage, 10) + 1}`}>
              <Button
                size="md"
                variant="outlined"
                leftIcon={<RigthIcon />}
                iconColor="purple.300"
              >
                Next
              </Button>
            </Link>
          )}
        </Stack>
      </Container>
    </Container>
  );
};

export default Paginator;
