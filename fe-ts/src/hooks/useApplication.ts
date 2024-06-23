import { useContext } from 'react';
import { ApplicationContext, AppContextProps } from '@/context/ApplicationProvider';

export default function useApplication(): AppContextProps {
    return useContext(ApplicationContext);
}
