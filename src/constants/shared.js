import { Dimensions } from 'react-native';

const GRID_WIDTH = Dimensions.get('window').width;
const GRID_HEIGHT = 500;
const CIRCLE_RADIUS = 30;
const R_INC = 4;
const C_INC = 8;
const GRIDR_INC = GRID_HEIGHT / R_INC;
const GRIDC_INC = GRID_WIDTH / C_INC;

const PRIMARY = "#0E1111"
const SECONDARY = "#FFFFFF"

export {GRID_WIDTH, CIRCLE_RADIUS, GRID_HEIGHT, R_INC, C_INC, GRIDR_INC, GRIDC_INC, PRIMARY, SECONDARY};
