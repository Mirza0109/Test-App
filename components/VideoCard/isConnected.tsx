import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

const useIsConnected = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log('listening')
            setIsConnected(state.isConnected);
        });

        // Optionally, get the initial connection status
        NetInfo.fetch().then((state) => {
            console.log('NetInfo state: ', state)
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    console.log(isConnected)
    return isConnected;
};

export default useIsConnected;

