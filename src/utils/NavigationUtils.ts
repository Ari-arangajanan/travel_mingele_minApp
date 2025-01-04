import { useNavigate } from 'react-router-dom';

export const NavigationUtils = () => {
    const navigate = useNavigate();
    const navigateTo = (route: string, params: Record<string, string | number> = {}, state?: Record<string, any>) => {
        const url = Object.keys(params).reduce(
            (acc, key) => acc.replace(`:${key}`, params[key].toString()),
            route
        );
        navigate(url, state ? { state }: undefined);
    }
  return {navigateTo}
}
