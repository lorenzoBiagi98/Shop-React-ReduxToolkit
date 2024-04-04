import React from "react";
import Layout from "../components/Layout";
import {
  Box,
  Container,
  InputWrapper,
  Skeleton,
  Button,
} from "../components/styled";

import Stack from "../components/styled/Stack";
import Hero from "../components/Hero";
import HomeBody from "../components/HomeBody";

const HomeScreen = () => {
  return (
    <Layout>
      <Container size="full width">
        <Hero />
        <HomeBody/>
      </Container>
    </Layout>
  );
};

export default HomeScreen;
