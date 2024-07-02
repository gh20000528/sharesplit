import { extendTheme } from '@chakra-ui/react';
import Tag from './tag';
import { inputTheme } from './input';
import { buttonTheme } from './button';
import { selectTheme } from './select';
import { menuTheme } from './menu';
import '@fontsource/open-sans'
import '@fontsource/raleway'

const color = {
    primary: {
        100: '#9dc3e6',
        200: '#1f4e79',
        300: '#5abfc3',
        400: '#5abfc3',
        500: '#1f4e79',
        600: '#5abfc3',
        700: '#5abfc3',
        800: '#5abfc3',
        900: '#5abfc3',
      },
}

const theme = extendTheme({
    color,
    fonts: {
        body: `'Roboto', sans-serif`,
    },
    compoents: {
        Tag,
        Input: inputTheme,
        Button: buttonTheme,
        Select: selectTheme,
        Menu: menuTheme,
    }
})

export default theme;