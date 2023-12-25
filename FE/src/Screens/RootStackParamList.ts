// RootStackParamList.ts
import { RouteProp } from '@react-navigation/native';
import { Location } from './types';
export type RootStackParamList = {
    Home: undefined;
    Scan: undefined;
    Result: { location: Location };
    // Thêm các màn hình khác nếu cần
};
