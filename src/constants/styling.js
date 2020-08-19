import styled from 'styled-components';
import { Container } from '@material-ui/core';

const PRIMARY = "#000000";
const SECONDARY = "#434343";
const HIGHLIGHT = "#F3F3F3";
const RED1 = "#F4CCCC";

const H1 = styled.h1`
  font-size: 3.75em;
  font-weight: bold;
  margin: 0;
  font-family: "Helvetica Neue", "Avenir Next";
`;

const H2 = styled(H1)`
  font-size: 2.25em;
`;

const H3 = styled(H1)`
  font-size: 1.5em;
`;

const H4 = styled(H1)`
  font-size: 1.125em;
`;

const TITLE = styled(H1)`
  font-size: 6em;
`;

const CONTAINER = styled(Container)`
  margin: 0;
  padding: 0 !important;
`;

export {PRIMARY, SECONDARY, HIGHLIGHT, RED1, H1, H2, H3, H4, TITLE, CONTAINER};