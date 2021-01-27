import { Theme } from '@material-ui/core/styles';
import { pageContainer, pageContent, pageMainContainer, dataContainer } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
    ...pageContainer,
    ...pageContent,
    ...pageMainContainer,
    ...dataContainer,
});
