import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/Services";
import { HStack, Spinner, Heading, ScrollView } from "native-base";
import { Image } from "react-native";

export interface IHomeProps {
    data: User | undefined;
    isLoading: boolean;
}

export const About = (props: IHomeProps) => {
    const { data, isLoading } = props;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Who are we</Text>
                <Text style={{ marginBottom: 30 }}>
                    We are group number 2, of class Mobile Application Development. We would like to introduce you our project: The QLIS - Quick Location Information Scanner.
                </Text>
                <Text style={styles.title}>Group Member</Text>
                <View style={styles.member}>
                    <View style={memberStyle.container}>
                        <Image
                            source={require("../../../assets/Khang.png")} // Thay thế bằng đường dẫn hình ảnh hoặc dữ liệu base64
                            style={memberStyle.image}
                        />
                        <Text style={memberStyle.text}>Lê Duy Khang</Text>
                    </View>
                    <View style={memberStyle.container}>
                        <Image
                            source={require("../../../assets/Hung.jpg")} // Thay thế bằng đường dẫn hình ảnh hoặc dữ liệu base64
                            style={memberStyle.image}
                        />
                        <Text style={memberStyle.text}>Nguyễn Minh Hưng</Text>
                    </View>
                    <View style={memberStyle.container}>
                        <Image
                            source={require("../../../assets/Tin.jpg")} // Thay thế bằng đường dẫn hình ảnh hoặc dữ liệu base64
                            style={memberStyle.image}
                        />
                        <Text style={memberStyle.text}>Nguyễn Sơn Tín</Text>
                    </View>
                    <View style={memberStyle.container}>
                        <Image
                            source={require("../../../assets/Vinh.jpg")} // Thay thế bằng đường dẫn hình ảnh hoặc dữ liệu base64
                            style={memberStyle.image}
                        />
                        <Text style={memberStyle.text}>Nguyễn Quang Vinh</Text>
                    </View>
                </View>
                <Text style={styles.title}>About Project</Text>
                <Text>
                    We made a location information retriever application using QR. This application will show you the information of your location, including many interesting facts about it. This app will also save your history, so you can easily review your journey. With that, you can revisit wherever you have scanned within a few button
                </Text>

            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContainer: {
        display: "flex",
        flexDirection: "column",
        width: "90%",
        marginTop: 20,
    },
    topContainer: {
        display: "flex",
        flexDirection: "row",
    },
    outstandingContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 5,
    },
    member: {
        marginBottom: 30,
        flex: 1,
        flexDirection: "row",
    },
});
const memberStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
    },
    image: {
        width: 60, // Độ rộng của ảnh
        height: 60, // Chiều cao của ảnh
        borderRadius: 30, // Độ cong của góc để tạo hình tròn
        marginBottom: 5, // Thêm khoảng cách giữa ảnh và văn bản
        marginTop: 5,
    },
    text: {
        textAlign: "center",
    },
});