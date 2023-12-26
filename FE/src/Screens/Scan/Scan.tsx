import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { domain } from "../../domain";


export const Scan = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    type ScanScreenProps = StackNavigationProp<RootStackParamList, 'Scan'>;
    const navigation = useNavigation<ScanScreenProps>();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const fetchLocationData = async (locationId: string) => {
        try {
            const response = await fetch(`${domain}/api/locations/${locationId}`);
            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(responseBody.error || 'Location not found');
            }
            return responseBody;
        } catch (error) {
            console.error('Error fetching location:', error.message);
            Alert.alert("Error", `Unable to fetch location data: ${error.message}`);
            throw error;
        }
    };

    const addHistory = async (locationData) => {
        try {
            const vnTimestamp = new Date(Date.now() + 7 * 60 * 60 * 1000);

            const response = await fetch(`${domain}/api/add-history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location: locationData,
                    timestamp: vnTimestamp.toISOString(),
                }),
            });

            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(responseBody.error || 'Error adding to history');
            }
            console.log('History added:', responseBody);
        } catch (error) {
            console.error('Error adding history:', error.message);
            Alert.alert("Error", `Unable to add to history: ${error.message}`);
        }
    };



    const handleBarCodeScanned = async ({ data }) => {
        if (scanned) return;
        setScanned(true);
        try {
            const locationData = await fetchLocationData(data.trim());
            await addHistory(locationData);
            console.log('Location added:', locationData);
            navigation.navigate('Result', { location: locationData });
        } catch (error) {
            // Xử lý lỗi
        } 
        // finally {
        //     setScanned(false);
        // }
    };



    if (hasPermission === null) {
        return <View style={styles.container} />;
    }

    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
    },
});


