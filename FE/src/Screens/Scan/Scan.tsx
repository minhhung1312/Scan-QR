import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { domain } from "../../domain";

export const fetchLocationData = async (locationId: string) => {
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

    useEffect(() => {
        console.log('Scanned state updated:', scanned);
    }, [scanned]);


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
            // console.log('History added:', responseBody);
        } catch (error) {
            console.error('Error adding history:', error.message);
            Alert.alert("Error", `Unable to add to history: ${error.message}`);
        }
    };



    const handleBarCodeScanned = async ({ data }) => {
        console.log("aaaaaaaaa");
        if (scanned) return;
        console.log("bbbbbbbbbbbbbbb");
        setScanned(true);
        try {
            const locationData = await fetchLocationData(data.trim());
            await addHistory(locationData);
            // console.log('Location added:', locationData);
            navigation.navigate('Result', { location: locationData });
        } catch (error) {
            // Xử lý lỗi
        }
    };



    if (hasPermission === null) {
        return <View style={styles.container} />;
    }

    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    const initiateScan = () => {
        setScanned(false);
    };

    return (
        <View style={styles.container}>
            <BarCodeScanner
                key={scanned ? 'scanner-on' : 'scanner-off'}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {/* {scanned && (
                <View style={styles.buttonContainer}>
                    <Button title={'Tap to Scan Again'} onPress={initiateScan} />
                </View>
            )} */}
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
    buttonContainer: {
        alignSelf: 'center',
        margin: 20,
    },
});


