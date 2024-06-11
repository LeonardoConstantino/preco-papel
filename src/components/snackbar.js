import { getTextComponent } from '../utils/helpers.js';

export const getSnackbar = (text)=>{ 
    return {
        type: 'div',
        props: {
            id: "snackbar",
            children: [getTextComponent(text)],
        },
    }
}
