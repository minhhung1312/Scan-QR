import { History } from "./History"
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const HistoryContainer = () => {
    const [userId, setUserId] = useState("9");

    const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
        useLazyGetUserQuery();

    useEffect(() => {
        fetchOne(userId);
    }, [fetchOne, userId]);

    return <History data={data} isLoading={isLoading} />;
};
