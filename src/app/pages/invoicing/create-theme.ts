import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'

export default function createBCTheme(options: ThemeOptions) {
    return createMuiTheme({
        typography: {
            fontSize: 16,
        },
        palette: {
            primary: {
                main: '#00AAFF',
                contrastText: '#fff'
            }
        },
        overrides: {
            MuiButton: {
                root: {
                    textTransform: "none"
                }
            },
            MuiTableCell: {
                root: {
                    padding: 5
                }
            }
        },
        ...options,
    })
}